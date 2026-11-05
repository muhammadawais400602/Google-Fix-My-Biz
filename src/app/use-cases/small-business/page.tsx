"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Headphones,
  Keyboard,
  MapPin,
  MessageSquare,
  Phone,
  PiggyBank,
  Receipt,
  RefreshCw,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  UserCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const hero = {
  icon: Store,
  badge: "Built for solo operators and small teams",
  title: "Find local leads, call from your browser,",
  titleAccent: "and let AI handle the first touch.",
  sub: "Xovra scrapes Google Maps for businesses in your niche and city, enriches and scores each one, then lets you call from a browser softphone or hand the first conversation to an AI qualifier. No headset hardware, no big monthly commitment, just usage-based pricing.",
  checks: [
    "Usage-based pricing",
    "Call from any browser",
    "AI always discloses itself",
  ],
  card: {
    header: "Lead worklist",
    tag: "Pitch angle: WEAK_SITE",
    sourceLabel: "Found on Google Maps: plumbers in Tampa",
    leadName: "Bayshore Plumbing Co.",
    leadMeta: "Rating 4.6 · Website audit flagged · Facebook found",
    chips: ["Score 82", "WEAK_SITE", "Facebook", "Instagram"],
    scriptLabel: "Call script preview",
    script: "\"Hi, is this Bayshore Plumbing? I came across you on Google with a 4.6 rating and noticed your site could be doing more for you...\"",
    outcomes: ["Interested", "Call back", "No answer"],
  },
};

const facts = [
  {
    value: "$0.02/min",
    label: "Manual calling from the browser",
  },
  {
    value: "$0.25/min",
    label: "AI qualifier calls",
  },
  {
    value: "$0.03",
    label: "Per SMS sent",
  },
  {
    value: "4",
    label: "Pitch angles to match your offer to each lead",
  },
];

const profiles = [
  {
    icon: UserCheck,
    title: "The solo founder doing their own sales",
    body: "You have a service that works and no time to build a prospect list by hand. Pull a list from Google Maps, start with the best-scored leads, and log the outcome with one keystroke.",
    tag: "Solo operator",
  },
  {
    icon: PiggyBank,
    title: "The owner who cannot afford a sales hire yet",
    body: "A full-time rep is a big commitment. With usage-based pricing you pay for the minutes and texts you actually use, and the AI qualifier can make first-touch calls while you work.",
    tag: "Pay for what you use",
  },
  {
    icon: Wrench,
    title: "The local service business adding B2B work",
    body: "Cleaning, IT support, signage, landscaping, print: many local businesses sell to other local businesses. Search the niche and city, check the site audit, and call the ones that fit.",
    tag: "Local B2B",
  },
  {
    icon: Users,
    title: "The two or three person team sharing one account",
    body: "Invite teammates into your organization as admins or agents, give them a number, and keep everyone working from the same campaign worklist.",
    tag: "Small teams",
  },
];

const painPoints = [
  {
    icon: MapPin,
    title: "Building a lead list takes longer than calling it",
    body: "Copying names and numbers out of Google Maps by hand eats an afternoon, and the list has no information about which businesses are worth a call.",
    fix: "Enter a niche and a city. Xovra scrapes Google Maps, enriches each result with a website audit, Google Ads detection, and Instagram, Facebook, and TikTok presence, then scores the lead. You get a Google Sheet and a CSV.",
  },
  {
    icon: Headphones,
    title: "You do not have phones, headsets, or a phone system",
    body: "Setting up a business phone system for a one-person outbound push is overkill.",
    fix: "The browser dialer is a Telnyx WebRTC softphone. Open the page, press C to call and H to hang up, and press 1 to 6 to log the outcome. No hardware to buy.",
  },
  {
    icon: Clock,
    title: "Cold calling eats the hours you need for real work",
    body: "Every dial that goes nowhere is time away from the work that pays the bills.",
    fix: "Switch a campaign to AI mode. The AI qualifier makes the first-touch call, discloses that it is an AI, asks qualifying questions, and writes back a score, interest level, qualified flag, and next action.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up falls through the cracks",
    body: "You talk to a promising lead, get pulled into a job, and never send the follow-up.",
    fix: "After a connected AI call, Xovra can send a follow-up SMS. Replies land in two-way SMS, and opt-outs such as STOP are detected so you do not text people who asked you not to.",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Google Maps lead sourcing",
    body: "Search by niche and city. Xovra collects the business listings and gives you a clean sheet to work from.",
    tag: "Niche + city",
  },
  {
    icon: Filter,
    title: "Enrichment and scoring",
    body: "Website audit, Google Ads detection, and Instagram, Facebook, and TikTok signals roll up into a lead score so you call the best fits first.",
    tag: "Scored leads",
  },
  {
    icon: Phone,
    title: "Browser dialer",
    body: "A Telnyx WebRTC softphone that runs in the browser. Manual, one lead at a time, with outcomes written to your Google Sheet.",
    tag: "No hardware",
  },
  {
    icon: Keyboard,
    title: "Keyboard shortcuts",
    body: "C to call, H to hang up, and 1 to 6 to set the outcome. You can work through a list without reaching for the mouse.",
    tag: "C / H / 1-6",
  },
  {
    icon: Bot,
    title: "AI qualifier",
    body: "A Telnyx AI assistant calls with per-lead context, discloses it is an AI, and returns score, interest, qualified, and next action.",
    tag: "First-touch calls",
  },
  {
    icon: Sparkles,
    title: "Live AI rebuttals",
    body: "When a prospect pushes back, Claude or Gemini generates a context-aware reply for you to use, plus follow-up drafts after the call.",
    tag: "Claude / Gemini",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Text leads through Telnyx and read their replies. Opt-out detection is built in. You register your own 10DLC brand and campaign.",
    tag: "$0.03 / SMS",
  },
  {
    icon: FileText,
    title: "Call script templates",
    body: "Write your pitch once with placeholders like {name}, {category}, {city}, {rating}, and {evidence}, and each lead gets a personalized script.",
    tag: "Placeholders",
  },
  {
    icon: FileSpreadsheet,
    title: "Google Sheets and CSV",
    body: "Leads and call outcomes live in a Google Sheet you own. Export a CSV in HubSpot format if you move to a CRM later.",
    tag: "You own the data",
  },
];

const workflow = [
  {
    title: "Pick a niche and a city",
    body: "Say, dentists in Denver or restaurants in Austin. Xovra scrapes Google Maps and builds the lead list.",
  },
  {
    title: "Review the scored sheet",
    body: "Open the Google Sheet. Sort by score, read the pitch angle and evidence, and drop any leads that are not a fit.",
  },
  {
    title: "Write one script",
    body: "Create a call script template with placeholders, and add a campaign brief and greeting so the AI knows what you sell.",
  },
  {
    title: "Choose manual or AI mode",
    body: "Call from the browser yourself, or switch the campaign to AI mode and let the qualifier make first-touch calls.",
  },
  {
    title: "Log outcomes and text back",
    body: "Outcomes go to your sheet. Send SMS follow-ups where it makes sense. Retry logic brings back leads that did not answer.",
  },
  {
    title: "Check the usage ledger",
    body: "Every call minute and SMS is a ledger entry, so you know what the campaign cost before you run the next one.",
  },
];

const scriptPanel = {
  points: [
    "Placeholders fill in the name, category, city, rating, and the evidence from the enrichment step.",
    "Each campaign has its own brief and greeting, so the AI stays on message.",
    "Live rebuttals are generated with the lead's context in view, not from a canned list.",
    "Follow-up drafts are written after the call so you can send them quickly.",
  ],
  template: "Hi {name}, this is Sam. I saw {category} in {city} with a {rating} rating on Google, and {evidence}. I help local businesses like yours with this. Is it okay if I take thirty seconds to explain?",
  objection: "We already have someone who does our marketing.",
  rebuttal: "That makes sense. I am not asking you to replace anyone. I noticed your site is missing a clear way for people to book, and I could send over what I found so your current person can decide if it is useful. Can I text it to you?",
};

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Google Sheet output",
    body: "Leads, scores, pitch angles, and call outcomes are written to a sheet you own.",
  },
  {
    icon: Download,
    title: "CSV export",
    body: "Export in HubSpot format if you later decide to move leads into a CRM.",
  },
  {
    icon: RefreshCw,
    title: "Retry logic",
    body: "Campaigns can retry leads that did not connect, up to the attempt cap you set.",
  },
  {
    icon: Receipt,
    title: "Usage ledger",
    body: "A per-event record of every billable call and text, so costs are never a surprise.",
  },
];

const compliance = [
  {
    icon: Clock,
    title: "8am to 9pm calling window",
    body: "Calls are held outside the permitted hours so you are not dialing people at night.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    body: "Add numbers that must never be contacted. Opt-outs from SMS replies are detected and respected.",
  },
  {
    icon: Repeat,
    title: "Attempt caps",
    body: "Limit how many times any one lead can be called so persistence does not become harassment.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure",
    body: "The AI qualifier tells the person it is an AI at the start of the call.",
  },
];

const pricing = [
  {
    label: "Manual calling",
    price: "$0.02 / min",
    body: "You dial from the browser softphone and talk to the lead yourself. Billed per minute of call time.",
  },
  {
    label: "AI qualifier calls",
    price: "$0.25 / min",
    body: "The Telnyx-powered AI assistant calls the lead, discloses it is an AI, and records a score, interest level, and next action.",
  },
  {
    label: "SMS",
    price: "$0.03 / message",
    body: "Two-way texting through Telnyx, including follow-ups after connected AI calls. Opt-outs are detected automatically.",
  },
];

const limits = [
  "No ringless voicemail or voicemail drops",
  "No power or predictive dialer: calling is one lead at a time",
  "No call recording",
  "No native CRM sync. Outcomes live in Google Sheets, and you can export CSV in HubSpot format",
  "No Zapier, Make, or Slack integrations",
  "No analytics dashboards. Your results are in your Google Sheet and the usage ledger",
];

const faqs = [
  {
    q: "Do I need a phone or a headset?",
    a: "No. The dialer is a Telnyx WebRTC softphone that runs in your browser. A computer with a microphone and speakers or a headset you already own is enough.",
  },
  {
    q: "Can the AI close deals for me?",
    a: "No. The AI qualifier makes a first-touch call, discloses that it is an AI, and records a score, interest level, whether the lead is qualified, and a suggested next action. You take over from there.",
  },
  {
    q: "Where do my leads and results live?",
    a: "In a Google Sheet that you own, with a CSV export available in HubSpot format. Xovra does not sync natively to any CRM.",
  },
  {
    q: "Do I need to register for SMS?",
    a: "Yes. US business texting requires 10DLC registration, and you register your own brand and campaign with your carrier. Xovra does not do that for you.",
  },
  {
    q: "Is there a monthly plan?",
    a: "Pricing is usage-based: $0.02 per minute for manual calls, $0.25 per minute for AI calls, and $0.03 per SMS. See the pricing page for current details.",
  },
  {
    q: "Does it record my calls?",
    a: "No. Xovra does not record calls. Outcomes and notes are logged to your sheet.",
  },
];

const enrichment = [
  {
    angle: "RUNS_ADS",
    title: "They already pay for traffic",
    body: "Google Ads detected. Pitch conversion, landing pages, call tracking, or anything that makes their ad spend work harder.",
  },
  {
    angle: "NO_SITE",
    title: "No website found",
    body: "A business with reviews and no site is a clear opening for web design, listings, and local presence services.",
  },
  {
    angle: "WEAK_SITE",
    title: "Site audit found problems",
    body: "The website audit flags gaps. Use the evidence in your opening line instead of a generic pitch.",
  },
  {
    angle: "STRONG_SITE",
    title: "Solid site already",
    body: "Skip the web pitch and lead with something else: reviews, social, ads, or a different service line.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function SmallBusinessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col w-full bg-[#f8f9ff]">
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden pt-12 pb-16 lg:pb-24">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#d2bbff]/30 to-[#d3e4fe]/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3e0f1]/70 shadow-sm mb-6">
                <hero.icon className="w-[18px] h-[18px] text-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#630ed4]">
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-[32px] leading-[36px] lg:text-[52px] lg:leading-[58px] font-bold tracking-tight text-[#0b1c30] mb-4">
                {hero.title}{" "}
                <span className="text-[#630ed4]">{hero.titleAccent}</span>
              </h1>
              <p className="text-lg leading-7 text-[#4a4455] max-w-2xl mb-8">
                {hero.sub}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6 w-full sm:w-auto">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#7c3aed] text-white font-semibold text-sm shadow-lg shadow-[#630ed4]/25 hover:bg-[#630ed4] transition-all"
                >
                  Get Early Access
                  <ArrowRight className="w-[18px] h-[18px] ml-1" />
                </Link>
                <Link
                  href="/demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-sm hover:bg-[#eff4ff] text-[#0b1c30] font-semibold text-sm transition-all"
                >
                  Book a Demo
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {hero.checks.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-[#630ed4] font-medium">
                    <CheckCircle2 className="w-4 h-4" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero visual: lead card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#7c3aed] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#0b1c30]">
                      {hero.card.header}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#e3e0f1] text-[#4a4455]">
                    {hero.card.tag}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#eff4ff] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#630ed4]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-[18px] h-[18px] text-[#630ed4]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#4a4455]">{hero.card.sourceLabel}</span>
                    <span className="text-sm font-semibold text-[#0b1c30]">{hero.card.leadName}</span>
                    <span className="text-xs text-[#4a4455]">{hero.card.leadMeta}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hero.card.chips.map((c) => (
                    <span key={c} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#eaddff] text-[#630ed4]">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-[#213145] text-[#eaf1ff] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-[18px] h-[18px] text-[#d2bbff]" />
                    <span className="text-xs font-semibold text-white">{hero.card.scriptLabel}</span>
                  </div>
                  <p className="text-sm text-[#eaf1ff] italic leading-6">{hero.card.script}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {hero.card.outcomes.map((o) => (
                    <div key={o} className="px-2 py-2 rounded-lg bg-[#e5eeff] text-xs font-semibold text-[#0b1c30]">
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTS STRIP ── */}
      <section className="w-full bg-[#eff4ff] py-12">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <span className="text-2xl lg:text-3xl font-bold text-[#630ed4]">{f.value}</span>
              <span className="text-sm text-[#4a4455] leading-5">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO IT IS FOR ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Made for people who do their own outbound"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"If you are the owner, the salesperson, and the person answering email, you need a lead source, a way to call, and a way to keep track. Xovra puts all three in one place."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((p) => (
              <div key={p.title} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#eaddff] flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-[#630ed4]" />
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30]">{p.title}</h3>
                <p className="text-sm leading-6 text-[#4a4455]">{p.body}</p>
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#630ed4] mt-auto">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="w-full bg-[#e5eeff] py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"The problems small outbound teams actually have"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Most small businesses do not fail at selling. They fail at the grind of finding leads, deciding who to call, and following up."}</p>
          </div>
          <div className="flex flex-col gap-6">
            {painPoints.map((p) => (
              <div key={p.title} className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 lg:p-8 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-[#0b1c30]">{p.title}</h3>
                  <p className="text-sm leading-6 text-[#4a4455]">{p.body}</p>
                </div>
                <div className="p-6 lg:p-8 bg-[#213145] text-[#eaf1ff] flex flex-col gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#d2bbff]">
                    <p.icon className="w-4 h-4" /> How Xovra helps
                  </span>
                  <p className="text-sm leading-6">{p.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Everything you need for a small outbound operation"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Each feature below is part of the product today. Nothing here depends on a third-party CRM or automation tool."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#630ed4] flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30]">{f.title}</h3>
                <p className="text-sm leading-6 text-[#4a4455]">{f.body}</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e3e0f1] text-[#4a4455] self-start mt-auto">
                  {f.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENRICHMENT / PITCH ANGLES ── */}
      <section className="w-full bg-[#213145] py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-white mb-3">
              {"Four pitch angles, so every call opens with a reason"}
            </h2>
            <p className="text-base leading-7 text-[#eaf1ff]">{"Xovra tags each lead with the angle that fits what it found. You decide what to sell. The tag tells you what to say first."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enrichment.map((e) => (
              <div key={e.angle} className="rounded-xl bg-white/10 p-5 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.08em] text-[#d2bbff]">{e.angle}</span>
                <h3 className="text-base font-bold text-white">{e.title}</h3>
                <p className="text-sm leading-6 text-[#eaf1ff]">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"From zero leads to first call in one sitting"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"A realistic path for one person with an afternoon to set things up."}</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((s, i) => (
              <li key={s.title} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <span className="text-sm font-bold text-[#7c3aed]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-[#0b1c30]">{s.title}</h3>
                <p className="text-sm leading-6 text-[#4a4455]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SCRIPT PANEL ── */}
      <section className="w-full bg-[#eff4ff] py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Scripts that already know the lead"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455] mb-6">{"A good cold call mentions something specific. Templates pull details from the lead record so you do not have to look them up mid-call."}</p>
            <ul className="flex flex-col gap-3">
              {scriptPanel.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm leading-6 text-[#4a4455]">
                  <Check className="w-4 h-4 text-[#630ed4] mt-1 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#630ed4]">Call script template</span>
              <p className="mt-3 text-sm leading-6 text-[#0b1c30] whitespace-pre-line">{scriptPanel.template}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["{name}", "{category}", "{city}", "{rating}", "{evidence}"].map((ph) => (
                  <code key={ph} className="text-xs px-2 py-1 rounded bg-[#e3e0f1] text-[#630ed4]">{ph}</code>
                ))}
              </div>
            </div>
            <div className="bg-[#213145] rounded-xl p-6 text-[#eaf1ff]">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d2bbff]">Live AI rebuttal example</span>
              <p className="mt-3 text-sm leading-6"><span className="font-semibold text-white">Prospect: </span>{scriptPanel.objection}</p>
              <p className="mt-2 text-sm leading-6"><span className="font-semibold text-white">Suggested reply: </span>{scriptPanel.rebuttal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Outcomes land where you already work"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"No new reporting tool to learn. Your results sit in the Google Sheet next to the leads."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomes.map((o) => (
              <div key={o.title} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-2">
                <o.icon className="w-5 h-5 text-[#7c3aed]" />
                <h3 className="text-base font-bold text-[#0b1c30]">{o.title}</h3>
                <p className="text-sm leading-6 text-[#4a4455]">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="w-full bg-[#e5eeff] py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Compliance tools included, from day one"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Small businesses get fined too. These controls are on by default or one setting away."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compliance.map((c) => (
              <div key={c.title} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#eaddff] flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-[#630ed4]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b1c30] mb-1">{c.title}</h3>
                  <p className="text-sm leading-6 text-[#4a4455]">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[#4a4455] max-w-3xl">
            Xovra provides the tools. You remain responsible for complying with applicable calling, texting, and consent laws, and for registering your own 10DLC brand and campaign with your carrier before sending SMS at volume.{" "}
            <Link href="/compliance" className="text-[#630ed4] font-semibold underline">Read the compliance overview</Link>.
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px] font-bold tracking-tight text-[#0b1c30] mb-3">
              {"Usage-based pricing with no big monthly commitment"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"You pay for the minutes and messages you use. A small test campaign costs a small amount."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <div key={p.label} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#630ed4]">{p.label}</span>
                <span className="text-3xl font-bold text-[#0b1c30]">{p.price}</span>
                <p className="text-sm leading-6 text-[#4a4455]">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[#4a4455] max-w-3xl">
            Every billable event is written to a per-event usage ledger, so you can see exactly what each call and text cost.{" "}
            <Link href="/pricing" className="text-[#630ed4] font-semibold underline">See full pricing</Link>.
          </p>
          <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-base font-bold text-[#0b1c30] mb-4">What Xovra does not do</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {limits.map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm leading-6 text-[#4a4455]">
                  <X className="w-4 h-4 text-[#4a4455] mt-1 shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#eff4ff] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px] font-bold tracking-tight text-[#0b1c30] mb-8">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="bg-white rounded-xl shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[#0b1c30]">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#630ed4] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-4 text-sm leading-6 text-[#4a4455]">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[75rem] mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-[#630ed4] px-6 py-12 lg:px-16 lg:py-16 text-center flex flex-col items-center gap-5">
            <h2 className="text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] font-bold tracking-tight text-white max-w-2xl">
              {"Start with one niche, one city, and one afternoon"}
            </h2>
            <p className="text-base leading-7 text-[#eaddff] max-w-xl">{"Get early access and run your first Google Maps campaign, or book a demo and we will walk you through it."}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-[#630ed4] font-semibold text-sm hover:bg-[#eaddff] transition-all"
              >
                Get Early Access
                <ArrowRight className="w-[18px] h-[18px] ml-1" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#7c3aed] text-white font-semibold text-sm hover:bg-[#213145] transition-all"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
