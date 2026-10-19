import type { Metadata } from "next";
import DetailPage, { detailMetadata } from "@/components/DetailPage";
import { routing } from "@/i18n/routing";
import { getAllFeatureSlugs } from "@/lib/features";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllFeatureSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/features/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  return detailMetadata("features", locale, slug);
}

export default async function FeaturePage({ params }: PageProps<"/[locale]/features/[slug]">) {
  const { locale, slug } = await params;
  return <DetailPage kind="features" locale={locale} slug={slug} />;
}
