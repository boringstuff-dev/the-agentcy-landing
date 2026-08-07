import type { ReactNode } from "react";
import type { MegaMenuGroup, MegaMenuItem } from "@/lib/solutions";
import type { FeaturePageContent } from "@/lib/features";

const svg = (paths: ReactNode) => (s: number = 18) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

// ─── Megamenu data (also drives the dynamic /events/[slug] route) ───
export const EVENTS_GROUPS: MegaMenuGroup[] = [
  {
    title: "Discover & Plan",
    items: [
      {
        icon: svg(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>),
        label: "Event Radar",
        desc: "Find the events worth showing up to — matched to your brand.",
        href: "/events/event-radar",
      },
      {
        icon: svg(<><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M8 3v3M16 3v3M4 9h16M9 14l1.5 1.5L14 12" /></>),
        label: "AI Event Plan",
        desc: "A full production plan — format, staffing, budget — in minutes.",
        href: "/events/event-plan",
      },
    ],
  },
  {
    title: "Run the Event",
    items: [
      {
        icon: svg(<><path d="M12 3l8 4-8 4-8-4 8-4z" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" /></>),
        label: "Production Management",
        desc: "Venue, staff, rentals and catering — all in one place.",
        href: "/events/production-management",
      },
      {
        icon: svg(<><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z" /><path d="M14 5v14" strokeDasharray="2 2" /></>),
        label: "Ticketing & Registration",
        desc: "Ticket tiers, sign-ups and check-in — straight into your CRM.",
        href: "/events/ticketing",
      },
    ],
  },
  {
    title: "Engage Attendees",
    items: [
      {
        icon: svg(<><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M7 9l2.5 2.5L13 8" /></>),
        label: "Event Microsites",
        desc: "A beautiful, on-brand event page — drafted and live in minutes.",
        href: "/events/event-microsites",
      },
      {
        icon: svg(<><path d="M3 8l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></>),
        label: "Attendee Communications",
        desc: "Confirmations, reminders and follow-ups — segmented and on-brand.",
        href: "/events/attendee-comms",
      },
    ],
  },
];

// ─── Per-slug page content ───
export const EVENT_PAGES: Record<string, FeaturePageContent> = {
  "event-radar": {
    tagline: "Never miss the event that moves your brand.",
    intro:
      "The Agentcy scans for the conferences, launches and moments worth showing up to — matched to your brand, audience and goals — and hands you a shortlist with the reasoning.",
    benefits: [
      { title: "Brand-matched suggestions", desc: "Events ranked by fit to your positioning and audience, not a generic listings feed." },
      { title: "The 'why' up front", desc: "Each pick comes with the angle and the opportunity, so you can decide fast." },
      { title: "Radar to plan in a click", desc: "Like one? Turn it straight into a full production plan." },
    ],
    painPoints: [
      "You hear about the perfect event the week after it sold out.",
      "Scouting events by hand eats a morning and still misses the good ones.",
      "Nobody owns 'what should we show up to this quarter?'",
    ],
    proofQuote: {
      quote: "We booked two events last quarter we'd never have found on our own — both drove pipeline.",
      author: "Marta L.",
      role: "Brand lead, B2B SaaS",
    },
    accent: "amber",
  },
  "event-plan": {
    tagline: "A full event plan, drafted in minutes.",
    intro:
      "Describe the event you want to run. The Agentcy proposes the whole production — format, run-of-show, staffing, budget lines and ticket tiers — ready for you to edit and approve.",
    benefits: [
      { title: "End-to-end proposal", desc: "Format, agenda, roles, rentals and catering — a complete first draft, not a blank page." },
      { title: "Budget-aware", desc: "Every line comes costed, so you see the shape of the spend immediately." },
      { title: "Editable, not fixed", desc: "Tweak anything in plain language; the plan updates around your changes." },
    ],
    painPoints: [
      "Planning an event starts with a terrifyingly blank spreadsheet.",
      "The first realistic budget takes a week of back-and-forth.",
      "Half the production tasks only surface once it's too late to plan them.",
    ],
    proofQuote: {
      quote: "It turned a vague 'let's do a launch event' into a real plan we could actually approve.",
      author: "Devon R.",
      role: "Events manager",
    },
    accent: "violet",
  },
  "production-management": {
    tagline: "Every moving part of your event, in one place.",
    intro:
      "Venue, staff, rentals, catering and schedule — managed together, so nothing slips between spreadsheets, threads and someone's memory.",
    benefits: [
      { title: "One source of truth", desc: "Venue, suppliers, staff and timings live in one production, not five docs." },
      { title: "Roles & logistics", desc: "Assign staff, track rentals and catering, and keep the run-of-show current." },
      { title: "Ready when you are", desc: "Everything the team needs to execute, visible to everyone who needs it." },
    ],
    painPoints: [
      "The catering count lives in an email, the staff list in a DM, the schedule in someone's head.",
      "Two people book the same supplier because nobody had the full picture.",
      "The day-of runs on adrenaline because the plan never left one person's notes.",
    ],
    proofQuote: {
      quote: "Our last event was the first one that didn't feel like chaos behind the scenes.",
      author: "Priya N.",
      role: "Head of experiential",
    },
    accent: "cyan",
  },
  ticketing: {
    tagline: "Sell tickets and manage the guest list — natively.",
    intro:
      "Create ticket tiers, take registrations, and check attendees in — all inside the same event, with the data flowing straight into your CRM.",
    benefits: [
      { title: "Flexible ticket tiers", desc: "Early-bird, VIP, comps — set the tiers and rules that fit your event." },
      { title: "Registrations & check-in", desc: "Track who's coming and check them in on the day without a separate tool." },
      { title: "Straight into your CRM", desc: "Every attendee becomes a contact you can segment and follow up with." },
    ],
    painPoints: [
      "Registrations live in one tool, your audience data in another, and they never sync.",
      "Check-in on the day is a laptop, a spreadsheet and crossed fingers.",
      "After the event, the attendee list disappears into an export nobody opens.",
    ],
    proofQuote: {
      quote: "Attendees flow into our contacts automatically — follow-up used to take days.",
      author: "Sam K.",
      role: "Growth marketer",
    },
    accent: "emerald",
  },
  "event-microsites": {
    tagline: "A beautiful event page, drafted for you.",
    intro:
      "Every event gets its own public microsite — agenda, speakers, venue, registration — AI-drafted on-brand and live in minutes, no web team required.",
    benefits: [
      { title: "AI-drafted, on-brand", desc: "Copy and layout generated from your event details and brand — ready to tweak." },
      { title: "Everything attendees need", desc: "Agenda, location, speakers and a registration flow in one place." },
      { title: "Live in minutes", desc: "Publish to a shareable URL without waiting on a designer or developer." },
    ],
    painPoints: [
      "Standing up an event page means a ticket to the web team and a two-week wait.",
      "The event details live in six places and none of them agree.",
      "By the time the page is ready, early-bird is already over.",
    ],
    proofQuote: {
      quote: "We had a polished event site up the same afternoon we decided to run it.",
      author: "Lena F.",
      role: "Community lead",
    },
    accent: "pink",
  },
  "attendee-comms": {
    tagline: "Keep every attendee in the loop, automatically.",
    intro:
      "Send confirmations, reminders and follow-ups to the right segments — with calendar invites and on-brand copy — without ever leaving the event.",
    benefits: [
      { title: "Segmented broadcasts", desc: "Message all attendees, only VIPs, or just the no-shows — targeted, not blasted." },
      { title: "Reminders & calendar invites", desc: "Automatic confirmations and ICS invites so people actually show up." },
      { title: "On-brand follow-up", desc: "Post-event thank-yous and next steps, drafted in your voice." },
    ],
    painPoints: [
      "Reminder emails get written the night before, if at all.",
      "No-shows never get a follow-up because pulling the list is too much work.",
      "Attendee comms sound nothing like the rest of your brand.",
    ],
    proofQuote: {
      quote: "Show-up rates jumped once reminders and calendar invites went out on their own.",
      author: "Tariq B.",
      role: "Event producer",
    },
    accent: "amber",
  },
};

// ─── Helpers ───
export function getEventItemBySlug(slug: string): { item: MegaMenuItem; group: MegaMenuGroup } | null {
  for (const group of EVENTS_GROUPS) {
    const item = group.items.find((i) => i.href === `/events/${slug}`);
    if (item) return { item, group };
  }
  return null;
}

export function getAllEventSlugs(): string[] {
  return EVENTS_GROUPS.flatMap((g) => g.items).map((i) => i.href.replace("/events/", ""));
}
