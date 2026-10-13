import { HeroChatBar } from "./ChatBar";

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
          The Agentcy is an AI-native creative agency. Carousels, flyers, video, websites, events, email journeys and the CRM behind
          them. One brief in, publish-ready work out.
        </p>

        <HeroChatBar />

        <p className="m-0 text-[13px] text-white/55">
          Sign up in a minute, teach it your brand, and the agent picks up right where you left off.
        </p>
      </div>
    </section>
  );
}
