"use client";

import { openCookieSettings } from "@/lib/consent";

/** Footer link that reopens the cookie settings panel. */
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={`cursor-pointer text-left ${className}`}>
      Cookie settings
    </button>
  );
}
