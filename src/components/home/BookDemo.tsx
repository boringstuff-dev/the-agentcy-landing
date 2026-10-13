"use client";

import { useState } from "react";
import { APP_LOGIN, track } from "./links";
import { CompactChatBar } from "./ChatBar";
import Reveal from "./Reveal";

const inputCls =
  "glass-soft w-full rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:border-brand-300/50 focus:outline-none transition-colors";

export default function BookDemo() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [open, setOpen] = useState(false);

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setState("busy");
    const res = await fetch("https://app.the-agentcy.ai/api/public/demo-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => null);
    if (!res?.ok) {
      setState("error");
      return;
    }
    setState("done");
    // Conversion goal for the Plausible dashboard
    track("demo_request");
  }

  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal>
        <div className="glass relative flex flex-col items-center gap-5.5 overflow-hidden rounded-[32px] px-6 py-12 text-center md:px-10 md:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-60%] h-[420px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,.45),transparent_65%)]"
          />
          <h2 className="relative max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
            What should your agency make first?
          </h2>
          <p className="relative max-w-xl text-[17px] text-white/72">
            Start free with 300 credits a month. Or book a 20-minute demo and we will run your brand through it live.
          </p>

          <div className="relative flex w-full justify-center">
            <CompactChatBar />
          </div>

          <div className="relative flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex min-h-12 cursor-pointer items-center rounded-full border border-white/14 bg-white/6 px-5.5 text-[15px] font-bold text-white transition-colors hover:bg-white/11"
            >
              Book a demo
            </button>
            <a
              href="#watch"
              className="inline-flex min-h-12 items-center rounded-full border border-white/14 bg-white/6 px-5.5 text-[15px] font-bold text-white transition-colors hover:bg-white/11"
            >
              Watch the film again
            </a>
          </div>

          {open && state !== "done" && (
            <form onSubmit={submit} className="relative mx-auto flex w-full max-w-md flex-col gap-3 text-left">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input type="text" placeholder="Your name" required className={inputCls} {...field("name")} />
                <input type="email" placeholder="you@company.com" required className={inputCls} {...field("email")} />
              </div>
              <input type="text" placeholder="Company (optional)" className={inputCls} {...field("company")} />
              <textarea placeholder="What would you like to see? (optional)" rows={3} className={inputCls} {...field("message")} />
              {/* Honeypot — humans never see or fill this */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <button
                type="submit"
                disabled={state === "busy"}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-600 px-6 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)] transition-transform hover:-translate-y-px disabled:opacity-60"
              >
                {state === "busy" ? "Sending…" : "Request the demo"}
              </button>
              {state === "error" && (
                <p className="text-center text-sm text-red-300">
                  Something went wrong. Please try again or email hello@the-agentcy.ai.
                </p>
              )}
            </form>
          )}

          {state === "done" && (
            <div className="glass-soft relative mx-auto w-full max-w-md rounded-2xl p-6">
              <h3 className="mb-1.5 font-display text-xl font-semibold">Request received</h3>
              <p className="text-sm text-white/72">We will reach out within a day to schedule your demo.</p>
            </div>
          )}

          <p className="relative text-sm text-white/50">
            Or jump straight in and{" "}
            <a href={APP_LOGIN} className="text-brand-200 underline underline-offset-4 hover:text-white">
              create a free account
            </a>
            .
          </p>
        </div>
      </Reveal>
    </section>
  );
}
