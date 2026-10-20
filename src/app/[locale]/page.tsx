import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Explainer from "@/components/home/Explainer";
import Pricing from "@/components/home/Pricing";
import BookDemo from "@/components/home/BookDemo";
import Bottega from "@/components/home/Bottega";
import Channels from "@/components/home/Channels";
import { Aurora, Ecosystem, Footer, HowItWorks, Makes, Stats, Testimonials, Why } from "@/components/home/Sections";
import { alternatesFor } from "@/i18n/metadata";
import { getMenus } from "@/lib/menus.server";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor("/", locale) };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const menus = await getMenus(locale);

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#1a1140_0%,#07070f_60%)]">
      <Aurora />
      <div className="relative z-10">
        <Nav menus={menus} />
        <Hero />
        <Channels />
        <Stats />
        <Explainer />
        <HowItWorks />
        <Ecosystem />
        <Bottega />
        <Makes />
        <Why />
        <Testimonials />
        <Pricing />
        <BookDemo />
        <Footer />
      </div>
    </main>
  );
}
