import { CONTACT_EMAIL, Section } from "./Section";

/** The English text of /data-deletion. Keep the Italian version
 *  (DataDeletionIt.tsx) in step when this changes. */
export default function DataDeletionEn() {
  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <section>
        <p>
          You can request deletion of your account and all associated data
          at any time. This page also serves as the{" "}
          <strong className="text-white">
            User Data Deletion URL
          </strong>{" "}
          required by Meta / Instagram and other OAuth providers.
        </p>
      </section>

      <Section title="Option 1 — Disconnect a single platform">
        <p>
          To remove only the data associated with a specific connected
          social account (e.g. just LinkedIn or just Instagram):
        </p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li>Sign in to your account at app.the-agentcy.ai</li>
          <li>
            Navigate to{" "}
            <strong className="text-white">
              Dashboard → Social Accounts
            </strong>
          </li>
          <li>
            Click <strong className="text-white">Disconnect</strong> on the
            platform card
          </li>
        </ol>
        <p className="mt-3">
          Disconnecting revokes the stored access token and removes the
          connection record from our database. We also encourage you to
          revoke the app&rsquo;s access from the platform itself:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/psettings/permitted-services"
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Data privacy → Permitted services
            </a>
          </li>
          <li>
            Instagram / Meta:{" "}
            <a
              href="https://www.facebook.com/settings?tab=business_tools"
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noreferrer noopener"
            >
              Apps and websites settings
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Option 2 — Delete your entire account">
        <p>
          To permanently delete your Agentcy account and all related data
          (brands, connected accounts, projects, published content
          metadata), send an email from your account&rsquo;s registered
          email address to:
        </p>
        <p className="mt-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Account%20deletion%20request`}
            className="text-purple-400 hover:text-purple-300 text-base"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-3">
          Include the subject line{" "}
          <em className="text-white">&ldquo;Account deletion request&rdquo;</em>. We
          will confirm receipt and complete the deletion within{" "}
          <strong className="text-white">30 days</strong>.
        </p>
      </Section>

      <Section title="What gets deleted">
        <ul className="list-disc pl-6 space-y-1">
          <li>Your account record and authentication data</li>
          <li>All brands you created, including brand identity fields</li>
          <li>All connected social platform tokens and cached profile data</li>
          <li>All projects, assets, and publications you generated</li>
          <li>All AI-generated content suggestions and market analyses</li>
          <li>Billing records (retained only as required by law)</li>
        </ul>
      </Section>

      <Section title="What does not get deleted">
        <p>
          Content that has already been published to third-party platforms
          (LinkedIn, Instagram, etc.) is{" "}
          <strong className="text-white">not removed by us</strong>. To
          delete such posts, remove them directly on the platform where
          they were published.
        </p>
        <p className="mt-2">
          We may retain minimal, anonymized logs for security and fraud
          prevention.
        </p>
      </Section>

      <Section title="Confirmation code / request reference">
        <p>
          For deletion requests initiated via the OAuth provider (e.g. Meta
          sending us a data deletion webhook), we will respond with a
          confirmation code and a status URL where you can track the
          request. You can also reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-purple-400 hover:text-purple-300"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          to verify status.
        </p>
      </Section>
    </div>
  );
}
