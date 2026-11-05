"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderKanban,
  Hash,
  Keyboard,
  MapPin,
  MessageSquare,
  Receipt,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  UserCog,
  Users,
  X,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const hero = {
  icon: Users,
  badge: "Built for sales teams running outbound",
  title: "Organized cold calling campaigns,",
  titleAccent: "manual or AI, with every rep on the same page.",
  sub: "Xovra gives your team shared campaigns, per-campaign scripts, role-based access, and a usage ledger for every call and text. Reps call from the browser with keyboard shortcuts, and number pools protect your caller ID reputation.",
  checks: [
    "Owner, admin, and agent roles",
    "Per-org phone numbers",
    "Per-event usage ledger",
  ],
  card: {
    header: "Campaign worklist",
    tag: "Manual mode",
    sourceLabel: "Campaign: Austin HVAC, Q4 outreach",
    leadName: "Lone Star Heating & Air",
    leadMeta: "Attempt 2 of 3 · Call window open · Not suppressed",
    chips: ["Score 76", "RUNS_ADS", "Number pool A", "Rep: agent"],
    scriptLabel: "Campaign script, filled for this lead",
    script: "\"Hi, is this Lone Star Heating? I noticed you are running Google Ads and wanted to ask how many of those clicks turn into booked calls...\"",
    outcomes: ["1 Interested", "2 Callback", "3 No answer"],
  },
};

const facts = [
  {
    value: "3",
    label: "Roles: owner, admin, and agent",
  },
  {
    value: "C / H / 1-6",
    label: "Call, hang up, and log an outcome without the mouse",
  },
  {
    value: "8am-9pm",
    label: "Calling window enforced on campaigns",
  },
  {
    value: "Per event",
    label: "Usage ledger entries for each call and SMS",
  },
];

const profiles = [
  {
    icon: Briefcase,
    title: "Small SDR and BDR teams",
    body: "Two to ten reps working a shared list of local businesses. Everyone sees the same campaign worklist, and filtering keeps reps from calling the same lead twice.",
    tag: "Shared worklists",
  },
  {
    icon: UserCog,
    title: "Sales managers who set the playbook",
    body: "Write the script, the campaign brief, and the greeting once. Reps and the AI qualifier both work from the same message.",
    tag: "Consistent messaging",
  },
  {
    icon: Store,
    title: "Founder-led teams adding their first reps",
    body: "Invite new people as agents, give them a number, and let them start calling. Admins can see usage per person without a complex setup.",
    tag: "First hires",
  },
  {
    icon: Bot,
    title: "Teams that want AI on the first touch",
    body: "Run a campaign in AI mode so the qualifier handles the first call, then route the interested leads to a rep with the score and next action already attached.",
    tag: "AI + human",
  },
];

const painPoints = [
  {
    icon: ClipboardList,
    title: "Reps work from different lists and different scripts",
    body: "Without a shared campaign, every rep invents their own pitch and calls whoever they like. You cannot learn what works.",
    fix: "Campaigns hold the sheet import, the brief, the greeting, and the script. Filtering the worklist means reps pick up where the campaign left off.",
  },
  {
    icon: Keyboard,
    title: "Manual calling is slow when every action needs a click",
    body: "Dialing, hanging up, and logging outcomes across several screens costs minutes per hour.",
    fix: "The browser dialer is built around keyboard shortcuts: C to call, H to hang up, and 1 to 6 to record the outcome. It is still one lead at a time. Xovra has no power or predictive dialer.",
  },
  {
    icon: Hash,
    title: "Caller ID gets flagged and answer rates drop",
    body: "If every rep dials from one number, that number burns out and the whole team suffers.",
    fix: "Number pools let you use multiple numbers, monitor their health, and keep a consistent lead-to-number mapping so a prospect always sees the same caller ID.",
  },
  {
    icon: Receipt,
    title: "No one knows what each rep or campaign costs",
    body: "Phone and texting costs are a lump on a monthly bill.",
    fix: "The usage ledger records each billable event, so you can see call minutes and SMS counts per campaign and per person. It is a cost record, not a performance dashboard.",
  },
];

const features = [
  {
    icon: FolderKanban,
    title: "Campaign management",
    body: "Create campaigns in manual or AI mode, import leads from a Google Sheet, and set a brief and greeting for each.",
    tag: "Manual or AI",
  },
  {
    icon: FileText,
    title: "Per-campaign call scripts",
    body: "Templates with placeholders such as {name}, {category}, {city}, {rating}, and {evidence} so each rep's script is filled in for the lead.",
    tag: "Placeholders",
  },
  {
    icon: Users,
    title: "Orgs, roles, and invites",
    body: "Each organization has owners, admins, and agents. Invite teammates by email and control who can change settings.",
    tag: "owner / admin / agent",
  },
  {
    icon: Hash,
    title: "Number pools",
    body: "Run several numbers per org with health monitoring and consistent lead-to-number mapping, so reputation is spread and protected.",
    tag: "Caller ID health",
  },
  {
    icon: Keyboard,
    title: "Keyboard-first dialer",
    body: "Telnyx WebRTC softphone with C to call, H to hang up, and 1 to 6 for outcomes, written to the Google Sheet.",
    tag: "Fast manual calling",
  },
  {
    icon: Bot,
    title: "AI qualifier mode",
    body: "A Telnyx AI assistant makes first-touch calls with per-lead context, discloses it is an AI, and returns score, interest, qualified, and next action.",
    tag: "Pre-screening",
  },
  {
    icon: Sparkles,
    title: "Live AI rebuttals",
    body: "Claude or Gemini suggests objection handling during a manual call, using what is known about the lead, and drafts follow-ups.",
    tag: "Rep assist",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Follow up by text through Telnyx, read replies, and rely on opt-out detection. Customers register 10DLC.",
    tag: "$0.03 / SMS",
  },
  {
    icon: Repeat,
    title: "Retry logic and filtering",
    body: "Retry leads that did not connect up to the attempt cap, and filter the worklist so reps only see who is due.",
    tag: "Worklist control",
  },
];

const workflow = [
  {
    title: "Create the org and invite reps",
    body: "The owner creates the organization, then invites admins and agents. Each org can have its own phone numbers.",
  },
  {
    title: "Source and import leads",
    body: "Scrape Google Maps for a niche and city, or import an existing Google Sheet into a campaign.",
  },
  {
    title: "Write the brief and script",
    body: "Set the campaign brief, the greeting, and the call script template with placeholders.",
  },
  {
    title: "Assign numbers from the pool",
    body: "Attach numbers from your pool. Each lead keeps the same number across attempts.",
  },
  {
    title: "Reps call, or AI qualifies",
    body: "Manual reps use the keyboard shortcuts. AI mode makes the first-touch calls and passes interested leads along.",
  },
  {
    title: "Review the ledger and retry",
    body: "Check usage per event, let retry logic re-queue missed leads, and adjust the script for the next run.",
  },
];

const scriptPanel = {
  points: [
    "Managers edit the template once. Every rep and the AI see the same version.",
    "Placeholders pull the name, category, city, rating, and evidence from each lead.",
    "Live rebuttals appear when a prospect objects, based on the lead's context.",
    "Follow-up drafts are generated after the call so reps can send them quickly.",
  ],
  template: "Hi {name}, this is Jordan with Northline. I was looking at {category} companies in {city} and saw you have {rating} stars. {evidence}. I wanted to ask how you currently handle this. Do you have a minute?",
  objection: "Just send me an email, I'm busy.",
  rebuttal: "Happy to. So I send the right thing, can you tell me what matters more to you right now: getting more booked jobs or spending less to get them? Then I will keep the email short.",
};

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Outcomes in the sheet",
    body: "Each call result from the 1 to 6 shortcuts is written to the campaign's Google Sheet.",
  },
  {
    icon: Receipt,
    title: "Per-rep usage",
    body: "The ledger shows minutes and texts billed, so you can see activity per rep and per campaign.",
  },
  {
    icon: Filter,
    title: "Worklist filters",
    body: "Filter by status, attempts, or outcome so reps always know who is next.",
  },
  {
    icon: Download,
    title: "CSV export",
    body: "Export in HubSpot format if you want to load leads into a CRM manually.",
  },
];

const compliance = [
  {
    icon: Clock,
    title: "Calling windows",
    body: "Campaigns respect an 8am to 9pm calling window.",
  },
  {
    icon: Ban,
    title: "Suppression lists",
    body: "Numbers on the suppression list are blocked from being called or texted.",
  },
  {
    icon: Repeat,
    title: "Attempt caps",
    body: "Set the maximum attempts per lead to prevent over-calling.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure",
    body: "The AI qualifier discloses that it is an AI on every call.",
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
  "No multi-line, power, or predictive dialer",
  "No manager whisper, barge, or live call monitoring",
  "No leaderboards or analytics dashboards",
  "No call recording",
  "No native CRM sync. Use Google Sheets or the HubSpot-format CSV",
  "No Zapier, Make, or Slack integrations",
];

const faqs = [
  {
    q: "What can an agent do versus an admin?",
    a: "Owners and admins manage the organization, invites, numbers, and settings. Agents work the campaigns they are given. Owners hold the highest level of access.",
  },
  {
    q: "Can multiple reps dial at once?",
    a: "Yes, each rep works in their own browser. Each call is still one lead at a time per rep. There is no power or predictive dialer.",
  },
  {
    q: "How do number pools help?",
    a: "You can add several numbers, watch their health, and keep each lead mapped to the same number across attempts, so no single number takes all the volume.",
  },
  {
    q: "How do I see what each rep did?",
    a: "Call outcomes are written to the Google Sheet, and the usage ledger shows billable calls and texts. Xovra does not include analytics dashboards or leaderboards.",
  },
  {
    q: "Can I connect it to our CRM?",
    a: "Not natively. You can export a CSV in HubSpot format and import it yourself. Google Sheets is the system of record.",
  },
  {
    q: "Do you record calls for coaching?",
    a: "No. Xovra does not record calls.",
  },
];

const enrichment = [
  {
    angle: "RUNS_ADS",
    title: "Running Google Ads",
    body: "Ad spend means budget and intent. Open with conversion, call tracking, or landing page performance.",
  },
  {
    angle: "NO_SITE",
    title: "No website",
    body: "Lead with presence and credibility. The conversation starts from something they obviously lack.",
  },
  {
    angle: "WEAK_SITE",
    title: "Weak website",
    body: "The audit evidence goes straight into the script via {evidence}, so reps sound informed.",
  },
  {
    angle: "STRONG_SITE",
    title: "Strong website",
    body: "Skip the basics. Pitch advanced services or use a different angle like reviews or social.",
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function SalesTeamsPage() {
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
              {"Who runs outbound on Xovra"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Teams that want structure around cold calling, without adding a heavy sales stack."}</p>
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
              {"Where outbound campaigns usually break down"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"The calling itself is rarely the problem. Structure, consistency, and phone number health are."}</p>
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
              {"Team features that are in the product today"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Roles, campaigns, scripts, and numbers, built for teams that call from the browser."}</p>
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
              {"Give every rep a reason to call, not just a number"}
            </h2>
            <p className="text-base leading-7 text-[#eaf1ff]">{"Lead sourcing scrapes Google Maps by niche and city, enriches the results, and tags each lead with one of four pitch angles. Managers can assign campaigns by angle."}</p>
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
              {"How a team campaign runs"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"From the first lead list to the last retry."}</p>
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
              {"One script, filled in for every lead"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455] mb-6">{"Standardize the opening without sounding robotic. Templates use the enrichment data so reps start with a specific observation."}</p>
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
              {"Tracking without a dashboard"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Xovra is honest about what it tracks. Results go to your Google Sheet, and spend goes to the usage ledger."}</p>
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
              {"Guardrails every rep operates inside"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Compliance settings apply to the campaign, so a new rep cannot accidentally dial outside the rules."}</p>
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
              {"Pay per use, not per seat"}
            </h2>
            <p className="text-base leading-7 text-[#4a4455]">{"Team size does not set your bill. Calls and texts do, and the ledger shows exactly where it went."}</p>
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
              {"Bring structure to your outbound campaigns"}
            </h2>
            <p className="text-base leading-7 text-[#eaddff] max-w-xl">{"Get early access, or book a demo and we will set up a sample campaign with your team's niche and city."}</p>
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
