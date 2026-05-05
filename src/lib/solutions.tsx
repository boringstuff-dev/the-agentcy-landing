import type { ReactNode } from "react";

// ─── Shared types ───
export type MegaMenuItem = {
  icon: (size?: number) => ReactNode;
  label: string;
  desc: string;
  href: string;
};

export type MegaMenuGroup = {
  title: string;
  items: MegaMenuItem[];
};

// ─── Megamenu data (also drives the dynamic /solutions/[slug] route) ───
export const SOLUTIONS_GROUPS: MegaMenuGroup[] = [
  {
    title: "Content Creators",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
        ),
        label: "Digital Creators",
        desc: "Perfect for full-time creators and social media enthusiasts.",
        href: "/solutions/digital-creators",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
        ),
        label: "Podcast Hosts",
        desc: "Grow your podcast and engage with your audience.",
        href: "/solutions/podcast-hosts",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg>
        ),
        label: "Coach Creators",
        desc: "Build your coaching brand and connect with your community.",
        href: "/solutions/coach-creators",
      },
    ],
  },
  {
    title: "Companies & Agencies",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></svg>
        ),
        label: "Companies",
        desc: "Scale your social media presence and drive growth.",
        href: "/solutions/companies",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
        ),
        label: "Agencies",
        desc: "Efficiently manage accounts for multiple clients.",
        href: "/solutions/agencies",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" /><circle cx="17" cy="6" r="2.5" /><path d="M15 14c3.5 0 7 1.7 7 5" /></svg>
        ),
        label: "Influencers",
        desc: "Streamline your content and grow your influence.",
        href: "/solutions/influencers",
      },
    ],
  },
  {
    title: "Specialized Creators",
    items: [
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
        ),
        label: "ADHD Creators",
        desc: "Tools designed for neurodivergent content creation.",
        href: "/solutions/adhd-creators",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
        ),
        label: "Digital Nomads",
        desc: "Create content from anywhere in the world.",
        href: "/solutions/digital-nomads",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></svg>
        ),
        label: "Thought Leaders",
        desc: "Share your expertise and build your authority.",
        href: "/solutions/thought-leaders",
      },
      {
        icon: (s = 18) => (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 3 3 3 0 0 0 3-2V4a3 3 0 0 0-3 0z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 3 3 3 0 0 1-3-2" /></svg>
        ),
        label: "Neurodivergent Creators",
        desc: "Tailored solutions for unique creative minds.",
        href: "/solutions/neurodivergent-creators",
      },
    ],
  },
];

// ─── Per-slug page content for /solutions/[slug] ───
export type SolutionPageContent = {
  tagline: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  painPoints: string[];
  proofQuote: { quote: string; author: string; role: string };
  accent: "violet" | "pink" | "cyan" | "amber" | "emerald";
};

export const SOLUTION_PAGES: Record<string, SolutionPageContent> = {
  "digital-creators": {
    tagline: "The complete content engine for full-time creators.",
    intro:
      "Stop juggling tools. Run your entire content operation — ideation, production, scheduling, and analytics — from a single workspace built for speed and consistency.",
    benefits: [
      { title: "Multi-platform publishing", desc: "Push optimized variants to Instagram, TikTok, YouTube, and X — all from one brief." },
      { title: "Always-on ideation", desc: "An AI strategist surfaces post ideas based on what is trending in your niche right now." },
      { title: "Brand voice that scales", desc: "Train The Agentcy on your past content so every output sounds like you, not generic AI." },
    ],
    painPoints: [
      "You spend more time editing than creating, and the algorithm still moves on without you.",
      "Five tools, four passwords, and a Notion board nobody updates — every post is its own scavenger hunt.",
      "Posting consistently feels like a second job you never signed up for.",
    ],
    proofQuote: {
      quote: "I went from posting twice a week to seven days straight. Same me, just with seven agents covering my back.",
      author: "Marisol K.",
      role: "Full-time creator, 320K followers",
    },
    accent: "violet",
  },
  "podcast-hosts": {
    tagline: "Turn every episode into a week of social content.",
    intro:
      "Your podcast already produces hours of valuable content. Let The Agentcy slice, repurpose, and publish it across every platform — so you can focus on recording the next one.",
    benefits: [
      { title: "Episode-to-social automation", desc: "Auto-generate quote cards, audiograms, and short clips from each episode." },
      { title: "Show notes that convert", desc: "AI-written summaries optimized for SEO and listener retention." },
      { title: "Cross-platform promotion", desc: "Coordinated rollouts across Instagram, TikTok, LinkedIn, and X — timed for impact." },
    ],
    painPoints: [
      "Each episode dies the day it drops because nobody has time to clip and promote it.",
      "Your editor charges per clip, your VA charges per post, and your reach barely budges.",
      "You record gold for an hour, then watch it disappear into the feed twelve hours later.",
    ],
    proofQuote: {
      quote: "We turned one episode into 24 posts across five platforms — without hiring a single new person on the team.",
      author: "Diego R.",
      role: "Host, The Compounding Podcast",
    },
    accent: "pink",
  },
  "coach-creators": {
    tagline: "Build authority and grow your coaching practice.",
    intro:
      "Coaches do not have time for content theater. Get a steady stream of high-trust, high-converting posts that bring qualified leads to your DMs.",
    benefits: [
      { title: "Lead-magnet content", desc: "Frameworks, case studies, and transformation stories — formatted for the platform of your choice." },
      { title: "Authority that compounds", desc: "Pillar content series that build recognition and book discovery calls on autopilot." },
      { title: "Community engagement", desc: "Smart auto-replies that keep conversations alive without sounding robotic." },
    ],
    painPoints: [
      "Your calendar is full of clients, which means it is empty of content.",
      "Generic AI posts sound like every other coach on the timeline — and convert like it too.",
      "DMs pile up, leads get cold, and you wonder how the coaches with smaller followings keep booking out.",
    ],
    proofQuote: {
      quote: "My discovery calls doubled in the first month. The Agentcy made me look like I had a marketing team.",
      author: "Priya S.",
      role: "Executive coach, founder of Northform",
    },
    accent: "amber",
  },
  "companies": {
    tagline: "Scale your brand presence across every channel.",
    intro:
      "Whether you are a ten-person startup or a one-thousand-person team, The Agentcy gives marketing teams the leverage of a full creative agency — without the agency timeline or budget.",
    benefits: [
      { title: "Multi-account management", desc: "Manage every brand and product line from a unified workspace." },
      { title: "Brand voice consistency", desc: "Lock in tone, vocabulary, and visual rules so every output stays on-brand." },
      { title: "ROI you can prove", desc: "Built-in analytics tie content directly to engagement, leads, and pipeline." },
    ],
    painPoints: [
      "Your agency takes two weeks for a campaign and bills like it took two months.",
      "Brand voice drifts across product lines because every channel is run by a different freelancer.",
      "Marketing leadership cannot tell which content is actually moving pipeline.",
    ],
    proofQuote: {
      quote: "We replaced two retainers and an internal hire with The Agentcy. Output went up, costs went down, leadership noticed.",
      author: "Hannah L.",
      role: "Head of Brand, Series B SaaS",
    },
    accent: "cyan",
  },
  "agencies": {
    tagline: "Manage every client account without the chaos.",
    intro:
      "Stop drowning in approval threads and Slack pings. The Agentcy is the multi-client operating system agencies use to deliver more for clients in less time.",
    benefits: [
      { title: "White-label workspaces", desc: "Each client gets a branded environment — your name on the door." },
      { title: "Multi-client dashboard", desc: "See every account, every deadline, and every approval in one view." },
      { title: "Streamlined approvals", desc: "Built-in review and feedback flows replace endless email chains." },
    ],
    painPoints: [
      "Margins are crushed because every new client adds tools, headcount, and Slack channels.",
      "Approvals live across email, Loom, Notion, and a WhatsApp group nobody admits to checking.",
      "Junior creatives spend their day on busywork instead of the strategy clients actually pay for.",
    ],
    proofQuote: {
      quote: "We onboarded four new clients without hiring. The Agentcy is the leverage we have been pricing in for years.",
      author: "Tomás A.",
      role: "Founder, Lighthouse Studio",
    },
    accent: "emerald",
  },
  "influencers": {
    tagline: "Less time creating, more time engaging.",
    intro:
      "You are the brand. Your audience expects you, not a content factory. The Agentcy handles the volume so your voice stays front and center.",
    benefits: [
      { title: "Trend-aware content", desc: "Real-time signals tell you what is working in your niche before everyone else catches on." },
      { title: "Engagement automation", desc: "Smart replies that sound like you and never miss a comment that matters." },
      { title: "Sponsorship-ready", desc: "Generate clean rate sheets and campaign decks that close brand deals faster." },
    ],
    painPoints: [
      "Brand deals stall because you cannot turn around a campaign deck in 24 hours.",
      "Comments and DMs pile up faster than you can answer — and engagement quietly drops.",
      "You burn weekends scripting Reels instead of being present for the audience that pays your bills.",
    ],
    proofQuote: {
      quote: "I closed three brand deals last month from decks The Agentcy generated in under five minutes each.",
      author: "Aria N.",
      role: "Beauty creator, 1.1M followers",
    },
    accent: "pink",
  },
  "adhd-creators": {
    tagline: "Frictionless content creation for ADHD brains.",
    intro:
      "Built around how ADHD minds actually work — capture inspiration the moment it hits, batch tasks when you are hyperfocused, and let The Agentcy carry the executive-function burden.",
    benefits: [
      { title: "Distraction-free flow", desc: "A calm, single-focus interface that does not overwhelm. Switch contexts only when you choose." },
      { title: "Visual scheduling", desc: "See the whole month at a glance — no spreadsheets, no mental math." },
      { title: "Body-double AI strategist", desc: "An always-on companion that breaks tasks into doable chunks and keeps you moving." },
    ],
    painPoints: [
      "You have 47 brilliant ideas in your notes app and zero of them have been published.",
      "Every existing tool is a wall of buttons that triggers task paralysis before you even start.",
      "Hyperfocus shows up at 1am and is wasted because the workflow takes too many steps.",
    ],
    proofQuote: {
      quote: "For the first time in years, I actually finish what I start. The Agentcy holds the steps so my brain can stay in flow.",
      author: "Jordan M.",
      role: "ADHD creator and educator",
    },
    accent: "violet",
  },
  "digital-nomads": {
    tagline: "Create from anywhere. Publish everywhere.",
    intro:
      "Whether you are posting from a coworking space in Lisbon or a beach in Bali, The Agentcy keeps your audience engaged on their schedule — not yours.",
    benefits: [
      { title: "Cloud-native workflow", desc: "Pick up exactly where you left off on any device, on any network." },
      { title: "Timezone-aware scheduling", desc: "Posts go live when your audience is awake, not when you happen to be." },
      { title: "Offline drafts", desc: "Capture ideas without signal and sync when you are back online." },
    ],
    painPoints: [
      "Your audience is asleep when you are awake — and your engagement looks like it.",
      "Every laptop you buy ends up with a different version of the same Notion doc.",
      "Patchy wifi means a half-finished post on Tuesday becomes a never-finished post by Sunday.",
    ],
    proofQuote: {
      quote: "I posted from three continents last month and my audience never noticed I was traveling. That was the goal.",
      author: "Lina T.",
      role: "Travel creator and remote founder",
    },
    accent: "cyan",
  },
  "thought-leaders": {
    tagline: "Turn your expertise into a publishing engine.",
    intro:
      "Your insights deserve more than a stray tweet. The Agentcy turns long-form thinking — keynotes, articles, interviews — into a sustained content presence that builds your authority.",
    benefits: [
      { title: "Long-form to social", desc: "One keynote becomes a week of posts, threads, and clips automatically." },
      { title: "Authority frameworks", desc: "Pillar-and-cluster strategies that establish you as the go-to voice in your space." },
      { title: "Speaker engagement support", desc: "Generate event recap content that turns each appearance into a flywheel." },
    ],
    painPoints: [
      "You give a 60-minute keynote that lives on a forgotten YouTube link three weeks later.",
      "Every article takes six hours to write and gets one LinkedIn share, which was you.",
      "The peers with half your expertise are getting twice the inbound — because they post.",
    ],
    proofQuote: {
      quote: "One talk now produces six weeks of content. Inbound speaking offers tripled in a quarter.",
      author: "Dr. Eli Wren",
      role: "Author and keynote speaker",
    },
    accent: "amber",
  },
  "neurodivergent-creators": {
    tagline: "Tools that adapt to how your brain works.",
    intro:
      "Every brain is different. The Agentcy is the first content platform designed from the ground up for neurodivergent creators — autism, dyslexia, dyspraxia, ADHD, and beyond.",
    benefits: [
      { title: "Customizable interface", desc: "Adjust density, motion, contrast, and font to whatever lets you focus." },
      { title: "Cognitive load reduction", desc: "Smart defaults handle decisions so you can stay in creative flow." },
      { title: "Pattern-matching assistance", desc: "AI that catches inconsistencies and gaps your brain might gloss over." },
    ],
    painPoints: [
      "Mainstream content tools assume a brain that works in linear, neurotypical steps. Yours does not.",
      "Sensory overload from busy interfaces costs you the energy you needed to actually create.",
      "Accommodations live in browser extensions and personal hacks, not in the product itself.",
    ],
    proofQuote: {
      quote: "It is the first content tool that did not feel like it was fighting me. Calm interface, real outputs.",
      author: "Sam O.",
      role: "Autistic writer and educator",
    },
    accent: "emerald",
  },
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

export const ACCENT_CLASSES: Record<SolutionPageContent["accent"], { glow: string; text: string; border: string }> = {
  violet: { glow: "from-violet-500/30 via-fuchsia-500/10 to-transparent", text: "text-violet-300", border: "border-violet-400/20" },
  pink: { glow: "from-pink-500/30 via-rose-500/10 to-transparent", text: "text-pink-300", border: "border-pink-400/20" },
  cyan: { glow: "from-cyan-500/30 via-sky-500/10 to-transparent", text: "text-cyan-300", border: "border-cyan-400/20" },
  amber: { glow: "from-amber-500/30 via-orange-500/10 to-transparent", text: "text-amber-300", border: "border-amber-400/20" },
  emerald: { glow: "from-emerald-500/30 via-teal-500/10 to-transparent", text: "text-emerald-300", border: "border-emerald-400/20" },
};
