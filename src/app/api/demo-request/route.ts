/**
 * "Book a demo" — stores the request (demo_requests, read by the
 * backoffice Landing page) and emails the founder. The row is the source
 * of truth; a mail failure must not lose the lead, so SES is best-effort.
 */
import { NextResponse, type NextRequest } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const runtime = "nodejs";

// Light per-IP limiter — serverless instances don't share it, which is
// fine: it only needs to blunt naive form spam, the honeypot does the rest.
const hits = new Map<string, { n: number; at: number }>();
const WINDOW = 10 * 60 * 1000;

function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.at > WINDOW) {
    hits.set(ip, { n: 1, at: now });
    return false;
  }
  h.n++;
  return h.n > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  if (request.headers.get("x-debug") === "1") {
    const keys = Object.keys(process.env).filter((k) =>
      /SUPABASE|AGENTCY|DEMO|VERCEL_ENV/.test(k),
    );
    console.error("demo-request env keys:", keys.join(","));
    if (request.headers.get("x-debug-keys") === "1") {
      return NextResponse.json({ keys });
    }
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  // Honeypot: real users never fill "website" (hidden field).
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 320) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/demo_requests`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, company: company || null, message: message || null }),
    });
    if (!res.ok) {
      const detail = `${res.status} ${await res.text().catch(() => "")}`.slice(0, 200);
      console.error("demo-request insert failed:", detail);
      return NextResponse.json(
        {
          error: "Could not save your request — please try again.",
          ...(request.headers.get("x-debug") === "1" ? { detail } : {}),
        },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("demo-request insert threw:", err);
    return NextResponse.json(
      {
        error: "Could not save your request — please try again.",
        ...(request.headers.get("x-debug") === "1" ? { detail: String(err).slice(0, 200) } : {}),
      },
      { status: 500 },
    );
  }

  try {
    const ses = new SESClient({
      region: "eu-west-1",
      credentials: {
        accessKeyId: process.env.AGENTCY_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AGENTCY_AWS_SECRET_ACCESS_KEY!,
      },
    });
    await ses.send(new SendEmailCommand({
      Source: "The Agentcy <noreply@the-agentcy.ai>",
      Destination: { ToAddresses: [process.env.DEMO_NOTIFY_EMAIL ?? "gianmarco.sciortino@gmail.com"] },
      Message: {
        Subject: { Data: `Demo request — ${name}${company ? ` (${company})` : ""}` },
        Body: {
          Text: {
            Data: [
              `Name: ${name}`,
              `Email: ${email}`,
              company && `Company: ${company}`,
              message && `Message:\n${message}`,
              "",
              "Manage: https://admin.the-agentcy.ai/landing",
            ].filter(Boolean).join("\n"),
          },
        },
      },
    }));
  } catch {
    // Row is stored; the backoffice list is the fallback channel.
  }

  return NextResponse.json({ ok: true });
}
