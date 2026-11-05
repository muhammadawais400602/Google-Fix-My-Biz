"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Minus,
  ArrowRight,
  ArrowUpRight,
  Scale,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Info,
  Search,
  Target,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────────── */

type Status = "yes" | "partial" | "no" | "na";

type TableRow = {
  category: string;
  feature: string;
  xovra: string;
  dialStatus: Status;
  rival: string;
  rivalStatus: Status;
};

type HeroRow = { label: string; value: string; status: Status };

type Hero = {
  badge: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  note: string;
  rivalTag: string;
  rivalPill: string;
  rivalRows: HeroRow[];
  dialTag: string;
  dialPill: string;
  dialRows: HeroRow[];
  diffIntro: string;
  ctaHeading: string;
  ctaBody: string;
};

/* ─── Data ─────────────────────────────────────────────── */

const RIVAL = "CallTools";
const RIVAL_INITIALS = "CT";

const hero: Hero = {
  badge: "Honest comparison",
  titleLead: "CallTools is for call centers.",
  titleAccent: "Xovra is for revenue teams.",
  subtitle:
    "CallTools is established contact center software with predictive dialing and the operational tooling that large calling operations need. Xovra is a lightweight, browser-based platform for small teams: it finds leads on Google Maps, enriches them, and puts a rep or an AI qualifier on the call. They overlap on outbound calling and very little else.",
  note: "Usage-based pricing from $0.02/min. No subscription tiers.",
  rivalTag: "Contact center software",
  rivalPill: "Enterprise-scale",
  rivalRows: [
    {
      label: "Dialing",
      value: "Predictive and more",
      status: "yes",
    },
    {
      label: "Contact center tooling",
      value: "Extensive",
      status: "yes",
    },
    {
      label: "Lead sourcing",
      value: "Not the focus",
      status: "no",
    },
    {
      label: "Setup",
      value: "More involved",
      status: "partial",
    },
  ],
  dialTag: "AI cold calling",
  dialPill: "Lightweight",
  dialRows: [
    {
      label: "Dialing",
      value: "Manual + AI qualifier",
      status: "partial",
    },
    {
      label: "Contact center tooling",
      value: "Not offered",
      status: "no",
    },
    {
      label: "Lead sourcing",
      value: "Google Maps scraper",
      status: "yes",
    },
    {
      label: "Setup",
      value: "Browser-based",
      status: "yes",
    },
  ],
  diffIntro: "A call center and a small revenue team need different things from the same phone call.",
  ctaHeading: "Does your team need a call center, or a way to start calling?",
  ctaBody:
    "Xovra is in early access. Join the list, or book a demo and we will show you the path from a Google Maps scrape to a first call, in one browser tab.",
};

const shortAnswer = {
  heading: "Operational depth vs getting started quickly",
  intro:
    "CallTools has the depth of a contact center platform. Xovra has the simplicity of a single tool. Which one is better depends on the size of the operation.",
  rivalLabel: "Predictive dialer and call center platform",
  rivalBody:
    "Organizations running structured outbound or blended call center operations: agents, supervisors, queues and reporting. CallTools is designed for that environment, with dialing modes and administration that suit larger teams and compliance-heavy operations.",
  rivalBest: "Best when you run an actual call center and need its tooling.",
  dialLabel: "AI cold calling for small teams",
  dialBody:
    "Founders, agencies and small sales teams who want to start calling without a project. Xovra builds the lead list from Google Maps, enriches each lead, scores it with a pitch angle, and lets you call from the browser or run AI qualifier calls.",
  dialBest: "Best when you want leads and calling in one lightweight tool.",
};

const comparisonRows: TableRow[] = [
  {
    category: "Dialing",
    feature: "Predictive dialer",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Core capability",
    rivalStatus: "yes",
  },
  {
    category: "Dialing",
    feature: "Progressive / power dialing",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Available; confirm modes with vendor",
    rivalStatus: "yes",
  },
  {
    category: "Dialing",
    feature: "Manual one-at-a-time calling",
    xovra: "Yes, browser WebRTC softphone via Telnyx",
    dialStatus: "yes",
    rival: "Supported",
    rivalStatus: "yes",
  },
  {
    category: "Dialing",
    feature: "Runs in the browser",
    xovra: "Yes, no install",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "AI",
    feature: "AI qualifier calls",
    xovra: "Yes, Telnyx AI assistant that discloses it is AI",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "AI",
    feature: "Live AI rebuttals during calls",
    xovra: "Yes, Claude / Gemini",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Lead data",
    feature: "Google Maps lead scraper (niche + city)",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Lead data",
    feature: "Website audit and Google Ads detection",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Lead data",
    feature: "Instagram / Facebook / TikTok presence",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Lead data",
    feature: "Lead scoring with pitch angles",
    xovra: "RUNS_ADS, NO_SITE, WEAK_SITE, STRONG_SITE",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Contact center",
    feature: "Agent and supervisor administration",
    xovra: "Orgs, roles and invites",
    dialStatus: "partial",
    rival: "Extensive",
    rivalStatus: "yes",
  },
  {
    category: "Contact center",
    feature: "Inbound / ACD / IVR",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Contact center feature set; confirm modules",
    rivalStatus: "yes",
  },
  {
    category: "Contact center",
    feature: "Real-time and historical reporting",
    xovra: "Basic campaign views",
    dialStatus: "partial",
    rival: "Extensive",
    rivalStatus: "yes",
  },
  {
    category: "Contact center",
    feature: "Call recording",
    xovra: "Not currently offered",
    dialStatus: "no",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Messaging",
    feature: "Two-way SMS",
    xovra: "Yes, via Telnyx",
    dialStatus: "yes",
    rival: "Confirm current options",
    rivalStatus: "na",
  },
  {
    category: "Workflow",
    feature: "Campaign management",
    xovra: "Manual and AI modes",
    dialStatus: "yes",
    rival: "Extensive campaign tooling",
    rivalStatus: "yes",
  },
  {
    category: "Workflow",
    feature: "Call scripts with per-lead placeholders",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Workflow",
    feature: "Google Sheet integration",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Workflow",
    feature: "CRM integrations",
    xovra: "Not currently offered",
    dialStatus: "no",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Compliance",
    feature: "Suppression list",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Compliance",
    feature: "Calling windows (8am to 9pm) and attempt caps",
    xovra: "Yes, enforced in campaigns",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Compliance",
    feature: "AI disclosure on AI calls",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "N/A",
    rivalStatus: "na",
  },
  {
    category: "Compliance",
    feature: "SOC 2 report",
    xovra: "Not available",
    dialStatus: "no",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Teams",
    feature: "Number pools with health monitoring",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Pricing",
    feature: "Pricing model",
    xovra: "Usage-based: $0.02/min manual, $0.25/min AI, $0.03/SMS",
    dialStatus: "yes",
    rival: "Contact CallTools for pricing",
    rivalStatus: "na",
  },
];

const differences = [
  {
    num: "01",
    title: "Who the product is designed for",
    rival:
      "CallTools is designed for call centers: many agents, supervisors, queues, dialing modes and reporting. That scope is a strength if you need it and overhead if you do not.",
    xovra:
      "Xovra is designed for a founder, an agency or a small sales team. There is no contact center administration to learn. You scrape leads, write a script and start calling from a browser tab.",
  },
  {
    num: "02",
    title: "Dialing modes",
    rival:
      "Predictive and other automated dialing modes exist to keep agents on live conversations. For a team with enough agents and a large enough list, that matters a lot.",
    xovra:
      "Xovra has manual calling, one lead at a time, and an AI mode where an AI assistant makes qualifier calls. There is no predictive or power dialer, so it is not built to keep a bank of agents saturated.",
  },
  {
    num: "03",
    title: "Setup and onboarding",
    rival:
      "Contact center platforms typically involve configuration of queues, dispositions, users, telephony and compliance rules. Expect an implementation effort proportional to the product's depth.",
    xovra:
      "Xovra is browser-based and runs on Telnyx. Create an organization, invite teammates with roles, set up a number pool and a campaign. It is a smaller surface, which is also why it does less.",
  },
  {
    num: "04",
    title: "Lead sourcing",
    rival: "CallTools works on lists you load. Where the leads come from is outside the product.",
    xovra:
      "Xovra sources leads itself via the Google Maps scraper, then enriches them with website audit, Google Ads detection and social presence, and scores them with a pitch angle. For a team selling to local businesses, this replaces a research step.",
  },
  {
    num: "05",
    title: "Pricing structure",
    rival:
      "Contact center software is usually sold per seat or per package, and pricing depends on your requirements. We are not going to guess at numbers, so contact CallTools for a quote.",
    xovra:
      "Xovra is usage-based with no subscription tiers: $0.02 per minute manual, $0.25 per minute AI and $0.03 per SMS. There is no seat minimum to size in advance, which suits small or variable usage.",
  },
];

const rivalStrengths = {
  intro: "On enterprise features, CallTools is the stronger platform. Xovra is not trying to match it.",
  items: [
    {
      title: "Predictive and automated dialing",
      body: "Xovra has no predictive, power or progressive dialer. If your operation depends on keeping many agents continuously connected to live calls, CallTools is built for that and Xovra is not.",
    },
    {
      title: "Contact center administration and reporting",
      body: "Queues, supervisor tools and deep reporting are part of what a call center platform provides. Xovra offers organizations, roles, invites and campaign views, which is far lighter.",
    },
    {
      title: "Scale and operational maturity",
      body: "CallTools serves larger and more regulated calling operations. Xovra is newer, in early access, and aimed at small teams.",
    },
    {
      title: "A broader telephony feature set",
      body: "Inbound handling, call routing and similar capabilities are the domain of contact center software. Xovra focuses on outbound cold calling and SMS.",
    },
  ],
};

const workflowSteps = {
  heading: "What getting started with Xovra looks like",
  intro:
    "The pitch for Xovra is a short path from nothing to a conversation. Here are the steps, based on what exists today.",
  items: [
    {
      tag: "Account",
      title: "Create an organization",
      body: "Set up your org, invite teammates and assign roles. It is multi-tenant, so an agency can keep clients separate.",
    },
    {
      tag: "Numbers",
      title: "Set up a number pool",
      body: "Use Telnyx numbers in a pool with health monitoring, so you can see when a number is in trouble.",
    },
    {
      tag: "Source",
      title: "Scrape and enrich leads",
      body: "Pick a niche and city. Xovra builds the list from Google Maps, audits websites, detects Google Ads and finds social profiles.",
    },
    {
      tag: "Script",
      title: "Write a script",
      body: "Use per-lead placeholders so each call opens with the right business details.",
    },
    {
      tag: "Campaign",
      title: "Choose manual or AI mode",
      body: "Set your calling window, attempt cap and suppression list. AI mode uses a Telnyx AI assistant that discloses it is AI.",
    },
    {
      tag: "Call",
      title: "Dial from the browser",
      body: "Use the WebRTC softphone, get live rebuttal suggestions when you need them and follow up by two-way SMS.",
    },
  ],
};

const rivalPricing = {
  title: "Quoted to your requirements",
  body: "Call center software like CallTools is typically priced based on seats, modules and requirements. We will not guess at figures, and any number we printed could be out of date.",
  points: [
    "Contact CallTools for a quote.",
    "Pricing varies with seats and the modules you need.",
    "Lead lists and telephony costs may be separate.",
  ],
};

const xovraRates = [
  {
    label: "Manual calling",
    price: "$0.02",
    unit: "per minute",
    body: "Browser softphone calls placed one at a time over Telnyx, with the lead's enrichment data on screen.",
  },
  {
    label: "AI qualifier calls",
    price: "$0.25",
    unit: "per minute",
    body: "Telnyx AI assistant calls that disclose they are AI and qualify the lead against your script.",
  },
  {
    label: "SMS",
    price: "$0.03",
    unit: "per message",
    body: "Two-way SMS over Telnyx for follow-up and replies, inside the same lead record.",
  },
];

const useCases = [
  {
    title: "A staffed outbound call center",
    winner: "CallTools",
    rival:
      "This is the target environment: many agents, supervisors, predictive dialing and detailed reporting.",
    xovra:
      "Not a fit. Xovra has no predictive dialer, and its administration and reporting are far lighter.",
  },
  {
    title: "A founder or small team starting outbound",
    winner: "Xovra",
    rival:
      "A platform of this size can be more than a team of one to five needs, and you still have to find the leads.",
    xovra:
      "Scrape, enrich, script and call from one browser tab, paying per minute with no seat commitments.",
  },
  {
    title: "An agency selling to local businesses",
    winner: "Xovra",
    rival: "Bring your own list and research each business separately.",
    xovra:
      "Google Maps sourcing, website and ad audits and pitch angles are built in. Multi-tenant orgs and roles help an agency keep clients apart.",
  },
  {
    title: "Regulated, audit-heavy operations",
    winner: "CallTools",
    rival:
      "Confirm its compliance and audit capabilities directly. A mature platform is more likely to meet formal requirements.",
    xovra:
      "Xovra has suppression, calling windows, attempt caps and AI disclosure, but it has no SOC 2 report and no call recording. If you need either, do not rely on it.",
  },
  {
    title: "Variable or seasonal calling volume",
    winner: "Xovra",
    rival:
      "Seat-based pricing means paying for capacity whether you use it or not. Confirm the terms with the vendor.",
    xovra: "Usage-based pricing means you pay for the minutes and messages you actually use.",
  },
];

const switchingSteps = {
  heading: "If you are weighing the two",
  intro:
    "These are not interchangeable, so the decision is usually about scale and requirements. A short checklist helps.",
  items: [
    {
      title: "Count your agents",
      body: "A bank of agents working a large list is call center territory. One to a handful of people calling prepared leads is where Xovra makes sense.",
    },
    {
      title: "List your hard requirements",
      body: "Predictive dialing, inbound handling, call recording, CRM integrations and SOC 2 are things Xovra does not provide today. If any is a must, rule it out early.",
    },
    {
      title: "Decide where leads come from",
      body: "If you need lead sourcing, Xovra includes it for local businesses via Google Maps. If your lists come from elsewhere, that benefit does not apply.",
    },
    {
      title: "Think about how fast you need to start",
      body: "A browser tool can be running in an afternoon. A contact center implementation is a project.",
    },
    {
      title: "Test with real calls",
      body: "With usage-based pricing, you can try Xovra on a small batch and see if the lightweight approach is enough.",
    },
  ],
};

const chooseRival = [
  "You operate a call center with many agents and supervisors",
  "You need predictive or other automated dialing modes",
  "You need deep reporting, queues and contact center administration",
  "You have formal compliance or audit requirements",
  "Your leads already come from another source",
];

const chooseXovra = [
  "You are a small team that wants to start calling quickly",
  "You sell to local businesses and want lead sourcing built in",
  "You want AI qualifier calls with clear AI disclosure",
  "You want enrichment and pitch angles on every lead",
  "You prefer usage-based pricing over seats or packages",
  "You do not need predictive dialing, recording or CRM integrations",
];

const faqItems = [
  {
    question: "Does Xovra have a predictive dialer?",
    answer:
      "No. Xovra has manual one-at-a-time calling and an AI mode for qualifier calls. There is no predictive, power or progressive dialer. If you need one, CallTools is the better fit.",
  },
  {
    question: "Is Xovra a call center platform?",
    answer:
      "No. It is an AI-powered cold calling platform for small teams. It has organizations, roles and invites, but it does not provide queues, inbound routing or the supervisor tooling of a contact center.",
  },
  {
    question: "How is Xovra priced compared with CallTools?",
    answer:
      "Xovra is usage-based: $0.02 per minute manual, $0.25 per minute AI and $0.03 per SMS, with no subscription tiers. CallTools pricing depends on your requirements, so contact them for a quote. We do not publish a savings comparison.",
  },
  {
    question: "Does Xovra record calls?",
    answer:
      "Not currently. Call recording is not offered. If you need recordings for quality or compliance, that is a reason to look elsewhere.",
  },
  {
    question: "Does Xovra integrate with my CRM?",
    answer:
      "Not currently. There are no CRM integrations. There is a Google Sheet integration for moving lead data.",
  },
  {
    question: "Is Xovra SOC 2 certified?",
    answer:
      "No. Xovra does not have a SOC 2 report. Its compliance features are guardrails inside campaigns: suppression, 8am to 9pm calling windows, attempt caps and AI disclosure.",
  },
  {
    question: "Can a team share Xovra?",
    answer:
      "Yes. It is multi-tenant, with organizations, roles and invites, and number pools with health monitoring.",
  },
  {
    question: "How do I get started?",
    answer:
      "Xovra is in early access. Use the Get Early Access button, or book a demo and we will show you the flow from a Google Maps scrape to a call.",
  },
];

const relatedComparisons = [
  {
    href: "/compare/xovra-vs-mojo-dialer",
    label: "Xovra vs Mojo Dialer",
    blurb: "Multi-line power dialing vs AI-assisted calling with lead sourcing.",
  },
  {
    href: "/compare/xovra-vs-drop-cowboy",
    label: "Xovra vs Drop Cowboy",
    blurb: "Voicemail drops vs live conversations.",
  },
  {
    href: "/compare/xovra-vs-slybroadcast",
    label: "Xovra vs Slybroadcast",
    blurb: "Voicemail-only service vs AI cold calling.",
  },
];

const xovraPillars = [
  {
    icon: MapPin,
    title: "Built-in lead sourcing",
    body: "Scrape Google Maps by niche and city, so the list lives in the same product as the calls.",
  },
  {
    icon: Search,
    title: "Enrichment before the dial",
    body: "Website audit, Google Ads detection, and Instagram, Facebook and TikTok presence on every lead.",
  },
  {
    icon: Target,
    title: "Scores and pitch angles",
    body: "Each lead is tagged RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE so you know what to open with.",
  },
  {
    icon: Phone,
    title: "Browser WebRTC softphone",
    body: "Manual one-at-a-time calling in the browser through Telnyx. No hardware, no install.",
  },
  {
    icon: Sparkles,
    title: "AI qualifier and live rebuttals",
    body: "A Telnyx AI assistant that discloses it is AI, plus Claude/Gemini rebuttal suggestions during live calls.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance guardrails",
    body: "Suppression list, 8am to 9pm calling windows, attempt caps and AI disclosure built into campaigns.",
  },
];

const statusMeta: Record<Status, { label: string; cls: string }> = {
  yes: { label: "Yes", cls: "text-emerald-600" },
  partial: { label: "Partial", cls: "text-amber-600" },
  no: { label: "No", cls: "text-rose-500" },
  na: { label: "Varies", cls: "text-[#4a4455]" },
};

/* ─── Helpers ──────────────────────────────────────────── */

function StatusIcon({ status, className }: { status: Status; className?: string }) {
  const cls = className ?? "w-4 h-4";
  if (status === "yes") return <Check className={cls + " text-emerald-600"} />;
  if (status === "partial") return <Minus className={cls + " text-amber-600"} />;
  if (status === "no") return <X className={cls + " text-rose-500"} />;
  return <Info className={cls + " text-[#4a4455]"} />;
}

/* ─── Component ────────────────────────────────────────── */

export default function XovraVsCallToolsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(comparisonRows.map((r) => r.category)))];
  const visibleRows =
    category === "All" ? comparisonRows : comparisonRows.filter((r) => r.category === category);

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] antialiased min-h-screen selection:bg-[#eaddff] selection:text-[#630ed4]">
      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[#4a4455]">
          <Link href="/" className="hover:text-[#630ed4]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Comparisons</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0b1c30] font-medium">Xovra vs {RIVAL}</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaddff] text-[#630ed4] text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5" />
            {hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#0b1c30] font-extrabold tracking-tight mb-6 leading-[1.12]">
            {hero.titleLead} <span className="text-[#630ed4]">{hero.titleAccent}</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#4a4455] max-w-3xl mx-auto mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#630ed4] hover:bg-[#7c3aed] text-white font-bold text-base shadow-lg shadow-[#630ed4]/20 transition-colors"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#comparison-table"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white border border-[#e3e0f1] text-[#0b1c30] hover:bg-[#eff4ff] font-bold text-base transition-colors"
            >
              Jump to the Feature Table
            </a>
          </div>
          <p className="text-xs sm:text-sm text-[#4a4455] font-medium">{hero.note}</p>

          {/* SIDE BY SIDE PREVIEW */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-[#e3e0f1] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5eeff]">
                <div>
                  <span className="text-xs font-semibold text-[#4a4455] uppercase tracking-wider">
                    {hero.rivalTag}
                  </span>
                  <h3 className="text-xl font-bold text-[#0b1c30]">{RIVAL}</h3>
                </div>
                <span className="text-xs bg-[#e5eeff] text-[#213145] px-2.5 py-1 rounded font-medium">
                  {hero.rivalPill}
                </span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm">
                {hero.rivalRows.map((row: HeroRow) => (
                  <div
                    key={row.label}
                    className="p-3 bg-[#f8f9ff] rounded-lg flex items-center justify-between gap-3"
                  >
                    <span className="font-medium text-[#0b1c30]">{row.label}</span>
                    <span
                      className={
                        "flex items-center gap-1 text-right font-semibold " + statusMeta[row.status].cls
                      }
                    >
                      <StatusIcon status={row.status} className="w-3.5 h-3.5 shrink-0" />
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#213145] text-[#eaf1ff] border border-[#630ed4]/40 shadow-xl shadow-[#630ed4]/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7c3aed]/30 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between pb-4 border-b border-[#eaf1ff]/15 relative z-10">
                <div>
                  <span className="text-xs font-semibold text-[#d2bbff] uppercase tracking-wider">
                    {hero.dialTag}
                  </span>
                  <h3 className="text-xl font-bold text-white">Xovra</h3>
                </div>
                <span className="text-xs bg-[#630ed4] text-white px-2.5 py-1 rounded font-medium">
                  {hero.dialPill}
                </span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm relative z-10">
                {hero.dialRows.map((row: HeroRow) => (
                  <div
                    key={row.label}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between gap-3"
                  >
                    <span className="text-[#eaf1ff]">{row.label}</span>
                    <span
                      className={
                        "flex items-center gap-1 text-right font-semibold " +
                        (row.status === "yes"
                          ? "text-emerald-400"
                          : row.status === "no"
                            ? "text-rose-300"
                            : "text-[#d2bbff]")
                      }
                    >
                      <StatusIcon status={row.status} className="w-3.5 h-3.5 shrink-0" />
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT ANSWER */}
      <section className="py-16 bg-white border-y border-[#e3e0f1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaddff] text-[#630ed4] text-xs font-bold uppercase tracking-wider mb-3">
              The short answer
            </div>
            <h2 className="text-3xl sm:text-4xl text-[#0b1c30] font-bold tracking-tight">
              {shortAnswer.heading}
            </h2>
            <p className="mt-4 text-[#4a4455] max-w-2xl mx-auto">{shortAnswer.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#eff4ff] border border-[#e3e0f1] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#213145] text-[#eaf1ff] flex items-center justify-center font-bold">
                    {RIVAL_INITIALS}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c30]">{RIVAL} is for</h3>
                    <span className="text-xs text-[#4a4455] font-medium">{shortAnswer.rivalLabel}</span>
                  </div>
                </div>
                <p className="text-[#4a4455] leading-relaxed">{shortAnswer.rivalBody}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e3e0f1] flex items-start gap-2 text-xs font-semibold text-[#213145]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#213145] mt-1.5 shrink-0" />
                {shortAnswer.rivalBest}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#eaddff]/40 border border-[#d2bbff] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#630ed4] text-white flex items-center justify-center font-bold">
                    DL
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c30]">Xovra is for</h3>
                    <span className="text-xs text-[#630ed4] font-semibold">{shortAnswer.dialLabel}</span>
                  </div>
                </div>
                <p className="text-[#4a4455] leading-relaxed">{shortAnswer.dialBody}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d2bbff] flex items-start gap-2 text-xs font-bold text-[#630ed4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#630ed4] mt-1.5 shrink-0" />
                {shortAnswer.dialBest}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT XOVRA ACTUALLY INCLUDES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              What Xovra actually includes
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
              Xovra is an AI-powered cold calling platform. Here is the product, stated plainly, so the
              comparison below has something concrete to measure against.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {xovraPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-6 rounded-2xl bg-white border border-[#e3e0f1] shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#eaddff] text-[#630ed4] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0b1c30] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#4a4455] leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-[#eff4ff] border border-[#e3e0f1] flex items-start gap-3 text-sm text-[#4a4455]">
            <Info className="w-4 h-4 text-[#630ed4] mt-0.5 shrink-0" />
            <p>
              Also included: campaign management (manual and AI modes), call scripts with per-lead
              placeholders, Google Sheet integration, number pools with health monitoring, and multi-tenant
              organizations with roles and invites.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        id="comparison-table"
        className="py-16 bg-white border-y border-[#e3e0f1] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              Feature-by-feature comparison
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
              Including the rows where Xovra says no. A comparison that only lists wins is not much use.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={
                  "px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors " +
                  (category === c
                    ? "bg-[#630ed4] text-white border-[#630ed4]"
                    : "bg-white text-[#4a4455] border-[#e3e0f1] hover:bg-[#eff4ff]")
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e3e0f1] shadow-sm">
            <table className="w-full min-w-[720px] text-sm text-left">
              <thead>
                <tr className="bg-[#213145] text-[#eaf1ff]">
                  <th className="px-5 py-4 font-semibold w-[34%]">Feature</th>
                  <th className="px-5 py-4 font-semibold w-[33%] text-[#d2bbff]">Xovra</th>
                  <th className="px-5 py-4 font-semibold w-[33%]">{RIVAL}</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={(i % 2 === 0 ? "bg-white" : "bg-[#f8f9ff]") + " border-t border-[#e3e0f1]"}
                  >
                    <td className="px-5 py-3.5 font-medium text-[#0b1c30]">
                      {row.feature}
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4a4455]/70 mt-0.5">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={"flex items-start gap-2 " + statusMeta[row.dialStatus].cls}>
                        <StatusIcon status={row.dialStatus} className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="text-[#0b1c30]">{row.xovra}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={"flex items-start gap-2 " + statusMeta[row.rivalStatus].cls}>
                        <StatusIcon status={row.rivalStatus} className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="text-[#0b1c30]">{row.rival}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#4a4455]">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Included
            </span>
            <span className="flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-amber-600" /> Partial or limited
            </span>
            <span className="flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-rose-500" /> Not offered
            </span>
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#4a4455]" /> Varies or confirm with vendor
            </span>
          </div>
          <p className="mt-4 text-xs text-[#4a4455] text-center max-w-3xl mx-auto">
            {RIVAL} details reflect its general public positioning and may change. Confirm current features
            and pricing with {RIVAL} directly before you decide.
          </p>
        </div>
      </section>

      {/* DEEP DIVES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              Where the two approaches really differ
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">{hero.diffIntro}</p>
          </div>
          <div className="space-y-8">
            {differences.map((d) => (
              <div
                key={d.num}
                className="rounded-2xl bg-white border border-[#e3e0f1] shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-4 px-6 py-4 bg-[#e5eeff] border-b border-[#e3e0f1]">
                  <span className="text-2xl font-extrabold text-[#630ed4]">{d.num}</span>
                  <h3 className="text-lg font-bold text-[#0b1c30]">{d.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 md:border-r border-[#e3e0f1]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#4a4455] mb-2">
                      {RIVAL}
                    </div>
                    <p className="text-[#4a4455] leading-relaxed">{d.rival}</p>
                  </div>
                  <div className="p-6 bg-[#f8f9ff]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#630ed4] mb-2">
                      Xovra
                    </div>
                    <p className="text-[#0b1c30] leading-relaxed">{d.xovra}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE RIVAL IS STRONGER */}
      <section className="py-16 bg-[#213145] text-[#eaf1ff] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#d2bbff] text-xs font-bold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" />
              Being straight with you
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Where {RIVAL} is stronger
            </h2>
            <p className="mt-3 text-[#eaf1ff]/80 max-w-2xl mx-auto">{rivalStrengths.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rivalStrengths.items.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-[#eaf1ff]/80 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              {workflowSteps.heading}
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">{workflowSteps.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workflowSteps.items.map((s, i) => (
              <div key={s.title} className="p-6 rounded-2xl bg-white border border-[#e3e0f1] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-extrabold text-[#630ed4]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#e3e0f1] text-[#213145] px-2 py-0.5 rounded">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-bold text-[#0b1c30] mb-2">{s.title}</h3>
                <p className="text-sm text-[#4a4455] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING MODELS */}
      <section className="py-16 bg-white border-y border-[#e3e0f1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              How pricing works on each side
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
              We are not going to invent a savings number. The two products are priced differently because
              they do different jobs, so the useful question is which model matches how you work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#eff4ff] border border-[#e3e0f1]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#4a4455] mb-1">{RIVAL}</div>
              <h3 className="text-xl font-bold text-[#0b1c30] mb-3">{rivalPricing.title}</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed mb-4">{rivalPricing.body}</p>
              <ul className="space-y-2">
                {rivalPricing.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-[#4a4455]">
                    <Info className="w-4 h-4 text-[#4a4455] mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 p-6 rounded-2xl bg-[#213145] text-[#eaf1ff]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d2bbff] mb-1">Xovra</div>
              <h3 className="text-xl font-bold text-white mb-1">Usage-based, no subscription tiers</h3>
              <p className="text-sm text-[#eaf1ff]/80 mb-5">
                You pay for the minutes and messages you use. Nothing else is bundled into a plan you have to
                size up front.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {xovraRates.map((r) => (
                  <div key={r.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-semibold text-[#d2bbff] mb-1">{r.label}</div>
                    <div className="text-3xl font-extrabold text-white leading-none">{r.price}</div>
                    <div className="text-xs text-[#eaf1ff]/70 mb-2">{r.unit}</div>
                    <p className="text-xs text-[#eaf1ff]/80 leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/pricing"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d2bbff] hover:text-white"
              >
                See the full pricing page
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              Which one fits which situation
            </h2>
          </div>
          <div className="space-y-5">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl bg-white border border-[#e3e0f1] shadow-sm p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg font-bold text-[#0b1c30]">{u.title}</h3>
                  <span
                    className={
                      "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full " +
                      (u.winner === "Xovra"
                        ? "bg-[#eaddff] text-[#630ed4]"
                        : u.winner === RIVAL
                          ? "bg-[#213145] text-[#eaf1ff]"
                          : "bg-[#e3e0f1] text-[#213145]")
                    }
                  >
                    {u.winner === "Either" ? "Either can work" : "Better fit: " + u.winner}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-[#f8f9ff]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#4a4455] mb-1.5">
                      {RIVAL}
                    </div>
                    <p className="text-[#4a4455] leading-relaxed">{u.rival}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#eaddff]/40">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#630ed4] mb-1.5">
                      Xovra
                    </div>
                    <p className="text-[#0b1c30] leading-relaxed">{u.xovra}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SWITCHING / GETTING STARTED */}
      <section className="py-16 bg-white border-y border-[#e3e0f1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              {switchingSteps.heading}
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">{switchingSteps.intro}</p>
          </div>
          <ol className="space-y-4">
            {switchingSteps.items.map((s, i) => (
              <li key={s.title} className="flex gap-4 p-5 rounded-2xl bg-[#f8f9ff] border border-[#e3e0f1]">
                <div className="w-9 h-9 rounded-full bg-[#630ed4] text-white font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-[#0b1c30] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#4a4455] leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CHOOSE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              So which should you choose?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-[#e3e0f1] shadow-sm">
              <h3 className="text-xl font-bold text-[#0b1c30] mb-4">Choose {RIVAL} if</h3>
              <ul className="space-y-3">
                {chooseRival.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-[#4a4455] leading-relaxed">
                    <Check className="w-4 h-4 text-[#213145] mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-2xl bg-[#eaddff]/40 border border-[#d2bbff] shadow-sm">
              <h3 className="text-xl font-bold text-[#0b1c30] mb-4">Choose Xovra if</h3>
              <ul className="space-y-3">
                {chooseXovra.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-[#0b1c30] leading-relaxed">
                    <Check className="w-4 h-4 text-[#630ed4] mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-y border-[#e3e0f1] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1c30]">
              Xovra vs {RIVAL}: common questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.question}
                  className="rounded-xl border border-[#e3e0f1] bg-[#f8f9ff] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-[#0b1c30] hover:bg-[#eff4ff]"
                  >
                    {f.question}
                    <ChevronDown
                      className={
                        "w-5 h-5 shrink-0 text-[#630ed4] transition-transform " + (open ? "rotate-180" : "")
                      }
                    />
                  </button>
                  {open && <div className="px-5 pb-5 text-sm text-[#4a4455] leading-relaxed">{f.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center rounded-3xl bg-[#213145] text-[#eaf1ff] px-6 py-14 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#7c3aed]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              {hero.ctaHeading}
            </h2>
            <p className="text-[#eaf1ff]/80 max-w-2xl mx-auto mb-8">{hero.ctaBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#7c3aed] hover:bg-[#630ed4] text-white font-bold transition-colors"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#e3e0f1] text-[#213145] hover:bg-white font-bold transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-[#0b1c30] mb-4">More comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedComparisons.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group p-5 rounded-2xl bg-white border border-[#e3e0f1] hover:border-[#630ed4] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0b1c30]">{r.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#630ed4]" />
                </div>
                <p className="mt-1.5 text-sm text-[#4a4455]">{r.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
