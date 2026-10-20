import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
export function Stats() {
  const t = useTranslations();
  const stats = t.raw("stats") as { value: string; label: string }[];
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-7 text-center md:grid-cols-4">
          {stats.map((s) => (
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
  },
  {
    n: "03",
    color: "text-pink-300",
    icon: <path d="M20 6L9 17l-5-5" />,
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
  },
];

export function HowItWorks() {
  const t = useTranslations("how");
  const text = t.raw("steps") as { title: string; desc: string }[];
  return (
    <section id="how" className={SECTION}>
      <Reveal className="mb-9 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-[620px] flex-col gap-3.5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className={H2}>{t("title")}</h2>
        </div>
        <p className="max-w-[380px] text-base leading-relaxed text-white/72">
          {t("body")}
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
              <h3 className="font-display text-[22px] font-semibold">{text[i].title}</h3>
              <p className={MUTED}>{text[i].desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── What it makes (bento) ─── */
export function Makes() {
  const t = useTranslations("makes");
  return (
    <section id="makes" className={SECTION}>
      <Reveal className="mx-auto mb-10 flex max-w-[680px] flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className={H2}>{t("title")}</h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="flex md:col-span-2">
          <div className={`${CARD} min-h-[260px] w-full justify-between gap-5 overflow-hidden`}>
            <div className="flex max-w-[420px] flex-col gap-2.5">
              <h3 className="font-display text-2xl font-semibold">{t("social.title")}</h3>
              <p className={MUTED}>{t("social.desc")}</p>
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
            <h3 className="font-display text-[22px] font-semibold">{t("video.title")}</h3>
            <p className={MUTED}>{t("video.desc")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-pink-300" d={<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>} />
            <h3 className="font-display text-[22px] font-semibold">{t("print.title")}</h3>
            <p className={MUTED}>{t("print.desc")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-brand-300" d={<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>} />
            <h3 className="font-display text-[22px] font-semibold">{t("decks.title")}</h3>
            <p className={MUTED}>{t("decks.desc")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex">
          <div className={`${CARD} w-full`}>
            <Icon className="text-emerald-300" d={<path d="M4 6h16M4 12h10M4 18h7" />} />
            <h3 className="font-display text-[22px] font-semibold">{t("copy.title")}</h3>
            <p className={MUTED}>{t("copy.desc")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="flex md:col-span-2">
          <div className={`${CARD} w-full`}>
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row">
              <div className="flex max-w-[460px] flex-col gap-2.5">
                <h3 className="font-display text-[22px] font-semibold">{t("ads.title")}</h3>
                <p className={MUTED}>{t("ads.desc")}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {(t.raw("pills") as string[]).map((p) => (
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
  },
  {
    tint: "bg-fuchsia-500/18 text-fuchsia-300",
    dash: "text-fuchsia-300",
    icon: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 20V9" /></>,
  },
  {
    tint: "bg-cyan-500/18 text-cyan-300",
    dash: "text-cyan-300",
    icon: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 8l9 6 9-6" /></>,
  },
  {
    tint: "bg-pink-500/18 text-pink-300",
    dash: "text-pink-300",
    icon: <><path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  },
  {
    tint: "bg-amber-400/18 text-amber-300",
    dash: "text-amber-300",
    icon: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  },
  {
    tint: "bg-emerald-500/18 text-emerald-300",
    dash: "text-emerald-300",
    icon: <><path d="M4 19l6-6 4 4 6-8" /><path d="M15 9h5v5" /></>,
  },
];

/** One autopilot week, told by the maestri. The last column is the only one
 *  with a person in it. Day, who and what are `ecosystem.week` in the
 *  messages, in this order. */
const WEEK_BEADS = ["#a78bfa", "#c084fc", "#22d3ee", "#60a5fa", "#2dd4bf", "#fbbf24"];

export function Ecosystem() {
  const t = useTranslations("ecosystem");
  const blocks = t.raw("blocks") as { title: string; desc: string; bullets: string[] }[];
  const week = (t.raw("week") as { day: string; who: string; what: string }[]).map((w, i) => ({ ...w, bead: WEEK_BEADS[i] }));
  return (
    <section id="ecosystem" className={SECTION}>
      <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className={H2}>{t("title")}</h2>
        <p className="text-lg leading-relaxed text-white/72">
          {t("body")}
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ECOSYSTEM.map((b, i) => (
          <Reveal key={b.tint} delay={i * 0.05} className="flex">
            <div className={`${CARD} w-full gap-4`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${b.tint}`}>
                <Icon d={b.icon} />
              </div>
              <h3 className="font-display text-2xl font-semibold">{blocks[i].title}</h3>
              <p className={MUTED}>{blocks[i].desc}</p>
              <ul className="flex flex-col gap-2 text-sm text-white/72">
                {blocks[i].bullets.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className={b.dash}>—</span>
                    {line}
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
            <span className="eyebrow">{t("weekEyebrow")}</span>
            <span className="text-[13px] text-white/55">{t("weekNote")}</span>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {week.map((w, i) => (
              <li
                key={w.day}
                className={`flex flex-col gap-2 rounded-2xl p-4 ${i === week.length - 1 ? "border border-amber-300/30 bg-amber-400/10" : "glass-soft"}`}
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
export function Why() {
  const t = useTranslations("why");
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="glass grid items-center gap-10 rounded-[32px] p-7 md:p-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-[44px]">
              {t("title")}
            </h2>
            <p className="text-base leading-relaxed text-white/72">
              {t("body")}
            </p>
            <div>
              <a
                href={APP_LOGIN}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-linear-to-br from-brand-400 to-brand-600 px-5.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)] transition-transform hover:-translate-y-px"
              >
                {t("cta")}
                <Icon className="h-4.5 w-4.5" d={<path d="M5 12h14M13 6l6 6-6 6" />} />
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(t.raw("items") as [string, string][]).map(([title, d]) => (
              <div key={title} className="glass-soft flex flex-col gap-1.5 rounded-[18px] p-4.5">
                <strong className="text-[15px]">{title}</strong>
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
    name: "Sofia Marchetti",
    g: "from-brand-300 to-indigo-900",
  },
  {
    name: "Luca Ferretti",
    g: "from-cyan-300 to-cyan-950",
  },
  {
    name: "Giulia Romano",
    g: "from-pink-300 to-pink-950",
  },
];

export function Testimonials() {
  const t = useTranslations();
  const text = t.raw("testimonials") as { q: string; role: string }[];
  return (
    <section className={SECTION}>
      <div className="grid gap-4 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.06} className="flex">
            <figure className="glass m-0 flex w-full flex-col justify-between gap-6 rounded-3xl p-7">
              <blockquote className="m-0 font-display text-[19px] leading-[1.45] font-medium">“{text[i].q}”</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className={`h-10 w-10 rounded-full bg-linear-to-br ${q.g}`} />
                <span>
                  <strong className="block text-sm">{q.name}</strong>
                  <span className="text-[13px] text-white/72">{text[i].role}</span>
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
  const t = useTranslations("footer");
  const cols: { title: string; links: [label: string, href: string][] }[] = [
    {
      title: t("product"),
      links: [
        [t("ecosystem"), "#ecosystem"],
        [t("makes"), "#makes"],
        [t("pricing"), "#pricing"],
        [t("docs"), "/docs"],
      ],
    },
    {
      title: t("company"),
      links: [
        [t("bookDemo"), "#demo"],
        [t("privacy"), "/privacy"],
        [t("dataDeletion"), "/data-deletion"],
        ["", "#cookie-settings"],
      ],
    },
    {
      title: t("getStarted"),
      links: [
        [t("login"), APP_LOGIN],
        [t("startFree"), APP_LOGIN],
      ],
    },
  ];

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div className="glass-soft grid grid-cols-2 gap-7 rounded-[28px] p-7 md:grid-cols-4 md:p-9">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7 rounded-lg" />
            <span className="font-display text-base font-bold">The Agentcy</span>
          </div>
          <p className="text-[13.5px] leading-normal text-white/72">{t("tagline")}</p>
          <LanguageSwitcher className="self-start" />
        </div>
        {cols.map((col) => (
          <div key={col.title} className="flex flex-col gap-2.5">
            <strong className="text-[13px] tracking-[.08em] text-white/50 uppercase">{col.title}</strong>
            {col.links.map(([label, href]) =>
              href === "#cookie-settings" ? (
                <CookieSettingsLink key={href} className={FOOT_LINK} />
              ) : href.startsWith("/") ? (
                <Link key={label} href={href} className={FOOT_LINK}>
                  {label}
                </Link>
              ) : (
                <a key={label} href={href} className={FOOT_LINK}>
                  {label}
                </a>
              ),
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[12.5px] text-white/45">{t("rights")}</p>
    </footer>
  );
}
