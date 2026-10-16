import Image from "next/image";
import BeadDemo from "./BeadDemo";
import Reveal from "./Reveal";

/**
 * La Bottega — the seven agents told as the maestri of a Renaissance
 * workshop. Design source of truth: JARVIS/Design/agentcy-mascot/MASCOT.md
 * (the studio has the same roster in src/lib/bottega.ts).
 */
const MAESTRI = [
  {
    key: "sarto",
    name: "Il Sarto",
    role: "Creative Director",
    bead: "#ec4899",
    image: "/mascot/puntino-wave.webp",
    line: "Reads your brief and cuts the plan to measure. That is Puntino, and he wears the tape.",
  },
  {
    key: "stratega",
    name: "Lo Stratega",
    role: "Campaign Strategist",
    bead: "#a78bfa",
    image: "/mascot/maestro-stratega.webp",
    line: "Studies the market, the competitors and the moment, then picks the angle.",
  },
  {
    key: "pittore",
    name: "Il Pittore",
    role: "Visual Producer",
    bead: "#c084fc",
    image: "/mascot/maestro-pittore.webp",
    line: "Images, carousels, flyers and storyboards, in your palette every time.",
  },
  {
    key: "tenore",
    name: "Il Tenore",
    role: "Voice Producer",
    bead: "#e879f9",
    image: "/mascot/maestro-tenore.webp",
    line: "Voiceovers, podcasts and the voice of your videos.",
  },
  {
    key: "scrittore",
    name: "Lo Scrittore",
    role: "Editor",
    bead: "#60a5fa",
    image: "/mascot/maestro-scrittore.webp",
    line: "Copy, captions, newsletters and articles, typed in your tone.",
  },
  {
    key: "sommelier",
    name: "Il Sommelier",
    role: "QA Reviewer",
    bead: "#2dd4bf",
    image: "/mascot/maestro-sommelier.webp",
    line: "Tastes every piece against your Brand DNA before it leaves the workshop.",
  },
  {
    key: "postino",
    name: "Il Postino",
    role: "Social Media Manager",
    bead: "#22d3ee",
    image: "/mascot/maestro-postino.webp",
    line: "Schedules and delivers to every channel. On a Vespa, naturally.",
  },
];

export default function Bottega() {
  return (
    <section id="bottega" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal className="mb-10 grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-3.5">
          <span className="eyebrow">La Bottega</span>
          <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
            Seven maestri. One workshop.
            <br />
            Your brief.
          </h2>
        </div>
        <div className="flex flex-col gap-3 text-base leading-relaxed text-white/72">
          <p className="m-0">
            In Renaissance Florence a <em className="font-display not-italic text-white/90">bottega</em> was a master&apos;s workshop:
            specialist artisans under one roof, making commissioned work to measure for each client. Verrocchio&apos;s bottega trained
            Leonardo.
          </p>
          <p className="m-0">
            The Agentcy runs the same way. Seven specialist agents share one workshop and your Brand DNA, and nothing leaves it
            without your approval. <span className="text-white/90">Su misura</span>: made to measure, never from a template.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAESTRI.map((m, i) => (
          <Reveal key={m.key} delay={i * 0.04} className={`flex ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <article className="glass maestro-card flex w-full flex-col gap-3 rounded-3xl p-5">
              <div className="bob relative mx-auto aspect-square w-full max-w-[200px]" style={{ "--i": i } as React.CSSProperties}>
                <Image
                  src={m.image}
                  alt={`${m.name}, the ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 60vw, 200px"
                  className="maestro-img object-contain drop-shadow-[0_18px_30px_rgba(139,92,246,.22)]"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="bead-dot h-2.5 w-2.5 rounded-full"
                  style={{ background: m.bead, color: m.bead, animationDelay: `${i * -0.35}s` }}
                />
                <h3 className="font-display text-[21px] leading-tight font-semibold">{m.name}</h3>
              </div>
              <span className="-mt-2 text-[12px] font-semibold tracking-[.08em] text-white/50 uppercase">{m.role}</span>
              <p className="m-0 text-[14.5px] leading-relaxed text-white/72">{m.line}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.3} className="flex">
          <div className="glass-soft flex w-full flex-col justify-between gap-4 rounded-3xl p-5">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">The bead</span>
              <p className="m-0 text-[14.5px] leading-relaxed text-white/72">
                Every maestro carries a Murano glass bead. In the studio it is a status light, so you know what the workshop is
                doing before you read a word.
              </p>
            </div>
            <BeadDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
