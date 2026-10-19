import type { Metadata } from "next";
import DetailPage, { detailMetadata } from "@/components/DetailPage";
import { routing } from "@/i18n/routing";
import { getAllEventSlugs } from "@/lib/events";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllEventSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/events/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  return detailMetadata("events", locale, slug);
}

export default async function EventPage({ params }: PageProps<"/[locale]/events/[slug]">) {
  const { locale, slug } = await params;
  return <DetailPage kind="events" locale={locale} slug={slug} />;
}
