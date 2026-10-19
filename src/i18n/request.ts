import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

/** English underneath, the requested language on top: a key that a
 *  translation has not caught up with yet shows in English, not as a
 *  missing-key placeholder. */
function merge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = base[k];
    out[k] =
      v && typeof v === "object" && !Array.isArray(v) && b && typeof b === "object" && !Array.isArray(b)
        ? merge(b as Messages, v as Messages)
        : v;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const en = (await import("../../messages/en.json")).default as Messages;
  const messages =
    locale === routing.defaultLocale
      ? en
      : merge(en, (await import(`../../messages/${locale}.json`)).default as Messages);
  return { locale, messages };
});
