import Image from "next/image";
import { HeroChatBar } from "./ChatBar";
import Reveal from "./Reveal";

function FloatingCards() {
  return (
    <>
      <div
        className="glass floaty absolute top-[150px] -left-2.5 hidden w-[250px] rounded-[20px] p-4 xl:block"
        style={{ "--tilt": "-6deg" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-white/80">Carousel · 6 slides</span>
          <span className="rounded-full bg-emerald-500/18 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">Ready</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-4/5 rounded-lg bg-linear-to-br from-brand-500 to-indigo-900" />
          <div className="aspect-4/5 rounded-lg bg-linear-to-br from-orange-500 to-orange-950" />
          <div className="aspect-4/5 rounded-lg bg-linear-to-br from-cyan-500 to-cyan-950" />
          <div className="aspect-4/5 rounded-lg bg-white/12" />
          <div className="aspect-4/5 rounded-lg bg-white/12" />
          <div className="aspect-4/5 rounded-lg bg-white/12" />
        </div>
      </div>

      <div
        className="glass floaty d2 absolute top-[120px] -right-5 hidden w-[270px] rounded-[20px] p-4 xl:block"
        style={{ "--tilt": "5deg" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="mb-3 text-xs font-bold text-white/80">Journey · Welcome series</div>
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex items-center gap-2.5"><span className="h-2 w-2 rounded-full bg-cyan-400" />Welcome + brand story</div>
          <div className="flex items-center gap-2.5"><span className="h-2 w-2 rounded-full bg-brand-300" />Offer · day 3</div>
          <div className="flex items-center gap-2.5"><span className="h-2 w-2 rounded-full bg-pink-400" />Ask for a review · day 10</div>
        </div>
      </div>

      <div
        className="glass floaty d3 absolute right-10 bottom-[60px] hidden w-[230px] rounded-[20px] p-4 xl:block"
        style={{ "--tilt": "-3deg" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="mb-2.5 text-xs font-bold text-white/80">Published</div>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "LinkedIn", "Brand site"].map((p) => (
            <span key={p} className="glass-soft rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-white/85">
              {p}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-20 pb-20 sm:px-6 md:pt-24 md:pb-24">
      <FloatingCards />
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-7 text-center">
        <span className="glass-soft inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.2)]" />
          Starts free · no card · 300 credits a month
        </span>

        <h1 className="m-0 font-display text-[44px] leading-[1.02] font-semibold tracking-tight text-white md:text-7xl">
          Brief it once.
          <br />
          <span className="bg-linear-to-r from-brand-200 via-cyan-300 to-pink-300 bg-clip-text text-transparent">Every channel ships.</span>
        </h1>

        <p className="m-0 max-w-[640px] text-lg leading-relaxed text-white/72 md:text-[19px]">
          The Agentcy is an AI-native creative agency run like a Renaissance bottega: seven specialist agents, one workshop, your
          brief. Carousels, flyers, video, websites, events, email journeys and the CRM behind them. Made to measure, ready to
          publish.
        </p>

        <HeroChatBar />

        <p className="m-0 text-[13px] text-white/55">
          Sign up in a minute, teach it your brand, and the agent picks up right where you left off.
        </p>
      </div>

      {/* La Bottega — the seven maestri at work. The scene is rendered on the
          page's own dark ground so it needs no alpha; the gradient at the
          foot carries the caption and hands off to the section below. */}
      <Reveal className="mx-auto mt-14 w-full max-w-[1040px] md:mt-16">
        <div className="glass rounded-[32px] p-2.5 md:p-3">
          {/* Phones get a taller crop and the caption below the picture; from md
              the caption sits on a gradient over the foot of the scene. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#050510] md:aspect-[3/2]">
            <Image
              src="/mascot/bottega-hero.webp"
              alt="La Bottega: the seven Agentcy maestri at work in a Renaissance workshop, each with a glowing bead on its head"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1040px"
              className="object-cover"
            />
            <div className="hidden md:absolute md:inset-x-0 md:bottom-0 md:flex md:flex-wrap md:items-end md:justify-between md:gap-3 md:bg-linear-to-t md:from-[#050510]/95 md:via-[#050510]/55 md:to-transparent md:px-6 md:pt-14 md:pb-5">
              <div className="flex flex-col gap-0.5">
                <span className="eyebrow">La Bottega</span>
                <span className="font-display text-lg font-semibold text-white md:text-xl">Seven maestri. One workshop. Your brief.</span>
              </div>
              <a
                href="#bottega"
                className="glass-soft inline-flex min-h-[40px] items-center rounded-full px-4 text-[13.5px] font-semibold text-white/85 transition-colors hover:text-white"
              >
                Meet the maestri
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 pt-3 pb-1.5 md:hidden">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="eyebrow">La Bottega</span>
              <span className="font-display text-[15px] leading-tight font-semibold text-white">Seven maestri. One workshop.</span>
            </div>
            <a href="#bottega" className="glass-soft inline-flex min-h-[40px] flex-none items-center rounded-full px-4 text-[13px] font-semibold text-white/85">
              Meet them
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
