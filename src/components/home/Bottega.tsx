import Image from "next/image";
import { useTranslations } from "next-intl";
import BeadDemo from "./BeadDemo";
import Reveal from "./Reveal";

/**
 * La Bottega — the seven agents told as the maestri of a Renaissance
 * workshop. Design source of truth: JARVIS/Design/agentcy-mascot/MASCOT.md
 * (the studio has the same roster in src/lib/bottega.ts). Names stay in
 * Italian in every language; role and line are `bottega.maestri.<key>`.
 */
const MAESTRI = [
  {
    key: "sarto",
    name: "Il Sarto",
    bead: "#ec4899",
    image: "/mascot/puntino-wave.webp",
  },
  {
    key: "stratega",
    name: "Lo Stratega",
    bead: "#a78bfa",
    image: "/mascot/maestro-stratega.webp",
  },
  {
    key: "pittore",
    name: "Il Pittore",
    bead: "#c084fc",
    image: "/mascot/maestro-pittore.webp",
  },
  {
    key: "tenore",
    name: "Il Tenore",
    bead: "#e879f9",
    image: "/mascot/maestro-tenore.webp",
  },
  {
    key: "scrittore",
    name: "Lo Scrittore",
    bead: "#60a5fa",
    image: "/mascot/maestro-scrittore.webp",
  },
  {
    key: "sommelier",
    name: "Il Sommelier",
    bead: "#2dd4bf",
    image: "/mascot/maestro-sommelier.webp",
  },
  {
    key: "postino",
    name: "Il Postino",
    bead: "#22d3ee",
    image: "/mascot/maestro-postino.webp",
  },
];

export default function Bottega() {
  const t = useTranslations("bottega");
  return (
    <section id="bottega" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal className="mb-10 grid items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-3.5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
        </div>
        <div className="flex flex-col gap-3 text-base leading-relaxed text-white/72">
          <p className="m-0">
            {t.rich("p1", { em: (c) => <em className="font-display not-italic text-white/90">{c}</em> })}
          </p>
          <p className="m-0">{t.rich("p2", { strong: (c) => <span className="text-white/90">{c}</span> })}</p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MAESTRI.map((m, i) => (
          <Reveal key={m.key} delay={i * 0.04} className={`flex ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <article className="glass maestro-card flex w-full flex-col gap-3 rounded-3xl p-5">
              <div className="bob relative mx-auto aspect-square w-full max-w-[200px]" style={{ "--i": i } as React.CSSProperties}>
                <Image
                  src={m.image}
                  alt={t("imageAlt", { name: m.name, role: t(`maestri.${m.key}.role`) })}
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
              <span className="-mt-2 text-[12px] font-semibold tracking-[.08em] text-white/50 uppercase">{t(`maestri.${m.key}.role`)}</span>
              <p className="m-0 text-[14.5px] leading-relaxed text-white/72">{t(`maestri.${m.key}.line`)}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.3} className="flex">
          <div className="glass-soft flex w-full flex-col justify-between gap-4 rounded-3xl p-5">
            <div className="flex flex-col gap-2">
              <span className="eyebrow">{t("beadEyebrow")}</span>
              <p className="m-0 text-[14.5px] leading-relaxed text-white/72">
                {t("beadBody")}
              </p>
            </div>
            <BeadDemo />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
