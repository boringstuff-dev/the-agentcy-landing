"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SOLUTIONS_GROUPS, type LocalizedMenuGroup } from "@/lib/solutions";
import { FEATURES_GROUPS } from "@/lib/features";
import { EVENTS_GROUPS } from "@/lib/events";
import { localizeGroups, type MenuKind, type MenusText } from "@/lib/menus";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_LOGIN } from "./links";

const MENU_DEFS: { key: MenuKind; groups: typeof SOLUTIONS_GROUPS; cols: string }[] = [
  { key: "solutions", groups: SOLUTIONS_GROUPS, cols: "grid-cols-3" },
  { key: "features", groups: FEATURES_GROUPS, cols: "grid-cols-5" },
  { key: "events", groups: EVENTS_GROUPS, cols: "grid-cols-3" },
];

/** In-page anchors stay plain <a>; site routes go through the locale-aware
 *  Link so an Italian visitor stays under /it. */
function NavLink({ href, className, onClick, children }: { href: string; className: string; onClick?: () => void; children: React.ReactNode }) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const navLink =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2.5 xl:px-3 text-sm font-semibold text-white/75 transition-colors hover:bg-white/8 hover:text-white";

function Chevron() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MegaPanel({ groups, cols, onNavigate }: { groups: LocalizedMenuGroup[]; cols: string; onNavigate: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full z-60 pt-2.5">
      <div className={`glass-solid grid gap-4 rounded-3xl p-5 ${cols}`}>
        {groups.map((group) => (
          <div key={group.key} className="flex flex-col gap-0.5">
            <div className="eyebrow px-3 pt-1.5 pb-2.5">{group.title}</div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-start gap-2.5 rounded-xl px-3 py-2 text-white transition-colors hover:bg-white/8"
              >
                <span className="mt-px flex h-7.5 w-7.5 flex-none items-center justify-center rounded-lg bg-brand-500/20 text-brand-200" aria-hidden="true">
                  {item.icon(16)}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold leading-tight">{item.label}</span>
                  <span className="text-xs leading-snug text-white/60">{item.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Nav({ menus: text }: { menus: MenusText }) {
  const t = useTranslations("nav");
  const [menu, setMenu] = useState<MenuKind | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setMenu(null);

  const MENUS = useMemo(
    () => MENU_DEFS.map((m) => ({ ...m, label: t(m.key), groups: localizeGroups(m.groups, text[m.key]) })),
    [t, text],
  );
  const LINKS_BEFORE_FEATURES = [
    { label: t("how"), href: "#how" },
    { label: t("ecosystem"), href: "#ecosystem" },
  ];
  const LINKS_AFTER = [
    { label: t("pricing"), href: "#pricing" },
    { label: t("docs"), href: "/docs", className: "max-xl:hidden" },
  ];

  const renderMenu = (m: (typeof MENUS)[number]) => (
    <div key={m.key} onMouseEnter={() => setMenu(m.key)} onMouseLeave={close}>
      <button
        type="button"
        className={`${navLink} ${menu === m.key ? "bg-white/8 text-white" : ""}`}
        aria-expanded={menu === m.key}
        onClick={() => setMenu(m.key)}
      >
        {m.label}
        <Chevron />
      </button>
      {menu === m.key && <MegaPanel groups={m.groups} cols={m.cols} onNavigate={close} />}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <nav
        aria-label={t("aria")}
        className="glass glass-keep relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full xl:gap-6 2xl:max-w-7xl bg-[#0c0b1a]/55 py-2 pr-2.5 pl-4"
      >
        <a href="#top" className="flex shrink-0 items-center gap-2.5 text-white">
          <Image src="/logo-mark.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[10px]" priority />
          <span className="font-display text-[17px] font-bold tracking-tight whitespace-nowrap">The Agentcy</span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {renderMenu(MENUS[0])}
          {LINKS_BEFORE_FEATURES.map((l) => (
            <NavLink key={l.href} href={l.href} className={navLink}>
              {l.label}
            </NavLink>
          ))}
          {renderMenu(MENUS[1])}
          {renderMenu(MENUS[2])}
          {LINKS_AFTER.map((l) => (
            <NavLink key={l.href} href={l.href} className={`${navLink} ${l.className ?? ""}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact className="max-sm:hidden" />
          <a
            href={APP_LOGIN}
            className="hidden items-center rounded-full px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap text-white/75 transition-colors hover:bg-white/8 hover:text-white xl:inline-flex"
          >
            {t("login")}
          </a>
          <a
            href="#demo"
            className="hidden min-h-[42px] items-center whitespace-nowrap rounded-full border border-white/14 bg-white/6 px-4 text-sm font-bold text-white transition-colors hover:bg-white/11 2xl:inline-flex"
          >
            {t("bookDemo")}
          </a>
          <a
            href={APP_LOGIN}
            className="inline-flex min-h-[42px] items-center whitespace-nowrap rounded-full bg-linear-to-br from-brand-400 to-brand-600 px-[18px] text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,.7)] transition-transform hover:-translate-y-px"
          >
            {t("startFree")}
          </a>
          <button
            type="button"
            className="glass-soft inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-white lg:hidden"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute inset-x-0 top-full z-60 pt-2.5 lg:hidden">
            <div className="glass-solid flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto rounded-3xl p-3">
              {[
                { label: t("solutions"), href: SOLUTIONS_GROUPS[0].items[0].href },
                ...LINKS_BEFORE_FEATURES,
                { label: t("features"), href: FEATURES_GROUPS[0].items[0].href },
                { label: t("events"), href: EVENTS_GROUPS[0].items[0].href },
                ...LINKS_AFTER,
                { label: t("bookDemo"), href: "#demo" },
                { label: t("login"), href: APP_LOGIN },
              ].map((l) => (
                <NavLink
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-1 sm:hidden">
                <span className="text-sm font-semibold text-white/60">{t("language")}</span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
