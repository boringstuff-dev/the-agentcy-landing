"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_NAMES, routing, type Locale } from "@/i18n/routing";

/** EN · IT pill. Real links (crawlable, work without JS) to the same page in
 *  the other language; following one also stores the choice in the
 *  NEXT_LOCALE cookie, so the next visit to / opens in it.
 *
 *  `compact` shows only the language you can switch to (for the crowded
 *  top nav); it assumes two languages. */
export default function LanguageSwitcher({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();

  if (compact) {
    const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;
    return (
      <Link
        href={pathname}
        locale={other}
        hrefLang={other}
        lang={other}
        title={LOCALE_NAMES[other]}
        aria-label={t("switchTo", { name: LOCALE_NAMES[other] })}
        className={`inline-flex min-h-[42px] items-center rounded-full px-2.5 text-[12px] font-bold tracking-[.06em] text-white/70 uppercase transition-colors hover:bg-white/8 hover:text-white ${className}`}
      >
        {other}
      </Link>
    );
  }

  return (
    <div role="group" aria-label={t("label")} className={`inline-flex items-center gap-0.5 rounded-full border border-white/12 bg-white/5 p-0.5 ${className}`}>
      {routing.locales.map((l: Locale) =>
        l === locale ? (
          <span
            key={l}
            aria-current="true"
            title={LOCALE_NAMES[l]}
            className="rounded-full bg-white/14 px-2.5 py-1.5 text-[12px] font-bold tracking-[.06em] text-white uppercase"
          >
            {l}
          </span>
        ) : (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            title={LOCALE_NAMES[l]}
            aria-label={t("switchTo", { name: LOCALE_NAMES[l] })}
            className="rounded-full px-2.5 py-1.5 text-[12px] font-bold tracking-[.06em] text-white/60 uppercase transition-colors hover:text-white"
          >
            {l}
          </Link>
        ),
      )}
    </div>
  );
}
