import Image from "next/image";
import type { ReactNode } from "react";
import { APP_LOGIN } from "./links";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";

const SECTION = "mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30";
const H2 = "font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl";
const CARD = "glass glass-hover rounded-3xl p-7 flex flex-col gap-2.5";
const MUTED = "text-[15px] leading-relaxed text-white/72";

function Icon({ d, className = "" }: { d: ReactNode; className?: string }) {
  return (
    <svg
      className={`h-5.5 w-5.5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

/* ─── Aurora background ─── */
export function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="aurora" />
      <div className="aurora-grid" style={{ height: 1200 }} />
      <div className="aurora-noise" />
    </div>
  );
}

/* ─── Stats strip ─── */
const STATS = [
  { value: "1 link", label: "Teaches it your brand" },
  { value: "5 min", label: "To an audit and this month's plan" },
  { value: "7", label: "Specialist agents, one workshop" },
  { value: "10+", label: "Hours a week handed back" },
];

export function Stats() {
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-7 text-center md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[40px] leading-none font-semibold">
                <CountUp value={s.value} />
              </div>
              <div className="mt-2 text-sm text-white/72">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── How it works ─── */
const STEPS = [
  {
    n: "01",
    color: "text-brand-300",
    icon: (
      <>
        <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
        <path d="M5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9z" />
      </>
    ),
    title: "Paste your website",
    desc: "Brand DNA reads your site: palette, type, tone, offer and audience, into cards you can edit. No site yet? Describe the brand and it drafts one.",
  },
  {
    n: "02",
    color: "text-cyan-300",
    icon: (
      <>
        <path d="M4 5h16v11H9l-5 4z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    title: "Get your audit and plan",
    desc: "Lo Stratega checks the market and your channels, finds the gaps, and drafts this month: site, social, email, events. Ask for anything else in plain English.",
  },
  {
    n: "03",
    color: "text-pink-300",
    icon: <path d="M20 6L9 17l-5-5" />,
    title: "Approve from anywhere",
    desc: "Drafts land in your inbox and on your phone. Approve, or say “punchier, shorter, warmer”. Every spend shows its credit cost first.",
  },
  {
    n: "04",
    color: "text-emerald-300",
    icon: (
      <>
        <path d="M4 19l6-6 4 4 6-8" />
        <path d="M15 9h5v5" />
      </>
    ),
    title: "Autopilot runs the rest",
    desc: "Posts go out, articles keep the site fresh for search, journeys follow up every lead, and next week's plan is waiting when you log in.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className={SECTION}>
      <Reveal className="mb-9 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-[620px] flex-col gap-3.5">
          <span className="eyebrow">How it works</span>
          <h2 className={H2}>Paste a link. Approve the plan. The rest runs itself.</h2>
        </div>
        <p className="max-w-[380px] text-base leading-relaxed text-white/72">
          Agents plan and draft. You approve. Nothing renders, publishes or spends without your say-so, and every cost shows in credits first.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className="flex">
            <div className={`${CARD} w-full gap-3.5 p-6.5`}>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-white/50">{s.n}</span>
                <Icon d={s.icon} className={s.color} />
              </div>
              <h3 className="font-display text-[22px] font-semibold">{s.title}</h3>
              <p className={MUTED}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── What it makes (bento) ─── */
export function Makes() {
  return (
    <section id="makes" className={SECTION}>
      <Reveal className="mx-auto mb-10 flex max-w-[680px] flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">What it makes along the way</span>
        <h2 className={H2}>Everything an agency hands you, on-brand by default</h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="flex md:col-span-2">
          <div className={`${CARD} min-h-[260px] w-full justify-between gap-5 overflow-hidden`}>
            <div className="flex max-w-[420px] flex-col gap-2.5">
              <h3 className="font-display text-2xl font-semibold">Social posts &amp; carousels</h3>
              <p className={MUTED}>
                Hook-tested first slides, auto layout, your fonts and colours on every slide. Formatted per platform with copy and hashtags.
              </p>
            </div>
            <div className="flex gap-2.5" aria-hidden="true">
              <div className="aspect-4/5 w-24 rounded-xl bg-linear-to-br from-brand-500 to-indigo-900" />
              <div className="aspect-4/5 w-24 rounded-xl bg-linear-to-br from-cyan-500 to-cyan-950" />
              <div className="aspect-4/5 w-24 rounded-xl bg-linear-to-br from-pink-500 to-pink-950" />
              <div className="aspect-4/5 w-24 rounded-xl bg-white/10" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-cyan-300" d={<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9l5 3-5 3z" /></>} />
            <h3 className="font-display text-[22px] font-semibold">Short-form video</h3>
            <p className={MUTED}>Reels, TikToks and Shorts from a storyboard or your own photos. Scripted, voiced, captioned.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-pink-300" d={<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>} />
            <h3 className="font-display text-[22px] font-semibold">Flyers, brochures &amp; print</h3>
            <p className={MUTED}>Print-ready designs with editable text, in every social size too.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-brand-300" d={<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>} />
            <h3 className="font-display text-[22px] font-semibold">Explainers &amp; decks</h3>
            <p className={MUTED}>Motion-graphics explainers with AI presenters, plus pitch and sales decks.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-emerald-300" d={<path d="M4 6h16M4 12h10M4 18h7" />} />
            <h3 className="font-display text-[22px] font-semibold">Copy, newsletters &amp; SEO</h3>
            <p className={MUTED}>Voice-trained drafts: articles, email sequences, landing copy and meta descriptions.</p>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="flex md:col-span-2">
          <div className={`${CARD} w-full`}>
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row">
              <div className="flex max-w-[460px] flex-col gap-2.5">
                <h3 className="font-display text-[22px] font-semibold">Ads, podcasts, voiceovers &amp; market analysis</h3>
                <p className={MUTED}>
                  Ad variants for Meta, Google and TikTok. Multi-voice podcast episodes. Competitor research delivered as a report or a deck.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {["Ad creatives", "Podcasts", "Voiceovers", "Brand audit"].map((p) => (
                  <span key={p} className="glass-soft rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── The ecosystem ─── */
const ECOSYSTEM = [
  {
    tint: "bg-brand-500/20 text-brand-200",
    dash: "text-brand-300",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    title: "Website & SEO",
    desc: "A multi-page site drafted from your Brand DNA, on your own domain, kept fresh with articles written to bring in search traffic.",
    bullets: ["Three design proposals, drag-and-drop editing", "Articles and meta copy in your voice", "yourbrand.com or a free subdomain"],
  },
  {
    tint: "bg-fuchsia-500/18 text-fuchsia-300",
    dash: "text-fuchsia-300",
    icon: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 20V9" /></>,
    title: "Social content",
    desc: "Carousels, reels, flyers and posts for every channel, drafted to the plan and scheduled by Il Postino when each audience is awake.",
    bullets: ["A calendar that fills its own gaps", "Right spec, caption and hashtags per channel", "Hook-tested first slides"],
  },
  {
    tint: "bg-cyan-500/18 text-cyan-300",
    dash: "text-cyan-300",
    icon: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 8l9 6 9-6" /></>,
    title: "Email marketing",
    desc: "Newsletters and automated journeys from an on-brand builder, sent from your own domain with deliverability guardrails.",
    bullets: ["Welcome, offer and review flows", "Send from your own domain", "NPS and replies back into the CRM"],
  },
  {
    tint: "bg-pink-500/18 text-pink-300",
    dash: "text-pink-300",
    icon: <><path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    title: "CRM",
    desc: "Every visitor, subscriber and attendee lands in one contact base, profiled nightly, with audiences suggested from what people actually do.",
    bullets: ["Lifecycle stages and segments", "Suggested audiences from behaviour", "Profiles the agents read before they write"],
  },
  {
    tint: "bg-amber-400/18 text-amber-300",
    dash: "text-amber-300",
    icon: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    title: "Events",
    desc: "From finding the right event to the follow-up email: plan, venue scouting, microsite, tickets, QR check-in.",
    bullets: ["Agenda, speakers and sponsors pages", "Ticket tiers and discounts", "Attendees land in the CRM"],
  },
  {
    tint: "bg-emerald-500/18 text-emerald-300",
    dash: "text-emerald-300",
    icon: <><path d="M4 19l6-6 4 4 6-8" /><path d="M15 9h5v5" /></>,
    title: "Market intelligence",
    desc: "Lo Stratega watches your market and competitors daily and turns what changed into next moves, not another dashboard.",
    bullets: ["Daily brief with live web research", "Content gaps and opportunities", "Next moves ranked by impact"],
  },
];

/** One autopilot week, told by the maestri. The last column is the only one
 *  with a person in it. */
const WEEK = [
  { day: "Mon", who: "Lo Stratega", bead: "#a78bfa", what: "Scans the market, drafts the week's plan." },
  { day: "Tue", who: "Il Pittore & Lo Scrittore", bead: "#c084fc", what: "Carousel, reel and an SEO article drafted." },
  { day: "Wed", who: "Il Postino", bead: "#22d3ee", what: "Posts go out. The article goes live on your site." },
  { day: "Thu", who: "Lo Scrittore", bead: "#60a5fa", what: "Newsletter sent. Journeys follow up new leads." },
  { day: "Fri", who: "Il Sommelier", bead: "#2dd4bf", what: "Checks what moved and feeds next week." },
  { day: "You", who: "On your phone", bead: "#fbbf24", what: "Tap approve. That is the whole job." },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className={SECTION}>
      <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">The ecosystem</span>
        <h2 className={H2}>Not just the posts. The whole machine behind them.</h2>
        <p className="text-lg leading-relaxed text-white/72">
          Content is the loud part. Underneath it The Agentcy runs the website and its SEO, the email journeys, the events and
          the CRM that turn a visitor into a customer, as one system that feeds itself.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ECOSYSTEM.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05} className="flex">
            <div className={`${CARD} w-full gap-4`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${b.tint}`}>
                <Icon d={b.icon} />
              </div>
              <h3 className="font-display text-2xl font-semibold">{b.title}</h3>
              <p className={MUTED}>{b.desc}</p>
              <ul className="flex flex-col gap-2 text-sm text-white/72">
                {b.bullets.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className={b.dash}>—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-6">
        <div className="glass rounded-3xl p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <span className="eyebrow">One week on autopilot</span>
            <span className="text-[13px] text-white/55">Every week looks like this. The plan changes, the rhythm does not.</span>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {WEEK.map((w, i) => (
              <li
                key={w.day}
                className={`flex flex-col gap-2 rounded-2xl p-4 ${i === WEEK.length - 1 ? "border border-amber-300/30 bg-amber-400/10" : "glass-soft"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: w.bead, boxShadow: `0 0 8px ${w.bead}` }} aria-hidden="true" />
                  <span className="text-[12px] font-semibold tracking-[.08em] text-white/55 uppercase">{w.day}</span>
                </div>
                <strong className="text-[14px] leading-tight text-white">{w.who}</strong>
                <span className="text-[13px] leading-snug text-white/70">{w.what}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Why ─── */
const WHY = [
  ["A link, not a brief", "Paste your site. The audit, the plan and the drafts come to you."],
  ["No tool juggling", "Site, SEO, social, email, events and CRM in one workshop."],
  ["Every platform, natively", "Right spec, caption and hashtags for each channel."],
  ["Iterate in plain English", "“Punchier, shorter, warmer.” Done."],
  ["You stay in control", "Drafts first. Spend confirmed. Nothing publishes alone."],
  ["Scale without hiring", "Ten pieces or ten thousand, same team."],
];

export function Why() {
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="glass grid items-center gap-10 rounded-[32px] p-7 md:p-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Why teams switch</span>
            <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-[44px]">
              A marketing department&apos;s output. A subscription&apos;s price.
            </h2>
            <p className="text-base leading-relaxed text-white/72">
              The average agency charges €5–25K a month and takes two weeks per round. The Agentcy runs your marketing every
              day, answers in minutes, iterates in plain English and never runs out of hours.
            </p>
            <div>
              <a
                href={APP_LOGIN}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-linear-to-br from-brand-400 to-brand-600 px-5.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)] transition-transform hover:-translate-y-px"
              >
                Start free
                <Icon className="h-4.5 w-4.5" d={<path d="M5 12h14M13 6l6 6-6 6" />} />
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {WHY.map(([t, d]) => (
              <div key={t} className="glass-soft flex flex-col gap-1.5 rounded-[18px] p-4.5">
                <strong className="text-[15px]">{t}</strong>
                <span className="text-[13.5px] leading-normal text-white/72">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Testimonials ─── */
const QUOTES = [
  {
    q: "As a solo founder I couldn't afford an agency. The Agentcy gave me a full creative team without the price tag. I'm posting daily on three platforms and it costs me less than a Netflix subscription.",
    name: "Sofia Marchetti",
    role: "Head of Marketing",
    g: "from-brand-300 to-indigo-900",
  },
  {
    q: "We white-labelled The Agentcy for our clients and it's transformed our agency model. We now deliver campaigns in 48 hours that used to take three weeks.",
    name: "Luca Ferretti",
    role: "Founder",
    g: "from-cyan-300 to-cyan-950",
  },
  {
    q: "The brand voice feature is what sold me. Every piece of content actually sounds like us. Our audience can't tell the difference. Our team can finally breathe.",
    name: "Giulia Romano",
    role: "Creative Director",
    g: "from-pink-300 to-pink-950",
  },
];

export function Testimonials() {
  return (
    <section className={SECTION}>
      <div className="grid gap-4 lg:grid-cols-3">
        {QUOTES.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06} className="flex">
            <figure className="glass m-0 flex w-full flex-col justify-between gap-6 rounded-3xl p-7">
              <blockquote className="m-0 font-display text-[19px] leading-[1.45] font-medium">“{t.q}”</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className={`h-10 w-10 rounded-full bg-linear-to-br ${t.g}`} />
                <span>
                  <strong className="block text-sm">{t.name}</strong>
                  <span className="text-[13px] text-white/72">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
const FOOT_LINK = "text-sm text-white/65 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div className="glass-soft grid grid-cols-2 gap-7 rounded-[28px] p-7 md:grid-cols-4 md:p-9">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
            <span className="font-display text-base font-bold">The Agentcy</span>
          </div>
          <p className="text-[13.5px] leading-normal text-white/72">The AI-native agency. Paste your website, approve the plan, and your marketing runs on autopilot.</p>
        </div>
        {[
          {
            title: "Product",
            links: [
              ["The ecosystem", "#ecosystem"],
              ["What it makes", "#makes"],
              ["Pricing", "#pricing"],
              ["Docs & API", "/docs"],
            ],
          },
          {
            title: "Company",
            links: [
              ["Book a demo", "#demo"],
              ["Privacy", "/privacy"],
              ["Data deletion", "/data-deletion"],
              ["Cookie settings", "#cookie-settings"],
            ],
          },
          {
            title: "Get started",
            links: [
              ["Log in", APP_LOGIN],
              ["Start free", APP_LOGIN],
            ],
          },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-2.5">
            <strong className="text-[13px] tracking-[.08em] text-white/50 uppercase">{col.title}</strong>
            {col.links.map(([label, href]) =>
              href === "#cookie-settings" ? (
                <CookieSettingsLink key={label} className={FOOT_LINK} />
              ) : (
                <a key={label} href={href} className={FOOT_LINK}>
                  {label}
                </a>
              ),
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[12.5px] text-white/45">© 2026 The Agentcy. All rights reserved.</p>
    </footer>
  );
}
