"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  FileSpreadsheet,
  Flag,
  Gauge,
  Info,
  Keyboard,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Receipt,
  Search,
  UserCheck,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: Keyboard, label: "Keys 1 to 6 for outcomes" },
  { icon: FileSpreadsheet, label: "Written to your Google Sheet" },
  { icon: Wallet, label: "Usage ledger and balance" },
];

const panel = {
  title: "Call outcome",
  subtitle: "One keystroke after the call",
  footnote: "Illustrative layout. Outcome labels and AI results depend on your campaign settings.",
  icon: ClipboardList,
};

const panelRows = [
  {
    icon: Keyboard,
    label: "Operator",
    value: "Press 1 to 6 to record the result of the call",
  },
  {
    icon: FileSpreadsheet,
    label: "Sheet",
    value: "Outcome is written to the lead's row in your Google Sheet",
  },
  {
    icon: Gauge,
    label: "AI calls",
    value: "lead_score, interest, qualified, appointment booked, next action",
  },
  {
    icon: Receipt,
    label: "Ledger",
    value: "Voice minutes and SMS costs added as per-event entries",
  },
];

const glance = [
  {
    icon: Keyboard,
    title: "One-key outcomes",
    desc: "Press 1 to 6 right after a call to log how it went.",
  },
  {
    icon: FileSpreadsheet,
    title: "Sheet output",
    desc: "Call outcomes are written to your Google Sheet so the data stays in your hands.",
  },
  {
    icon: Gauge,
    title: "AI results",
    desc: "Lead score, interest, qualified, appointment booked and next action for AI calls.",
  },
  {
    icon: Wallet,
    title: "Usage ledger",
    desc: "Per-event voice minutes and SMS costs, with balance and spend today and month to date.",
  },
];

const capabilities: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string; href?: string }[] = [
  {
    icon: Keyboard,
    title: "Keyboard outcomes",
    desc: "With the browser dialer, keys 1 to 6 record the call outcome so you can move to the next lead quickly.",
  },
  {
    icon: FileSpreadsheet,
    title: "Written to Google Sheets",
    desc: "Outcomes land in the Sheet your leads came from, which keeps one source of truth you can filter, share and export.",
  },
  {
    icon: Gauge,
    title: "AI lead score",
    desc: "AI qualifier calls produce a lead score from 1 to 10 that you can sort by.",
  },
  {
    icon: UserCheck,
    title: "Interest and qualified",
    desc: "Separate fields show how interested the lead was and whether they met your criteria.",
  },
  {
    icon: Calendar,
    title: "Appointment booked",
    desc: "AI call outcomes include an appointment booked flag, and a next action for whatever should happen next.",
  },
  {
    icon: Receipt,
    title: "Usage ledger",
    desc: "Each voice call and SMS adds a ledger event, so spend is traceable down to the individual event.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Call finishes",
    desc: "A manual call from the browser dialer, or an AI qualifier call, ends.",
  },
  {
    icon: Keyboard,
    title: "Outcome logged",
    desc: "The operator presses a key, or the AI returns score, interest, qualified and next action.",
  },
  {
    icon: FileSpreadsheet,
    title: "Sheet updated",
    desc: "The outcome is written to the matching row in your Google Sheet.",
  },
  {
    icon: Receipt,
    title: "Ledger entry",
    desc: "Voice minutes and any SMS costs are recorded as events in the usage ledger.",
  },
  {
    icon: Wallet,
    title: "Balance visible",
    desc: "Check balance and spend for today and month to date at any time.",
  },
];

const dives = [
  {
    eyebrow: "Operator outcomes",
    title: "Log the call before the next one starts",
    desc: "Admin work slows cold calling down. Keyboard shortcuts in the browser dialer keep outcome logging to one keypress.",
    icon: Keyboard,
    panelTitle: "Browser dialer shortcuts",
    panelLines: [
      "C = call",
      "H = hang up",
      "1 to 6 = record outcome",
      "outcome written to the Google Sheet",
    ],
    points: [
      { icon: Keyboard, title: "Fast keys", desc: "C starts a call, H hangs up, and 1 to 6 record the outcome." },
      { icon: FileSpreadsheet, title: "Sheet as source of truth", desc: "Outcomes are written to your Google Sheet, where you already work." },
      { icon: Flag, title: "Per campaign", desc: "Outcomes are grouped by campaign so you can see how each list is performing." },
    ],
  },
  {
    eyebrow: "AI call results",
    title: "Structured outcomes from qualifier calls",
    desc: "AI calls report back in a consistent format so you can sort, filter and hand the best leads to a human.",
    icon: Gauge,
    panelTitle: "AI call result",
    panelLines: [
      "lead_score: 9",
      "interest: high",
      "qualified: true",
      "appointment_booked: false",
      "next_action: \"Send info by email and call Friday\"",
    ],
    points: [
      { icon: Gauge, title: "Lead score", desc: "A number from 1 to 10 for ranking." },
      { icon: UserCheck, title: "Interest and qualified", desc: "Reads on enthusiasm and fit, kept as separate fields." },
      { icon: ClipboardList, title: "Next action", desc: "A suggested follow-up so nothing is left to memory." },
    ],
  },
  {
    eyebrow: "Usage ledger",
    title: "Costs you can trace to the event",
    desc: "Voice and SMS cost money. The usage ledger records each event so you can see what a campaign actually cost, not just a monthly total.",
    icon: Receipt,
    panelTitle: "Ledger view",
    panelLines: [
      "event: voice call, minutes recorded",
      "event: SMS sent, cost recorded",
      "balance: current",
      "spend: today, month to date",
    ],
    points: [
      { icon: Receipt, title: "Per-event entries", desc: "Voice minutes and SMS costs are logged individually." },
      { icon: Wallet, title: "Balance", desc: "See your current balance without leaving the app." },
      { icon: Calendar, title: "Today and MTD", desc: "Spend is shown for today and for the month to date." },
    ],
  },
];

const isList = [
  "Writes call outcomes to your Google Sheet",
  "Records AI lead score, interest, qualified, appointment booked and next action",
  "Keeps a usage ledger with per-event voice minutes and SMS costs",
  "Shows balance and spend for today and month to date",
  "Tracks outcomes per campaign",
];

const isNotList = [
  "No analytics dashboards or charts",
  "No automatic CRM updates: export the CSV to HubSpot yourself",
  "No automated workflows triggered by outcomes",
  "No call recordings or transcripts attached to outcomes",
  "No subscription billing: costs reflect usage",
];

const faqs = [
  {
    q: "Where are outcomes stored?",
    a: "Call outcomes are written to your Google Sheet. AI call results and usage ledger entries are also kept in Xovra.",
  },
  {
    q: "Are there dashboards or charts?",
    a: "No. Xovra shows outcomes, balance and spend, but it does not include analytics dashboards or charts. Use your Sheet if you want to chart the data.",
  },
  {
    q: "What does the usage ledger track?",
    a: "Per-event voice minutes and SMS costs, with balance and spend for today and month to date.",
  },
  {
    q: "What AI results are recorded?",
    a: "Lead score from 1 to 10, interest, qualified, appointment booked and next action.",
  },
  {
    q: "Does it update my CRM?",
    a: "No. There is no native CRM sync. Lead data can be exported as a HubSpot-compatible CSV.",
  },
  {
    q: "Can I see results by campaign?",
    a: "Yes. Outcomes are tracked per campaign.",
  },
];

const related = [
  {
    icon: Bot,
    href: "/features/ai-calling",
    title: "AI Qualifier Calls",
    desc: "Where AI outcomes come from.",
  },
  {
    icon: Search,
    href: "/features/lead-management",
    title: "Lead Sourcing",
    desc: "Where your Sheet starts.",
  },
  {
    icon: MessageSquare,
    href: "/features/omnichannel",
    title: "Follow-Up and SMS",
    desc: "What happens after outcomes are logged.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function OutcomeTrackingPage() {
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
          <nav className="flex items-center gap-2 pt-8 text-xs font-semibold tracking-wide text-[#4a4455]">
            <Link href="/features" className="transition-colors hover:text-[#630ed4]">
              Features
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#0b1c30]">{"Outcome Tracking"}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"Outcome tracking"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"Every call leaves a record,"}{" "}
                <span className="text-[#630ed4]">{"and every cost is accounted for."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Log outcomes with a single key, see AI scores and qualification beside them, and track voice minutes and SMS spend in a usage ledger, per campaign and over time."}
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
              {"At a glance"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Know what happened and what it cost"}
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
              {"Capabilities"}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Outcomes, scores and spend in one place"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"Xovra records what matters after each call and keeps costs transparent. It is not a charting product."}
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
              {"How it works"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {"From call to ledger entry"}
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
              {"What outcome tracking is, and is not"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"Simple, accurate records rather than a business intelligence suite."}</p>
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
      {/* FAQ                                                           */}
      {/* ============================================================ */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#630ed4]">
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Questions about outcome tracking"}
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
      {/* RELATED                                                       */}
      {/* ============================================================ */}
      <section className="w-full bg-[#eff4ff] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-[#0b1c30]">
            Related features
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaddff]">
                  <r.icon className="h-5 w-5 text-[#630ed4]" />
                </div>
                <div>
                  <h3 className="mb-1 flex items-center gap-1.5 text-base font-bold text-[#0b1c30]">
                    {r.title}
                    <ArrowRight className="h-4 w-4 text-[#630ed4] transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a4455]">{r.desc}</p>
                </div>
              </Link>
            ))}
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
                {"Keep a clean record of every call"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"See outcomes land in your Google Sheet and costs show up in the ledger."}
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
                {"No dashboards or charts. Outcomes live in your Sheet, costs live in the ledger."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
