import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Explainer from "@/components/home/Explainer";
import Pricing from "@/components/home/Pricing";
import BookDemo from "@/components/home/BookDemo";
import Bottega from "@/components/home/Bottega";
import { Aurora, Beyond, Footer, HowItWorks, Makes, Stats, Testimonials, Why } from "@/components/home/Sections";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#1a1140_0%,#07070f_60%)]">
      <Aurora />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Stats />
        <Explainer />
        <HowItWorks />
        <Bottega />
        <Makes />
        <Beyond />
        <Why />
        <Testimonials />
        <Pricing />
        <BookDemo />
        <Footer />
      </div>
    </main>
  );
}
