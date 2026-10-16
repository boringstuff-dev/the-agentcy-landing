"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CONSENT_KEY, onConsentChange, readConsent, type Consent } from "@/lib/consent";

const UNHYDRATED = "__unhydrated__";

function subscribe(cb: () => void) {
  return onConsentChange(cb);
}
function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}
function getServerSnapshot() {
  return UNHYDRATED;
}

/**
 * The visitor's consent as an external store.
 *  - `undefined` before hydration (server render + first client paint),
 *  - `null` when no current-version decision is stored,
 *  - the Consent otherwise.
 */
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => (raw === UNHYDRATED ? undefined : readConsent()), [raw]);
}
