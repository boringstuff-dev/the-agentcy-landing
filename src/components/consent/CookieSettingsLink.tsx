"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/lib/consent";

/** Footer link that reopens the cookie settings panel. */
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  const t = useTranslations("cookies");
  return (
    <button type="button" onClick={openCookieSettings} className={`cursor-pointer text-left ${className}`}>
      {t("link")}
    </button>
  );
}
