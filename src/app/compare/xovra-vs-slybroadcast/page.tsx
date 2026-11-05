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

const RIVAL = "Slybroadcast";
const RIVAL_INITIALS = "SB";

const hero: Hero = {
  badge: "Honest comparison",
  titleLead: "Slybroadcast drops voicemails.",
  titleAccent: "Xovra has real conversations.",
  subtitle:
    "Slybroadcast is a voicemail broadcasting service: record a message, pick a list, and it lands in voicemail boxes. Xovra is an AI-powered cold calling platform for teams that want to talk to the prospect. This page lays out how they differ and who each is for.",
  note: "Usage-based pricing from $0.02/min. No subscription tiers.",
  rivalTag: "Voicemail broadcasting",
  rivalPill: "Voicemail-only",
  rivalRows: [
    {
      label: "Core product",
      value: "Voicemail delivery",
      status: "yes",
    },
    {
      label: "Live calling",
      value: "Not offered",
      status: "no",
    },
    {
      label: "Lead sourcing",
      value: "Bring your own list",
      status: "no",
    },
    {
      label: "Pricing",
      value: "See vendor",
      status: "na",
    },
  ],
  dialTag: "AI cold calling",
  dialPill: "Conversation-first",
  dialRows: [
    {
      label: "Core product",
      value: "Calls + AI qualifier",
      status: "yes",
    },
    {
      label: "Live calling",
      value: "Browser softphone",
      status: "yes",
    },
    {
      label: "Lead sourcing",
      value: "Google Maps scraper",
      status: "yes",
    },
    {
      label: "Voicemail drops",
      value: "Not offered",
      status: "no",
    },
  ],
  diffIntro: "Five differences between broadcasting a voicemail and starting a conversation.",
  ctaHeading: "Ready to talk to prospects instead of leaving messages?",
  ctaBody:
    "Xovra is in early access. Join the list, or book a demo and we will walk through scraping a niche, enriching the leads and making a first call.",
};

const shortAnswer = {
  heading: "Two different strategies for reaching a prospect",
  intro:
    "One sends a recorded message and waits. The other puts a person or an AI assistant on the phone with the prospect.",
  rivalLabel: "Voicemail broadcasting",
  rivalBody:
    "Senders who want a recorded message delivered to many voicemail boxes: reminders, announcements, outreach where a callback is the desired outcome. It is a simple, focused service for that purpose.",
  rivalBest: "Best when the message matters more than the conversation.",
  dialLabel: "AI-powered cold calling platform",
  dialBody:
    "Teams that want to speak with prospects. Xovra scrapes Google Maps for local businesses, enriches and scores each lead, and supports manual browser calls, AI qualifier calls and two-way SMS follow-up in one place.",
  dialBest: "Best when the goal is a conversation and a qualified lead.",
};

const comparisonRows: TableRow[] = [
  {
    category: "Core model",
    feature: "Primary channel",
    xovra: "Live calls and SMS",
    dialStatus: "yes",
    rival: "Voicemail broadcast",
    rivalStatus: "yes",
  },
  {
    category: "Core model",
    feature: "Voicemail drop / ringless voicemail",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Core feature",
    rivalStatus: "yes",
  },
  {
    category: "Core model",
    feature: "Live outbound phone calls",
    xovra: "Yes, browser WebRTC softphone via Telnyx",
    dialStatus: "yes",
    rival: "Not offered",
    rivalStatus: "no",
  },
  {
    category: "Lead sourcing",
    feature: "Google Maps lead scraper (niche + city)",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No, bring your own list",
    rivalStatus: "no",
  },
  {
    category: "Lead sourcing",
    feature: "Website audit and Google Ads detection",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Lead sourcing",
    feature: "Instagram / Facebook / TikTok presence",
    xovra: "Built in",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Lead sourcing",
    feature: "Lead scoring with pitch angles",
    xovra: "RUNS_ADS, NO_SITE, WEAK_SITE, STRONG_SITE",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Calling",
    feature: "Manual one-at-a-time calling",
    xovra: "Yes, with lead context on screen",
    dialStatus: "yes",
    rival: "N/A",
    rivalStatus: "na",
  },
  {
    category: "Calling",
    feature: "AI qualifier calls",
    xovra: "Yes, Telnyx AI assistant that discloses it is AI",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Calling",
    feature: "Live AI rebuttals during calls",
    xovra: "Yes, Claude / Gemini",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Calling",
    feature: "Power or predictive dialer",
    xovra: "No",
    dialStatus: "no",
    rival: "No",
    rivalStatus: "no",
  },
  {
    category: "Calling",
    feature: "Call recording",
    xovra: "Not currently offered",
    dialStatus: "no",
    rival: "N/A",
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
    rival: "Broadcast campaigns",
    rivalStatus: "yes",
  },
  {
    category: "Workflow",
    feature: "Call scripts with per-lead placeholders",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Recorded audio, not scripts",
    rivalStatus: "partial",
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
    category: "Teams",
    feature: "Multi-tenant orgs, roles and invites",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Teams",
    feature: "Number pools with health monitoring",
    xovra: "Yes",
    dialStatus: "yes",
    rival: "N/A",
    rivalStatus: "na",
  },
  {
    category: "Pricing",
    feature: "Pricing model",
    xovra: "Usage-based: $0.02/min manual, $0.25/min AI, $0.03/SMS",
    dialStatus: "yes",
    rival: "See Slybroadcast for current pricing",
    rivalStatus: "na",
  },
];

const differences = [
  {
    num: "01",
    title: "Broadcasting a recording vs holding a conversation",
    rival:
      "Slybroadcast delivers a recorded message to voicemail boxes. The sender speaks once and the recipient listens, or does not, later. Nothing the prospect says can change what happens next on the call.",
    xovra:
      "Xovra is built for the exchange. A rep calls from the browser or an AI qualifier calls and asks your questions. You hear the answer, handle the objection and decide the next step while the prospect is still on the line.",
  },
  {
    num: "02",
    title: "Where the list comes from",
    rival: "You supply the contact list. Building and researching it is a separate task, done elsewhere.",
    xovra:
      "The Google Maps scraper builds a list from a niche and a city. Enrichment then adds a website audit, Google Ads detection and Instagram, Facebook and TikTok presence, and every lead gets a pitch angle: RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE.",
  },
  {
    num: "03",
    title: "Personalization",
    rival:
      "A single recorded message goes to everyone on the list, so the content stays the same across recipients.",
    xovra:
      "Call scripts take per-lead placeholders, and the lead's enrichment data is on screen during the call. The opener can reference the business and what it is actually doing online.",
  },
  {
    num: "04",
    title: "Learning whether the lead is interested",
    rival:
      "After a broadcast, interest shows up as callbacks. If nobody calls back, you do not know whether the message was heard.",
    xovra:
      "On a call or an AI qualifier call, you learn the answer directly. Two-way SMS then lets you follow up and read replies in the same lead record.",
  },
  {
    num: "05",
    title: "Guardrails",
    rival:
      "Compliance controls for voicemail broadcasting are the sender's responsibility. Confirm what the service provides directly.",
    xovra:
      "Campaigns include a suppression list, 8am to 9pm calling windows, attempt caps and AI disclosure on AI calls. These help, but they are guardrails and not legal advice.",
  },
];

const rivalStrengths = {
  intro: "If voicemail broadcast is the plan, Slybroadcast does the thing Xovra deliberately does not do.",
  items: [
    {
      title: "Voicemail delivery is the product",
      body: "Xovra has no voicemail drop feature. If you need a recorded message pushed to many voicemail boxes, Slybroadcast is the relevant service and Xovra is not a substitute.",
    },
    {
      title: "Focused and simple",
      body: "A single-purpose service is easy to understand: record, choose a list, send. Xovra is a broader platform with more to learn.",
    },
    {
      title: "No rep or AI minutes needed",
      body: "A broadcast does not need anyone on the line, so it can reach a list without staff time. Xovra calls take a rep's time or per-minute AI usage.",
    },
    {
      title: "Fits announcement-style messaging",
      body: "Reminders, notices and one-way messages do not need a conversation. For those, voicemail broadcast can be enough.",
    },
  ],
};

const workflowSteps = {
  heading: "What a Xovra workflow looks like",
  intro:
    "Xovra goes from list building to follow-up inside one product. Here is the flow, using only features that exist today.",
  items: [
    {
      tag: "Source",
      title: "Scrape local businesses",
      body: "Enter a niche and a city. The Google Maps scraper builds your lead list.",
    },
    {
      tag: "Enrich",
      title: "See what each business is doing online",
      body: "Website audit, Google Ads detection and Instagram, Facebook and TikTok presence are attached to each lead.",
    },
    {
      tag: "Score",
      title: "Pick the right angle",
      body: "Pitch angles RUNS_ADS, NO_SITE, WEAK_SITE and STRONG_SITE tell you what to lead with.",
    },
    {
      tag: "Script",
      title: "Prepare a script",
      body: "Add per-lead placeholders so the script adapts to each business.",
    },
    {
      tag: "Call",
      title: "Talk to them",
      body: "Dial manually from the browser, or run an AI-mode campaign where a Telnyx AI assistant makes qualifier calls and discloses that it is AI.",
    },
    {
      tag: "Follow up",
      title: "Text and track",
      body: "Two-way SMS keeps the conversation going in the same record, within calling windows and attempt caps.",
    },
  ],
};

const rivalPricing = {
  title: "Priced around message delivery",
  body: "Voicemail broadcast services typically charge based on how many messages you send. We are not quoting Slybroadcast's rates because they can change and we do not want to print stale numbers.",
  points: [
    "Check Slybroadcast's own site for current pricing.",
    "Pricing varies by volume and options.",
    "Your contact list is a separate cost and task.",
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
    title: "Sending the same voicemail to a large list",
    winner: "Slybroadcast",
    rival: "This is exactly what it is for: a recorded message delivered to many voicemail boxes.",
    xovra: "Not a fit. Xovra has no voicemail drop feature.",
  },
  {
    title: "Selling to local businesses",
    winner: "Xovra",
    rival:
      "You would need to find and research the businesses elsewhere, and a generic recording cannot reflect what each is doing.",
    xovra: "Scrape the niche and city, check ads and websites, and call with a relevant pitch angle.",
  },
  {
    title: "Qualifying leads without tying up reps",
    winner: "Xovra",
    rival: "A broadcast does not qualify anyone. It invites a callback.",
    xovra:
      "AI qualifier calls, disclosed as AI, ask your questions so reps only pick up leads that responded.",
  },
  {
    title: "Announcements and reminders",
    winner: "Slybroadcast",
    rival: "One-way messages with no need for a reply suit a broadcast service well.",
    xovra:
      "It is not designed for this. SMS is available for short notices, but there is no voicemail delivery.",
  },
  {
    title: "Starting with a small budget",
    winner: "Either",
    rival: "Check the vendor's current pricing and minimums.",
    xovra:
      "There are no subscription tiers. Manual calls are $0.02/min, AI calls $0.25/min and SMS $0.03/message.",
  },
];

const switchingSteps = {
  heading: "Can you use both?",
  intro:
    "They address different strategies, so some teams use both. If you are adding Xovra, this is the practical path.",
  items: [
    {
      title: "Decide which touches need a conversation",
      body: "Reserve live calls and AI qualifier calls for leads worth a conversation. Keep broadcast-style messages in a voicemail service.",
    },
    {
      title: "Build or connect a list",
      body: "Scrape a new list from Google Maps, or connect a Google Sheet that already has your contacts.",
    },
    {
      title: "Let enrichment run",
      body: "Review the website audit, ad status, social presence and pitch angle on each lead.",
    },
    {
      title: "Set up a campaign",
      body: "Pick manual or AI mode, write a script and set your calling window, attempt cap and suppression list.",
    },
    {
      title: "Start small",
      body: "Usage-based pricing means a few test calls cost very little. Judge the conversations before you scale.",
    },
  ],
};

const chooseRival = [
  "You want to deliver recorded voicemails to a list",
  "Your messages are announcements, reminders or one-way outreach",
  "You do not need live calls, AI qualifying or lead sourcing",
  "You prefer a single-purpose service",
  "You need voicemail features Xovra does not offer",
];

const chooseXovra = [
  "You want to talk to prospects, not leave recordings",
  "You sell to local businesses and want Google Maps lead sourcing",
  "You want enrichment and pitch angles on each lead",
  "You want AI qualifier calls with clear AI disclosure",
  "You want SMS follow-up in the same record as the call",
  "You prefer usage-based pricing without subscription tiers",
];

const faqItems = [
  {
    question: "Does Xovra offer voicemail drops like Slybroadcast?",
    answer:
      "No. Xovra does not offer ringless voicemail or voicemail drops. It is an AI-powered cold calling platform with manual browser calls, AI qualifier calls and two-way SMS. If voicemail broadcast is what you need, Slybroadcast is the relevant service.",
  },
  {
    question: "Is Xovra cheaper than Slybroadcast?",
    answer:
      "We cannot honestly say. The products do different jobs and are priced differently. Xovra is usage-based at $0.02/min manual, $0.25/min AI and $0.03/SMS, with no subscription tiers. Check Slybroadcast for its current pricing. We do not publish a savings comparison.",
  },
  {
    question: "Can Xovra find leads for me?",
    answer:
      "Yes. The Google Maps scraper builds a lead list from a niche and a city, then enrichment adds a website audit, Google Ads detection and social presence, and scoring adds a pitch angle.",
  },
  {
    question: "Does the AI caller say it is an AI?",
    answer: "Yes. AI qualifier calls run on a Telnyx AI assistant and disclose that the caller is AI.",
  },
  {
    question: "Does Xovra have a power dialer?",
    answer: "No. Calling is manual, one lead at a time, or AI mode for qualifier calls.",
  },
  {
    question: "Does Xovra record calls or integrate with a CRM?",
    answer:
      "Neither, currently. Call recording and CRM integrations are not offered. A Google Sheet integration is available.",
  },
  {
    question: "What compliance controls are included?",
    answer:
      "A suppression list, 8am to 9pm calling windows, attempt caps and AI disclosure. They are guardrails, not legal advice, and you remain responsible for how you use any outreach tool.",
  },
  {
    question: "How do I get started?",
    answer:
      "Xovra is in early access. Use the Get Early Access button, or book a demo and we will walk through a Google Maps scrape and a first call.",
  },
];

const relatedComparisons = [
  {
    href: "/compare/xovra-vs-drop-cowboy",
    label: "Xovra vs Drop Cowboy",
    blurb: "Another ringless voicemail service, compared to live AI calling.",
  },
  {
    href: "/compare/xovra-vs-mojo-dialer",
    label: "Xovra vs Mojo Dialer",
    blurb: "Multi-line power dialing vs AI-assisted calling with lead sourcing.",
  },
  {
    href: "/compare/xovra-vs-calltools",
    label: "Xovra vs CallTools",
    blurb: "Call center software vs a lightweight browser-based platform.",
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

export default function XovraVsSlybroadcastPage() {
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
