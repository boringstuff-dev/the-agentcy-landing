"use client";

/**
 * Public developer documentation.
 *
 * Two surfaces under one `/docs` route:
 *   - REST  → renders the studio's auto-generated OpenAPI 3.1 spec via
 *             Scalar's CDN standalone bundle. Spec lives at
 *             `app.the-agentcy.ai/api/v1/openapi.json` and is fetched
 *             cross-origin (the studio's openapi.json route emits
 *             `Access-Control-Allow-Origin: *`).
 *   - MCP   → hand-authored reference for the Model Context Protocol
 *             server at `app.the-agentcy.ai/api/mcp`. Mirrors the tool
 *             + resource catalog registered in the studio's MCP route.
 *
 * We use Scalar's standalone CDN bundle (loaded via next/script) rather
 * than the @scalar/api-reference-react package because the latter pulls
 * in a Vue dep chain (@floating-ui/vue → vue-demi) that Turbopack fails
 * to resolve at build time in Next 16.
 *
 * Tab state is mirrored in the URL via `?tab=mcp` (or omitted) so links
 * are shareable. Override the OpenAPI URL with `NEXT_PUBLIC_OPENAPI_URL`.
 */
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import McpReference from "./McpReference";

const DEFAULT_SPEC_URL = "https://app.the-agentcy.ai/api/v1/openapi.json";
const SCALAR_CDN = "https://cdn.jsdelivr.net/npm/@scalar/api-reference";

type Tab = "rest" | "mcp";

function DocsInner() {
  const params = useSearchParams();
  const initial: Tab = params.get("tab") === "mcp" ? "mcp" : "rest";
  const [tab, setTab] = useState<Tab>(initial);

  // The landing page mounts a custom cursor and globals.css sets
  // `body { cursor: none }`. We're a developer-reading page — show the
  // OS cursor while here, then restore on unmount so the homepage's
  // custom cursor still works after navigating back.
  useEffect(() => {
    const previous = document.body.style.cursor;
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = previous;
    };
  }, []);

  // Sync the URL without touching Next's router. router.replace() under
  // Suspense + useSearchParams was racing with our setTab and reverting
  // the click; history.replaceState is a pure browser call with no
  // re-render or effect feedback loop.
  function select(next: Tab) {
    setTab(next);
    if (typeof window === "undefined") return;
    const url = next === "rest" ? "/docs" : `/docs?tab=${next}`;
    window.history.replaceState(null, "", url);
  }

  const specUrl = process.env.NEXT_PUBLIC_OPENAPI_URL ?? DEFAULT_SPEC_URL;

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "auto" }}>
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors mr-4"
          >
            ← The Agentcy
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
            <TabButton active={tab === "rest"} onClick={() => select("rest")}>
              REST API
            </TabButton>
            <TabButton active={tab === "mcp"} onClick={() => select("mcp")}>
              MCP server
            </TabButton>
          </div>
        </div>
      </div>

      {/* Keep both panes mounted so toggling doesn't reload the Scalar
          bundle every time. The non-active pane is hidden, not unmounted. */}
      <div className={tab === "rest" ? "block" : "hidden"}>
        <ScalarReference specUrl={specUrl} />
      </div>
      <div className={tab === "mcp" ? "block" : "hidden"}>
        <McpReference />
      </div>
    </div>
  );
}

type ScalarApi = {
  createApiReference: (
    el: HTMLElement,
    config: Record<string, unknown>
  ) => { destroy?: () => void };
};

function ScalarReference({ specUrl }: { specUrl: string }) {
  // Scalar's CDN bundle exposes `window.Scalar.createApiReference` but
  // in 1.55.x it does *not* auto-mount from a config script tag. Mount
  // it ourselves once the bundle has loaded.
  const mountRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !mountRef.current) return;
    const Scalar = (window as unknown as { Scalar?: ScalarApi }).Scalar;
    if (!Scalar?.createApiReference) return;
    const instance = Scalar.createApiReference(mountRef.current, {
      url: specUrl,
      theme: "purple",
      darkMode: true,
      hideDarkModeToggle: true,
      metaData: {
        title: "the-agentcy /v1 API · Reference",
        description:
          "Public REST API for the-agentcy platform. Idempotent, cursor-paginated, with bearer auth and HMAC-signed webhooks.",
      },
    });
    return () => {
      instance?.destroy?.();
    };
  }, [scriptLoaded, specUrl]);

  return (
    <>
      <div ref={mountRef} />
      <Script
        src={SCALAR_CDN}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-brand-500/25 text-white"
          : "text-white/60 hover:text-white/90"
      }`}
    >
      {children}
    </button>
  );
}

export default function DocsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DocsInner />
    </Suspense>
  );
}
