import type { Metadata } from "next";
import Script from "next/script";
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
  title: "The Agentcy — The AI-Native Agency",
  description:
    "The AI-native creative agency, run like a Renaissance bottega: seven specialist agents under one roof deliver videos, posts, ads, sites and copy made to measure for your brand, ready to publish.",
  openGraph: {
    title: "The Agentcy — The AI-Native Agency",
    description:
      "AI-native by design — not a tool with AI bolted on. Brief in, publish-ready content out.",
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
        {/* B3 — Plausible CE (self-hosted, cookie-less). The shim queues
            custom events (e.g. the signup goal) fired before the script
            loads. */}
        <Script
          defer
          data-domain="the-agentcy.ai"
          src="https://plausible.the-agentcy.ai/js/script.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-shim" strategy="afterInteractive">
          {`window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)}`}
        </Script>
      </body>
    </html>
  );
}
