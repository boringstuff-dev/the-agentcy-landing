"use client";

/**
 * Public API documentation.
 *
 * Renders the studio's auto-generated OpenAPI 3.1 spec via Scalar's
 * React reference component. The spec lives at
 * `app.the-agentcy.ai/api/v1/openapi.json` and is fetched cross-origin
 * (the studio's openapi.json route emits `Access-Control-Allow-Origin: *`).
 *
 * Override the spec URL with `NEXT_PUBLIC_OPENAPI_URL` at build time.
 * Default is the production studio.
 */
import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

const DEFAULT_SPEC_URL = "https://app.the-agentcy.ai/api/v1/openapi.json";

export default function DocsPage() {
  const url = process.env.NEXT_PUBLIC_OPENAPI_URL ?? DEFAULT_SPEC_URL;

  return (
    <div className="min-h-screen bg-black">
      <ApiReferenceReact
        configuration={{
          url,
          theme: "purple",
          darkMode: true,
          hideDarkModeToggle: true,
          hideDownloadButton: false,
          metaData: {
            title: "the-agentcy /v1 API · Reference",
            description:
              "Public REST API for the-agentcy platform. Idempotent, cursor-paginated, with bearer auth and HMAC-signed webhooks.",
          },
        }}
      />
    </div>
  );
}
