import Image from "next/image";
import SceneVideo from "./SceneVideo";

/**
 * La Bottega, in motion. A looping ambient render of the workshop (desktop,
 * motion allowed) over the still (phones, reduced motion, before the video
 * has a frame), with the beads' glow pulsing on top and "at work" cards
 * anchored to four of the maestri. Pure CSS motion: compositor-only
 * transforms and opacity, nothing runs on the main thread.
 *
 * Bead positions are percentages of the 16:9 frame; the still is 3:2 and
 * is centre-cropped to the same frame, so one set of coordinates serves
 * both. Re-measure if the hero render changes.
 */
const BEADS = [
  { x: 14.2, y: 34.8, c: "#60a5fa", d: 0 }, // lo Scrittore (typewriter)
  { x: 32.7, y: 23.4, c: "#c084fc", d: 0.9 }, // il Pittore
  { x: 48.2, y: 17.8, c: "#e879f9", d: 1.7 }, // il Tenore
  { x: 50.8, y: 43, c: "#ec4899", d: 0.4 }, // il Sarto (Puntino)
  { x: 67.7, y: 25.9, c: "#2dd4bf", d: 2.3 }, // il Sommelier
  { x: 76, y: 43, c: "#a78bfa", d: 1.3 }, // lo Stratega
  { x: 85.3, y: 28.6, c: "#22d3ee", d: 2.9 }, // il Postino
];

const CARDS: { pos: string; tilt: string; delay: string; who: string; what: string; pill?: string; pillTone?: string }[] = [
  {
    pos: "left-[4%] top-[8%]",
    tilt: "-3deg",
    delay: "0s",
    who: "Lo Scrittore",
    what: "Newsletter drafted · in your tone",
  },
  {
    pos: "right-[4%] top-[8%]",
    tilt: "3deg",
    delay: "-2.4s",
    who: "Il Postino",
    what: "3 posts scheduled · Instagram, LinkedIn",
    pill: "Queued",
    pillTone: "bg-cyan-500/18 text-cyan-200",
  },
  {
    pos: "left-[4%] bottom-[17%]",
    tilt: "2deg",
    delay: "-4.6s",
    who: "Il Pittore",
    what: "Carousel · 6 slides",
    pill: "Ready",
    pillTone: "bg-emerald-500/18 text-emerald-300",
  },
  {
    pos: "right-[4%] bottom-[17%]",
    tilt: "-2deg",
    delay: "-1.2s",
    who: "Il Sommelier",
    what: "Brand voice 94 / 100",
    pill: "Approved",
    pillTone: "bg-emerald-500/18 text-emerald-300",
  },
];

export default function HeroScene() {
  return (
    <div className="glass scene-parallax rounded-[32px] p-2.5 md:p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#050510] md:aspect-video">
        <Image
          src="/mascot/bottega-hero.webp"
          alt="La Bottega: the seven Agentcy maestri at work in a Renaissance workshop, each with a glowing bead on its head"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 1040px"
          className="object-cover"
        />
        {/* The loop only exists on wide screens with motion allowed; the
            <video> is hidden (and never fetched) elsewhere. Its poster is
            the loop's own first frame, so the picture never jumps when
            playback starts. 16 s ping-pong of an 8 s render, 2.4 MB. */}
        <SceneVideo
          className="scene-video absolute inset-0 h-full w-full object-cover"
          src="/mascot/bottega-loop.mp4"
          poster="/mascot/bottega-hero-poster.webp"
        />

        {/* bead glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          {BEADS.map((b) => (
            <span
              key={`${b.x}-${b.y}`}
              className="bead-glow absolute h-[9%] w-[6%] rounded-full"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
                animationDelay: `${b.d}s`,
              }}
            />
          ))}
        </div>

        {/* at-work cards (lg+) */}
        {CARDS.map((c) => (
          <div
            key={c.who}
            aria-hidden="true"
            className={`glass floaty absolute ${c.pos} hidden w-[220px] rounded-2xl px-3.5 py-3 lg:block`}
            style={{ "--tilt": c.tilt, animationDelay: c.delay } as React.CSSProperties}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-white/90">{c.who}</span>
              {c.pill && <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${c.pillTone}`}>{c.pill}</span>}
            </div>
            <div className="mt-1 text-[12px] leading-snug text-white/65">{c.what}</div>
          </div>
        ))}

        {/* caption (md+) */}
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
  );
}
