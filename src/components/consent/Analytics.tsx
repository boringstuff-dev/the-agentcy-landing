"use client";

import Script from "next/script";
import { useConsent } from "./useConsent";

/**
 * Plausible CE (self-hosted, cookie-less), loaded only after the visitor
 * opts into analytics. The shim is always present so `track()` calls made
 * before (or without) consent queue harmlessly; the script flushes the queue
 * when it loads and nothing is sent if it never does.
 */
export default function Analytics() {
  const enabled = useConsent()?.analytics === true;

  return (
    <>
      <Script id="plausible-shim" strategy="afterInteractive">
        {`window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)}`}
      </Script>
      {enabled && (
        <Script
          defer
          data-domain="the-agentcy.ai"
          src="https://plausible.the-agentcy.ai/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
