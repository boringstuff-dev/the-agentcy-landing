import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ACCENT_CLASSES } from "@/lib/solutions";
import {
  FEATURE_PAGES,
  getAllFeatureSlugs,
  getFeatureItemBySlug,
} from "@/lib/features";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getFeatureItemBySlug(slug);
  const content = FEATURE_PAGES[slug];
  if (!found || !content) {
    return { title: "Feature · The Agentcy" };
  }
  const title = `${found.item.label} · The Agentcy`;
  return {
    title,
    description: content.tagline,
    openGraph: {
      title,
      description: content.tagline,
      type: "website",
    },
  };
}

const STEPS = [
  { n: "01", emoji: "📋", title: "Submit a Brief", desc: "Describe what you need in plain language — campaign, post, video, ad." },
  { n: "02", emoji: "🤖", title: "Agents Get to Work", desc: "Strategy, visuals, copy, voice, video, and QA run automatically in parallel." },
  { n: "03", emoji: "✏️", title: "Review & Refine", desc: "Preview your content. Request changes in plain language. We update instantly." },
  { n: "04", emoji: "🚀", title: "Publish Everywhere", desc: "One click sends platform-optimised content to every channel simultaneously." },
];

export default async function FeaturePage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const found = getFeatureItemBySlug(slug);
  const content = FEATURE_PAGES[slug];
  if (!found || !content) notFound();

  const { item, group } = found;
  const accent = ACCENT_CLASSES[content.accent];

  return (
    <div className="min-h-screen bg-[#050510] text-white" style={{ cursor: "auto" }}>
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/30 border border-white/10">
              <Image src="/logo-mark.png" alt="The Agentcy logo" width={32} height={32} />
            </div>
            <span className="text-lg font-bold tracking-tight">The Agentcy</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-white/60 hover:text-white transition-colors hidden sm:inline">
              ← Back to home
            </Link>
            <Link
              href="/#cta"
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-b ${accent.glow}`}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" aria-hidden />
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full border ${accent.border} bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-wider ${accent.text}`}>
            <span>Feature</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">{group.title}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {content.tagline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {content.intro}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/#cta"
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Start Free — 7 Days on Us →
            </Link>
            <Link
              href="/#how-it-works"
              className="px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/40">
            <span className="text-shimmer font-semibold">The AI-Native Agency</span>
            <span className="mx-1.5">·</span>
            Free 7-day trial
            <span className="mx-1.5">·</span>
            8+ platforms supported
          </p>
        </div>
      </section>

      {/* ─── Pain points ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-white/40">
              What it replaces
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Life before {item.label}.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {content.painPoints.map((pp, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl text-white/20 font-mono mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-white/75 leading-relaxed text-[15px]">{pp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="border-t border-white/5 relative overflow-hidden">
        <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b ${accent.glow} blur-3xl opacity-50 -z-10`} aria-hidden />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className={`text-xs font-mono uppercase tracking-wider ${accent.text}`}>
              What you get
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Inside {item.label}.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {content.benefits.map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl border ${accent.border} bg-gradient-to-b from-white/[0.04] to-transparent p-7`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 ${accent.text} mb-5`}>
                  {item.icon(20)}
                </div>
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
            <div className="text-xs font-mono uppercase tracking-wider text-white/40">
              How it works
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              From brief to published in under five minutes.
            </h2>
            <p className="mt-4 text-white/60">
              {item.label} runs inside the same flow that powers every part of The Agentcy. Submit a brief, seven AI agents collaborate, and you approve before anything goes live.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="text-2xl mb-3">{s.emoji}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                  Step {s.n}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className={`text-5xl ${accent.text} font-serif leading-none mb-6`}>“</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-snug">
            {content.proofQuote.quote}
          </blockquote>
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
            Your agency. <span className={accent.text}>At 1% of the cost.</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto">
            {item.label} is one of dozens of capabilities included in every plan. Try The Agentcy free for 7 days — no credit card, no commitment.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/#cta"
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Start Free — 7 Days on Us →
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-white/15 text-white/80 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              Explore the platform
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
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/data-deletion" className="hover:text-white transition-colors">Data deletion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
