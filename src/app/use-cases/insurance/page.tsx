"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Briefcase,
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
  Hash,
  MapPin,
  MessageSquare,
  Phone,
  Receipt,
  RefreshCw,
  Repeat,
  Shield,
  ShieldCheck,
  Sparkles,
  Umbrella,
  Users,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const hero = {
  icon: Shield,
  badge: "Built for insurance agents and IMOs",
  title: "Find business owners who need coverage,",
  titleAccent: "pre-screen interest with AI, and stay inside the rules.",
  sub: "Xovra scrapes Google Maps for businesses in your target area, enriches each with website and social data, and lets an AI qualifier or your agents make the call. Calling windows, suppression lists, and attempt caps are built in.",
  checks: [
    "Calling windows enforced",
    "Suppression lists",
    "AI disclosure on every call",
  ],
  card: {
    header: "Commercial lines campaign",
    tag: "AI mode",
    sourceLabel: "Maps search: restaurants in Phoenix",
    leadName: "Desert Rose Grill",
    leadMeta: "Rating 4.4 · Instagram active · Runs Google Ads",
    chips: ["Score 81", "RUNS_ADS", "Instagram", "Attempt 1 of 3"],
    scriptLabel: "AI qualifier result",
    script: "\"Interest: medium. Renewal in about two months. Qualified: yes. Next action: agent callback to review general liability.\"",
    outcomes: ["Qualified", "Callback", "Suppress"],
  },
};

const facts = [
  {
    value: "8am-9pm",
    label: "Calling window enforced on campaigns",
  },
  {
    value: "Suppression",
    label: "Lists block contact and detect SMS opt-outs",
  },
  {
    value: "Attempt caps",
    label: "Limit how many times a lead is called",
  },
  {
    value: "AI disclosed",
    label: "The qualifier says it is an AI",
  },
];

const profiles = [
  {
    icon: Briefcase,
    title: "Independent commercial agents",
    body: "Target restaurants, contractors, salons, retailers, and other small businesses in your territory for general liability, workers' comp, commercial auto, and BOP.",
    tag: "Commercial lines",
  },
  {
    icon: Building2,
    title: "IMOs and agencies recruiting or supporting agents",
    body: "Run campaigns by product line or territory in separate organizations, with roles for owners, admins, and agents.",
    tag: "Multi-team",
  },
  {
    icon: Users,
    title: "Benefits and employer-focused producers",
    body: "Find small employers by category and city and use pre-screening to identify who is open to a conversation.",
    tag: "Small employers",
  },
  {
    icon: Umbrella,
    title: "P&C agents expanding a book",
    body: "Use website and social signals to understand how established a business is before you call.",
    tag: "New business",
  },
];

const painPoints = [
  {
    icon: MapPin,
    title: "Finding the right businesses is manual",
    body: "Searching by category and city, copying details, and sorting out who is real takes hours.",
    fix: "Scrape Google Maps by niche and city, enrich each business with a website audit, ad detection, and social presence, and get a scored sheet and CSV.",
  },
  {
    icon: Bot,
    title: "Most calls go nowhere",
    body: "Agents spend hours reaching people who are not interested or not decision-makers.",
    fix: "The AI qualifier pre-screens each lead, discloses that it is an AI, and returns a score, interest level, qualified flag, and next action. Your agents focus on qualified leads.",
  },
  {
    icon: FolderKanban,
    title: "Product lines need different approaches",
    body: "A pitch for workers' comp is not the pitch for commercial auto.",
    fix: "Campaigns have their own brief, greeting, and call script. Run one campaign per product line, in manual or AI mode, with sheet import and worklist filtering.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance is a constant worry",
    body: "A single complaint can mean fines or regulator attention.",
    fix: "Built-in suppression lists, 8am to 9pm calling windows, attempt caps, and AI disclosure give you guardrails. Final compliance responsibility stays with you.",
  },
];

const features = [
  {
    icon: MapPin,
    title: "Maps-based lead sourcing",
    body: "Search for businesses by niche and city in your territory. Output goes to a Google Sheet and CSV.",
    tag: "Territory search",
  },
  {
    icon: Filter,
    title: "Enrichment",
    body: "Website audit, Google Ads detection, and Instagram, Facebook, and TikTok presence reveal how established and active a business is.",
    tag: "Opportunity signals",
  },
  {
    icon: Bot,
    title: "AI pre-screening",
    body: "The Telnyx AI assistant calls with per-lead context and returns score, interest, qualified, and next action.",
    tag: "Qualify first",
  },
  {
    icon: Phone,
    title: "Browser dialer",
    body: "Agents call from a Telnyx WebRTC softphone with keyboard shortcuts and log outcomes to Google Sheets.",
    tag: "C / H / 1-6",
  },
  {
    icon: Sparkles,
    title: "Live rebuttals",
    body: "Claude or Gemini suggests objection handling with the lead's context, and drafts follow-ups after the call.",
    tag: "In-call support",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Follow up after connected calls and read replies. Opt-outs are detected, and you register 10DLC.",
    tag: "$0.03 / SMS",
  },
  {
    icon: FileText,
    title: "Call scripts",
    body: "Templates with {name}, {category}, {city}, {rating}, and {evidence} placeholders for each product line.",
    tag: "Per product line",
  },
  {
    icon: Users,
    title: "Orgs and roles",
    body: "Owners, admins, and agents with invites and per-org numbers, useful for agencies and IMOs.",
    tag: "Teams",
  },
  {
    icon: Hash,
    title: "Number pools",
    body: "Several numbers, health monitoring, and consistent lead-to-number mapping.",
    tag: "Caller ID reputation",
  },
];

const workflow = [
  {
    title: "Choose a niche and territory",
    body: "For example, contractors in Tampa for workers' comp or restaurants in Phoenix for general liability.",
  },
  {
    title: "Scrape and review",
    body: "Xovra builds the enriched, scored sheet. Remove businesses you do not write.",
  },
  {
    title: "Create the campaign",
    body: "Pick manual or AI mode, import the sheet, and write the brief, greeting, and script for that product line.",
  },
  {
    title: "Set compliance controls",
    body: "Confirm the calling window, add suppression numbers, and set the attempt cap.",
  },
  {
    title: "Pre-screen with AI or call yourself",
    body: "The AI qualifier returns who is interested and the suggested next action. Agents call qualified leads.",
  },
  {
    title: "Follow up and log",
    body: "Send follow-up texts where appropriate and keep outcomes in your Google Sheet.",
  },
];

const scriptPanel = {
  points: [
    "The AI states that it is an AI before it asks any questions.",
    "Campaign briefs keep the conversation on the right product line.",
    "Live rebuttals are suggestions for the agent to review and say in their own voice.",
    "Follow-up drafts keep wording consistent with what was said on the call.",
  ],
  template: "Hi {name}, this is Chris, an independent insurance agent in {city}. I work with {category} owners on their business coverage. {evidence}. Do you have two minutes to see whether a second look at your policy would help?",
  objection: "We already have an agent we have used for years.",
  rebuttal: "That is good to hear, and I am not asking you to leave them. A lot of owners ask for a second set of eyes at renewal. If I send a short note with questions to check, would that be okay?",
};

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Outcome logging",
    body: "Calls and AI qualifier results are written to the sheet.",
  },
  {
    icon: Download,
    title: "CSV in HubSpot format",
    body: "Move qualified leads to your agency management or CRM system by hand.",
  },
  {
    icon: RefreshCw,
    title: "Retries",
    body: "Retry logic works inside your attempt caps and calling windows.",
  },
  {
    icon: Receipt,
    title: "Usage ledger",
    body: "Track the cost of each campaign line by line.",
  },
];

const compliance = [
  {
    icon: Clock,
    title: "8am to 9pm calling windows",
    body: "Campaigns respect permitted calling hours.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    body: "Block numbers from being called or texted. SMS opt-outs are detected.",
  },
  {
    icon: Repeat,
    title: "Attempt caps",
    body: "Cap the number of calls per lead.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure",
    body: "The AI qualifier discloses that it is an AI in every call.",
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
  "No voicemail drops or ringless voicemail",
  "No power or predictive dialer",
  "No native CRM or agency management system sync",
  "No Zapier or webhook automations",
  "No analytics dashboards",
  "No call recording, and no SOC 2 or HIPAA certification claims",
];

const faqs = [
  {
    q: "Does Xovra include consumer insurance leads?",
    a: "No. Leads come from Google Maps, so it fits commercial and small-business prospecting. It does not sell or supply lead lists for Medicare, ACA, or final expense.",
  },
  {
    q: "Can the AI discuss policy details or give quotes?",
    a: "No. The AI qualifier is for pre-screening. It records a score, interest, qualified flag, and next action, and your licensed agent handles everything else.",
  },
  {
    q: "How do I handle do-not-call requests?",
    a: "Add numbers to a suppression list. Xovra also detects opt-outs in SMS replies. You remain responsible for honoring all applicable do-not-call rules.",
  },
  {
    q: "Can I run separate campaigns for each product line?",
    a: "Yes. Each campaign has its own brief, greeting, script, and lead sheet, and can run in manual or AI mode.",
  },
  {
    q: "Is Xovra compliant for me?",
    a: "It provides compliance tools such as calling windows, suppression, attempt caps, and AI disclosure. Compliance with the law depends on how you use them and your own consent practices.",
  },
  {
    q: "How much does it cost?",
    a: "$0.02 per minute for manual calls, $0.25 per minute for AI calls, and $0.03 per SMS.",
  },
];

const enrichment = [
  {
    angle: "RUNS_ADS",
    title: "Actively advertising",
    body: "The business is investing in growth. Ask about exposure, vehicles, employees, and contracts.",
  },
  {
    angle: "NO_SITE",
    title: "No website",
    body: "Likely a smaller or older operation. A direct, plain conversation about current coverage tends to fit.",
  },
  {
    angle: "WEAK_SITE",
    title: "Weak website",
    body: "May indicate limited back office. Ask who handles insurance and renewals.",
  },
  {
    angle: "STRONG_SITE",
    title: "Strong website",
    body: "Established operations with staff and assets often have more complex coverage needs.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function InsurancePage() {
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
              {"Who uses Xovra in insurance"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Xovra is built for prospecting business owners found on Google Maps, not for purchased consumer lead lists."}</p>
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
              {"Prospecting problems in insurance"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Cold outreach is regulated and most business owners are hard to reach. The tool needs to support both the process and the rules."}</p>
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
              {"Features for insurance prospecting"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Sourcing, qualifying, calling, and follow-up with compliance controls in the same product."}</p>
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
              {"Use signals to find the opening question"}
            </h2>
            <p className="text-base leading-7 text-[#eaf1ff]">{"Pitch angles started as marketing categories. For insurance they work as a quick read on a business's size and activity, so your first question is relevant."}</p>
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
              {"A prospecting workflow for one product line"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Repeat per line, per territory, or per agent."}</p>
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
              {"Scripts that respect the prospect's time"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455] mb-6">{"Business owners screen cold calls. A specific, short opener that is clear about who is calling works best."}</p>
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
              {"Tracking, without the dashboards"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Results are in your Google Sheet and the usage ledger. There is no analytics dashboard."}</p>
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
              {"Built-in guardrails for regulated outreach"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Insurance calling is regulated at federal and state levels. Xovra gives you controls, and you remain responsible for following the law."}</p>
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
              {"Pay per use while you test product lines"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Try a small campaign for each line and keep only the ones that work."}</p>
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
              {"Pre-screen your territory before you pick up the phone"}
            </h2>
            <p className="text-base leading-7 text-[#eaddff] max-w-xl">{"Get early access, or book a demo and we will build a sample commercial lines campaign with you."}</p>
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
