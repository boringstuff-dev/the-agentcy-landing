import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · The Agentcy",
  description: "How The Agentcy collects, uses, and protects your data.",
};

const LAST_UPDATED = "19 April 2026";
const CONTACT_EMAIL = "privacy@the-agentcy.ai";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white/80">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          ← Back
        </Link>

        <h1 className="text-4xl font-bold text-white mt-6 mb-2">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <p>
              The Agentcy (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
              operates the marketing site at{" "}
              <span className="text-white">the-agentcy.ai</span> and the
              studio web application at{" "}
              <span className="text-white">app.the-agentcy.ai</span>. This page
              explains what information we collect, how we use it, and the
              choices you have about your data.
            </p>
          </section>

          <Section title="Information we collect">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Account information</strong> —
                email address and authentication credentials when you sign up.
              </li>
              <li>
                <strong className="text-white">Brand profile</strong> —
                company name, website, industry, bio, products, and services
                you add to configure your brands.
              </li>
              <li>
                <strong className="text-white">Social platform tokens</strong>{" "}
                — OAuth access tokens issued by platforms you connect (e.g.
                LinkedIn, Instagram). Stored encrypted and used only to
                publish content and read back platform insights on your behalf.
              </li>
              <li>
                <strong className="text-white">
                  Social platform profile data
                </strong>{" "}
                — your platform username, display name, profile picture URL,
                and basic account identifiers returned by the platforms.
              </li>
              <li>
                <strong className="text-white">Generated content</strong> —
                the posts, images, videos, and related metadata you create
                through our AI-assisted tools.
              </li>
              <li>
                <strong className="text-white">Usage data</strong> — standard
                server logs (IP, user agent, request timestamps) used for
                security, debugging, and rate limiting.
              </li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and operate the service (authentication, content generation, publishing).</li>
              <li>
                To communicate with you about your account, security, and
                service-related updates.
              </li>
              <li>To improve the service and develop new features.</li>
              <li>
                To comply with legal obligations and enforce our Terms of
                Service.
              </li>
            </ul>
          </Section>

          <Section title="Third-party services">
            <p>
              We use the following sub-processors to operate the service. Each
              is bound by its own privacy terms:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Supabase — authentication and database hosting</li>
              <li>Vercel — application hosting and edge delivery</li>
              <li>Anthropic — AI content generation</li>
              <li>LinkedIn, Meta (Instagram/Facebook) — social publishing APIs you explicitly connect</li>
              <li>Stripe — payment processing (when billing is enabled)</li>
            </ul>
          </Section>

          <Section title="How your data is shared">
            <p>
              We do not sell your personal data. Data is shared only with the
              sub-processors above, and with the social platforms you connect
              — strictly to carry out the actions you request (publishing a
              post, reading analytics, etc.).
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              Account data, brand profiles, and generated content are retained
              for as long as your account is active. You can delete your
              account and all associated data at any time — see{" "}
              <Link
                href="/data-deletion"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
              >
                Data Deletion
              </Link>
              . Once deletion is requested, we remove your data within 30 days
              unless retention is required by law.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Depending on your jurisdiction (GDPR, CCPA, etc.) you may have
              the right to access, correct, export, or delete your personal
              data. Contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-400 hover:text-purple-300"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              to exercise these rights.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use industry-standard measures to protect your data in transit
              (TLS) and at rest. Access tokens are stored with database-level
              encryption and are available only to the account that connected
              them.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date above and, for
              material changes, notify you by email or through the product.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions or requests?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-400 hover:text-purple-300"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}
