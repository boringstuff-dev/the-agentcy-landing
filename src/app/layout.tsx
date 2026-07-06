import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Agentcy — The AI-Native Agency",
  description:
    "The first AI-native creative agency. Seven AI agents collaborate to deliver videos, posts, ads, and copy — ready to publish, at 1% of agency cost.",
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
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
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
