import type { Metadata } from "next";
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
  title: "The Agentcy — AI-Powered Creative Agency",
  description:
    "One platform replaces an entire creative agency. From brief to published content, powered by AI agents that collaborate like a world-class team.",
  openGraph: {
    title: "The Agentcy — AI-Powered Creative Agency",
    description:
      "From brief to published content. AI agents that replace an entire creative agency.",
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
      </body>
    </html>
  );
}
