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
          Free 7-day trial · No credit card needed
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
          No freelancers. No agencies. No waiting two weeks for a draft. Try free for 7 days.
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
              <div className="grid sm:grid-cols-2 gap-4">
                {group.services.map((service) => (
                  <TiltCard key={service.title} className="gsap-reveal">
                    <GlowCard className="h-full rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex gap-5 items-start p-7 min-h-[140px]">
                        <div className="text-4xl shrink-0 mt-1">{service.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                          <p className="text-white/45 text-sm leading-relaxed mb-4">{service.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {service.outputs.map((output) => (
                              <span key={output} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/55">
                                {output}
                              </span>
                            ))}
                          </div>
                        </div>
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
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="w-full aspect-[9/16] max-h-[220px] rounded-xl bg-gradient-to-b from-pink-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="h-2 w-2/3 rounded bg-white/20 mb-2" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
            </div>
            <span className="text-5xl">🎬</span>
          </div>
          <div className="flex gap-4 text-xs text-white/40 w-full justify-center">
            <span>❤️ 4.2K</span><span>💬 318</span><span>↗️ 891</span>
          </div>
        </div>
      ),
    },
    {
      platform: "TikTok Video",
      icon: "🎵",
      gradient: "from-gray-900/60 to-red-500/20",
      accent: "from-red-400 to-pink-500",
      content: (
        <div className="flex gap-3 w-full">
          <div className="flex-1 aspect-[9/16] max-h-[220px] rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
            <span className="text-4xl">🎵</span>
          </div>
          <div className="flex flex-col gap-4 justify-end pb-4 text-xl">
            <span>❤️</span><span>💬</span><span>↗️</span><span>🎵</span>
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
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/30 border border-white/10 flex items-center justify-center text-lg">🏢</div>
            <div>
              <div className="h-2 w-24 rounded bg-white/30 mb-1" />
              <div className="h-2 w-16 rounded bg-white/15" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-white/20" />
            <div className="h-2 w-5/6 rounded bg-white/15" />
            <div className="h-2 w-4/6 rounded bg-white/10" />
          </div>
          <div className="w-full h-24 rounded-lg bg-blue-500/20 border border-white/10 flex items-center justify-center text-3xl">📊</div>
          <div className="flex gap-4 text-xs text-white/40">
            <span>👍 482</span><span>💬 61</span><span>↗️ 34</span>
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
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <div className="w-6 h-6 rounded bg-blue-500/40 flex items-center justify-center">🎯</div>
            <span>Your Brand · <span className="text-white/20">Sponsored</span></span>
          </div>
          <div className="w-full h-28 rounded-xl bg-indigo-500/20 border border-white/10 flex items-center justify-center text-4xl">🖼️</div>
          <div className="h-2 w-3/4 rounded bg-white/25 mb-1" />
          <div className="h-2 w-1/2 rounded bg-white/15" />
          <div className="mt-2 w-full py-2 rounded-lg bg-blue-500/40 border border-blue-400/30 text-center text-xs font-semibold text-blue-200">
            Learn More →
          </div>
        </div>
      ),
    },
    {
      platform: "YouTube Short",
      icon: "🎬",
      gradient: "from-red-600/20 to-orange-500/20",
      accent: "from-red-500 to-orange-400",
      content: (
        <div className="flex flex-col gap-3 w-full">
          <div className="w-full aspect-[9/16] max-h-[200px] rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative">
            <span className="text-5xl">▶️</span>
            <div className="absolute bottom-2 left-2 right-2 h-1 rounded bg-white/10">
              <div className="h-full w-2/5 rounded bg-red-500" />
            </div>
          </div>
          <div className="h-2 w-3/4 rounded bg-white/25" />
          <div className="flex gap-3 text-xs text-white/40">
            <span>👍 12K</span><span>👎</span><span>🔗 Share</span>
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
