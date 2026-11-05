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

const RIVAL = "Mojo Dialer";
const RIVAL_INITIALS = "MD";

const hero: Hero = {
  badge: "Honest comparison",
  titleLead: "Mojo dials fast.",
  titleAccent: "Xovra dials smart.",
  subtitle:
    "Mojo Dialer is a multi-line power dialer built for high-volume calling, especially in real estate. Xovra is a manual, browser-based dialer with AI on top: it sources and enriches its own leads, runs AI qualifier calls and suggests rebuttals live. Mojo gives you more dials per hour. Xovra gives you more context per dial.",
  note: "Usage-based pricing from $0.02/min. No subscription tiers.",
  rivalTag: "Power dialer",
  rivalPill: "Throughput-first",
  rivalRows: [
    {
      label: "Dialing style",
      value: "Multi-line power dialing",
      status: "yes",
    },
    {
      label: "Dials per hour",
      value: "Higher than Xovra",
      status: "yes",
    },
    {
      label: "Lead sourcing",
      value: "Bring or buy your list",
      status: "na",
    },
    {
      label: "AI qualifier calls",
      value: "Not a focus",
      status: "no",
    },
  ],
  dialTag: "AI cold calling",
  dialPill: "Context-first",
  dialRows: [
    {
      label: "Dialing style",
      value: "One at a time, manual",
      status: "partial",
    },
    {
      label: "Dials per hour",
      value: "Lower than Mojo",
      status: "no",
    },
    {
      label: "Lead sourcing",
      value: "Google Maps scraper",
      status: "yes",
    },
    {
      label: "AI qualifier calls",
      value: "Yes, AI disclosed",
      status: "yes",
    },
  ],
  diffIntro: "Mojo and Xovra both help you make outbound calls, but they optimize for different things.",
  ctaHeading: "Would you rather call better-informed leads?",
  ctaBody:
    "Xovra is in early access. Join the list, or book a demo and we will show you how a lead goes from a Google Maps scrape to a scored, enriched call.",
};

const shortAnswer = {
  heading: "Speed of dialing vs quality of each call",
  intro:
    "If your constraint is raw contact volume, one of these wins clearly. If your constraint is knowing who you are calling, the other does.",
  rivalLabel: "Multi-line power dialing",
  rivalBody:
    "Reps who live on the phone and need to cycle through a lot of numbers quickly. Mojo's multi-line approach is designed to reduce the time spent waiting on rings, voicemails and dead numbers, and it has a long track record with real estate teams.",
  rivalBest: "Best when the list is ready and the goal is dials per hour.",
  dialLabel: "AI-powered cold calling",
  dialBody:
    "Reps and small teams who sell to local businesses and want the research done before the call. Xovra scrapes Google Maps, audits websites, detects ads, finds social profiles and scores each lead, then lets you call from the browser or hand first-pass qualifying to an AI assistant.",
  dialBest: "Best when each conversation is worth preparing for.",
};

const comparisonRows: TableRow[] = [
  {
    category: "Dialing",
    feature: "Multi-line / power dialing",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Core feature",
    rivalStatus: "yes",
  },
  {
    category: "Dialing",
    feature: "Manual one-at-a-time calling",
    xovra: "Yes, browser WebRTC softphone via Telnyx",
    dialStatus: "yes",
    rival: "Available alongside power dialing",
    rivalStatus: "na",
  },
  {
    category: "Dialing",
    feature: "Predictive dialer",
    xovra: "Not offered",
    dialStatus: "no",
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Dialing",
    feature: "Dialing throughput",
    xovra: "Lower, one call at a time",
    dialStatus: "partial",
    rival: "Higher, designed for volume",
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
    rival: "Not a focus of the product",
    rivalStatus: "no",
  },
  {
    category: "AI",
    feature: "Live AI rebuttals during calls",
    xovra: "Yes, Claude / Gemini",
    dialStatus: "yes",
    rival: "No",
    rivalStatus: "no",
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
    category: "Lead data",
    feature: "Real estate list sources",
    xovra: "Not specific to real estate",
    dialStatus: "no",
    rival: "Strong real estate orientation",
    rivalStatus: "yes",
  },
  {
    category: "Messaging",
    feature: "Two-way SMS",
    xovra: "Yes, via Telnyx",
    dialStatus: "yes",
    rival: "Confirm current texting options",
    rivalStatus: "na",
  },
  {
    category: "Workflow",
    feature: "Campaign management",
    xovra: "Manual and AI modes",
    dialStatus: "yes",
    rival: "Call lists and queues",
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
    category: "Workflow",
    feature: "Call recording",
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
    rival: "Confirm with vendor",
    rivalStatus: "na",
  },
  {
    category: "Pricing",
    feature: "Pricing model",
    xovra: "Usage-based: $0.02/min manual, $0.25/min AI, $0.03/SMS",
    dialStatus: "yes",
    rival: "See Mojo for current pricing",
    rivalStatus: "na",
  },
];

const differences = [
  {
    num: "01",
    title: "Lines per rep: throughput vs context",
    rival:
      "Mojo dials several lines at once and connects you to whoever answers first. For a rep working a big list, that removes a lot of dead time and is the whole reason power dialers exist.",
    xovra:
      "Xovra calls one lead at a time from a browser softphone. You make fewer dials per hour, and each one starts with the lead's website audit, ad status, social presence and pitch angle in front of you. The trade is volume for preparation.",
  },
  {
    num: "02",
    title: "Where the leads come from",
    rival:
      "Mojo is a calling tool. You supply the list, whether from your own research, a purchased list or a real estate data source, and Mojo works through it.",
    xovra:
      "Xovra sources leads itself. Give it a niche and a city and the Google Maps scraper builds the list, then enrichment and scoring run on it. If your leads are local businesses, that removes a separate research step. If your leads are homeowners, it is not the right source.",
  },
  {
    num: "03",
    title: "AI doing the first conversation",
    rival:
      "Mojo is built so a human rep handles the connected call. The dialer's job is to get a person on the line faster.",
    xovra:
      "In AI mode, a Telnyx AI assistant calls and qualifies the lead against your script, and it discloses that it is AI. A rep then follows up on the leads that qualified. This is a different model: the AI does the first pass instead of the dialer speeding up the rep.",
  },
  {
    num: "04",
    title: "Help when the prospect objects",
    rival: "Mojo does not generate rebuttals. Rep skill, scripts and training handle objections.",
    xovra:
      "During a live call, Xovra can suggest rebuttals using Claude or Gemini. It is useful for newer reps and for objections you do not hear every day. It does not replace practice and it will not be right every time.",
  },
  {
    num: "05",
    title: "Industry fit",
    rival:
      "Mojo has a strong real estate following. Its workflow and positioning are shaped by investors and agents calling homeowner lists.",
    xovra:
      "Xovra is not specific to real estate. Its lead sourcing is aimed at local businesses found on Google Maps, such as agencies selling websites, ads or marketing services to them. Different buyer, different tool.",
  },
];

const rivalStrengths = {
  intro: "Mojo has real advantages over Xovra, and for some teams they decide the question.",
  items: [
    {
      title: "Multi-line dialing throughput",
      body: "Xovra has no power or predictive dialer. If you need to maximize live connects per hour from a large list, Mojo's multi-line approach will get you there faster than one-at-a-time calling.",
    },
    {
      title: "Real estate focus",
      body: "Mojo has a long record with real estate investors and agents. If you call homeowner lists, you will find more of your peers, workflows and list sources around Mojo than around Xovra.",
    },
    {
      title: "Maturity",
      body: "Mojo has been used by high-volume callers for years. Xovra is newer and in early access, so expect a narrower and still-growing feature set.",
    },
    {
      title: "Built for the dial-all-day rep",
      body: "If a rep's day is almost entirely on the phone with a prepared list, a tool tuned for that rhythm can feel better than a platform that also does sourcing, enrichment and AI.",
    },
  ],
};

const workflowSteps = {
  heading: "What a Xovra calling session looks like",
  intro:
    "A typical Xovra session is slower per dial and heavier on preparation. Here is what happens, using only features that exist today.",
  items: [
    {
      tag: "Source",
      title: "Build a list from Google Maps",
      body: "Choose a niche and city and let the scraper pull local businesses into a lead list. Or connect a Google Sheet you already maintain.",
    },
    {
      tag: "Enrich",
      title: "Audit before you dial",
      body: "Website audit, Google Ads detection and Instagram, Facebook and TikTok presence are attached to each lead.",
    },
    {
      tag: "Score",
      title: "Sort by pitch angle",
      body: "Leads are labeled RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE, so you can work the group that matches your offer first.",
    },
    {
      tag: "Call",
      title: "Dial from the browser",
      body: "Place calls through the WebRTC softphone, one lead at a time, with the script and enrichment visible while you talk.",
    },
    {
      tag: "Assist",
      title: "Use live rebuttals",
      body: "When the prospect objects, Claude or Gemini can suggest a response during the call.",
    },
    {
      tag: "Delegate",
      title: "Let AI qualify the rest",
      body: "Run a campaign in AI mode so the Telnyx AI assistant makes first-pass qualifier calls, with AI disclosure, within your calling window and attempt cap.",
    },
  ],
};

const rivalPricing = {
  title: "Priced as a dialer subscription",
  body: "Dialers like Mojo are typically sold as a subscription, with options that vary by plan and by the number of lines. We are not quoting Mojo's current prices because they change and we would rather send you to the source.",
  points: [
    "Check Mojo's own pricing page for current plans.",
    "Pricing varies by plan and features.",
    "List costs are separate from the dialer.",
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
    title: "Calling large homeowner lists all day",
    winner: "Mojo Dialer",
    rival:
      "This is the core use case. Multi-line dialing and a real estate-oriented workflow are the reason to choose it.",
    xovra:
      "Not the right fit. One-at-a-time calling is slower, and Xovra has no homeowner list sourcing.",
  },
  {
    title: "Selling websites, ads or marketing to local businesses",
    winner: "Xovra",
    rival: "You would bring your own list and research each business separately before or during the call.",
    xovra:
      "Scrape the niche and city, see who runs ads or has a weak site, and open with that angle. The sourcing and research are part of the product.",
  },
  {
    title: "A newer rep who needs support on calls",
    winner: "Xovra",
    rival: "A dialer gets the rep on more calls, which is good practice but offers no in-call help.",
    xovra:
      "Per-lead context on screen, a script with placeholders and live AI rebuttal suggestions give a newer rep something to lean on.",
  },
  {
    title: "Offloading first-pass qualifying",
    winner: "Xovra",
    rival: "Rep time is the constraint. A faster dialer helps but a human is still on each call.",
    xovra:
      "AI qualifier calls handle first-pass questions, disclosed as AI, so reps spend time on leads that already responded.",
  },
  {
    title: "You need a CRM sync or call recording today",
    winner: "Mojo Dialer",
    rival:
      "Confirm the exact CRM and recording options with the vendor, but a mature dialer is more likely to cover them.",
    xovra:
      "Neither CRM integrations nor call recording is currently offered. Google Sheets is the available integration.",
  },
];

const switchingSteps = {
  heading: "Trying Xovra alongside Mojo",
  intro:
    "You do not have to choose one forever. Many teams would test a new approach on a segment of their calling before changing anything.",
  items: [
    {
      title: "Pick one segment to test",
      body: "Choose a niche and city where context matters, such as local service businesses, rather than your largest homeowner list.",
    },
    {
      title: "Scrape and enrich it in Xovra",
      body: "Let the Google Maps scraper and enrichment build the list, then look at the pitch angles assigned to each lead.",
    },
    {
      title: "Call a few manually",
      body: "Use the browser softphone and your script. Notice whether the enrichment changes how the first thirty seconds go.",
    },
    {
      title: "Try AI mode on a small batch",
      body: "Run a limited AI qualifier campaign, review how it handled the conversations and adjust the script.",
    },
    {
      title: "Compare outcomes, not dial counts",
      body: "Mojo will win on dials per hour. The fair question is how many qualified conversations you got for the time and money spent.",
    },
  ],
};

const chooseRival = [
  "Dials per hour is the metric you are trying to move",
  "You call prepared lists, especially real estate lists, all day",
  "You want multi-line dialing",
  "You need a mature product with a long track record",
  "You do not need lead sourcing or AI qualifier calls",
];

const chooseXovra = [
  "You sell to local businesses and want Google Maps sourcing built in",
  "You want website, ads and social context before each call",
  "You want AI qualifier calls with clear AI disclosure",
  "You want live rebuttal suggestions for your reps",
  "You prefer usage-based pricing without subscription tiers",
  "You are fine trading some dialing volume for better-prepared calls",
];

const faqItems = [
  {
    question: "Does Xovra have a power dialer like Mojo?",
    answer:
      "No. Xovra has manual one-at-a-time calling from a browser softphone and an AI mode for qualifier calls. There is no power, triple-line or predictive dialer. If multi-line throughput is a requirement, Mojo is the stronger choice.",
  },
  {
    question: "Is Xovra good for real estate?",
    answer:
      "It is not built specifically for real estate. Its lead sourcing is the Google Maps scraper, which finds local businesses. Teams calling homeowner lists will likely be better served by a real estate-oriented dialer.",
  },
  {
    question: "Can I import my existing lists?",
    answer:
      "Xovra supports a Google Sheet integration, so you can bring leads in from a sheet. You can also scrape new leads from Google Maps.",
  },
  {
    question: "How does Xovra pricing compare with Mojo?",
    answer:
      "Xovra is usage-based: $0.02 per minute for manual calls, $0.25 per minute for AI calls and $0.03 per SMS, with no subscription tiers. For Mojo, check their pricing page for current plans. We do not publish a savings figure.",
  },
  {
    question: "Does the AI caller disclose that it is AI?",
    answer:
      "Yes. AI qualifier calls run on a Telnyx AI assistant and disclose that the caller is AI. AI disclosure is part of the compliance guardrails in campaigns.",
  },
  {
    question: "What compliance controls does Xovra have?",
    answer:
      "A suppression list, calling windows between 8am and 9pm, attempt caps and AI disclosure. These are guardrails, not legal advice, and you remain responsible for how you use any calling tool.",
  },
  {
    question: "Can multiple people use one Xovra account?",
    answer:
      "Yes. Xovra is multi-tenant, with organizations, roles and invites, and number pools with health monitoring.",
  },
  {
    question: "How do I get started?",
    answer:
      "Xovra is in early access. Use the Get Early Access button, or book a demo and we will walk through a Google Maps scrape and a first call.",
  },
];

const relatedComparisons = [
  {
    href: "/compare/xovra-vs-calltools",
    label: "Xovra vs CallTools",
    blurb: "Call center software vs a lightweight browser-based platform.",
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

export default function XovraVsMojoDialerPage() {
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
