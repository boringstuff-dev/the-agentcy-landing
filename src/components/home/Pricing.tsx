"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { APP_LOGIN } from "./links";
import Reveal from "./Reveal";

/** Plan names are brand terms and stay as they are; the rest of each plan
 *  is `pricing.plans.<key>` in the messages. */
const PLANS = [
  {
    key: "starter",
    name: "Starter",
    monthly: 0,
    href: APP_LOGIN,
    highlighted: false,
  },
  {
    key: "growth",
    name: "Growth",
    monthly: 35,
    href: APP_LOGIN,
    highlighted: true,
  },
  {
    key: "pro",
    name: "Pro",
    monthly: 129,
    href: APP_LOGIN,
    highlighted: false,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    monthly: null as number | null,
    href: "#demo",
    highlighted: false,
  },
];

export default function Pricing() {
  const t = useTranslations("pricing");
  const [annual, setAnnual] = useState(false);
  const price = (m: number) => (annual ? Math.round(m * 0.8) : m);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-30">
      <Reveal className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3.5 text-center">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">{t("title")}</h2>
        <p className="text-lg leading-relaxed text-white/72">
          {t("body")}
        </p>
        <div className="glass-soft mt-1.5 inline-flex gap-1 rounded-full p-1" role="group" aria-label={t("billingPeriod")}>
          {[
            { on: false, label: t("monthly") },
            { on: true, label: t("annual") },
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
                  <p className="text-sm text-white/72">{t(`plans.${plan.key}.desc`)}</p>
                </div>
                {plan.highlighted && (
                  <span className="rounded-full bg-brand-500 px-2.5 py-1.5 text-[11px] font-semibold text-white">{t("mostPopular")}</span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[44px] leading-none font-semibold">
                  {plan.monthly == null ? t("custom") : `€${price(plan.monthly)}`}
                </span>
                {plan.monthly != null && (
                  <span className="text-sm text-white/72">
                    {t("perMonth")}
                    {annual && plan.monthly > 0 ? t("billedYearly") : ""}
                  </span>
                )}
              </div>
              <span
                className={`self-start rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                  plan.highlighted ? "bg-brand-500/25 text-brand-100" : "bg-brand-500/18 text-brand-200"
                }`}
              >
                {t(`plans.${plan.key}.credits`)}
              </span>
              <ul className="flex flex-1 flex-col gap-2.5 text-sm text-white/72">
                {(t.raw(`plans.${plan.key}.features`) as string[]).map((f) => (
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
                {t(`plans.${plan.key}.cta`)}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-center text-[13.5px] text-white/60">
        {t("topUps")}
      </p>
    </section>
  );
}
