import { getTranslations } from "next-intl/server";
import type { DetailPageContent } from "@/lib/solutions";
import type { MenuKind, MenusText, MenuText } from "@/lib/menus";

const KINDS: MenuKind[] = ["solutions", "features", "events"];

/** The three mega menus' text for `locale`. */
export async function getMenus(locale: string): Promise<MenusText> {
  const t = await getTranslations({ locale, namespace: "content" });
  return Object.fromEntries(
    KINDS.map((k) => [k, { groups: t.raw(`${k}.groups`), items: t.raw(`${k}.items`) } as MenuText]),
  ) as MenusText;
}

/** The text of one catalog page, or null for an unknown slug. */
export async function getDetailPage(locale: string, kind: MenuKind, slug: string): Promise<DetailPageContent | null> {
  const t = await getTranslations({ locale, namespace: "content" });
  return t.has(`${kind}.pages.${slug}`) ? (t.raw(`${kind}.pages.${slug}`) as DetailPageContent) : null;
}
