import Image from "next/image";
import SceneVideo from "./SceneVideo";

/**
 * La Bottega, in motion, as the hero's right half. No frame: the loop's
 * edges are feathered into the page so the workshop sits in the same dark
 * as the headline. Over it, the beads breathe and four product cards are
 * tethered to the maestri who make them with thin dashed leader lines,
 * the way Holo tags its machine. Pure CSS motion: transforms and opacity
 * only.
 *
 * All coordinates are percentages of the 16:9 frame, measured on the
 * loop's first frame. Re-measure if the hero render changes.
 */
const BEADS = [
  { key: "scrittore", x: 14.2, y: 34.8, c: "#60a5fa", d: 0 },
  { key: "pittore", x: 32.7, y: 23.4, c: "#c084fc", d: 0.9 },
  { key: "tenore", x: 48.2, y: 17.8, c: "#e879f9", d: 1.7 },
  { key: "sarto", x: 50.8, y: 43, c: "#ec4899", d: 0.4 },
  { key: "sommelier", x: 67.7, y: 25.9, c: "#2dd4bf", d: 2.3 },
  { key: "stratega", x: 76, y: 43, c: "#a78bfa", d: 1.3 },
  { key: "postino", x: 85.3, y: 28.6, c: "#22d3ee", d: 2.9 },
];

/** A card hangs off an anchor point; the leader runs anchor → bead. */
const CARDS: {
  bead: string;
  ax: number;
  ay: number;
  side: "above" | "below";
  tilt: string;
  delay: string;
  title: string;
  line: string;
  pill?: string;
  pillTone?: string;
}[] = [
  {
    bead: "pittore",
    ax: 20,
    ay: 15,
    side: "above",
    tilt: "-2deg",
    delay: "0s",
    title: "Carousel",
    line: "Il Pittore · 6 slides, your palette",
    pill: "Ready",
    pillTone: "bg-emerald-500/18 text-emerald-300",
  },
  {
    bead: "postino",
    ax: 68,
    ay: 13,
    side: "above",
    tilt: "2deg",
    delay: "-2.4s",
    title: "Social posts",
    line: "Il Postino · 3 scheduled this week",
    pill: "Queued",
    pillTone: "bg-cyan-500/18 text-cyan-200",
  },
  {
    bead: "scrittore",
    ax: 16,
    ay: 82,
    side: "below",
    tilt: "2deg",
    delay: "-4.6s",
    title: "SEO article",
    line: "Lo Scrittore · live on your site",
    pill: "Published",
    pillTone: "bg-emerald-500/18 text-emerald-300",
  },
  {
    bead: "stratega",
    ax: 68,
    ay: 84,
    side: "below",
    tilt: "-2deg",
    delay: "-1.2s",
    title: "This week's plan",
    line: "Lo Stratega · 3 moves, 1 tap each",
    pill: "Approve",
    pillTone: "bg-amber-400/20 text-amber-200",
  },
];

const beadOf = (key: string) => BEADS.find((b) => b.key === key)!;

export default function HeroScene() {
  return (
    <div className="relative aspect-video w-full">
      {/* Only the picture is feathered; cards and leaders stay crisp. */}
      <div className="scene-bleed absolute inset-0">
        <Image
          src="/mascot/bottega-hero-poster.webp"
          alt="La Bottega: the seven Agentcy maestri at work in a Renaissance workshop, each with a glowing bead on its head"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        <SceneVideo className="scene-video absolute inset-0 h-full w-full object-cover" src="/mascot/bottega-loop.mp4" poster="/mascot/bottega-hero-poster.webp" />
      </div>

      {/* bead glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {BEADS.map((b) => (
          <span
            key={b.key}
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

      {/* leader lines (lg+) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 56.25"
        preserveAspectRatio="none"
      >
        {CARDS.map((c) => {
          const b = beadOf(c.bead);
          const ay = (c.ay * 56.25) / 100;
          const by = (b.y * 56.25) / 100;
          return (
            <g key={c.bead} className="leader" style={{ animationDelay: c.delay }}>
              <line x1={c.ax} y1={ay} x2={b.x} y2={by} stroke="rgba(255,255,255,.38)" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
              <circle cx={b.x} cy={by} r="0.45" fill="#fff" opacity="0.9" />
            </g>
          );
        })}
      </svg>

      {/* product cards (lg+) */}
      {CARDS.map((c) => (
        <div
          key={c.title}
          aria-hidden="true"
          className="absolute hidden w-[196px] lg:block"
          style={{
            left: `${c.ax}%`,
            top: `${c.ay}%`,
            transform: c.side === "above" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
          }}
        >
          <div className="glass floaty rounded-2xl px-3.5 py-3" style={{ "--tilt": c.tilt, animationDelay: c.delay } as React.CSSProperties}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-bold text-white">{c.title}</span>
              {c.pill && <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${c.pillTone}`}>{c.pill}</span>}
            </div>
            <div className="mt-1 text-[12px] leading-snug text-white/65">{c.line}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
