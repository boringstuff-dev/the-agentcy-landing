"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** The bead, live: Puntino's mark cycling through the four states the
 *  studio shows, so the legend is a demo rather than a list. Pauses on
 *  reduced motion (stays on "ready"). */
const STATES = [
  { key: "idle", c: "#ec4899", pulse: false },
  { key: "working", c: "#a78bfa", pulse: true },
  { key: "done", c: "#34d399", pulse: false },
  { key: "ask", c: "#fbbf24", pulse: true },
] as const;

export default function BeadDemo() {
  const t = useTranslations("bottega.beadStates");
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % STATES.length), 2200);
    return () => clearInterval(t);
  }, []);
  const s = STATES[i];

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 48 48" className="h-20 w-20 shrink-0" aria-hidden="true">
        <path d="M24 11V7.5" stroke="#ECEAF6" strokeWidth="2.2" strokeLinecap="round" />
        <g style={{ transformOrigin: "24px 5px" }} className={s.pulse ? "bead-demo-pulse" : undefined}>
          <circle cx="24" cy="5" r="5.5" fill={s.c} opacity="0.3" style={{ transition: "fill .5s" }} />
          <circle cx="24" cy="5" r="3.2" fill={s.c} style={{ transition: "fill .5s" }} />
        </g>
        <ellipse cx="9.5" cy="35" rx="2.6" ry="4.4" transform="rotate(20 9.5 35)" fill="#E3E0F2" />
        <ellipse cx="38.5" cy="35" rx="2.6" ry="4.4" transform="rotate(-20 38.5 35)" fill="#E3E0F2" />
        <path d="M24 10.5C15.6 10.5 10 23 10 32.5C10 41.5 16.5 46 24 46C31.5 46 38 41.5 38 32.5C38 23 32.4 10.5 24 10.5Z" fill="#ECEAF6" />
        <ellipse cx="19.6" cy="30" rx="2.1" ry="3" fill="#0B0B1A" />
        <ellipse cx="28.4" cy="30" rx="2.1" ry="3" fill="#0B0B1A" />
        <circle cx="20.3" cy="28.8" r="0.65" fill="#fff" />
        <circle cx="29.1" cy="28.8" r="0.65" fill="#fff" />
        {s.key === "done" ? (
          <path d="M20 35.5c1.4 2.2 6.6 2.2 8 0" stroke="#0B0B1A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M21.6 36c1.2 1.6 3.6 1.6 4.8 0" stroke="#0B0B1A" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        )}
      </svg>
      <div className="min-w-0" aria-live="polite">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c, boxShadow: `0 0 12px ${s.c}`, transition: "background .5s" }} />
          <strong className="text-[15px] font-semibold text-white">{t(`${s.key}.name`)}</strong>
        </div>
        <p className="m-0 mt-1 text-[13.5px] text-white/65">{t(`${s.key}.what`)}</p>
        <div className="mt-3 flex gap-1.5">
          {STATES.map((x, k) => (
            <span key={x.key} className="h-1 w-6 rounded-full transition-colors" style={{ background: k === i ? x.c : "rgba(255,255,255,.14)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
