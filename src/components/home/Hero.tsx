import { HeroChatBar } from "./ChatBar";
import HeroScene from "./HeroScene";

/** Splits a line into words that rise one after another on load. */
function Words({ text, from = 0, className = "" }: { text: string; from?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className={`hero-word ${className}`} style={{ "--i": from + i } as React.CSSProperties}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * The hero is one composition: the website going in on the left, La Bottega
 * running the marketing on the right. The scene has no frame and bleeds past the column toward
 * the viewport edge (the page clips overflow), so the workshop and the
 * headline share the same dark. Below lg it stacks: words, chat bar, scene.
 */
export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 md:pt-20 md:pb-14">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,10fr)_minmax(0,11fr)] lg:gap-6">
        {/* ── Left: the website goes in ── */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="hero-rise glass-soft inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85" style={rise(0)}>
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.2)]" />
            Starts free · no card · 300 credits a month
          </span>

          <h1 className="m-0 font-display text-[44px] leading-[1.02] font-semibold tracking-tight text-white md:text-[64px] lg:text-[54px] xl:text-[58px]">
            <Words text="Paste your website." />
            <br />
            <Words text="Marketing on autopilot." from={3} className="bg-linear-to-r from-brand-200 via-cyan-300 to-pink-300 bg-clip-text text-transparent" />
          </h1>

          <p className="hero-rise m-0 max-w-[560px] text-lg leading-relaxed text-white/72 md:text-[19px]" style={rise(5)}>
            It reads your site and learns your brand. Then seven specialist agents, run like a Renaissance bottega, plan, make
            and ship your whole marketing: website and SEO, social, email journeys, events and the CRM behind them.{" "}
            <span className="text-white/90">Every day. You just approve.</span>
          </p>

          <div className="hero-rise w-full" style={rise(6)}>
            <HeroChatBar />
          </div>

          <div className="hero-rise flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55 lg:justify-start" style={rise(7)}>
            <span>Sign up in a minute. The workshop opens with your Brand DNA read and the first week drafted.</span>
            <a href="#bottega" className="inline-flex items-center gap-1.5 font-semibold text-white/80 transition-colors hover:text-white">
              Meet the maestri
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: La Bottega at work ── */}
        <div className="hero-rise relative lg:-mr-[6vw] lg:scale-[1.06] lg:origin-left xl:-mr-[9vw] xl:scale-[1.1]" style={rise(3)}>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
