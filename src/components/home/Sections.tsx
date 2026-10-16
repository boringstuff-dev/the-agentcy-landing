import Image from "next/image";
import type { ReactNode } from "react";
import { APP_LOGIN } from "./links";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

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
  { value: "10+", label: "Hours saved per week" },
  { value: "70%", label: "Less production time" },
  { value: "5 min", label: "Brief to published content" },
  { value: "10×", label: "More content, same team" },
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
    title: "Teach it your brand",
    desc: "Paste your site or upload a logo. Brand DNA pulls palette, type, tone and audience into editable cards.",
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
    title: "Ask in plain English",
    desc: "Type or speak the brief. The agent plans the work, asks what it needs and shows you drafts in the chat.",
  },
  {
    n: "03",
    color: "text-pink-300",
    icon: <path d="M20 6L9 17l-5-5" />,
    title: "Review and approve",
    desc: "Edit in the studio or say “punchier, shorter, warmer”. Renders and sends wait for your approval and show their credit cost.",
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
    title: "Publish and grow",
    desc: "Posts go out on schedule, the site and event pages go live, and every visitor flows into the CRM and its journeys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className={SECTION}>
      <Reveal className="mb-9 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-[620px] flex-col gap-3.5">
          <span className="eyebrow">How it works</span>
          <h2 className={H2}>Four steps. You only do the first two.</h2>
        </div>
        <p className="max-w-[380px] text-base leading-relaxed text-white/72">
          Agents draft. You approve. Nothing renders or publishes without your say-so, and every spend shows its cost in credits first.
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
        <span className="eyebrow">What it makes</span>
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

/* ─── Beyond content ─── */
const BEYOND = [
  {
    tint: "bg-brand-500/20 text-brand-200",
    dash: "text-brand-300",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    title: "Brand websites",
    desc: "Multi-page sites drafted from your Brand DNA with a design kit, your own domain and AI-drafted articles that keep it fresh.",
    bullets: ["Drag-and-drop editor, undo and redo", "Three design proposals to pick from", "yourbrand.com or a free subdomain"],
  },
  {
    tint: "bg-cyan-500/18 text-cyan-300",
    dash: "text-cyan-300",
    icon: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    title: "Events",
    desc: "From finding the right event to the follow-up email: plan, venue scouting, microsite, tickets, QR check-in.",
    bullets: ["Agenda, speakers and sponsors pages", "Ticket tiers and discounts", "Attendees land in the CRM"],
  },
  {
    tint: "bg-pink-500/18 text-pink-300",
    dash: "text-pink-300",
    icon: <><path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    title: "CRM & email journeys",
    desc: "Contacts, segments and automated journeys with an on-brand email builder, deliverability guardrails and NPS built in.",
    bullets: ["Suggested audiences from behaviour", "Send from your own domain", "Welcome, offer and review flows"],
  },
];

export function Beyond() {
  return (
    <section id="beyond" className={SECTION}>
      <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">Beyond content</span>
        <h2 className={H2}>The posts point somewhere. It builds that too.</h2>
        <p className="text-lg leading-relaxed text-white/72">
          A brand website, an event with tickets, and the CRM and email journeys that turn a visitor into a customer.
        </p>
      </Reveal>
      <div className="grid gap-4 lg:grid-cols-3">
        {BEYOND.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.06} className="flex">
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
    </section>
  );
}

/* ─── Why ─── */
const WHY = [
  ["5 minutes, not 2 weeks", "Brief to publish-ready work before the meeting ends."],
  ["No tool juggling", "Strategy, visuals, copy, video, site and email in one place."],
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
              An agency&apos;s output. A subscription&apos;s price.
            </h2>
            <p className="text-base leading-relaxed text-white/72">
              The average creative agency charges €5–25K a month and takes two weeks per round. The Agentcy answers in minutes,
              iterates in plain English and never runs out of hours.
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
          <p className="text-[13.5px] leading-normal text-white/72">The AI-native agency. Brief in, publish-ready work out.</p>
        </div>
        {[
          {
            title: "Product",
            links: [
              ["What it makes", "#makes"],
              ["Websites & events", "#beyond"],
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
            {col.links.map(([label, href]) => (
              <a key={label} href={href} className={FOOT_LINK}>
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[12.5px] text-white/45">© 2026 The Agentcy. All rights reserved.</p>
    </footer>
  );
}
