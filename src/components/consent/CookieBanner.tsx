"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useConsent } from "./useConsent";
import Link from "next/link";
import {
  CATEGORIES,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type Consent,
  type ConsentCategory,
} from "@/lib/consent";

const BTN =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-4.5 text-[14px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70";
const BTN_PRIMARY = `${BTN} bg-white text-[#0c0b1a] hover:bg-brand-50`;
const BTN_GHOST = `${BTN} border border-white/14 bg-white/6 text-white hover:bg-white/11`;
const BTN_LINK =
  "cursor-pointer text-[14px] font-semibold text-white/70 underline-offset-3 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand-300/70";

/**
 * Cookie consent banner + settings panel. Renders nothing until mounted
 * (the decision lives in localStorage, so the server cannot know it), then
 * shows the banner when no current-version decision exists. Footer links
 * reopen it via OPEN_SETTINGS_EVENT.
 */
export default function CookieBanner() {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [choice, setChoice] = useState<Record<ConsentCategory, boolean>>({
    analytics: false,
    marketing: false,
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Nothing until hydrated; the banner while no decision exists; the
  // settings panel whenever it was explicitly opened.
  const view = settingsOpen ? "settings" : consent === null ? "banner" : "closed";

  const openSettings = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    const existing = readConsent();
    if (existing) setChoice({ analytics: existing.analytics, marketing: existing.marketing });
    setSettingsOpen(true);
  }, []);

  // "Cookie settings" links anywhere on the page reopen the panel.
  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  // Settings view: move focus in, close on Escape, hand focus back on close.
  useEffect(() => {
    if (view !== "settings") return;
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus?.();
    };
  }, [view]);

  const decide = useCallback((c: Pick<Consent, "analytics" | "marketing">) => {
    writeConsent(c);
    setSettingsOpen(false);
  }, []);

  if (view === "closed") return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-70 flex justify-center px-4 pb-4 sm:justify-start sm:px-6 sm:pb-6"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        className={`glass-solid glass-keep pointer-events-auto w-full rounded-[26px] p-5 text-white shadow-2xl motion-safe:animate-[consent-in_.45s_cubic-bezier(.2,.8,.2,1)] sm:p-6 ${
          view === "settings" ? "max-w-md" : "max-w-[30rem]"
        }`}
      >
        {view === "banner" ? (
          <>
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-brand-500/20 text-brand-200"
              >
                <CookieIcon />
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 id="cookie-title" className="font-display text-[17px] font-semibold leading-tight">
                  A word about cookies
                </h2>
                <p id="cookie-desc" className="text-[14px] leading-relaxed text-white/72">
                  We use privacy-friendly analytics to see which pages help, and nothing else unless you
                  say so. You can change your mind any time from the footer.{" "}
                  <Link href="/privacy" className="text-brand-200 underline-offset-3 hover:underline">
                    Privacy policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className={BTN_PRIMARY}
                onClick={() => decide({ analytics: true, marketing: true })}
              >
                Accept all
              </button>
              <button
                type="button"
                className={BTN_GHOST}
                onClick={() => decide({ analytics: false, marketing: false })}
              >
                Only necessary
              </button>
              <button
                type="button"
                className={`${BTN_LINK} ml-auto`}
                onClick={openSettings}
              >
                Settings
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h2 id="cookie-title" className="font-display text-[17px] font-semibold leading-tight">
                  Cookie settings
                </h2>
                <p id="cookie-desc" className="text-[13.5px] leading-relaxed text-white/65">
                  Choose what the site may use. Your choice is kept on this device only.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70"
                onClick={() => setSettingsOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <ul className="mt-4 flex flex-col divide-y divide-white/8">
              <CategoryRow
                title="Necessary"
                desc="Remembers this choice and carries your brief into the app when you sign up. Always on."
                checked
                locked
              />
              {CATEGORIES.map((c, i) => (
                <CategoryRow
                  key={c.key}
                  title={c.title}
                  desc={c.desc}
                  checked={choice[c.key]}
                  autoFocus={i === 0}
                  onChange={(v) => setChoice((prev) => ({ ...prev, [c.key]: v }))}
                />
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button type="button" className={BTN_PRIMARY} onClick={() => decide(choice)}>
                Save choices
              </button>
              <button
                type="button"
                className={BTN_GHOST}
                onClick={() => decide({ analytics: true, marketing: true })}
              >
                Accept all
              </button>
              <Link href="/privacy" className={`${BTN_LINK} ml-auto`}>
                Privacy policy
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  desc,
  checked,
  locked = false,
  autoFocus = false,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  locked?: boolean;
  autoFocus?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const id = `consent-${title.toLowerCase()}`;
  return (
    <li className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-[14.5px] font-semibold">
          {title}
          {locked && <span className="ml-2 text-[11px] font-bold tracking-[.08em] text-white/45 uppercase">always on</span>}
        </label>
        <p className="text-[13px] leading-snug text-white/60">{desc}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={locked}
        data-autofocus={autoFocus || undefined}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-6.5 w-11 flex-none rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0b1a] ${
          checked ? "bg-brand-500" : "bg-white/15"
        } ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 h-5.5 w-5.5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[18px]" : ""
          }`}
        />
      </button>
    </li>
  );
}

function CookieIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.3A9 9 0 1 1 11.7 3a3.5 3.5 0 0 0 4.3 4.3 3.5 3.5 0 0 0 5 5Z" />
      <circle cx="8.5" cy="10.5" r=".9" fill="currentColor" />
      <circle cx="12" cy="15.5" r=".9" fill="currentColor" />
      <circle cx="16" cy="13" r=".9" fill="currentColor" />
      <circle cx="9.5" cy="16" r=".9" fill="currentColor" />
    </svg>
  );
}
