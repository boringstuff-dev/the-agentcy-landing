"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Custom Cursor ───
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let cx = 0, cy = 0;
    let dx = 0, dy = 0;

    const move = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      dot.style.transform = `translate(${cx - 3}px, ${cy - 3}px)`;
    };

    const tick = () => {
      dx += (cx - dx) * 0.12;
      dy += (cy - dy) * 0.12;
      cursor.style.transform = `translate(${dx - 10}px, ${dy - 10}px)`;
      requestAnimationFrame(tick);
    };

    const hover = () => cursor.classList.add("hovering");
    const unhover = () => cursor.classList.remove("hovering");

    window.addEventListener("mousemove", move);
    requestAnimationFrame(tick);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.addEventListener("mouseenter", hover);
        el.addEventListener("mouseleave", unhover);
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

// ─── Noise Overlay ───
function NoiseOverlay() {
  return <div className="noise-overlay" />;
}

// ─── Floating Particles ───
function Particles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string; color: string }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${8 + Math.random() * 12}s`,
        size: `${1 + Math.random() * 3}px`,
        color: [
          "rgba(139, 92, 246, 0.4)",
          "rgba(236, 72, 153, 0.3)",
          "rgba(6, 182, 212, 0.3)",
        ][Math.floor(Math.random() * 3)],
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// ─── Glow Card with mouse tracking ───
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current?.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current?.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      className={`glow-card gradient-border ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── 3D Tilt Card ───
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Magnetic Button ───
function MagneticBtn({
  children,
  className = "",
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    if (ref.current) ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`magnetic-btn inline-block hover-target ${className}`}
    >
      {children}
    </a>
  );
}

// ─── GSAP Section with scroll-triggered reveal ───
function GsapSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".gsap-reveal");
    gsap.fromTo(
      els,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={ref} id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      {children}
    </section>
  );
}

// ─── Animated Counter ───
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const end = target;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      if (ref.current) ref.current.textContent = `${current.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Navbar ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-white/5 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 hover-target">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/30 border border-white/10">
            <Image src="/logo-mark.png" alt="The Agentcy logo" width={32} height={32} priority />
          </div>
          <span className="text-lg font-bold tracking-tight">The Agentcy</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {[
            { label: "Services", href: "#services" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Showcase", href: "#showcase" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors relative group hover-target"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <MagneticBtn
          href="#waitlist"
          className="px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-brand-500/25"
        >
          Get Early Access
        </MagneticBtn>
      </div>
    </motion.nav>
  );
}

// ─── Hero ───
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const bg = heroRef.current.querySelector(".hero-bg");
    if (bg) {
      gsap.to(bg, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 hero-bg">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40 motion-reduce:hidden"
          autoPlay muted loop playsInline preload="auto" poster="/hero-bg-poster.jpg"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/15 rounded-full blur-[128px] animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/8 rounded-full blur-[128px] animate-[float_12s_ease-in-out_infinite_4s]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <Particles count={40} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-white/70 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          Now in Early Access
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          Your Agency.
          <br />
          <span className="text-shimmer">At 1% of the Cost.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tell us what you need. Get back videos, posts, ads, and copy — ready to publish.
          No freelancers. No agencies. No waiting two weeks for a draft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticBtn
            href="#waitlist"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-brand-500/30 transition-all"
          >
            Start for Free →
          </MagneticBtn>
          <MagneticBtn
            href="#how-it-works"
            className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 font-medium text-lg"
          >
            See How It Works
          </MagneticBtn>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Services ───
const serviceGroups = [
  {
    category: "Content Production",
    gradient: "from-accent-pink to-brand-400",
    services: [
      { icon: "📊", title: "Slide Decks & Presentations", desc: "AI-generated pitch decks, sales decks, and investor presentations with custom visual backgrounds.", outputs: [".pptx with AI art", "Editable text layers", "Brand-consistent"] },
      { icon: "🎬", title: "Social Media Video", desc: "Short-form video for Reels, TikTok, and YouTube Shorts — scripted, produced, and captioned.", outputs: ["9:16, 1:1, 16:9 formats", "Captions & music", "Platform-optimized"] },
      { icon: "📱", title: "Social Media Posts", desc: "Static posts, carousels, and stories auto-formatted per platform with copy and hashtags.", outputs: ["Images + captions", "Multi-platform sizing", "Hashtag strategy"] },
      { icon: "🎯", title: "Ad Creatives", desc: "Multiple ad variations from a single brief — ready for Meta, Google, and TikTok ad platforms.", outputs: ["3-10 variations per brief", "A/B test ready", "Multi-format"] },
      { icon: "🎥", title: "Explainer Videos", desc: "1-3 min videos with AI presenters, motion graphics, and professional voiceover.", outputs: ["AI avatar optional", "Branded transitions", "Full audio mix"] },
    ],
  },
  {
    category: "Strategy & Copy",
    gradient: "from-accent-cyan to-brand-400",
    services: [
      { icon: "📅", title: "Content Strategy", desc: "Monthly content plans with themes, posting schedules, and platform mix informed by competitor analysis.", outputs: ["Content calendar", "Theme pillars", "Timing recommendations"] },
      { icon: "✍️", title: "Copywriting", desc: "Blog posts, newsletters, website copy, and email sequences with consistent brand voice.", outputs: ["Blog & newsletter", "Email sequences", "Website copy"] },
      { icon: "🔍", title: "SEO Content", desc: "Keyword research, optimized articles, meta descriptions, and landing page copy.", outputs: ["SEO-optimized articles", "Meta tags", "Internal linking"] },
    ],
  },
  {
    category: "Audio",
    gradient: "from-accent-orange to-brand-300",
    services: [
      { icon: "🎙️", title: "Podcast Production", desc: "Full podcast episodes — multi-voice, with intro/outro, music, editing, and show notes.", outputs: ["MP3/WAV master", "Show notes", "Transcript"] },
      { icon: "🔊", title: "Voiceovers", desc: "Radio spots, podcast ads, IVR recordings, and product demo narration in any voice.", outputs: ["Multiple formats", "Broadcast-ready", "Multi-language"] },
    ],
  },
  {
    category: "Research",
    gradient: "from-accent-green to-accent-cyan",
    services: [
      { icon: "📈", title: "Market Analysis", desc: "Competitor research, market sizing, and trend analysis delivered as polished reports or decks.", outputs: ["PDF reports", "Data visualizations", "Presentation decks"] },
      { icon: "🏷️", title: "Brand Audit", desc: "Comprehensive analysis of social presence, content quality, and positioning vs. competitors.", outputs: ["Audit scorecard", "Benchmarks", "Action items"] },
    ],
  },
];

function Services() {
  return (
    <GsapSection id="services">
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You&apos;d Get From an Agency.{" "}
            <span className="text-shimmer">In Minutes, Not Weeks.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Describe what you need in plain language. We handle the rest — from strategy to finished assets, ready to post.
          </p>
        </div>

        <div className="space-y-16">
          {serviceGroups.map((group) => (
            <div key={group.category}>
              <div className="gsap-reveal mb-6">
                <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${group.gradient}`}>
                  {group.category}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.services.map((service) => (
                  <TiltCard key={service.title} className="gsap-reveal">
                    <GlowCard className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.outputs.map((output) => (
                          <span key={output} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                            {output}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── How It Works ───
function HowItWorks() {
  return (
    <GsapSection id="how-it-works">
      <div className="glow-line mb-24" />
      <div className="max-w-5xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From Idea to Published{" "}
            <span className="text-shimmer">in Under 5 Minutes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            No tools to learn. No freelancers to brief. No revisions that take a week. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", icon: "📋", title: "Tell Us What You Need", desc: "Type your brief like you'd explain it to a colleague. Product launch? Weekly posts? Ad campaign? Just say it.", gradient: "from-brand-400 to-brand-600" },
            { num: "02", icon: "⚡", title: "AI Gets to Work", desc: "Strategy, visuals, copy, voiceover, video, and quality check — all produced automatically in parallel. No input needed.", gradient: "from-accent-pink to-brand-400" },
            { num: "03", icon: "🚀", title: "Approve & Go Live", desc: "Review your content, tweak anything in plain language, and hit publish. We handle formatting for every platform.", gradient: "from-accent-cyan to-accent-green" },
          ].map((step) => (
            <TiltCard key={step.num} className="gsap-reveal">
              <GlowCard className="p-8 rounded-2xl text-center bg-white/[0.03] border border-white/10">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className={`text-sm font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.gradient} mb-3`}>
                  Step {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── NEW: AI Showcase / Showreel ───
function Showcase() {
  const showcaseItems = [
    { type: "image", label: "Brand Campaign Visual", gradient: "from-brand-500/30 to-accent-pink/20", icon: "🎨", src: "/showcase-brand-campaign.jpg" },
    { type: "video", label: "Social Media Reel", gradient: "from-accent-cyan/30 to-brand-400/20", icon: "🎬", src: "/showcase-social-reel.mp4" },
    { type: "image", label: "Ad Creative Variants", gradient: "from-accent-orange/30 to-accent-pink/20", icon: "🎯", src: "/showcase-ad-variants.jpg" },
    { type: "image", label: "Investor Pitch Deck", gradient: "from-brand-300/30 to-brand-600/20", icon: "📊", src: "/showcase-pitch-deck.jpg" },
    { type: "video", label: "Explainer Video", gradient: "from-accent-green/30 to-accent-cyan/20", icon: "🎥", src: "/showcase-explainer.mp4" },
    { type: "image", label: "Product Photography", gradient: "from-accent-pink/30 to-brand-300/20", icon: "📸", src: "/showcase-product-photo.jpg" },
  ];

  return (
    <GsapSection id="showcase">
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Output.{" "}
            <span className="text-shimmer">Zero Human Production.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every asset below was created by The Agentcy from a single brief. No designers. No editors. No agency.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {showcaseItems.map((item) => (
            <TiltCard key={item.label} className="gsap-reveal">
              <div className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-white/10 aspect-[4/3] hover-target cursor-pointer`}>
                {item.type === "video" ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay muted loop playsInline preload="metadata"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-white/90">{item.label}</span>
                  </div>
                  {item.type === "video" && (
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      AI Video
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="gsap-reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 700, suffix: "+", label: "AI Models Available" },
            { value: 47, suffix: "s", label: "Avg. Generation Time" },
            { value: 4, suffix: "K", label: "Max Video Resolution" },
            { value: 99, suffix: "%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-accent-cyan">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/40 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Replace Your Stack ───
function Comparison() {
  const tools = [
    { name: "Canva / Midjourney", for: "Visual Design", emoji: "🎨" },
    { name: "ElevenLabs", for: "Voiceover", emoji: "🎙️" },
    { name: "Premiere / CapCut", for: "Video Editing", emoji: "🎬" },
    { name: "ChatGPT / Jasper", for: "Copywriting", emoji: "✍️" },
    { name: "Hootsuite / Buffer", for: "Social Publishing", emoji: "📱" },
    { name: "Your Agency", for: "Strategy & QA", emoji: "🏢" },
  ];

  return (
    <GsapSection>
      <div className="glow-line mb-24" />
      <div className="max-w-5xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            You&apos;re Already Paying{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-orange to-accent-pink">For All of This</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Six tools that don&apos;t talk to each other. A freelancer who disappears. An agency that takes two weeks.
            There&apos;s a better way.
          </p>
        </div>

        <div className="gsap-reveal">
          <GlowCard className="p-8 md:p-12 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="grid gap-4 mb-8">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">{tool.emoji}</span>
                    <div>
                      <span className="text-white/80 font-medium">{tool.name}</span>
                      <span className="text-white/30 text-sm ml-2">for {tool.for}</span>
                    </div>
                  </div>
                  <span className="text-white/20 line-through text-sm">$20-100/mo</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6 text-center">
              <p className="text-white/40 text-sm mb-2">Replace all of the above with</p>
              <p className="text-3xl font-bold text-shimmer">The Agentcy — One Platform</p>
              <p className="text-white/40 text-sm mt-2">One flat monthly plan. No per-seat fees. Cancel anytime.</p>
            </div>
          </GlowCard>
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Features ───
function Features() {
  const features = [
    { icon: "⚡", title: "No More Tool Juggling", desc: "One brief. One platform. Strategy, visuals, copy, video — everything comes out the other side, ready to publish." },
    { icon: "💰", title: "Fire Your Agency", desc: "The average creative agency charges $5–25K/month. We deliver the same output for a fraction of the price." },
    { icon: "🌐", title: "Every Platform, Natively", desc: "Instagram, TikTok, YouTube, X, LinkedIn — each piece auto-formatted to the right spec, caption, and hashtags." },
    { icon: "🔄", title: "Iterate in Plain English", desc: "Just say what you want — punchier, shorter, different tone. We\'ll redo it instantly." },
    { icon: "📈", title: "Scale Without Hiring", desc: "10 pieces of content or 10,000 — the output scales instantly. No bottlenecks, no burnout, no headcount." },
    { icon: "🏎️", title: "5 Minutes, Not 2 Weeks", desc: "Brief to finished, publish-ready content in under 5 minutes. Agencies can't compete with that." },
  ];

  return (
    <GsapSection id="features">
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Thousands of Businesses{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-accent-orange">Are Ditching Their Agency</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            The old way is slow, expensive, and exhausting. The Agentcy is how modern teams produce content.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <TiltCard key={f.title} className="gsap-reveal">
              <GlowCard className="p-8 rounded-2xl text-center bg-white/[0.03] border border-white/10 h-full">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Pricing ───
function Pricing() {
  const plans = [
    { name: "Starter", price: 499, desc: "For solopreneurs and small teams getting started", features: ["50 deliverables/month", "All service categories", "All platforms", "720p video", "Email support"], highlighted: false },
    { name: "Growth", price: 999, desc: "For growing teams scaling their output", features: ["150 deliverables/month", "All service categories", "All platforms", "1080p video", "Priority support", "Brand kit storage"], highlighted: true },
    { name: "Pro", price: 2499, desc: "For agencies and marketing teams", features: ["500 deliverables/month", "All service categories", "All platforms", "4K video", "Dedicated support", "Custom voices", "API access"], highlighted: false },
    { name: "Enterprise", price: null as number | null, desc: "For large organizations", features: ["Unlimited deliverables", "Custom integrations", "White-label platform", "SLA guarantee", "Dedicated CSM", "On-prem option"], highlighted: false },
  ];

  return (
    <GsapSection id="pricing">
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Less Than One{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-cyan">Freelancer Invoice</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A single freelancer charges $500–2,000 per project. We give you unlimited content for one flat monthly fee.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <TiltCard key={plan.name} className="gsap-reveal">
              <div
                className={`rounded-2xl p-6 flex flex-col h-full ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-brand-500/20 to-brand-900/20 border-2 border-brand-400/40 shadow-xl shadow-brand-500/10"
                    : "bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                }`}
              >
                {plan.highlighted && (
                  <span className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-2">Most Popular</span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  {plan.price ? (
                    <>
                      <span className="text-4xl font-bold">${plan.price.toLocaleString()}</span>
                      <span className="text-white/40 text-sm">/mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>
                <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-white/60 flex items-center gap-2">
                      <span className="text-accent-green text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <MagneticBtn
                  href="#waitlist"
                  className={`text-center py-3 rounded-xl font-medium text-sm transition-all w-full block ${
                    plan.highlighted
                      ? "bg-brand-500 hover:bg-brand-400 text-white"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80"
                  }`}
                >
                  {plan.price ? "Get Early Access" : "Talk to Sales"}
                </MagneticBtn>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Waitlist ───
function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <GsapSection id="waitlist">
      <div className="glow-line mb-24" />
      <div className="max-w-3xl mx-auto text-center">
        <div className="gsap-reveal">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Stop Overpaying.
            <br />
            <span className="text-shimmer">Start Creating.</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join the waitlist and get early access. Your first brief is on us.
          </p>
        </div>

        <div className="gsap-reveal">
          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-400/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold hover:shadow-xl hover:shadow-brand-500/25 transition-all hover:scale-105 whitespace-nowrap magnetic-btn hover-target"
              >
                Get Early Access
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md mx-auto"
            >
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
              <p className="text-white/50 text-sm">We&apos;ll reach out soon with your early access invitation.</p>
            </motion.div>
          )}
        </div>

        <p className="gsap-reveal text-white/30 text-sm mt-6">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </GsapSection>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 hover-target">
          <div className="w-6 h-6 rounded-md overflow-hidden bg-black/30 border border-white/10">
            <Image src="/logo-mark.png" alt="The Agentcy logo" width={24} height={24} />
          </div>
          <span className="text-sm font-bold">The Agentcy</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/30">
          {["Privacy", "Terms", "Twitter", "LinkedIn", "Discord"].map((link) => (
            <a key={link} href="#" className="hover:text-white/60 transition-colors hover-target">{link}</a>
          ))}
        </div>
        <p className="text-white/20 text-sm">© 2026 The Agentcy. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  useEffect(() => {
    let rafId: number;
    (async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="relative">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Showcase />
      <Comparison />
      <Features />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
