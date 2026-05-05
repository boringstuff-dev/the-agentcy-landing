"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOLUTIONS_GROUPS, type MegaMenuGroup } from "@/lib/solutions";
import { FEATURES_GROUPS } from "@/lib/features";

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


const COLUMN_PRESETS: Record<3 | 4, { gridClass: string; widthClass: string }> = {
  3: { gridClass: "grid-cols-3", widthClass: "w-[860px]" },
  4: { gridClass: "grid-cols-4", widthClass: "w-[1100px]" },
};

function MegaMenu({ label, groups, columns }: { label: string; groups: MegaMenuGroup[]; columns: 3 | 4 }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const { gridClass, widthClass } = COLUMN_PRESETS[columns];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        className="flex items-center gap-1 hover:text-white transition-colors relative group hover-target"
        aria-expanded={open}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 transition-all duration-300 group-hover:w-full" />
      </button>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -8, pointerEvents: "none" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed left-1/2 -translate-x-1/2 top-[64px] pt-2"
      >
        <div className={`${widthClass} max-w-[calc(100vw-2rem)] rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 p-6 grid ${gridClass} gap-4`}>
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <div className="text-xs font-mono uppercase tracking-wider text-brand-400 px-3 py-2">
                {group.title}
              </div>
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors hover-target"
                >
                  <span className="mt-0.5 text-brand-400 group-hover:text-brand-300 transition-colors">
                    {item.icon(18)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-white">{item.label}</span>
                    <span className="text-xs text-white/50 leading-snug">{item.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
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
          <MegaMenu label="Solutions" groups={SOLUTIONS_GROUPS} columns={3} />
          {[
            { label: "How it Works", href: "#how-it-works" },
            { label: "Showcase", href: "#showcase" },
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
          <MegaMenu label="Features" groups={FEATURES_GROUPS} columns={4} />
          <a
            href="#pricing"
            className="hover:text-white transition-colors relative group hover-target"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/docs"
            className="hover:text-white transition-colors relative group hover-target"
          >
            API Docs
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 transition-all duration-300 group-hover:w-full" />
          </a>
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
          <span className="text-shimmer font-semibold">The AI-Native Agency</span>
          <span className="text-white/40">·</span>
          <span>Free 7-day trial</span>
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
          The first <span className="text-shimmer font-semibold">AI-native creative agency</span>. Tell us what you need — videos, posts, ads, copy — and get it back ready to publish.
          No freelancers. No retainers. No two-week drafts. Try free for 7 days.
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
            Start Free — 7 Days on Us →
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
            How It Works.{" "}
            <span className="text-shimmer">What You Get.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Submit a brief. Seven AI agents collaborate, produce, and publish — no tools to learn, no freelancers to manage.
          </p>
        </div>

        {/* Process steps */}
        <div className="gsap-reveal grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { num: "01", icon: "📋", title: "Submit a Brief", desc: "Describe what you need in plain language — campaign, post, video, ad." },
            { num: "02", icon: "🤖", title: "Agents Get to Work", desc: "Strategy, visuals, copy, voice, video, and QA run automatically in parallel." },
            { num: "03", icon: "✏️", title: "Review & Refine", desc: "Preview your content. Request changes in plain language. We update instantly." },
            { num: "04", icon: "🚀", title: "Publish Everywhere", desc: "One click sends platform-optimised content to every channel simultaneously." },
          ].map((step) => (
            <div key={step.num} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-xs font-mono text-brand-400 mb-2">Step {step.num}</div>
              <h3 className="font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Key features strip */}
        <div className="gsap-reveal grid md:grid-cols-3 gap-4 mb-20">
          {[
            { icon: "⚡", title: "Under 5 Minutes", desc: "From brief to finished, publish-ready content." },
            { icon: "🌐", title: "8+ Platforms", desc: "Instagram, TikTok, YouTube, X, LinkedIn, Meta Ads and more." },
            { icon: "🧠", title: "Brand Voice AI", desc: "Every output sounds like you — not like generic AI." },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <div className="font-semibold text-sm mb-1">{f.title}</div>
                <div className="text-white/40 text-xs">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="gsap-reveal text-center mb-10">
          <h3 className="text-2xl font-bold text-white/70">Everything included in every plan:</h3>
        </div>

        {/* Feature showcase with AI-generated images */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              img: "/feature-calendar.png",
              icon: "📅",
              title: "Publishing Calendar & Scheduled Publishing",
              desc: "Plan, schedule, and publish content across all platforms from a single calendar. Color-coded campaigns, drag-and-drop scheduling, and optimal timing suggestions.",
              tags: ["Monthly & weekly views", "Multi-platform", "Auto-scheduling"],
              gradient: "from-brand-500/20 to-brand-700/10",
            },
            {
              img: "/feature-analytics.png",
              icon: "📊",
              title: "Brand & Market Analysis",
              desc: "AI-powered competitive intelligence. Understand your market positioning, track competitors, and get actionable insights delivered as ready-to-use reports.",
              tags: ["Competitor tracking", "Market sizing", "AI insights"],
              gradient: "from-accent-cyan/20 to-brand-500/10",
            },
            {
              img: "/feature-media.png",
              icon: "🎨",
              title: "AI Image & Video Production",
              desc: "Generate professional visuals, videos, voiceovers, and ad creatives from a brief. Full pipeline from concept to publish-ready asset — no design tools needed.",
              tags: ["Images & video", "Voiceover", "Ad creatives"],
              gradient: "from-accent-pink/20 to-accent-orange/10",
            },
            {
              img: "/feature-kpis.png",
              icon: "📈",
              title: "KPIs & Strategy Monitoring",
              desc: "Track campaign performance in real-time. Engagement, reach, conversions, and ROI — all in one dashboard. Know what\u2019s working before your agency does.",
              tags: ["Real-time metrics", "Campaign health", "ROI tracking"],
              gradient: "from-accent-green/20 to-accent-cyan/10",
            },
          ].map((f) => (
            <TiltCard key={f.title} className="gsap-reveal">
              <GlowCard className={`h-full rounded-2xl bg-gradient-to-br ${f.gradient} border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}>
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{f.icon}</span>
                    <h4 className="font-bold text-lg">{f.title}</h4>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/55">{tag}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </TiltCard>
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


// ─── Studio Carousel ───
function StudioCarousel() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      platform: "Instagram Reel",
      icon: "📱",
      gradient: "from-pink-500/20 to-purple-600/20",
      accent: "from-pink-500 to-purple-500",
      content: (
        <div className="flex gap-3 w-full">
          {/* Phone frame */}
          <div className="flex-1 rounded-2xl bg-black border-2 border-white/10 overflow-hidden relative" style={{maxHeight: 280}}>
            {/* IG top bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-black">
              <span className="text-[10px] text-white/60 font-semibold">Reels</span>
              <span className="text-white text-sm">📷</span>
            </div>
            {/* Content image */}
            <div className="relative w-full" style={{height: 200}}>
              <img src="/mock-ig-content.png" alt="Instagram Reel" className="w-full h-full object-cover" />
              {/* IG overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 border border-white" />
                  <span className="text-white text-[10px] font-semibold">@theagentcy</span>
                  <span className="text-white/60 text-[8px] border border-white/40 rounded px-1">Follow</span>
                </div>
                <p className="text-white text-[9px] leading-tight">AI-generated campaign content ✨ #AIMarketing #ContentCreation</p>
              </div>
              {/* Right action bar */}
              <div className="absolute right-2 bottom-4 flex flex-col items-center gap-3 text-white">
                <div className="flex flex-col items-center"><span className="text-lg">❤️</span><span className="text-[8px]">4.2K</span></div>
                <div className="flex flex-col items-center"><span className="text-lg">💬</span><span className="text-[8px]">318</span></div>
                <div className="flex flex-col items-center"><span className="text-lg">↗️</span><span className="text-[8px]">891</span></div>
              </div>
            </div>
            {/* IG bottom bar */}
            <div className="flex justify-around py-2 bg-black border-t border-white/5 text-white/40 text-sm">
              <span>🏠</span><span>🔍</span><span>➕</span><span>🎬</span><span>👤</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      platform: "TikTok Video",
      icon: "🎵",
      gradient: "from-gray-900/60 to-red-500/10",
      accent: "from-red-400 to-pink-500",
      content: (
        <div className="flex gap-2 w-full">
          <div className="flex-1 rounded-2xl bg-black border-2 border-white/10 overflow-hidden relative" style={{maxHeight: 280}}>
            {/* TikTok top */}
            <div className="flex items-center justify-center py-2 bg-black gap-4">
              <span className="text-[10px] text-white/40">Following</span>
              <span className="text-[10px] text-white font-bold border-b border-white pb-0.5">For You</span>
              <span className="text-[10px] text-white/40">LIVE</span>
            </div>
            <div className="relative" style={{height: 210}}>
              <img src="/mock-tt-content.png" alt="TikTok" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Bottom info */}
              <div className="absolute bottom-3 left-3 right-12">
                <p className="text-white text-[9px] font-semibold mb-1">@theagentcy</p>
                <p className="text-white/80 text-[8px]">This content was made in 5 minutes with AI 🤯 #AIContent</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[8px]">🎵</span>
                  <span className="text-white/60 text-[8px]">Original sound - The Agentcy</span>
                </div>
              </div>
              {/* Right sidebar */}
              <div className="absolute right-2 bottom-4 flex flex-col items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 border-2 border-white" />
                <div className="flex flex-col items-center text-white"><span>❤️</span><span className="text-[7px]">84.2K</span></div>
                <div className="flex flex-col items-center text-white"><span>💬</span><span className="text-[7px]">1.3K</span></div>
                <div className="flex flex-col items-center text-white"><span>🔗</span><span className="text-[7px]">Share</span></div>
                <span className="text-lg">🎵</span>
              </div>
            </div>
            <div className="flex justify-around py-2 bg-black border-t border-white/5 text-white/40 text-sm">
              <span>🏠</span><span>👥</span><span>➕</span><span>📥</span><span>👤</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      platform: "LinkedIn Post",
      icon: "💼",
      gradient: "from-blue-600/20 to-cyan-500/20",
      accent: "from-blue-400 to-cyan-400",
      content: (
        <div className="w-full rounded-xl bg-[#1b1f23] border border-white/10 overflow-hidden text-xs">
          {/* LinkedIn header */}
          <div className="bg-[#0a66c2]/20 px-3 py-2 flex items-center justify-between">
            <span className="text-[#0a66c2] font-bold text-[11px]">in LinkedIn</span>
            <span className="text-white/30 text-[9px]">🔔 Notifications</span>
          </div>
          {/* Post card */}
          <div className="p-3">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold text-[10px] shrink-0">TA</div>
              <div>
                <p className="text-white text-[10px] font-semibold">The Agentcy</p>
                <p className="text-white/40 text-[8px]">AI-Powered Creative Agency · Sponsored</p>
              </div>
            </div>
            <p className="text-white/80 text-[9px] leading-relaxed mb-2">
              We replaced a $15K/month agency with AI. Here&apos;s what happened to our content output in 30 days... 🧵
            </p>
            <div className="rounded-lg overflow-hidden mb-2">
              <img src="/mock-li-content.png" alt="LinkedIn" className="w-full h-24 object-cover" />
            </div>
            <div className="text-white/40 text-[8px] mb-2 flex items-center gap-1">
              <span>👍</span><span>❤️</span><span className="text-white/30">482 reactions · 61 comments</span>
            </div>
            <div className="flex gap-3 border-t border-white/5 pt-2 text-white/30 text-[8px]">
              <span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>↗️ Send</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      platform: "Meta Ad",
      icon: "🎯",
      gradient: "from-blue-500/20 to-indigo-600/20",
      accent: "from-blue-500 to-indigo-500",
      content: (
        <div className="w-full rounded-xl bg-[#242526] border border-white/10 overflow-hidden text-xs">
          {/* FB top bar */}
          <div className="bg-[#1877f2]/20 px-3 py-2 flex items-center gap-2">
            <span className="text-[#1877f2] font-bold text-[12px]">f</span>
            <span className="text-white/30 text-[9px] ml-auto">📣 Ads Manager</span>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-accent-pink flex items-center justify-center text-white text-[9px] font-bold">TA</div>
              <div>
                <p className="text-white text-[10px] font-semibold">The Agentcy</p>
                <p className="text-white/30 text-[8px]">Sponsored · 🌐</p>
              </div>
            </div>
            <p className="text-white/70 text-[9px] mb-2">Stop paying $10K/month for an agency. Get the same results in 5 minutes with AI.</p>
            <div className="rounded-lg overflow-hidden mb-2">
              <img src="/mock-meta-content.png" alt="Meta Ad" className="w-full h-28 object-cover" />
            </div>
            <div className="flex items-center justify-between bg-[#3a3b3c] rounded-lg px-3 py-2">
              <div>
                <p className="text-white/30 text-[7px]">theagentcy.ai</p>
                <p className="text-white text-[9px] font-semibold">Start Free — 7 Days on Us</p>
              </div>
              <span className="bg-[#1877f2] text-white text-[8px] font-bold px-2 py-1 rounded">Learn More</span>
            </div>
            <div className="flex gap-4 mt-2 text-white/25 text-[8px]">
              <span>👍 Like</span><span>💬 Comment</span><span>↗️ Share</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      platform: "YouTube",
      icon: "🎬",
      gradient: "from-red-600/20 to-orange-500/20",
      accent: "from-red-500 to-orange-400",
      content: (
        <div className="w-full rounded-xl bg-[#0f0f0f] border border-white/10 overflow-hidden text-xs">
          {/* YT top */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#0f0f0f]">
            <span className="text-red-500 font-bold text-[12px]">▶ YouTube</span>
            <span className="text-white/30 text-[9px]">🔍</span>
          </div>
          {/* Video thumbnail */}
          <div className="relative">
            <img src="/mock-yt-content.png" alt="YouTube" className="w-full h-36 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center">
                <span className="text-white text-lg ml-0.5">▶</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[8px] px-1 rounded">2:47</div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
              <div className="h-full w-1/3 bg-red-500" />
            </div>
          </div>
          <div className="p-3">
            <p className="text-white text-[10px] font-semibold mb-1">We built a full marketing campaign with AI in 5 minutes</p>
            <p className="text-white/30 text-[8px] mb-2">The Agentcy · 24K views · 2 days ago</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-accent-cyan" />
              <span className="text-white/50 text-[8px]">The Agentcy</span>
              <span className="ml-auto bg-white text-black text-[7px] font-bold px-2 py-0.5 rounded-full">Subscribe</span>
            </div>
            <div className="flex gap-3 mt-2 text-white/30 text-[8px]">
              <span>👍 4.1K</span><span>👎</span><span>↗️ Share</span><span>📋 Save</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <GsapSection>
      <div className="glow-line mb-24" />
      <div className="max-w-5xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Brief.{" "}
            <span className="text-shimmer">Every Platform.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Write your brief once. The Agentcy formats, optimizes, and publishes to every channel automatically — each piece native to the platform.
          </p>
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-white/60 hover:text-white hover-target"
          >
            ←
          </button>

          <div className="overflow-hidden w-full max-w-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="min-w-full flex justify-center">
                  <TiltCard className="w-full">
                    <div className={`rounded-2xl bg-gradient-to-br ${slide.gradient} border border-white/10 p-6 min-h-[400px] flex flex-col gap-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{slide.icon}</span>
                        <span className={`text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r ${slide.accent}`}>
                          {slide.platform}
                        </span>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/30">AI-generated</span>
                      </div>
                      <div className="flex-1">{slide.content}</div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center text-white/60 hover:text-white hover-target"
          >
            →
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full hover-target ${
                i === current ? "w-6 h-2 bg-brand-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
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


// ─── Stats Bar ───
function StatsBar() {
  const stats = [
    { value: "10+", label: "Hours saved per week", icon: "⏱️" },
    { value: "70%", label: "Less production time", icon: "⚡" },
    { value: "5 min", label: "Brief to published content", icon: "🚀" },
    { value: "10×", label: "More content, same team", icon: "📈" },
  ];

  return (
    <section className="relative py-12 px-6 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-3xl font-bold text-shimmer mb-1">{s.value}</div>
            <p className="text-white/40 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Brand Voice ───
function BrandVoice() {
  return (
    <GsapSection>
      <div className="glow-line mb-24" />
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="gsap-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-6">
              ✨ Brand Voice Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              AI That Sounds{" "}
              <span className="text-shimmer">Exactly Like You.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              Most AI content sounds generic. Ours doesn&apos;t. The Agentcy learns your brand tone, writing style, and personality — then applies it consistently across every piece of content it creates.
            </p>
            <ul className="space-y-3">
              {[
                "Learns from your existing content and briefs",
                "Consistent voice across video, copy, captions, and ads",
                "Adapts tone per platform — casual on TikTok, professional on LinkedIn",
                "Gets smarter with every project",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                  <span className="text-brand-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <TiltCard className="gsap-reveal">
            <GlowCard className="rounded-2xl bg-white/[0.03] border border-white/10 p-8">
              <div className="space-y-4">
                <div className="text-xs text-white/30 uppercase tracking-wider mb-4">Brand Voice Profile</div>
                {[
                  { label: "Tone", value: "Confident & Direct", bar: 85 },
                  { label: "Formality", value: "Conversational", bar: 40 },
                  { label: "Humour", value: "Subtle wit", bar: 55 },
                  { label: "Technicality", value: "Accessible", bar: 35 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/50">{item.label}</span>
                      <span className="text-white/70">{item.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan"
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/5 text-xs text-white/30 text-center">
                  ✓ Voice profile synced across all 7 AI agents
                </div>
              </div>
            </GlowCard>
          </TiltCard>
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Use Cases ───
function UseCases() {
  const cases = [
    {
      label: "For Startups & SMBs",
      icon: "🚀",
      gradient: "from-brand-500/20 to-brand-700/10",
      headline: "Look like a funded company. On a bootstrap budget.",
      desc: "Get professional-grade content — videos, ads, social posts — without hiring a team or paying agency retainers. Launch campaigns in minutes, not months.",
      outcomes: ["Save $5K–$25K/mo vs agencies", "Go live in days, not weeks", "Consistent brand presence across all channels"],
    },
    {
      label: "For Marketing Teams",
      icon: "📊",
      gradient: "from-accent-cyan/20 to-brand-500/10",
      headline: "10× your output. Without 10× the headcount.",
      desc: "Stop being the bottleneck. The Agentcy handles production so your team can focus on strategy, performance, and growth — not editing timelines.",
      outcomes: ["70% less time on content production", "Unlimited campaign variations for A/B testing", "Auto-formatted for every platform and placement"],
    },
    {
      label: "For Agencies",
      icon: "🏢",
      gradient: "from-accent-pink/20 to-accent-orange/10",
      headline: "Scale client output. Not your payroll.",
      desc: "Deliver more campaigns, faster, to more clients — without hiring. White-label The Agentcy under your brand and offer AI-powered content as a premium service.",
      outcomes: ["Manage unlimited client brands", "White-label platform available", "Cut delivery time from weeks to hours"],
    },
    {
      label: "For Creators",
      icon: "🎨",
      gradient: "from-accent-orange/20 to-accent-pink/10",
      headline: "Post everywhere. Film once.",
      desc: "Turn one piece of content into a full multi-platform strategy. The Agentcy adapts your content for every channel, writes the captions, and hits publish — so you can focus on creating.",
      outcomes: ["Repurpose one video into 5+ formats", "Platform-native captions and hashtags", "Consistent posting without burning out"],
    },
  ];

  return (
    <GsapSection>
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Everyone Who{" "}
            <span className="text-shimmer">Creates Content Professionally</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Whether you&apos;re a solo founder or running a 50-person agency, The Agentcy scales to your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <TiltCard key={c.label} className="gsap-reveal">
              <GlowCard className={`h-full rounded-2xl bg-gradient-to-br ${c.gradient} border border-white/10 hover:border-white/20 transition-all duration-300 p-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{c.label}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{c.headline}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{c.desc}</p>
                <ul className="space-y-2">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-accent-green shrink-0 mt-0.5">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </GsapSection>
  );
}

// ─── Testimonials ───
function Testimonials() {
  const testimonials = [
    {
      quote: "We used to spend two weeks producing a campaign. Now it takes an afternoon. The Agentcy doesn't just save time — it makes our output look better than what we were doing manually.",
      name: "Sofia Marchetti",
      role: "Head of Marketing",
      company: "Nexum Studio",
      emoji: "🏢",
    },
    {
      quote: "As a solo founder I couldn't afford an agency. The Agentcy gave me a full creative team without the price tag. I'm posting daily on three platforms and it costs me less than a Netflix subscription.",
      name: "Luca Ferretti",
      role: "Founder",
      company: "Launchpad App",
      emoji: "🚀",
    },
    {
      quote: "We white-labelled The Agentcy for our clients and it's transformed our agency model. We now deliver campaigns in 48 hours that used to take three weeks. Our margins have never been better.",
      name: "Giulia Romano",
      role: "Creative Director",
      company: "Forma Agency",
      emoji: "🎨",
    },
    {
      quote: "The brand voice feature is what sold me. Every piece of content actually sounds like us — not like generic AI slop. Our audience can't tell the difference. Our team can finally breathe.",
      name: "Marco Vitale",
      role: "CMO",
      company: "GrowthOps",
      emoji: "📊",
    },
  ];

  return (
    <GsapSection>
      <div className="glow-line mb-24" />
      <div className="max-w-6xl mx-auto">
        <div className="gsap-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Teams That Switched{" "}
            <span className="text-shimmer">Never Went Back</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real results from teams who replaced their old content workflow with The Agentcy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <TiltCard key={t.name} className="gsap-reveal">
              <GlowCard className="h-full rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 p-8">
                <div className="text-3xl mb-4">❝</div>
                <p className="text-white/70 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">{t.emoji}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role} · {t.company}</div>
                  </div>
                </div>
              </GlowCard>
            </TiltCard>
          ))}
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
    { name: "Starter", price: 29, desc: "Try it risk-free. No credit card needed.", features: ["10 projects/month", "Videos, posts, ads & copy", "Instagram + TikTok publishing", "720p video output", "Email support"], highlighted: false },
    { name: "Growth", price: 99, desc: "For teams serious about content.", features: ["50 projects/month", "All service categories", "All platforms", "1080p video output", "Priority support", "Brand kit storage"], highlighted: true },
    { name: "Pro", price: 249, desc: "For agencies and high-volume teams.", features: ["200 projects/month", "All service categories", "All platforms", "4K video output", "Dedicated support", "Custom voices", "API access"], highlighted: false },
    { name: "Enterprise", price: null as number | null, desc: "For large organizations.", features: ["Unlimited projects", "Custom integrations", "White-label platform", "SLA guarantee", "Dedicated CSM", "On-prem option"], highlighted: false },
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
      <StatsBar />
      <StudioCarousel />
      <Showcase />
      <BrandVoice />
      <Comparison />
      <UseCases />
      <Features />
      <Testimonials />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
