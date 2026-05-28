"use client";

/**
 * MCP server reference page.
 *
 * Hand-authored — the MCP server registers tools imperatively in
 * `the-agentcy-studio/src/app/api/mcp/route.ts`, so the catalog below
 * must stay in sync with that file. When tools/resources change there,
 * update this file too.
 */
import { useState } from "react";

const MCP_URL = "https://app.the-agentcy.ai/api/mcp";

export default function McpReference() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white/85 leading-relaxed">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-400 mb-3">
          Model Context Protocol
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">MCP server</h1>
        <p className="text-white/60 max-w-2xl">
          Drive the studio from Claude Desktop, Cursor, or any custom agent.
          The MCP server wraps the same /v1 platform API behind a JSON-RPC
          transport so models can call it directly as tools.
        </p>
      </header>

      <Section title="Endpoint">
        <KV k="URL" v={<code className="font-mono">{MCP_URL}</code>} />
        <KV k="Transport" v="Streamable HTTP (JSON-RPC 2.0), stateless" />
        <KV k="Method" v="POST · one tool call per request" />
        <KV k="Content-Type" v="application/json" />
        <KV
          k="Auth"
          v={
            <>
              <code className="font-mono">
                Authorization: Bearer agentcy_&lt;env&gt;_&lt;32hex&gt;
              </code>
              <span className="block text-white/50 text-sm mt-1">
                Same bearer tokens as the /v1 REST API — mint one at{" "}
                <a
                  href="https://app.the-agentcy.ai/dashboard/settings/api-keys"
                  className="text-brand-400 hover:text-brand-300"
                >
                  Studio → Settings → API keys
                </a>
                . Each key is scoped to a single brand.
              </span>
            </>
          }
        />
      </Section>

      <Section title="Quick start · Claude Desktop">
        <p className="mb-3 text-white/70">
          Add this to your <code className="font-mono">claude_desktop_config.json</code>{" "}
          (
          <span className="text-white/50">
            macOS: <code className="font-mono">~/Library/Application Support/Claude/claude_desktop_config.json</code>
          </span>
          ):
        </p>
        <CodeBlock>
{`{
  "mcpServers": {
    "the-agentcy": {
      "transport": {
        "type": "http",
        "url": "${MCP_URL}",
        "headers": {
          "Authorization": "Bearer agentcy_live_<your-key>"
        }
      }
    }
  }
}`}
        </CodeBlock>
        <p className="text-sm text-white/50 mt-3">
          Restart Claude Desktop. The &ldquo;the-agentcy&rdquo; toolset appears
          under the plug icon — ask Claude to &ldquo;list my projects&rdquo; to
          verify.
        </p>
      </Section>

      <Section title="Quick start · Cursor">
        <p className="mb-3 text-white/70">
          Add to <code className="font-mono">~/.cursor/mcp.json</code>:
        </p>
        <CodeBlock>
{`{
  "mcpServers": {
    "the-agentcy": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer agentcy_live_<your-key>"
      }
    }
  }
}`}
        </CodeBlock>
      </Section>

      <Section title="Raw request">
        <p className="mb-3 text-white/70">
          You can also POST JSON-RPC directly — useful for sanity checks or
          embedding in your own agent:
        </p>
        <CodeBlock>
{`curl -X POST ${MCP_URL} \\
  -H "Authorization: Bearer agentcy_live_<your-key>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "list_projects",
      "arguments": { }
    }
  }'`}
        </CodeBlock>
      </Section>

      <Section title="Tools" subtitle="8 tools registered. All return JSON in the result's content[0].text.">
        <ToolList tools={TOOLS} />
      </Section>

      <Section title="Resources" subtitle="Read-only resource URIs the model can fetch with resources/read.">
        <ResourceList resources={RESOURCES} />
      </Section>

      <Section title="Errors">
        <p className="mb-3 text-white/70">
          Auth failures surface as JSON-RPC errors with code{" "}
          <code className="font-mono">-32001</code> and the HTTP status from
          the auth layer (401 / 403). Tool-level failures return a normal
          result with <code className="font-mono">isError: true</code> and
          the human-readable message in <code className="font-mono">content[0].text</code>.
        </p>
      </Section>

      <Section title="Pagination">
        <p className="text-white/70">
          List tools return at most <strong>25</strong> rows plus a{" "}
          <code className="font-mono">pagination.next_cursor</code> string.
          Pass that cursor back as the <code className="font-mono">cursor</code>{" "}
          argument to fetch the next page. When there&apos;s no more data,{" "}
          <code className="font-mono">next_cursor</code> is{" "}
          <code className="font-mono">null</code>.
        </p>
      </Section>

      <footer className="mt-16 pt-8 border-t border-white/10 text-sm text-white/40">
        <p>
          MCP catalog v1.0.0 · Source:{" "}
          <code className="font-mono">src/app/api/mcp/route.ts</code> in the
          studio. Need a tool that isn&apos;t here?{" "}
          <a
            href="mailto:hello@the-agentcy.ai"
            className="text-brand-400 hover:text-brand-300"
          >
            Let us know
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

// ── Layout helpers ────────────────────────────────────────────────────

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-white/50 mb-5">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      <div>{children}</div>
    </section>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3 border-b border-white/5 last:border-b-0">
      <div className="sm:w-32 shrink-0 text-xs uppercase tracking-wider text-white/40 pt-0.5">
        {k}
      </div>
      <div className="flex-1 text-white/85 text-sm break-words">{v}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }
  return (
    <div className="relative group">
      <pre className="bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm font-mono text-white/85 overflow-x-auto">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-white/10 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

// ── Tool + resource catalog ───────────────────────────────────────────

type ToolArg = {
  name: string;
  type: string;
  required?: boolean;
  description: string;
};

type Tool = {
  name: string;
  title: string;
  description: string;
  args: ToolArg[];
};

const TOOLS: Tool[] = [
  {
    name: "list_projects",
    title: "List projects",
    description:
      "Page through the active brand's projects, sorted by created_at desc. Returns up to 25 rows + an opaque next_cursor.",
    args: [
      {
        name: "cursor",
        type: "string",
        description:
          "Cursor from a previous response's pagination.next_cursor. Omit for the first page.",
      },
    ],
  },
  {
    name: "get_project",
    title: "Get project",
    description:
      "Fetch a single project by id. Returns a tool error if the id isn't in the active brand.",
    args: [
      { name: "id", type: "uuid", required: true, description: "Project id." },
    ],
  },
  {
    name: "create_project",
    title: "Create project",
    description:
      "Create a new project (container for one piece of content + its assets) in the active brand.",
    args: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "1–200 chars.",
      },
      {
        name: "content_type",
        type: "enum",
        required: true,
        description: "One of the platform content types (post, reel, …).",
      },
      {
        name: "brief_text",
        type: "string?",
        description: "Optional creative brief, up to 4 000 chars.",
      },
      {
        name: "target_platforms",
        type: "string[]?",
        description: "e.g. [\"instagram\", \"linkedin\"]. Optional.",
      },
      {
        name: "campaign_id",
        type: "uuid?",
        description: "Parent campaign id. Must belong to the active brand.",
      },
    ],
  },
  {
    name: "list_assets",
    title: "List assets",
    description:
      "Page through the active brand's assets. Includes Library assets (project_id=null) by default.",
    args: [
      {
        name: "project_id",
        type: "uuid?",
        description: "Filter to a single project's assets.",
      },
      {
        name: "library_only",
        type: "boolean?",
        description: "Only return Library assets (project_id is null).",
      },
      { name: "cursor", type: "string", description: "Pagination cursor." },
    ],
  },
  {
    name: "get_asset",
    title: "Get asset",
    description:
      "Fetch a single asset by id. Poll this in a loop while status='processing' (≈15 s for images, 1–2 min for video) until it flips to completed or failed.",
    args: [
      { name: "id", type: "uuid", required: true, description: "Asset id." },
    ],
  },
  {
    name: "generate_asset",
    title: "Generate asset",
    description:
      "Kick off generation. Defaults to dropping the result in the brand's Library; pass project_id to parent it under a project. text is sync; image/video/carousel return a processing asset to poll. kind='video' (storyboard) requires project_id.",
    args: [
      {
        name: "kind",
        type: "enum",
        required: true,
        description: "text · image · video · carousel.",
      },
      {
        name: "prompt",
        type: "string",
        required: true,
        description:
          "1–4 000 chars. The brief / visual description for the generator.",
      },
      {
        name: "project_id",
        type: "uuid?",
        description:
          "Omit for Library. Required for kind='video'.",
      },
      {
        name: "slideCount",
        type: "int?",
        description:
          "Carousel: 2–10 slides (default 4). Video: storyboard scene count.",
      },
    ],
  },
  {
    name: "list_events",
    title: "List events",
    description:
      "Paged platform event log for the active brand. Use since (ISO timestamp) to tail the log.",
    args: [
      { name: "topic", type: "enum?", description: "Filter by topic." },
      {
        name: "entity_type",
        type: "string?",
        description: "e.g. \"asset\", \"project\".",
      },
      { name: "entity_id", type: "uuid?", description: "Filter by entity id." },
      {
        name: "since",
        type: "iso-datetime?",
        description: "Only events at or after this timestamp.",
      },
      { name: "cursor", type: "string", description: "Pagination cursor." },
    ],
  },
  {
    name: "get_brand",
    title: "Get current brand",
    description:
      "Fetch the brand the current bearer is acting for. Useful as the first call to ground subsequent tool use (company name, industry, audience, objectives).",
    args: [],
  },
];

function ToolList({ tools }: { tools: Tool[] }) {
  return (
    <div className="space-y-3">
      {tools.map((t) => (
        <ToolCard key={t.name} tool={t} />
      ))}
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/[0.04] transition-colors"
      >
        <code className="font-mono text-brand-300 text-sm pt-0.5 shrink-0">
          {tool.name}
        </code>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium">{tool.title}</div>
          <p className="text-white/55 text-xs mt-0.5 leading-relaxed">
            {tool.description}
          </p>
        </div>
        <span className="text-white/40 text-xs mt-0.5 shrink-0">
          {open ? "Hide" : tool.args.length > 0 ? `${tool.args.length} args` : "no args"}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5">
          {tool.args.length === 0 ? (
            <p className="text-xs text-white/50 mt-3">No arguments.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {tool.args.map((a) => (
                <div
                  key={a.name}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-sm"
                >
                  <div className="sm:w-40 shrink-0">
                    <code className="font-mono text-white/90">{a.name}</code>
                    {a.required && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wider text-brand-300">
                        required
                      </span>
                    )}
                    <div className="text-[11px] text-white/40 font-mono">
                      {a.type}
                    </div>
                  </div>
                  <p className="flex-1 text-white/65 text-xs leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type Resource = { uri: string; title: string; description: string };

const RESOURCES: Resource[] = [
  {
    uri: "agentcy://project/{id}",
    title: "Project",
    description: "Read a project by id from the active brand.",
  },
  {
    uri: "agentcy://asset/{id}",
    title: "Asset",
    description:
      "Read an asset by id. Includes Library assets and project-scoped assets.",
  },
  {
    uri: "agentcy://brand/current",
    title: "Current brand",
    description: "The brand context for the current session.",
  },
];

function ResourceList({ resources }: { resources: Resource[] }) {
  return (
    <div className="space-y-3">
      {resources.map((r) => (
        <div
          key={r.uri}
          className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
        >
          <code className="font-mono text-brand-300 text-sm">{r.uri}</code>
          <div className="text-white text-sm font-medium mt-1.5">
            {r.title}
          </div>
          <p className="text-white/55 text-xs mt-0.5 leading-relaxed">
            {r.description}
          </p>
        </div>
      ))}
    </div>
  );
}
