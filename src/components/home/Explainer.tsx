"use client";

import { useRef } from "react";
import { EXPLAINER_POSTER, EXPLAINER_VIDEO, track } from "./links";
import Reveal from "./Reveal";

const STEPS = ["Brand DNA", "Ask", "Create", "Publish", "Grow"];

export default function Explainer() {
  const tracked = useRef(false);

  return (
    <section id="watch" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">The 100-second film</span>
        <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-[52px]">See The Agentcy run a brand</h2>
        <p className="text-lg leading-relaxed text-white/72">
          One brief becomes a carousel, a flyer and a video. The posts point to a site it built. Every visitor lands in the CRM, and
          the journeys take it from there.
        </p>
      </Reveal>

      <Reveal>
        <div className="glass mx-auto max-w-[1040px] rounded-[32px] p-3">
          <div className="relative aspect-video overflow-hidden rounded-[22px] bg-black">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={EXPLAINER_VIDEO}
              poster={EXPLAINER_POSTER}
              controls
              playsInline
              preload="none"
              onPlay={() => {
                if (tracked.current) return;
                tracked.current = true;
                track("explainer_play");
              }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-2.5 pt-3.5 pb-1">
            <div className="flex flex-wrap gap-2">
              {STEPS.map((s) => (
                <span key={s} className="glass-soft rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85">
                  {s}
                </span>
              ))}
            </div>
            <span className="text-[13px] text-white/60">Captions burned in · 1 min 41 s</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
