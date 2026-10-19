import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/metadata";
import DataDeletionEn from "@/content/legal/DataDeletionEn";
import DataDeletionIt from "@/content/legal/DataDeletionIt";

/** The policy text per language; a language without its own version shows
 *  the English one. */
const BODY: Record<string, () => React.ReactNode> = { en: DataDeletionEn, it: DataDeletionIt };

export async function generateMetadata({ params }: PageProps<"/[locale]/data-deletion">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("deletionTitle"),
    description: t("deletionDescription"),
    alternates: alternatesFor("/data-deletion", locale),
  };
}

export default async function DataDeletionPage({ params }: PageProps<"/[locale]/data-deletion">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const Body = BODY[locale] ?? DataDeletionEn;

  return (
    <div className="min-h-screen bg-[#050510] text-white/80">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          {t("back")}
        </Link>

        <h1 className="text-4xl font-bold text-white mt-6 mb-2">{t("deletionHeading")}</h1>
        <p className="text-white/40 text-sm mb-10">{t("deletionSubtitle")}</p>

        <Body />
      </div>
    </div>
  );
}
