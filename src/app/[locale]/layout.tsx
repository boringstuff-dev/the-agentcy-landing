import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import Analytics from "@/components/consent/Analytics";
import CookieBanner from "@/components/consent/CookieBanner";
import { routing, OG_LOCALES } from "@/i18n/routing";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Only the docs and feature pages use the mono face; don't preload it on
// every page.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: false,
});

/** The namespaces client components read. Everything else (page copy, the
 *  feature/solution/event pages) is rendered on the server and never ships
 *  to the browser. */
const CLIENT_NAMESPACES = ["language", "nav", "chat", "explainer", "pricing", "demo", "bottega", "cookies", "docs"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: OG_LOCALES[locale],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));

  return (
    <html lang={locale} className="dark">
      <body className={`${manrope.variable} ${bricolage.variable} ${mono.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={clientMessages}>
          {children}
          {/* Cookie consent + consent-gated Plausible CE (see lib/consent.ts). */}
          <CookieBanner />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
