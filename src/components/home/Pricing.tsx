"use client";

import { useState } from "react";
import { APP_LOGIN } from "./links";
import Reveal from "./Reveal";

const PLANS = [
  {
    name: "Starter",
    desc: "Try the platform. No card needed.",
    monthly: 0,
    credits: "300 credits / month",
    features: ["Text and image creation tools", "1 brand workspace", "Community support"],
    cta: "Start free",
    href: APP_LOGIN,
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "For active brands running social.",
    monthly: 35,
    credits: "2,400 credits / month",
    features: [
      "Text and image social, light video",
      "Unlimited brands",
      "Channel connectors: Instagram, LinkedIn, Telegram",
      "Brand website and events",
      "Priority generation",
    ],
    cta: "Start free",
    href: APP_LOGIN,
    highlighted: true,
  },
  {
    name: "Pro",
    desc: "Full creative firepower.",
    monthly: 129,
    credits: "9,000 credits / month",
    features: [
      "Video, storyboards and synthetic presenters",
      "Daily market intelligence",
      "Custom domains",
      "Developer API access",
      "Priority support",
    ],
    cta: "Start free",
    href: APP_LOGIN,
    highlighted: false,
  },
  {
    name: "Enterprise",
    desc: "White-label and managed service.",
    monthly: null as number | null,
    credits: "Custom volume",
    features: ["White-label and SSO", "Custom connectors and fine-tuning", "Dedicated success manager", "SLA and onboarding"],
    cta: "Talk to sales",
    href: "#demo",
    highlighted: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const price = (m: number) => (annual ? Math.round(m * 0.8) : m);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">Pricing</span>
        <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">One currency: credits</h2>
        <p className="text-lg leading-relaxed text-white/72">
          Every action, from a caption to a full storyboard video, costs credits. Pick the monthly plan that fits and top up anytime.
        </p>
        <div className="glass-soft mt-1.5 inline-flex gap-1 rounded-full p-1" role="group" aria-label="Billing period">
          {[
            { on: false, label: "Monthly" },
            { on: true, label: "Annual · save 20%" },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={annual === t.on}
              onClick={() => setAnnual(t.on)}
              className={`min-h-10 cursor-pointer rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                annual === t.on ? "bg-white/14 text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.06} className="flex">
            <div
              className={`glass glass-hover flex w-full flex-col gap-4.5 rounded-3xl p-6.5 ${
                plan.highlighted
                  ? "border-brand-300/50 bg-brand-500/12 shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_40px_90px_-30px_rgba(124,58,237,.6)]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="mb-1.5 font-display text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-white/72">{plan.desc}</p>
                </div>
                {plan.highlighted && (
                  <span className="rounded-full bg-brand-500 px-2.5 py-1.5 text-[11px] font-semibold text-white">Most popular</span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[44px] leading-none font-semibold">
                  {plan.monthly == null ? "Custom" : `€${price(plan.monthly)}`}
                </span>
                {plan.monthly != null && (
                  <span className="text-sm text-white/72">/ month{annual && plan.monthly > 0 ? ", billed yearly" : ""}</span>
                )}
              </div>
              <span
                className={`self-start rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                  plan.highlighted ? "bg-brand-500/25 text-brand-100" : "bg-brand-500/18 text-brand-200"
                }`}
              >
                {plan.credits}
              </span>
              <ul className="flex flex-1 flex-col gap-2.5 text-sm text-white/72">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-[15px] font-bold transition-all hover:-translate-y-px ${
                  plan.highlighted
                    ? "bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)]"
                    : "border border-white/14 bg-white/6 text-white hover:bg-white/11"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-[13.5px] text-white/60">
        Top-up packs: 1,000 credits €15 · 5,000 credits €65. Unused credits roll over one month.
      </p>
    </section>
  );
}
