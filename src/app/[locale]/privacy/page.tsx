import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/i18n/metadata";
import PrivacyEn from "@/content/legal/PrivacyEn";
import PrivacyIt from "@/content/legal/PrivacyIt";

/** The policy text per language; a language without its own version shows
 *  the English one. */
const BODY: Record<string, () => React.ReactNode> = { en: PrivacyEn, it: PrivacyIt };

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: alternatesFor("/privacy", locale),
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const Body = BODY[locale] ?? PrivacyEn;

  return (
    <div className="min-h-screen bg-[#050510] text-white/80">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          {t("back")}
        </Link>

        <h1 className="text-4xl font-bold text-white mt-6 mb-2">{t("privacyHeading")}</h1>
        <p className="text-white/40 text-sm mb-10">{t("lastUpdated")}</p>

        <Body />
      </div>
    </div>
  );
}
