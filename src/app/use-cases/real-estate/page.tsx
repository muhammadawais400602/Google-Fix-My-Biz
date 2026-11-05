"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderKanban,
  Handshake,
  Hash,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  Receipt,
  RefreshCw,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const hero = {
  icon: Building2,
  badge: "Built for real estate agents and teams",
  title: "Prospect local business owners and property contacts",
  titleAccent: "with context about the area.",
  sub: "Xovra scrapes Google Maps for businesses around the neighborhoods and properties you work, enriches each listing, and lets you call from the browser or have an AI qualifier make the first touch. Texts follow connected calls.",
  checks: [
    "Maps-based area search",
    "AI discloses itself",
    "SMS follow-up built in",
  ],
  card: {
    header: "Area prospecting",
    tag: "Pitch angle: NO_SITE",
    sourceLabel: "Maps search: retail shops near Main St, Raleigh",
    leadName: "Oak City Hardware",
    leadMeta: "Rating 4.7 · No website found · Facebook found",
    chips: ["Score 79", "NO_SITE", "Facebook", "Local owner"],
    scriptLabel: "Call script with local details",
    script: "\"Hi, this is Dana, a local agent who works the Main Street corridor. I saw Oak City Hardware has a 4.7 rating, and I wanted to ask whether you own or lease your space...\"",
    outcomes: ["Interested", "Send SMS", "Callback"],
  },
};

const facts = [
  {
    value: "Maps",
    label: "Find businesses by niche and city",
  },
  {
    value: "Per lead",
    label: "Context passed to the AI qualifier",
  },
  {
    value: "SMS",
    label: "Two-way texting after calls",
  },
  {
    value: "8am-9pm",
    label: "Calling window enforced",
  },
];

const profiles = [
  {
    icon: Store,
    title: "Commercial agents and brokers",
    body: "Search a submarket for the businesses operating there. Owner-operators and tenants near a listing are logical first calls for lease, sale, and expansion conversations.",
    tag: "Commercial prospecting",
  },
  {
    icon: Home,
    title: "Residential agents building a local sphere",
    body: "Local business owners live in the neighborhoods you serve. Call shops, restaurants, and service providers in your farm area and build relationships before they need an agent.",
    tag: "Farm area",
  },
  {
    icon: Users,
    title: "Teams with a shared market",
    body: "Invite agents into your organization, give each a role, and split an area across campaigns so no one calls the same business twice.",
    tag: "Team coordination",
  },
  {
    icon: Handshake,
    title: "Property managers and investors",
    body: "Reach out to nearby businesses about leasing, vacancies, or partnerships, with notes about the area built into the script.",
    tag: "Leasing outreach",
  },
];

const painPoints = [
  {
    icon: MapPin,
    title: "Building an area list takes time",
    body: "Walking a street or scrolling Maps to copy business details is slow and incomplete.",
    fix: "Run a Google Maps search by niche and city. You get a sheet with listings, ratings, website audit results, and social presence, scored and ready to work.",
  },
  {
    icon: FileText,
    title: "Calls sound generic",
    body: "Prospects hang up on scripts that could apply to anyone in any city.",
    fix: "Call script templates fill in {name}, {category}, {city}, {rating}, and {evidence}. Add local details to the campaign brief so the AI and your live rebuttals reference the area.",
  },
  {
    icon: Clock,
    title: "You are showing homes when you should be calling",
    body: "Prospecting block time gets eaten by actual client work.",
    fix: "Switch a campaign to AI mode. The qualifier makes first-touch calls with per-lead context, discloses it is an AI, and returns a score, interest, qualified flag, and next action.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up gets forgotten",
    body: "A promising 'maybe later' turns into silence.",
    fix: "After connected AI calls, Xovra can send a follow-up text. Replies come back in two-way SMS and opt-outs are detected automatically.",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Google Maps lead sourcing",
    body: "Search by niche and city, for example dentists in a downtown area, and collect business listings in a Google Sheet and CSV.",
    tag: "Area-based search",
  },
  {
    icon: Filter,
    title: "Enrichment and scoring",
    body: "Website audit, Google Ads detection, and Instagram, Facebook, and TikTok presence help you decide who to call first.",
    tag: "Scored leads",
  },
  {
    icon: Bot,
    title: "AI qualifier",
    body: "A Telnyx AI assistant calls with per-lead context, discloses that it is an AI, and records score, interest, qualified, and next action.",
    tag: "First-touch calls",
  },
  {
    icon: Phone,
    title: "Browser dialer",
    body: "Call from a Telnyx WebRTC softphone. Press C to call, H to hang up, and 1 to 6 to log outcomes in the sheet.",
    tag: "No hardware",
  },
  {
    icon: Sparkles,
    title: "Live AI rebuttals",
    body: "When an owner says they are not interested or already work with someone, Claude or Gemini suggests a reply using the lead's context.",
    tag: "In-call support",
  },
  {
    icon: FileText,
    title: "Call scripts",
    body: "Templates with placeholders let you mention the neighborhood, category, rating, and evidence without retyping.",
    tag: "Local details",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Follow up by text through Telnyx. You register your own 10DLC brand and campaign.",
    tag: "$0.03 / SMS",
  },
  {
    icon: FolderKanban,
    title: "Campaigns",
    body: "Manual or AI mode, sheet import, per-campaign brief and greeting, retries, and worklist filtering.",
    tag: "By neighborhood",
  },
  {
    icon: Hash,
    title: "Number pools",
    body: "Use more than one number, monitor health, and keep each lead tied to the same caller ID.",
    tag: "Consistent caller ID",
  },
];

const workflow = [
  {
    title: "Pick a niche and area",
    body: "Choose a category and a city or neighborhood near the listings, the farm area, or the submarket you cover.",
  },
  {
    title: "Review the sheet",
    body: "Sort by score. Remove businesses that are not a fit, such as national chains.",
  },
  {
    title: "Add local detail to the script",
    body: "Write the script and brief with specifics about the area, recent sales, or listings you want to mention.",
  },
  {
    title: "Call or let the AI qualify",
    body: "Call from the browser in manual mode, or run AI mode so the qualifier handles first-touch calls.",
  },
  {
    title: "Text the interested ones",
    body: "Send a follow-up SMS and keep conversations going in the two-way thread.",
  },
  {
    title: "Retry and log",
    body: "Outcomes go to your sheet. Retry logic brings back leads that did not answer, within the attempt cap.",
  },
];

const scriptPanel = {
  points: [
    "Add area details to the campaign brief so the AI qualifier can reference them.",
    "Use {city} and {category} placeholders and your own local lines around them.",
    "Live rebuttals consider the lead's data when suggesting a response.",
    "Follow-up drafts can reference the call before you send the text.",
  ],
  template: "Hi {name}, this is Dana with Riverside Realty. I work with {category} owners in {city}, and I noticed {evidence}. I am not selling anything today. I am curious whether you own or lease your space. Do you have a moment?",
  objection: "I am not looking to sell or move.",
  rebuttal: "Understood, and I am not suggesting you do. I am introducing myself because I work this neighborhood. If you ever have questions about what your space is worth or what is happening nearby, I am glad to be a resource. May I text you my contact info?",
};

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Outcomes in Sheets",
    body: "Each call result is logged with the lead so you know who to follow up with.",
  },
  {
    icon: Download,
    title: "CSV in HubSpot format",
    body: "Export for use in your own CRM. There is no native CRM sync.",
  },
  {
    icon: RefreshCw,
    title: "Retries",
    body: "Missed leads re-enter the queue until the attempt cap.",
  },
  {
    icon: Receipt,
    title: "Usage ledger",
    body: "See per-event call and SMS costs.",
  },
];

const compliance = [
  {
    icon: Clock,
    title: "Calling windows",
    body: "Calls are held to 8am to 9pm.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    body: "Keep do-not-contact numbers off your worklist, including SMS opt-outs.",
  },
  {
    icon: Repeat,
    title: "Attempt caps",
    body: "Limit attempts per lead.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure",
    body: "The AI qualifier says it is an AI.",
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
  "No MLS, expired listing, FSBO, or homeowner data. Leads come from Google Maps",
  "No voicemail drops, including with property addresses",
  "No instant speed-to-lead triggers from Zapier or other tools",
  "No call recording",
  "No native CRM sync. Export CSV in HubSpot format instead",
  "No power or predictive dialer",
];

const faqs = [
  {
    q: "Does Xovra give me homeowner or listing data?",
    a: "No. Xovra sources leads from Google Maps by niche and city. It is useful for prospecting local businesses and owners, not for pulling MLS, expired listing, or homeowner data.",
  },
  {
    q: "Can the AI know about a property?",
    a: "The AI qualifier uses the per-lead context and the campaign brief you give it. If you include area or property details in the brief, it can reference them.",
  },
  {
    q: "Will the AI pretend to be a person?",
    a: "No. The AI qualifier discloses that it is an AI at the start of the call.",
  },
  {
    q: "How do I follow up after a call?",
    a: "After connected AI calls Xovra can send a follow-up SMS, and you can text leads yourself in the two-way thread. You need 10DLC registration for SMS.",
  },
  {
    q: "Can I use it with my CRM?",
    a: "There is no native sync. Your results live in Google Sheets and can be exported as a CSV in HubSpot format.",
  },
  {
    q: "How much does it cost?",
    a: "$0.02 per minute for manual calls, $0.25 per minute for AI calls, and $0.03 per SMS.",
  },
];

const enrichment = [
  {
    angle: "RUNS_ADS",
    title: "Active advertisers",
    body: "A business spending on ads is growing. Good for expansion, relocation, or additional space conversations.",
  },
  {
    angle: "NO_SITE",
    title: "No website",
    body: "A small, owner-run shop with no site is often a long-time local. A friendly opener works better than a pitch.",
  },
  {
    angle: "WEAK_SITE",
    title: "Weak website",
    body: "Mention something specific about the business as a conversation starter and move toward real estate topics.",
  },
  {
    angle: "STRONG_SITE",
    title: "Strong website",
    body: "Established operators are a good fit for commercial space, lease renewals, and ownership conversations.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function RealEstatePage() {
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
              {"Where Xovra fits in a real estate practice"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Xovra is a Google Maps-based prospecting tool. It does not supply MLS data or homeowner records. It helps you find and call local businesses and owners."}</p>
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
              {"Common prospecting problems"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Real estate prospecting is mostly a lot of calls at inconvenient moments. Xovra aims to remove the prep and the first-touch grind."}</p>
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
              {"Features that help you prospect an area"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"A practical set of tools for agents who want to call, not build infrastructure."}</p>
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
              {"Read the business before you dial"}
            </h2>
            <p className="text-base leading-7 text-[#eaf1ff]">{"Pitch angles are designed for sales pitches, and agents can use them as a quick read on the type of business, how established it looks, and how to start the conversation."}</p>
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
              {"From a neighborhood to a call list"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"A simple weekly prospecting routine."}</p>
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
              {"A script that sounds like a neighbor"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455] mb-6">{"Local specifics are what make cold calls feel personal. Templates and briefs carry them."}</p>
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
              {"A record of every conversation"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Notes and results stay in your Google Sheet, not in your head."}</p>
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
              {"Prospecting rules still apply"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Real estate professionals are regularly audited on calling and texting rules. These features help."}</p>
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
              {"Pay for the calls and texts you make"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"There is no big monthly retainer to cover on slow weeks."}</p>
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
              {"Start prospecting your farm area"}
            </h2>
            <p className="text-base leading-7 text-[#eaddff] max-w-xl">{"Get early access and run your first Maps campaign, or book a demo and we will walk through a neighborhood together."}</p>
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
