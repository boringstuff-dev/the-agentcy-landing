import type { Metadata } from "next";
import Analytics from "@/components/consent/Analytics";
import CookieBanner from "@/components/consent/CookieBanner";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "The Agentcy — Marketing on autopilot",
  description:
    "Paste your website. Seven specialist AI agents, run like a Renaissance bottega, learn your brand and then plan, make and ship your whole marketing: website and SEO, social, email journeys, events and CRM. Every day, on autopilot. You just approve.",
  openGraph: {
    title: "The Agentcy — Marketing on autopilot",
    description:
      "Paste your website. The AI-native agency plans, makes and ships your marketing across site, social, email and events. You just approve.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} ${bricolage.variable} ${mono.variable} font-sans antialiased`}>
        {children}
        {/* Cookie consent + consent-gated Plausible CE (see lib/consent.ts). */}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
