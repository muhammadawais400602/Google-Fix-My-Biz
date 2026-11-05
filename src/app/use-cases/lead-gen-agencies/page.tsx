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
  Globe,
  Hash,
  Layers,
  MapPin,
  Megaphone,
  MessageSquare,
  Phone,
  PhoneCall,
  Receipt,
  RefreshCw,
  Repeat,
  ShieldCheck,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const hero = {
  icon: Building2,
  badge: "Built for lead gen and outbound agencies",
  title: "One platform for every client's outbound,",
  titleAccent: "each in its own organization.",
  sub: "Source leads from Google Maps for any niche, run AI qualifier or manual calling campaigns, and keep each client's numbers, scripts, and data separated in their own org. Outcomes are tracked in Google Sheets.",
  checks: [
    "Separate org per client",
    "Per-campaign briefs and scripts",
    "Usage ledger for billing back",
  ],
  card: {
    header: "Client org: Summit Roofing",
    tag: "AI mode",
    sourceLabel: "Campaign: Roofing leads for Summit, Boise",
    leadName: "Treasure Valley Gutters",
    leadMeta: "Rating 4.3 · Runs Google Ads · TikTok found",
    chips: ["Score 88", "RUNS_ADS", "Client org", "Brief attached"],
    scriptLabel: "AI qualifier outcome",
    script: "\"Score 7/10. Interested in a free estimate. Qualified: yes. Next action: schedule a callback with the client's estimator.\"",
    outcomes: ["Qualified", "Follow-up SMS", "Retry"],
  },
};

const facts = [
  {
    value: "1 org",
    label: "Per client, with its own members and numbers",
  },
  {
    value: "Any niche",
    label: "Google Maps scraping by niche and city",
  },
  {
    value: "2 modes",
    label: "Manual calling and AI qualifier per campaign",
  },
  {
    value: "Sheets",
    label: "Outcomes tracked in Google Sheets",
  },
];

const profiles = [
  {
    icon: Megaphone,
    title: "Lead generation agencies",
    body: "You sell qualified conversations to local service businesses. Scrape the target area, qualify with the AI, and hand over only the leads that showed interest.",
    tag: "Qualified leads as a service",
  },
  {
    icon: PhoneCall,
    title: "Outsourced SDR and appointment-setting shops",
    body: "You call for clients and need separate scripts, numbers, and sheets for each one. Orgs keep it all apart.",
    tag: "Appointment setting",
  },
  {
    icon: Globe,
    title: "Marketing and web agencies prospecting for themselves",
    body: "Pitch angles like NO_SITE and WEAK_SITE tell you which local businesses need your services, with audit evidence for the opener.",
    tag: "Own pipeline",
  },
  {
    icon: Layers,
    title: "Consultants with a handful of retainer clients",
    body: "A freelancer running outbound for three to five clients can keep them separate without juggling accounts.",
    tag: "Multi-client",
  },
];

const painPoints = [
  {
    icon: Building2,
    title: "Client data and numbers get mixed together",
    body: "A single shared account means one wrong sheet or one shared caller ID can embarrass you in front of a client.",
    fix: "Create a separate organization per client. Each org has its own members, roles, and phone numbers, so the client's calls come from the client's numbers.",
  },
  {
    icon: MapPin,
    title: "Sourcing leads for new niches takes days",
    body: "Every new client in a new vertical means starting a list from scratch.",
    fix: "Enter any niche and city. Xovra scrapes Google Maps and enriches each lead with a website audit, ad detection, and social presence, then scores it.",
  },
  {
    icon: FileText,
    title: "Every client needs a different pitch",
    body: "A roofing script does not work for a dentist. Generic scripts tank performance.",
    fix: "Each campaign carries its own brief, greeting, and call script template. The AI qualifier and the live rebuttals both work from that campaign's context.",
  },
  {
    icon: FileSpreadsheet,
    title: "Clients want to see what you did",
    body: "Without a clean record, you rebuild it by hand every week.",
    fix: "Outcomes are written to Google Sheets per campaign, and you can share the sheet or export CSV. The usage ledger gives you the call and SMS costs to bill back.",
  },
];

const features = [
  {
    icon: Building2,
    title: "Multi-tenant orgs",
    body: "One org per client with owner, admin, and agent roles and invites. Per-org phone numbers keep client traffic separate.",
    tag: "Client separation",
  },
  {
    icon: MapPin,
    title: "Google Maps sourcing",
    body: "Scrape by niche and city for any vertical, then export to Google Sheets and CSV.",
    tag: "Any niche",
  },
  {
    icon: Filter,
    title: "Enrichment and scoring",
    body: "Website audit, Google Ads detection, and Instagram, Facebook, and TikTok presence feed a score and a pitch angle.",
    tag: "Pitch angles",
  },
  {
    icon: Bot,
    title: "AI qualifier",
    body: "Telnyx AI assistant makes first-touch calls with per-lead context, discloses it is an AI, and returns score, interest, qualified, and next action.",
    tag: "Pre-qualify at scale",
  },
  {
    icon: Phone,
    title: "Manual browser dialer",
    body: "Your callers work from a Telnyx WebRTC softphone with keyboard shortcuts. One lead at a time, outcomes logged to the sheet.",
    tag: "C / H / 1-6",
  },
  {
    icon: FolderKanban,
    title: "Campaigns with briefs",
    body: "Manual or AI mode, sheet import, per-campaign brief and greeting, retry logic, and worklist filtering.",
    tag: "Per client",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Follow-up texts after connected AI calls, replies in the thread, and opt-out detection. Each client registers their own 10DLC.",
    tag: "$0.03 / SMS",
  },
  {
    icon: Hash,
    title: "Number pools",
    body: "Multiple numbers per org, health monitoring, and consistent lead-to-number mapping for reputation.",
    tag: "Per org",
  },
  {
    icon: Receipt,
    title: "Usage ledger",
    body: "Per-event records at $0.02 per manual minute, $0.25 per AI minute, and $0.03 per SMS, ready for cost pass-through.",
    tag: "Bill back clearly",
  },
];

const workflow = [
  {
    title: "Create a client org",
    body: "Set up the organization, invite the client or your callers, and assign phone numbers to that org.",
  },
  {
    title: "Define the target",
    body: "Choose the niche and city that match the client's service area, and run the Google Maps scrape.",
  },
  {
    title: "Filter by pitch angle",
    body: "Open the enriched sheet and keep the leads whose angle fits the client's offer.",
  },
  {
    title: "Write the brief and script",
    body: "Add the client's offer, tone, and qualifying questions as the campaign brief, plus a script with placeholders.",
  },
  {
    title: "Run AI or manual calling",
    body: "Let the AI qualifier handle first touch, or have your team call from the browser.",
  },
  {
    title: "Hand over outcomes",
    body: "Share the Google Sheet with outcomes and next actions, and use the ledger to reconcile cost.",
  },
];

const scriptPanel = {
  points: [
    "Each campaign has its own brief and greeting, kept apart from other clients.",
    "Script placeholders use the lead's own data so openers feel researched.",
    "The AI qualifier discloses that it is an AI, which matters when you represent someone else's brand.",
    "Follow-up drafts from Claude or Gemini save time after connected calls.",
  ],
  template: "Hi {name}, I am calling on behalf of Summit Roofing. We work with {category} owners in {city}. I noticed {evidence}. Would a quick conversation with our estimator be useful?",
  objection: "How did you get my number?",
  rebuttal: "Your business is listed publicly on Google Maps, which is where we found it. I only wanted to ask whether you are open to a short call. If not, I will make sure you are not contacted again.",
};

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Sheet per campaign",
    body: "Outcomes, scores, and next actions are written to the campaign's Google Sheet.",
  },
  {
    icon: Download,
    title: "CSV in HubSpot format",
    body: "Export for clients who want to import leads into their own CRM.",
  },
  {
    icon: RefreshCw,
    title: "Retry logic",
    body: "Leads that do not connect are retried up to the attempt cap you set.",
  },
  {
    icon: Receipt,
    title: "Ledger for costs",
    body: "Per-event usage so you can pass through the real number of minutes and texts.",
  },
];

const compliance = [
  {
    icon: Clock,
    title: "Calling windows",
    body: "Calls stay inside 8am to 9pm.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    body: "Maintain do-not-contact numbers, including opt-outs detected from SMS replies.",
  },
  {
    icon: Repeat,
    title: "Attempt caps",
    body: "Cap attempts per lead so campaigns do not over-call.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure",
    body: "The AI qualifier states that it is an AI at the start of the call.",
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
  "No white-label or custom-branded client portal",
  "No GoHighLevel, Zapier, or webhook automations",
  "No automated workflows or drip sequences beyond campaign retries",
  "No call recording",
  "No power or predictive dialer, and no ringless voicemail",
  "No guaranteed uptime SLA",
];

const faqs = [
  {
    q: "How do I keep client data separate?",
    a: "Create a separate organization for each client. Members, roles, and phone numbers belong to the org, so one client's data and numbers are not shared with another's.",
  },
  {
    q: "Can I scrape leads for any industry?",
    a: "Xovra scrapes Google Maps by niche and city, so any category with listings on Maps can be sourced.",
  },
  {
    q: "Do clients need to register for 10DLC?",
    a: "If you send SMS at volume in the US, the brand and campaign must be registered with the carrier. That is done by you or the client, not by Xovra.",
  },
  {
    q: "Can I white-label this?",
    a: "No. Xovra is not white-label.",
  },
  {
    q: "How do I report to clients?",
    a: "Share or export the campaign's Google Sheet, which holds outcomes and next actions. There is no built-in analytics dashboard.",
  },
  {
    q: "How do I charge clients for calling?",
    a: "The usage ledger records each billable event at $0.02 per manual minute, $0.25 per AI minute, and $0.03 per SMS, which you can use to cost out a campaign.",
  },
];

const enrichment = [
  {
    angle: "RUNS_ADS",
    title: "Active advertisers",
    body: "Good for agencies selling performance marketing, call tracking, or landing pages.",
  },
  {
    angle: "NO_SITE",
    title: "No website",
    body: "Prime prospects for web design, local SEO, and listing management services.",
  },
  {
    angle: "WEAK_SITE",
    title: "Weak website",
    body: "Use the audit evidence to demonstrate expertise in the first thirty seconds.",
  },
  {
    angle: "STRONG_SITE",
    title: "Strong website",
    body: "Pivot to social, reviews, ads, or advanced services instead of the basics.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function LeadGenAgenciesPage() {
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
              {"Agencies that make calls on behalf of clients"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"If your deliverable is booked appointments or qualified leads, Xovra covers sourcing, qualifying, and calling in one tool."}</p>
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
              {"What makes multi-client outbound hard"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Every client has a different niche, offer, and tolerance for mistakes. Mixing them up is the fastest way to lose one."}</p>
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
              {"The agency toolkit, as it exists today"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Built around orgs, campaigns, and sheets rather than integrations with a dozen outside tools."}</p>
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
              {"Sort leads by what your client actually sells"}
            </h2>
            <p className="text-base leading-7 text-[#eaf1ff]">{"Four pitch angles let you build campaigns around a client's offer, instead of calling everyone with the same script."}</p>
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
              {"Onboarding a new client campaign"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"A repeatable checklist that works the same for every vertical."}</p>
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
              {"A different brief for every client"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455] mb-6">{"The same campaign structure, with the client's own voice. Change the brief and greeting, and the AI and the live rebuttals follow."}</p>
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
              {"Results your clients can read"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"No branded portal, no BI layer. A Google Sheet per campaign, with a clear record of every outcome."}</p>
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
              {"Protect your clients and your agency"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"When you call for others, a complaint lands on you. The compliance controls apply per campaign and per org."}</p>
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
              {"Costs you can pass through to clients"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Usage-based rates make it easy to quote a campaign and reconcile it afterward."}</p>
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
              {"Run your next client campaign on Xovra"}
            </h2>
            <p className="text-base leading-7 text-[#eaddff] max-w-xl">{"Get early access, or book a demo and we will build a sample client org around one of your verticals."}</p>
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
