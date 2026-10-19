import type { Metadata } from "next";
import DetailPage, { detailMetadata } from "@/components/DetailPage";
import { routing } from "@/i18n/routing";
import { getAllSolutionSlugs } from "@/lib/solutions";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllSolutionSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  return detailMetadata("solutions", locale, slug);
}

export default async function SolutionPage({ params }: PageProps<"/[locale]/solutions/[slug]">) {
  const { locale, slug } = await params;
  return <DetailPage kind="solutions" locale={locale} slug={slug} />;
}
