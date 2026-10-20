import type { LocalizedMenuGroup, MegaMenuGroup } from "@/lib/solutions";

/** The catalog sections that have a mega menu and a /<kind>/[slug] page. */
export type MenuKind = "solutions" | "features" | "events";

/** One catalog's menu text in one language (messages `content.<kind>`,
 *  minus the page bodies). Plain data, so the server can hand it to the
 *  client Nav. */
export type MenuText = {
  groups: Record<string, string>;
  items: Record<string, { label: string; desc: string }>;
};

export type MenusText = Record<MenuKind, MenuText>;

export const slugOf = (href: string) => href.slice(href.lastIndexOf("/") + 1);

/** Joins a catalog's icons and routes with its text. */
export function localizeGroups(groups: MegaMenuGroup[], text: MenuText): LocalizedMenuGroup[] {
  return groups.map((g) => ({
    key: g.key,
    title: text.groups[g.key],
    items: g.items.map((i) => ({ ...i, ...text.items[slugOf(i.href)] })),
  }));
}
