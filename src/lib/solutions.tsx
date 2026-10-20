import type { ReactNode } from "react";

// ─── Shared types ───
// Labels, descriptions and page copy live in messages/<locale>.json under
// `content.<solutions|features|events>`, keyed by group key and slug. These
// files hold only what does not translate: icons, routes and accents.
export type Accent = "violet" | "pink" | "cyan" | "amber" | "emerald";

export type MegaMenuItem = {
  icon: (size?: number) => ReactNode;
  href: string;
};

export type MegaMenuGroup = {
  key: string;
  items: MegaMenuItem[];
};

/** The text of one /solutions, /features or /events page, as stored in
 *  `content.<kind>.pages.<slug>` in the messages. */
export type DetailPageContent = {
  tagline: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  painPoints: string[];
  proofQuote: { quote: string; author: string; role: string };
};

/** A menu group with its text filled in for one locale. */
export type LocalizedMenuGroup = {
  key: string;
  title: string;
  items: (MegaMenuItem & { label: string; desc: string })[];
};

// ─── Megamenu data (also drives the dynamic /solutions/[slug] route) ───
export const SOLUTIONS_GROUPS: MegaMenuGroup[] = [
  {
    key: "contentCreators",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
        ),
        href: "/solutions/digital-creators",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
        ),
        href: "/solutions/podcast-hosts",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg>
        ),
        href: "/solutions/coach-creators",
      },
    ],
  },
  {
    key: "companiesAgencies",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></svg>
        ),
        href: "/solutions/companies",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
        ),
        href: "/solutions/agencies",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><circle cx="17" cy="6" r="2.5" /><path d="M15 14c3.5 0 7 1.7 7 5" /></svg>
        ),
        href: "/solutions/influencers",
      },
    ],
  },
  {
    key: "specializedCreators",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
        ),
        href: "/solutions/adhd-creators",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
        ),
        href: "/solutions/digital-nomads",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></svg>
        ),
        href: "/solutions/thought-leaders",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 3 3 3 0 0 0 3-2V4a3 3 0 0 0-3 0z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 3 3 3 0 0 1-3-2" /></svg>
        ),
        href: "/solutions/neurodivergent-creators",
      },
    ],
  },
];

// ─── Per-slug accent for /solutions/[slug] ───
export const SOLUTION_ACCENTS: Record<string, Accent> = {
  "digital-creators": "violet",
  "podcast-hosts": "pink",
  "coach-creators": "amber",
  companies: "cyan",
  agencies: "emerald",
  influencers: "pink",
  "adhd-creators": "violet",
  "digital-nomads": "cyan",
  "thought-leaders": "amber",
  "neurodivergent-creators": "emerald",
};

// ─── Helpers ───
export function getSolutionItemBySlug(slug: string): { item: MegaMenuItem; group: MegaMenuGroup } | null {
  for (const group of SOLUTIONS_GROUPS) {
    const item = group.items.find((i) => i.href === `/solutions/${slug}`);
    if (item) return { item, group };
  }
  return null;
}

export function getAllSolutionSlugs(): string[] {
  return SOLUTIONS_GROUPS.flatMap((g) => g.items).map((i) => i.href.replace("/solutions/", ""));
}

export const ACCENT_CLASSES: Record<Accent, { glow: string; text: string; border: string }> = {
  violet: { glow: "from-violet-500/30 via-fuchsia-500/10 to-transparent", text: "text-violet-300", border: "border-violet-400/20" },
  pink: { glow: "from-pink-500/30 via-rose-500/10 to-transparent", text: "text-pink-300", border: "border-pink-400/20" },
  cyan: { glow: "from-cyan-500/30 via-sky-500/10 to-transparent", text: "text-cyan-300", border: "border-cyan-400/20" },
  amber: { glow: "from-amber-500/30 via-orange-500/10 to-transparent", text: "text-amber-300", border: "border-amber-400/20" },
  emerald: { glow: "from-emerald-500/30 via-teal-500/10 to-transparent", text: "text-emerald-300", border: "border-emerald-400/20" },
};
