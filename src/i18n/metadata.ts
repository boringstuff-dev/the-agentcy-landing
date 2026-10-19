import type { Metadata } from "next";
import { getPathname } from "./navigation";
import { routing } from "./routing";

const SITE = "https://the-agentcy.ai";

/** Canonical + hreflang alternates for a locale-less path ("/features/x")
 *  rendered in `locale`: one URL per language plus x-default (the English,
 *  unprefixed one). */
export function alternatesFor(href: string, locale: string): NonNullable<Metadata["alternates"]> {
  const url = (l: string) => `${SITE}${getPathname({ href, locale: l })}`;
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url(routing.defaultLocale),
    },
  };
}
