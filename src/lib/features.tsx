import type { ReactNode } from "react";
import type { Accent, MegaMenuGroup, MegaMenuItem } from "@/lib/solutions";

const svg = (paths: ReactNode) =>
  function Icon(s: number = 18) {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths}
      </svg>
    );
  };

// ─── Megamenu data ───
export const FEATURES_GROUPS: MegaMenuGroup[] = [
  {
    key: "contentCreation",
    items: [
      {
        icon: svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M16 14l1 1 2-2" /></>),
        href: "/features/ai-content-calendar",
      },
      {
        icon: svg(<path d="M5 3v4M3 5h4M19 13v4M17 15h4M11 3l2.5 5.5L19 11l-5.5 2.5L11 19l-2.5-5.5L3 11l5.5-2.5z" />),
        href: "/features/content-generator",
      },
      {
        icon: svg(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></>),
        href: "/features/threadsshot",
      },
      {
        icon: svg(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
        href: "/features/carousel-generator",
      },
      {
        icon: svg(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />),
        href: "/features/post-enhancer",
      },
    ],
  },
  {
    key: "publishingScheduling",
    items: [
      {
        icon: svg(<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8 6h8M16 16l-7-7" /></>),
        href: "/features/cross-posting",
      },
      {
        icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
        href: "/features/optimal-time",
      },
      {
        icon: svg(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M7 3v4M17 3v4M3 11h18M8 16h2M14 16h2" /></>),
        href: "/features/bulk-scheduling",
      },
      {
        icon: svg(<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />),
        href: "/features/recurring-posts",
      },
      {
        icon: svg(<><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6M12 5V2" /></>),
        href: "/features/auto-scheduling",
      },
    ],
  },
  {
    key: "aiIntelligence",
    items: [
      {
        icon: svg(<><path d="M21 12a9 9 0 1 1-3.5-7.1L21 3v5h-5" /><path d="M9 12h.01M12 12h.01M15 12h.01" /></>),
        href: "/features/ask-the-agentcy",
      },
      {
        icon: svg(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
        href: "/features/ai-insights",
      },
      {
        icon: svg(<><path d="M20 12l-7 7a2 2 0 0 1-2.8 0L3 11.7V4h7.7L20 12.5a2 2 0 0 1 0 2.8z" /><circle cx="7" cy="8" r="1.2" /></>),
        href: "/features/smart-tag",
      },
      {
        icon: svg(<path d="M3 17l6-6 4 4 8-8M14 7h7v7" />),
        href: "/features/trend-signals",
      },
      {
        icon: svg(<path d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15c0 2 1 3 3 3M17 8c2 0 3 1.5 3 3.5S19 15 17 15c0 2-1 3-3 3" />),
        href: "/features/capture-essence",
      },
    ],
  },
  {
    key: "managementCollaboration",
    items: [
      {
        icon: svg(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="2.5" /></>),
        href: "/features/media-library",
      },
      {
        icon: svg(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></>),
        href: "/features/post-templates",
      },
      {
        icon: svg(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 12l3 3 5-6" /></>),
        href: "/features/post-review",
      },
      {
        icon: svg(<><path d="M21 11.5a8 8 0 0 1-12.3 6.7L3 20l1.8-5.7A8 8 0 1 1 21 11.5z" /><path d="M9 11h.01M13 11h.01M17 11h.01" /></>),
        href: "/features/auto-replies",
      },
      {
        icon: svg(<><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></>),
        href: "/features/post-suggestions",
      },
    ],
  },
  {
    key: "creativeStudio",
    items: [
      {
        icon: svg(<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></>),
        href: "/features/video-storyboards",
      },
      {
        icon: svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /><path d="M18 3l.7 1.8L20.5 5.5l-1.8.7L18 8l-.7-1.8L15.5 5.5l1.8-.7z" /></>),
        href: "/features/synthetic-influencers",
      },
      {
        icon: svg(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M8 11h6M11 8v6" /></>),
        href: "/features/market-intelligence",
      },
      {
        icon: svg(<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M9 10l2 2 4-4" /></>),
        href: "/features/interactive-prototypes",
      },
      {
        icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>),
        href: "/features/brand-websites",
      },
    ],
  },
];

// ─── Per-slug accent ───
export const FEATURE_ACCENTS: Record<string, Accent> = {
  "ai-content-calendar": "violet",
  "content-generator": "violet",
  threadsshot: "violet",
  "carousel-generator": "violet",
  "post-enhancer": "violet",
  "cross-posting": "cyan",
  "optimal-time": "cyan",
  "bulk-scheduling": "cyan",
  "recurring-posts": "cyan",
  "auto-scheduling": "cyan",
  "ask-the-agentcy": "pink",
  "ai-insights": "pink",
  "smart-tag": "pink",
  "trend-signals": "pink",
  "capture-essence": "pink",
  "media-library": "emerald",
  "post-templates": "emerald",
  "post-review": "emerald",
  "auto-replies": "emerald",
  "post-suggestions": "emerald",
  "video-storyboards": "violet",
  "synthetic-influencers": "pink",
  "market-intelligence": "cyan",
  "interactive-prototypes": "amber",
  "brand-websites": "emerald",
};

// ─── Helpers ───
export function getFeatureItemBySlug(slug: string): { item: MegaMenuItem; group: MegaMenuGroup } | null {
  for (const group of FEATURES_GROUPS) {
    const item = group.items.find((i) => i.href === `/features/${slug}`);
    if (item) return { item, group };
  }
  return null;
}

export function getAllFeatureSlugs(): string[] {
  return FEATURES_GROUPS.flatMap((g) => g.items).map((i) => i.href.replace("/features/", ""));
}
