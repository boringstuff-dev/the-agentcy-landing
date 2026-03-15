"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

// ─── Animation Helpers ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`relative py-24 md:py-32 px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Navbar ───
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/30 border border-white/10">
            <Image
              src="/logo-mark.png"
              alt="The Agentcy logo"
              width={32}
              height={32}
              priority
            />
          </div>
          <span className="text-lg font-bold tracking-tight">The Agentcy</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <a
          href="#waitlist"
          className="px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-brand-500/25"
        >
          Get Early Access
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Hero (from V1 with pipeline preview) ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background video (falls back gracefully if the file is missing). */}
      <div className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40 motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-bg.jpg"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Darken for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[128px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-white/70 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          Now in Early Access
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          Your AI
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-accent-pink to-accent-cyan">
            Creative Agency
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From brief to published content in minutes, not weeks.
          Seven AI agents collaborate like a world-class creative team —
          strategy, visuals, voice, video, QA, and publishing. All automated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#waitlist"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-brand-500/30 transition-all hover:scale-105"
          >
            Get Early Access
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 font-medium text-lg"
          >
            Explore Services →
          </a>
        </motion.div>

        {/* Pipeline preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <PipelinePreview />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-brand-500/20 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

function PipelinePreview() {
  const steps = [
    { icon: "📋", label: "Brief", color: "from-white/20 to-white/5" },
    { icon: "🎯", label: "Strategy", color: "from-brand-400/30 to-brand-600/10" },
    { icon: "🎨", label: "Visuals", color: "from-accent-pink/30 to-accent-pink/5" },
    { icon: "🎙️", label: "Voice", color: "from-accent-orange/30 to-accent-orange/5" },
    { icon: "🎬", label: "Compose", color: "from-accent-cyan/30 to-accent-cyan/5" },
    { icon: "✅", label: "QA", color: "from-accent-green/30 to-accent-green/5" },
    { icon: "🚀", label: "Publish", color: "from-brand-300/30 to-brand-500/5" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2 md:gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-b ${step.color} border border-white/10`}
          >
            <span className="text-2xl">{step.icon}</span>
            <span className="text-xs font-medium text-white/70">{step.label}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-white/20 hidden md:block"
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Services (from V2) ───
const serviceGroups = [
  {
    category: "Content Production",
    gradient: "from-accent-pink to-brand-400",
    services: [
      {
        icon: "📊",
        title: "Slide Decks & Presentations",
        desc: "AI-generated pitch decks, sales decks, and investor presentations with custom visual backgrounds.",
        outputs: [".pptx with AI art", "Editable text layers", "Brand-consistent"],
      },
      {
        icon: "🎬",
        title: "Social Media Video",
        desc: "Short-form video for Reels, TikTok, and YouTube Shorts — scripted, produced, and captioned.",
        outputs: ["9:16, 1:1, 16:9 formats", "Captions & music", "Platform-optimized"],
      },
      {
        icon: "📱",
        title: "Social Media Posts",
        desc: "Static posts, carousels, and stories auto-formatted per platform with copy and hashtags.",
        outputs: ["Images + captions", "Multi-platform sizing", "Hashtag strategy"],
      },
      {
        icon: "🎯",
        title: "Ad Creatives",
        desc: "Multiple ad variations from a single brief — ready for Meta, Google, and TikTok ad platforms.",
        outputs: ["3-10 variations per brief", "A/B test ready", "Multi-format"],
      },
      {
        icon: "🎥",
        title: "Explainer Videos",
        desc: "1-3 min videos with AI presenters, motion graphics, and professional voiceover.",
        outputs: ["AI avatar optional", "Branded transitions", "Full audio mix"],
      },
    ],
  },
  {
    category: "Strategy & Copy",
    gradient: "from-accent-cyan to-brand-400",
    services: [
      {
        icon: "📅",
        title: "Content Strategy",
        desc: "Monthly content plans with themes, posting schedules, and platform mix informed by competitor analysis.",
        outputs: ["Content calendar", "Theme pillars", "Timing recommendations"],
      },
      {
        icon: "✍️",
        title: "Copywriting",
        desc: "Blog posts, newsletters, website copy, and email sequences with consistent brand voice.",
        outputs: ["Blog & newsletter", "Email sequences", "Website copy"],
      },
      {
        icon: "🔍",
        title: "SEO Content",
        desc: "Keyword research, optimized articles, meta descriptions, and landing page copy.",
        outputs: ["SEO-optimized articles", "Meta tags", "Internal linking"],
      },
    ],
  },
  {
    category: "Audio",
    gradient: "from-accent-orange to-brand-300",
    services: [
      {
        icon: "🎙️",
        title: "Podcast Production",
        desc: "Full podcast episodes — multi-voice, with intro/outro, music, editing, and show notes.",
        outputs: ["MP3/WAV master", "Show notes", "Transcript"],
      },
      {
        icon: "🔊",
        title: "Voiceovers",
        desc: "Radio spots, podcast ads, IVR recordings, and product demo narration in any voice.",
        outputs: ["Multiple formats", "Broadcast-ready", "Multi-language"],
      },
    ],
  },
  {
    category: "Research",
    gradient: "from-accent-green to-accent-cyan",
    services: [
      {
        icon: "📈",
        title: "Market Analysis",
        desc: "Competitor research, market sizing, and trend analysis delivered as polished reports or decks.",
        outputs: ["PDF reports", "Data visualizations", "Presentation decks"],
      },
      {
        icon: "🏷️",
        title: "Brand Audit",
        desc: "Comprehensive analysis of social presence, content quality, and positioning vs. competitors.",
        outputs: ["Audit scorecard", "Benchmarks", "Action items"],
      },
    ],
  },
];

function Services() {
  return (
    <Section id="services">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything a Creative Agency Delivers,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-accent-pink to-accent-cyan">
              Powered by AI
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Submit a brief. Get finished, publish-ready work. No freelancers, no waiting.
          </p>
        </motion.div>

        <div className="space-y-16">
          {serviceGroups.map((group) => (
            <div key={group.category}>
              <motion.div variants={fadeUp} className="mb-6">
                <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${group.gradient}`}>
                  {group.category}
                </h3>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.services.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 group"
                  >
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.outputs.map((output) => (
                        <span
                          key={output}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                        >
                          {output}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── How It Works (V2's clean 3-step) ───
function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: "📋",
      title: "Submit Your Brief",
      desc: "Describe your campaign, product, or content needs in plain language. Upload brand assets if you have them.",
      gradient: "from-brand-400 to-brand-600",
    },
    {
      num: "02",
      icon: "⚡",
      title: "Agents Collaborate",
      desc: "Seven AI agents work in parallel — strategy, visuals, copy, voice, video, QA — all orchestrated automatically.",
      gradient: "from-accent-pink to-brand-400",
    },
    {
      num: "03",
      icon: "🚀",
      title: "Review & Publish",
      desc: "Preview everything, request changes in natural language, and publish to every platform with one click.",
      gradient: "from-accent-cyan to-accent-green",
    },
  ];

  return (
    <Section id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Brief to Published in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-accent-cyan">Minutes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            No more juggling tools, freelancers, and timelines. One platform, one workflow, zero friction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className={`text-sm font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.gradient} mb-3`}>
                Step {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Replace Your Entire Stack (from V1) ───
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
    <Section>
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Replace{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-orange to-accent-pink">Your Entire Stack</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Stop paying for 6 tools that don&apos;t talk to each other.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid gap-4 mb-8">
            {tools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tool.emoji}</span>
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
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-accent-cyan">
              The Agentcy — One Platform
            </p>
            <p className="text-white/40 text-sm mt-2">Starting at $499/month</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Why The Agentcy / Features (from V1) ───
function Features() {
  const features = [
    {
      icon: "⚡",
      title: "End-to-End Pipeline",
      desc: "From creative brief to published content — no handoffs, no gaps, no waiting.",
    },
    {
      icon: "🤝",
      title: "Agent Collaboration",
      desc: "Agents communicate and iterate autonomously, just like a real creative team.",
    },
    {
      icon: "🌐",
      title: "Multi-Platform Publishing",
      desc: "Auto-format and publish to Instagram, TikTok, YouTube, X, LinkedIn simultaneously.",
    },
    {
      icon: "📈",
      title: "Unlimited Scale",
      desc: "10 briefs or 10,000 — the platform doesn't get tired, miss deadlines, or raise rates.",
    },
    {
      icon: "🔄",
      title: "Natural Language Iteration",
      desc: "Say \"make the logo bigger\" or \"try a warmer tone\" — agents understand and adapt.",
    },
    {
      icon: "🏎️",
      title: "Minutes, Not Weeks",
      desc: "What took your agency weeks now takes minutes. Same quality, 100x faster.",
    },
  ];

  return (
    <Section id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-accent-orange">The Agentcy</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Built different. Built better. Built for the future of content creation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Pricing (B2B from V2) ───
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 499,
      desc: "For solopreneurs and small teams getting started",
      features: ["50 deliverables/month", "All service categories", "All platforms", "720p video", "Email support"],
      cta: "Get Early Access",
      highlighted: false,
    },
    {
      name: "Growth",
      price: 999,
      desc: "For growing teams scaling their output",
      features: ["150 deliverables/month", "All service categories", "All platforms", "1080p video", "Priority support", "Brand kit storage"],
      cta: "Get Early Access",
      highlighted: true,
    },
    {
      name: "Pro",
      price: 2499,
      desc: "For agencies and marketing teams",
      features: ["500 deliverables/month", "All service categories", "All platforms", "4K video", "Dedicated support", "Custom voices", "API access"],
      cta: "Get Early Access",
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: null,
      desc: "For large organizations",
      features: ["Unlimited deliverables", "Custom integrations", "White-label platform", "SLA guarantee", "Dedicated CSM", "On-prem option"],
      cta: "Talk to Sales",
      highlighted: false,
    },
  ];

  return (
    <Section id="pricing">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Predictable{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-accent-cyan">Pricing</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Flat monthly plans. No per-seat fees. Scale your output without scaling your costs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-b from-brand-500/20 to-brand-900/20 border-2 border-brand-400/40 shadow-xl shadow-brand-500/10"
                  : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
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
              <a
                href="#waitlist"
                className={`text-center py-3 rounded-xl font-medium text-sm transition-all ${
                  plan.highlighted
                    ? "bg-brand-500 hover:bg-brand-400 text-white"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Waitlist ───
function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="waitlist">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Replace
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-accent-pink to-accent-cyan">
              Your Entire Agency?
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join the waitlist for early access. Be among the first to experience the future of content creation.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
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
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold hover:shadow-xl hover:shadow-brand-500/25 transition-all hover:scale-105 whitespace-nowrap"
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
        </motion.div>

        <motion.p variants={fadeUp} className="text-white/30 text-sm mt-6">
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </Section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md overflow-hidden bg-black/30 border border-white/10">
            <Image src="/logo-mark.png" alt="The Agentcy logo" width={24} height={24} />
          </div>
          <span className="text-sm font-bold">The Agentcy</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/30">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/60 transition-colors">Twitter</a>
          <a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white/60 transition-colors">Discord</a>
        </div>
        <p className="text-white/20 text-sm">© 2026 The Agentcy. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Comparison />
      <Features />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
