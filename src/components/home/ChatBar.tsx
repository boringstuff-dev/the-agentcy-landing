"use client";

import { useState } from "react";
import { askHref, looksLikeUrl, track } from "./links";

const SUGGESTIONS = [
  "Put my social on autopilot",
  "Site with SEO articles on my domain",
  "Welcome journey for new leads",
  "Event page with tickets",
  "Audit my marketing",
];

function Arrow() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-linear-to-br from-brand-400 to-brand-600 font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)] transition-all hover:-translate-y-px hover:shadow-[0_14px_36px_-10px_rgba(139,92,246,.9)]";

/** Holo-style opener. Anonymous on purpose: the visitor pastes their website
 *  (or types what they want) and is sent to registration with it. A website
 *  becomes the autopilot opener (see links.ts) so the first thing the studio
 *  does is read the site and draft the month. */
export function HeroChatBar() {
  const [prompt, setPrompt] = useState("");
  const isSite = looksLikeUrl(prompt);

  return (
    <div className="mx-auto mt-2 w-full max-w-[780px] lg:mx-0">
      <div className="glass glass-bar relative rounded-[28px] px-[18px] pt-[18px] pb-3.5">
        <div className="glass-ring" aria-hidden="true" />
        <label htmlFor="ask" className="sr-only">
          Paste your website or tell The Agentcy what you want
        </label>
        <textarea
          id="ask"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your website — or tell The Agentcy what you want more of: customers, bookings, sign-ups, a launch that lands…"
          className="min-h-[84px] w-full resize-none bg-transparent px-0.5 py-1 text-base leading-relaxed text-white outline-none placeholder:text-white/45 md:text-lg"
        />
        <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2 pl-1 text-[13px] text-white/60" aria-live="polite">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
            </svg>
            {isSite ? "It reads your site, builds your Brand DNA and drafts the month" : "Free account · your link or brief carries over"}
          </span>
          <a href={askHref(prompt)} onClick={() => track("ask_submit")} className={`${primaryBtn} min-h-[44px] px-5 text-[15px]`}>
            {isSite ? "Start autopilot" : "Start free"}
            <Arrow />
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setPrompt(s)}
            className="glass-soft min-h-[44px] cursor-pointer rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-white/80 transition-colors hover:border-white/22 hover:bg-white/10 hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CompactChatBar() {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="glass glass-bar relative flex w-full max-w-[680px] flex-col items-stretch gap-2.5 rounded-[22px] p-2.5 pl-4 sm:flex-row sm:items-center">
      <label htmlFor="ask2" className="sr-only">
        Paste your website or describe your brand
      </label>
      <textarea
        id="ask2"
        rows={1}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Paste your website or describe your brand…"
        className="min-h-[52px] flex-1 resize-none bg-transparent py-3 text-base text-white outline-none placeholder:text-white/45"
      />
      <a href={askHref(prompt)} onClick={() => track("ask_submit")} className={`${primaryBtn} min-h-[46px] flex-none px-5 text-[15px]`}>
        Start free
        <Arrow />
      </a>
    </div>
  );
}
