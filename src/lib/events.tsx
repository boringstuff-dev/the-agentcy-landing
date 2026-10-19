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

// ─── Megamenu data (also drives the dynamic /events/[slug] route) ───
export const EVENTS_GROUPS: MegaMenuGroup[] = [
  {
    key: "discoverPlan",
    items: [
      {
        icon: svg(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>),
        href: "/events/event-radar",
      },
      {
        icon: svg(<><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M8 3v3M16 3v3M4 9h16M9 14l1.5 1.5L14 12" /></>),
        href: "/events/event-plan",
      },
    ],
  },
  {
    key: "runTheEvent",
    items: [
      {
        icon: svg(<><path d="M12 3l8 4-8 4-8-4 8-4z" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" /></>),
        href: "/events/production-management",
      },
      {
        icon: svg(<><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z" /><path d="M14 5v14" strokeDasharray="2 2" /></>),
        href: "/events/ticketing",
      },
    ],
  },
  {
    key: "engageAttendees",
    items: [
      {
        icon: svg(<><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M7 9l2.5 2.5L13 8" /></>),
        href: "/events/event-microsites",
      },
      {
        icon: svg(<><path d="M3 8l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></>),
        href: "/events/attendee-comms",
      },
    ],
  },
];

// ─── Per-slug accent ───
export const EVENT_ACCENTS: Record<string, Accent> = {
  "event-radar": "amber",
  "event-plan": "violet",
  "production-management": "cyan",
  ticketing: "emerald",
  "event-microsites": "pink",
  "attendee-comms": "amber",
};

// ─── Helpers ───
export function getEventItemBySlug(slug: string): { item: MegaMenuItem; group: MegaMenuGroup } | null {
  for (const group of EVENTS_GROUPS) {
    const item = group.items.find((i) => i.href === `/events/${slug}`);
    if (item) return { item, group };
  }
  return null;
}

export function getAllEventSlugs(): string[] {
  return EVENTS_GROUPS.flatMap((g) => g.items).map((i) => i.href.replace("/events/", ""));
}
