import { defineRouting } from "next-intl/routing";

/**
 * The site's languages. English is the default and keeps the bare URLs
 * (`/`, `/features/…`); every other locale lives under its own prefix
 * (`/it`, `/it/features/…`). First-time visitors on `/` are sent to the
 * language their browser asks for; the switcher's choice is remembered in
 * the NEXT_LOCALE cookie.
 *
 * Adding a language: add its code here and a messages/<code>.json (see
 * README → "Adding a language"). Missing keys fall back to English.
 */
export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Each language's name in itself, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
};

/** Open Graph locale codes. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  it: "it_IT",
};
