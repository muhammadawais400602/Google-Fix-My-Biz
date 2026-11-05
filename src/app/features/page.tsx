"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  FileText,
  Globe,
  Info,
  Keyboard,
  Layers,
  ListChecks,
  MapPin,
  Megaphone,
  MessageSquare,
  MessagesSquare,
  Minus,
  Phone,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: Phone, label: "Browser dialer, one call at a time" },
  { icon: ShieldCheck, label: "AI disclosure and suppression lists" },
  { icon: FileSpreadsheet, label: "Google Sheets and CSV" },
];

const panel = {
  title: "The Xovra workflow",
  subtitle: "Five steps from search to follow-up",
  footnote: "Xovra is built on Telnyx for voice, SMS and AI, with Claude or Gemini for live help.",
  icon: Layers,
};

const panelRows = [
  {
    icon: MapPin,
    label: "1. Source",
    value: "Google Maps by niche and city, enriched and scored",
  },
  {
    icon: Phone,
    label: "2. Call",
    value: "Browser dialer or Telnyx AI qualifier",
  },
  {
    icon: Sparkles,
    label: "3. Handle",
    value: "Live AI rebuttals with lead context",
  },
  {
    icon: MessageSquare,
    label: "4. Follow up",
    value: "Two-way SMS and email or WhatsApp drafts",
  },
];

const glance = [
  {
    icon: Phone,
    title: "Manual dialer",
    desc: "A Telnyx WebRTC softphone in the browser. Calls are placed one at a time by a person.",
  },
  {
    icon: Bot,
    title: "AI qualifier",
    desc: "A Telnyx AI assistant that discloses it is an AI and returns a lead score.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance basics",
    desc: "Suppression lists, calling windows, attempt caps and rate limits.",
  },
  {
    icon: Users,
    title: "Team ready",
    desc: "Organizations with owner, admin and agent roles, plus per-org numbers and assistants.",
  },
];

const capabilities = [
  {
    icon: Bot,
    title: "AI Qualifier Calls",
    desc: "A Telnyx AI assistant places qualifier calls, discloses it is an AI, and returns score, interest and next action.",
    href: "/features/ai-calling",
    tag: "AI",
  },
  {
    icon: MapPin,
    title: "Lead Sourcing & Campaigns",
    desc: "Scrape Google Maps, audit websites, detect ads and social presence, score leads and export to Sheets or CSV.",
    href: "/features/lead-management",
    tag: "Leads",
  },
  {
    icon: Sparkles,
    title: "Live AI Rebuttals",
    desc: "Claude or Gemini generates context-aware objection handling during calls, fresh each time.",
    href: "/features/objection-rebuttals",
    tag: "Live help",
  },
  {
    icon: MessageSquare,
    title: "Follow-Up & SMS",
    desc: "Two-way Telnyx SMS, opt-out detection, and email or WhatsApp drafts through mailto: and wa.me.",
    href: "/features/omnichannel",
    tag: "SMS",
  },
  {
    icon: ClipboardList,
    title: "Outcome Tracking",
    desc: "Call outcomes written to Google Sheets, AI lead scores, and a usage ledger for minutes and SMS spend.",
    href: "/features/outcome-tracking",
    tag: "Records",
  },
  {
    icon: MessagesSquare,
    title: "Messages & Conversations",
    desc: "SMS threads grouped by phone number, with lead names shown when a number matches a lead.",
    href: "/features/unified-inbox",
    tag: "Inbox",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Source leads",
    desc: "Run a Google Maps job for a niche and a city, then enrich and score the results.",
  },
  {
    icon: ListChecks,
    title: "Build a campaign",
    desc: "Import from a Google Sheet or paste numbers, then set the brief, greeting and criteria.",
  },
  {
    icon: Phone,
    title: "Call",
    desc: "Dial from the browser, or let the AI assistant qualify first.",
  },
  {
    icon: Sparkles,
    title: "Handle objections",
    desc: "Ask Claude or Gemini for a response using the lead's data.",
  },
  {
    icon: ClipboardList,
    title: "Log and follow up",
    desc: "Record outcomes with a key, then send a text or open an email or WhatsApp draft.",
  },
];

const dives = [
  {
    eyebrow: "Calling",
    title: "Human first, AI where it helps",
    desc: "Xovra supports two ways to reach a lead. Operators call manually from the browser, and an AI assistant can qualify leads before a human spends time on them.",
    icon: Phone,
    panelTitle: "Two calling modes",
    panelLines: [
      "manual: Telnyx WebRTC softphone in the browser",
      "operator rings first, then the lead is dialed",
      "AI: Telnyx assistant, AI disclosed in sentence one",
    ],
    points: [
      { icon: Keyboard, title: "Keyboard shortcuts", desc: "C to call, H to hang up, and 1 to 6 for outcomes." },
      { icon: Phone, title: "Operator-first flow", desc: "The operator's line rings first, then the lead is dialed." },
      { icon: Bot, title: "AI qualifier", desc: "Lead score from 1 to 10, interest, qualified and next action." },
    ],
  },
  {
    eyebrow: "Lead intelligence",
    title: "Calls grounded in real findings",
    desc: "Google Maps listings are enriched with website audits, Google Ads detection and social presence, so each call starts from something concrete.",
    icon: Search,
    panelTitle: "Enrichment signals",
    panelLines: [
      "website: HTTPS, mobile-friendly, copyright year, tech stack",
      "ads: on-site tags, Ads Transparency Center, SERP",
      "angles: RUNS_ADS, NO_SITE, WEAK_SITE, STRONG_SITE",
    ],
    points: [
      { icon: Globe, title: "Website audit", desc: "Find neglected or missing sites." },
      { icon: Megaphone, title: "Ads detection", desc: "See whether a business already advertises." },
      { icon: Share2, title: "Social presence", desc: "Instagram, Facebook and TikTok signals." },
    ],
  },
  {
    eyebrow: "Compliance and teams",
    title: "Guardrails and collaboration",
    desc: "Cold calling comes with rules. Xovra includes the controls that make following them easier, and roles for teams that work together.",
    icon: ShieldCheck,
    panelTitle: "Controls",
    panelLines: [
      "suppression: append-only Do Not Contact",
      "calling windows: 8am to 9pm, configurable timezone",
      "attempt caps and rate limits",
      "roles: owner, admin, agent",
    ],
    points: [
      { icon: Ban, title: "Suppression lists", desc: "Do Not Contact numbers are skipped." },
      { icon: Clock, title: "Calling windows", desc: "Calls and messages respect configurable time windows." },
      { icon: Users, title: "Orgs and invites", desc: "Owners, admins and agents, with per-org numbers, AI assistants and number pools." },
    ],
  },
];

const isList = [
  "A browser dialer on Telnyx WebRTC for manual, one-at-a-time calls",
  "A Telnyx AI assistant that qualifies leads and discloses it is an AI",
  "Google Maps lead sourcing with website, ads and social enrichment",
  "Live objection help from Claude or Gemini, generated fresh each time",
  "Two-way SMS with opt-out detection, and email or WhatsApp draft links",
  "Outcome tracking to Google Sheets and a usage ledger",
];

const isNotList = [
  "No ringless voicemail or voicemail drop",
  "No power, progressive or predictive dialer",
  "No call recording, transcripts or answering machine detection",
  "No native CRM sync, Zapier or Slack integration",
  "No analytics dashboards, voice cloning or WhatsApp Business API",
];

const faqs = [
  {
    q: "What is Xovra?",
    a: "An AI-powered cold calling platform. It sources leads from Google Maps, provides a browser dialer, runs AI qualifier calls, offers live AI rebuttals and manages SMS follow-up.",
  },
  {
    q: "Is it a power dialer?",
    a: "No. The browser dialer places calls manually, one at a time. The operator's line rings first, then the lead is dialed.",
  },
  {
    q: "Does it do ringless voicemail?",
    a: "No. There is no voicemail drop or ringless voicemail.",
  },
  {
    q: "What do I need to bring?",
    a: "A Telnyx account for voice, SMS and AI, plus Google Sheets for lead data. SMS in the US needs 10DLC registration with Telnyx.",
  },
  {
    q: "Which integrations exist?",
    a: "Telnyx, Google Sheets, Claude or Gemini, and CSV export in a HubSpot-compatible format. There is no native CRM sync, Zapier or Slack.",
  },
  {
    q: "How is it priced?",
    a: "Costs reflect usage. A usage ledger tracks voice minutes and SMS costs, and there is no subscription billing. Ask us about early access terms.",
  },
];

const extras = [
  {
    icon: ListChecks,
    title: "Campaigns",
    desc: "Manual or AI mode, retry logic, attempt caps, configurable timing and a filterable worklist.",
  },
  {
    icon: FileText,
    title: "Call scripts",
    desc: "Placeholders such as {name}, {category}, {city}, {rating}, {evidence} and {caller}.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    desc: "An append-only Do Not Contact list that is checked before contact.",
  },
  {
    icon: Clock,
    title: "Calling windows",
    desc: "8am to 9pm with a configurable timezone.",
  },
  {
    icon: Users,
    title: "Teams",
    desc: "Owner, admin and agent roles, invites, and per-org numbers and assistants.",
  },
  {
    icon: Phone,
    title: "Number pools",
    desc: "Pools of numbers with health monitoring.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function FeaturesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex w-full flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative w-full overflow-hidden bg-[#f8f9ff] pb-24">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-[#7c3aed]/10 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-[#630ed4]/5 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8">

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"Platform overview"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"Source leads, call them, qualify with AI,"}{" "}
                <span className="text-[#630ed4]">{"and follow up in one place."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Xovra is an AI-powered cold calling platform. It finds businesses on Google Maps, calls them from your browser or with an AI qualifier, helps you handle objections live, and keeps SMS follow-up and outcomes organized."}
              </p>

              <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#630ed4] px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#7c3aed]"
                >
                  Get Early Access
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e5eeff] px-6 py-4 text-sm font-semibold text-[#0b1c30] shadow-sm transition-all hover:bg-[#e3e0f1]"
                >
                  <Calendar className="h-5 w-5 text-[#630ed4]" />
                  Book a Demo
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#4a4455]">
                {heroBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <b.icon className="h-[18px] w-[18px] text-[#630ed4]" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative panel */}
            <div className="relative lg:col-span-5">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#630ed4]/20 to-[#eaddff]/40 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl bg-[#213145] p-6 text-[#eaf1ff] shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#630ed4] to-[#7c3aed]" />
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#630ed4]">
                      <panel.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{panel.title}</p>
                      <p className="text-xs text-[#d2bbff]">{panel.subtitle}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#630ed4]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d2bbff]">
                    Illustrative
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {panelRows.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-start gap-3 rounded-xl bg-white/5 p-3.5"
                    >
                      <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d2bbff]" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#d2bbff]">
                          {r.label}
                        </p>
                        <p className="text-sm leading-snug text-[#eaf1ff]">{r.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[11px] leading-relaxed text-[#d2bbff]/80">
                  {panel.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* AT A GLANCE                                                   */}
      {/* ============================================================ */}
      <section className="w-full bg-[#eff4ff] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              {"What Xovra is"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Focused on cold calling, not on everything"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaddff]">
                  <g.icon className="h-5 w-5 text-[#630ed4]" />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#0b1c30]">{g.title}</h3>
                <p className="text-sm leading-relaxed text-[#4a4455]">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CAPABILITIES                                                  */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              {"Features"}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Explore each part of the platform"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"Every feature below is part of the product today."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const inner = (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#630ed4]">
                      <cap.icon className="h-6 w-6 text-white" />
                    </div>
                    {cap.tag ? (
                      <span className="rounded-full bg-[#eaddff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#630ed4]">
                        {cap.tag}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0b1c30]">{cap.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a4455]">{cap.desc}</p>
                  {cap.href ? (
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#630ed4] transition-all group-hover:gap-2.5">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : null}
                </>
              );
              return cap.href ? (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {inner}
                </Link>
              ) : (
                <div key={cap.title} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                  */}
      {/* ============================================================ */}
      <section className="w-full bg-[#213145] py-24 text-[#eaf1ff]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#d2bbff]">
              {"How it fits together"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {"A day in the Xovra workflow"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl bg-white/5 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#630ed4]">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-[#d2bbff]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#eaf1ff]/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DEEP DIVES                                                    */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 sm:px-8">
          {dives.map((d, idx) => (
            <div
              key={d.title}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
                  {d.eyebrow}
                </span>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0b1c30]">
                  {d.title}
                </h2>
                <p className="mb-8 text-base leading-relaxed text-[#4a4455]">{d.desc}</p>
                <ul className="flex flex-col gap-5">
                  {d.points.map((p) => (
                    <li key={p.title} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaddff]">
                        <p.icon className="h-4 w-4 text-[#630ed4]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0b1c30]">{p.title}</p>
                        <p className="text-sm leading-relaxed text-[#4a4455]">{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl bg-[#e5eeff] p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]">
                      <d.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-bold text-[#0b1c30]">{d.panelTitle}</p>
                  </div>
                  <div className="flex flex-col gap-2.5 rounded-xl bg-[#213145] p-5 font-mono text-[13px] leading-relaxed text-[#eaf1ff]">
                    {d.panelLines.map((l) => (
                      <p key={l} className="break-words">
                        {l}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-[#4a4455]">
                    Illustrative example for explanation only.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* IS / IS NOT                                                   */}
      {/* ============================================================ */}
      <section className="w-full bg-[#eff4ff] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              Straight answers
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"What Xovra is, and is not"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"Clear boundaries up front, so you can decide if it fits."}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-[#0b1c30]">
                <CheckCircle className="h-5 w-5 text-[#630ed4]" />
                What it does
              </h3>
              <ul className="flex flex-col gap-3.5">
                {isList.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-[#4a4455]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#630ed4]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-[#0b1c30]">
                <XCircle className="h-5 w-5 text-[#4a4455]" />
                What it does not do
              </h3>
              <ul className="flex flex-col gap-3.5">
                {isNotList.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-[#4a4455]">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[#4a4455]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EXTRAS                                                        */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              {"Also included"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"The supporting pieces"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((e) => (
              <div key={e.title} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e3e0f1]">
                  <e.icon className="h-5 w-5 text-[#630ed4]" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-[#0b1c30]">{e.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a4455]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Questions about the platform"}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-bold text-[#0b1c30]">{f.q}</span>
                    {open ? (
                      <Minus className="h-4 w-4 shrink-0 text-[#630ed4]" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-[#630ed4]" />
                    )}
                  </button>
                  {open ? (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-[#4a4455]">{f.a}</div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA                                                           */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#630ed4] p-10 text-white shadow-xl md:p-20">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10 max-w-3xl">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#d2bbff]">
                {"Early access"}
              </span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {"Try the whole cold calling workflow"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"We will walk you through sourcing, calling, AI qualification and follow-up using your own niche."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0b1c30] shadow-md transition-all hover:bg-[#eaddff]"
                >
                  Get Early Access
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#213145]"
                >
                  <Calendar className="h-[18px] w-[18px]" />
                  Book a Demo
                </Link>
              </div>
              <p className="mt-6 flex items-center gap-2 text-[13px] text-[#eaddff]/90">
                <Info className="h-4 w-4 shrink-0" />
                {"Built on Telnyx. SMS requires 10DLC registration, completed with Telnyx."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
