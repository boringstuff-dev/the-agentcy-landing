export const CONTACT_EMAIL = "privacy@the-agentcy.ai";

/** A titled block of a legal page. */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      {children}
    </section>
  );
}
