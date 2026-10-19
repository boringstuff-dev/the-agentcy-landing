import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/metadata";
import { OG_LOCALES, type Locale } from "@/i18n/routing";
import { ACCENT_CLASSES, SOLUTION_ACCENTS, getSolutionItemBySlug, type Accent, type MegaMenuGroup, type MegaMenuItem } from "@/lib/solutions";
import { FEATURE_ACCENTS, getFeatureItemBySlug } from "@/lib/features";
import { EVENT_ACCENTS, getEventItemBySlug } from "@/lib/events";
import { getDetailPage } from "@/lib/menus.server";
import type { MenuKind } from "@/lib/menus";

/**
 * The one template behind /solutions/[slug], /features/[slug] and
 * /events/[slug]. Icons and accents come from lib/<kind>.tsx; every word
 * comes from the messages: the item's menu text and page body under
 * `content.<kind>`, the page chrome under `detail` and `detail.<kind>`.
 */
const CATALOG: Record<
  MenuKind,
  { find: (slug: string) => { item: MegaMenuItem; group: MegaMenuGroup } | null; accents: Record<string, Accent> }
> = {
  solutions: { find: getSolutionItemBySlug, accents: SOLUTION_ACCENTS },
  features: { find: getFeatureItemBySlug, accents: FEATURE_ACCENTS },
  events: { find: getEventItemBySlug, accents: EVENT_ACCENTS },
};

type Step = { emoji: string; title: string; desc: string };

async function load(kind: MenuKind, locale: string, slug: string) {
  const found = CATALOG[kind].find(slug);
  const content = await getDetailPage(locale, kind, slug);
  if (!found || !content) return null;
  const t = await getTranslations({ locale, namespace: "content" });
  return {
    ...found,
    content,
    label: t(`${kind}.items.${slug}.label`),
    groupTitle: t(`${kind}.groups.${found.group.key}`),
    accent: ACCENT_CLASSES[CATALOG[kind].accents[slug] ?? "violet"],
  };
}

export async function detailMetadata(kind: MenuKind, locale: string, slug: string): Promise<Metadata> {
  const page = await load(kind, locale, slug);
  const t = await getTranslations({ locale, namespace: "detail" });
  if (!page) return { title: t(`${kind}.fallbackTitle`) };
  const title = `${page.label} · The Agentcy`;
  return {
    title,
    description: page.content.tagline,
    alternates: alternatesFor(`/${kind}/${slug}`, locale),
    openGraph: {
      title,
      description: page.content.tagline,
      type: "website",
      locale: OG_LOCALES[locale as Locale],
    },
  };
}

export default async function DetailPage({ kind, locale, slug }: { kind: MenuKind; locale: string; slug: string }) {
  setRequestLocale(locale);
  const page = await load(kind, locale, slug);
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "detail" });
  const k = (key: string, values?: Record<string, string>) => t(`${kind}.${key}`, values);
  const { item, content, label, groupTitle, accent } = page;
  const values = { label };
  const steps = (kind === "events" ? t.raw("events.steps") : t.raw("autopilotSteps")) as Step[];

  return (
    <div className="min-h-screen bg-[#050510] text-white" style={{ cursor: "auto" }}>
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/30 border border-white/10">
              <Image src="/logo-mark.png" alt={t("logoAlt")} width={32} height={32} />
            </div>
            <span className="text-lg font-bold tracking-tight">The Agentcy</span>
          </Link>
          <div className="flex items-center gap-4 text-sm sm:gap-6">
            <Link href="/" className="text-white/60 hover:text-white transition-colors hidden md:inline">
              {t("backHome")}
            </Link>
            <LanguageSwitcher />
            <Link
              href="/#demo"
              className="hidden px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors sm:inline-flex"
            >
              {t("bookDemo")}
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${accent.glow}`} aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" aria-hidden />
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full border ${accent.border} bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-wider ${accent.text}`}>
            <span>{k("badge")}</span>
            {kind === "solutions" && <span className="text-white/80">{label}</span>}
            <span className="text-white/30">·</span>
            <span className="text-white/50">{groupTitle}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">{content.tagline}</h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">{content.intro}</p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link href="/#demo" className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
              {t("startFree")}
            </Link>
            <Link
              href="/#how"
              className="px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              {t("seeHow")}
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/40">
            <span className="text-shimmer font-semibold">{t("aiNative")}</span>
            <span className="mx-1.5">·</span>
            {k("meta1")}
            <span className="mx-1.5">·</span>
            {k("meta2")}
          </p>
        </div>
      </section>

      {/* ─── Pain points ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-white/40">{k("painEyebrow")}</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{k("painTitle", values)}</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {content.painPoints.map((pp, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
                <div className="text-2xl text-white/20 font-mono mb-3">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-white/75 leading-relaxed text-[15px]">{pp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="border-t border-white/5 relative overflow-hidden">
        <div
          className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b ${accent.glow} blur-3xl opacity-50 -z-10`}
          aria-hidden
        />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className={`text-xs font-mono uppercase tracking-wider ${accent.text}`}>{k("benefitsEyebrow")}</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{k("benefitsTitle", values)}</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {content.benefits.map((b, i) => (
              <div key={i} className={`rounded-2xl border ${accent.border} bg-gradient-to-b from-white/[0.04] to-transparent p-7`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 ${accent.text} mb-5`}>{item.icon(20)}</div>
                <h3 className="text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-white/60 leading-relaxed text-[15px]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-white/40">{t("howEyebrow")}</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{k("howTitle")}</h2>
            <p className="mt-4 text-white/60">{k("howBody", values)}</p>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {steps.map((s, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <div key={n} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-2xl mb-3">{s.emoji}</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/40">{t("step", { n })}</div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className={`text-5xl ${accent.text} font-serif leading-none mb-6`}>“</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-snug">{content.proofQuote.quote}</blockquote>
          <div className="mt-8 text-sm text-white/60">
            <div className="font-medium text-white">{content.proofQuote.author}</div>
            <div className="text-white/40">{content.proofQuote.role}</div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("ctaTitle")} <span className={accent.text}>{t("ctaAccent")}</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto">{k("ctaBody", values)}</p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link href="/#demo" className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
              {t("startFree")}
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              {t("explore")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="" width={20} height={20} />
            <span>© {new Date().getFullYear()} The Agentcy</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-white transition-colors">{t("home")}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t("privacy")}</Link>
            <Link href="/data-deletion" className="hover:text-white transition-colors">{t("dataDeletion")}</Link>
            <CookieSettingsLink className="hover:text-white transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
