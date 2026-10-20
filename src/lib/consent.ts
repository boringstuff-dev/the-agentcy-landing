/**
 * Cookie / tracking consent for the marketing site.
 *
 * The decision is stored client-side only (localStorage) — the site has no
 * session, so there is nothing server-side to tie it to. Categories:
 *
 *  - necessary  : always on (the consent record itself, the `?ask=` hand-off).
 *  - analytics  : Plausible CE (self-hosted, cookie-less). Loaded only after
 *                 opt-in so the choice is meaningful.
 *  - marketing  : reserved for ad pixels (Meta, LinkedIn). Nothing fires
 *                 today; the toggle exists so adding a pixel later does not
 *                 need a new consent round.
 *
 * Bump CONSENT_VERSION whenever the categories or what they cover change —
 * stored decisions from an older version are discarded and the banner shows
 * again.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = "agentcy_consent";
export const CONSENT_EVENT = "agentcy:consent";

export type ConsentCategory = "analytics" | "marketing";

export type Consent = {
  version: number;
  /** ISO timestamp of the decision. */
  at: string;
  analytics: boolean;
  marketing: boolean;
};

/** The optional categories, in display order. Their titles and
 *  descriptions are `cookies.categories.<key>` in the messages. */
export const CATEGORIES: ConsentCategory[] = ["analytics", "marketing"];

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** The stored decision, or null when none exists or it predates CONSENT_VERSION. */
export function readConsent(): Consent | null {
  if (!hasStorage()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      at: typeof parsed.at === "string" ? parsed.at : new Date(0).toISOString(),
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function writeConsent(choice: Pick<Consent, "analytics" | "marketing">): Consent {
  const consent: Consent = {
    version: CONSENT_VERSION,
    at: new Date().toISOString(),
    analytics: choice.analytics,
    marketing: choice.marketing,
  };
  if (hasStorage()) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      /* private mode / blocked storage: the choice lives for this page view only */
    }
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
  }
  return consent;
}

/** Subscribe to consent changes (same tab via CONSENT_EVENT, other tabs via `storage`). */
export function onConsentChange(cb: (c: Consent | null) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onEvent = (e: Event) => cb((e as CustomEvent<Consent>).detail ?? readConsent());
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) cb(readConsent());
  };
  window.addEventListener(CONSENT_EVENT, onEvent);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onEvent);
    window.removeEventListener("storage", onStorage);
  };
}

/** Event a footer link fires to reopen the settings panel. */
export const OPEN_SETTINGS_EVENT = "agentcy:consent-open";

export function openCookieSettings() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
