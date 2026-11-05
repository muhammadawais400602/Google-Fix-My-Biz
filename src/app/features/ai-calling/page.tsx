"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  Database,
  FileText,
  Gauge,
  Info,
  MessageSquare,
  Mic,
  Minus,
  PhoneCall,
  Plus,
  Scale,
  Search,
  ShieldCheck,
  Table,
  Target,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: ShieldCheck, label: "AI disclosed in the first sentence" },
  { icon: Gauge, label: "Lead score 1 to 10" },
  { icon: MessageSquare, label: "Follow-up SMS after connected calls" },
];

const panel = {
  title: "AI qualifier call",
  subtitle: "Per-lead variables injected before dialing",
  footnote: "Example values shown for explanation. Your campaign brief, greeting and qualification criteria control what the assistant says and how it scores.",
  icon: Bot,
};

const panelRows = [
  {
    icon: Building2,
    label: "Lead",
    value: "name: Smile Dental Clinic, category: dentist, pitch_angle: WEAK_SITE",
  },
  {
    icon: Mic,
    label: "Opening",
    value: "Hi, this is an AI assistant calling on behalf of the team at Xovra...",
  },
  {
    icon: Gauge,
    label: "Outcome",
    value: "lead_score: 7, interest: medium, qualified: true",
  },
  {
    icon: ArrowRight,
    label: "Next action",
    value: "Call back with a human operator, follow-up SMS already sent",
  },
];

const glance = [
  {
    icon: Bot,
    title: "Telnyx AI assistant",
    desc: "Calls run on a Telnyx AI assistant that belongs to your organization, with its own phone number.",
  },
  {
    icon: ShieldCheck,
    title: "Honest opening",
    desc: "The assistant states that it is an AI in the very first sentence of every call.",
  },
  {
    icon: Target,
    title: "Per-lead context",
    desc: "Name, category, reasons and pitch angle are passed to the assistant as dynamic variables.",
  },
  {
    icon: Gauge,
    title: "Structured outcomes",
    desc: "Every AI call ends with a lead score, interest level, qualified flag and next action.",
  },
];

const capabilities: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string; href?: string }[] = [
  {
    icon: Bot,
    title: "Telnyx AI assistant",
    desc: "A configurable AI assistant places qualifier calls through Telnyx. Each organization has its own assistant and its own numbers.",
  },
  {
    icon: ShieldCheck,
    title: "AI disclosure first",
    desc: "Disclosure is part of the opening line, not buried later. Nobody has to wonder whether they are speaking to a person.",
  },
  {
    icon: Database,
    title: "Dynamic variables",
    desc: "Each call receives the lead name, business category, the reasons the lead was flagged, and the pitch angle such as NO_SITE or WEAK_SITE.",
  },
  {
    icon: FileText,
    title: "Per-campaign brief",
    desc: "Write a brief and a greeting for each campaign so the assistant sounds right for dentists in Dubai and differently for roofers in Texas.",
  },
  {
    icon: Gauge,
    title: "Score and next action",
    desc: "Outcomes include lead_score from 1 to 10, interest, qualified and a suggested next_action, ready for your follow-up.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up SMS",
    desc: "After a connected call, a follow-up SMS is sent automatically so the lead has something in writing to reply to.",
  },
];

const steps = [
  {
    icon: Table,
    title: "Pick a campaign",
    desc: "Choose a campaign with AI mode on. Leads come from your Google Sheet import or pasted numbers.",
  },
  {
    icon: FileText,
    title: "Set the brief",
    desc: "Add the campaign brief, greeting and qualification criteria that tell the assistant what a good lead looks like.",
  },
  {
    icon: PhoneCall,
    title: "Assistant calls",
    desc: "The Telnyx assistant dials, opens by disclosing it is an AI, and uses the lead variables in conversation.",
  },
  {
    icon: Gauge,
    title: "Outcome recorded",
    desc: "Score, interest, qualified flag and next action are saved against the lead and the campaign.",
  },
  {
    icon: MessageSquare,
    title: "SMS goes out",
    desc: "On connected calls, the follow-up SMS is sent automatically, within your rate limits and calling windows.",
  },
];

const dives = [
  {
    eyebrow: "Per-lead context",
    title: "The assistant already knows who it is calling",
    desc: "Because Xovra sources and enriches leads itself, the assistant does not start from a blank script. It receives the facts you gathered about the business before the call is placed.",
    icon: Database,
    panelTitle: "Dynamic variables for one call",
    panelLines: [
      "name = \"Smile Dental Clinic\"",
      "category = \"dentist\"",
      "reasons = \"no HTTPS, outdated copyright year\"",
      "pitch_angle = \"WEAK_SITE\"",
    ],
    points: [
      { icon: Building2, title: "Name and category", desc: "The assistant can refer to the business properly instead of reading a generic opener." },
      { icon: Search, title: "Reasons the lead was flagged", desc: "Website audit findings and ads or social signals from enrichment travel with the lead." },
      { icon: Target, title: "Pitch angle", desc: "RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE shapes which angle the conversation takes." },
    ],
  },
  {
    eyebrow: "Qualification",
    title: "Outcomes you can act on the same day",
    desc: "A call that ends with a vague note is not much use. AI calls end with a structured result so you can sort your list by what matters.",
    icon: Gauge,
    panelTitle: "Structured AI outcome",
    panelLines: [
      "lead_score: 8",
      "interest: high",
      "qualified: true",
      "next_action: \"Operator to call back tomorrow morning\"",
    ],
    points: [
      { icon: Gauge, title: "Lead score from 1 to 10", desc: "A single number to rank which leads your human operator should call first." },
      { icon: UserCheck, title: "Interest and qualified", desc: "Separate fields for how interested the lead sounded and whether they met your criteria." },
      { icon: ClipboardList, title: "Next action", desc: "A suggested next step, such as callback, send info or drop the lead, stored with the outcome." },
    ],
  },
  {
    eyebrow: "Responsible by design",
    title: "Built around disclosure and limits",
    desc: "AI calling carries real obligations. Xovra bakes the basics into the product so they are on by default rather than something you have to remember.",
    icon: Scale,
    panelTitle: "Guardrails on AI calls",
    panelLines: [
      "disclosure: first sentence",
      "calling_window: 08:00 to 21:00 local",
      "attempt_cap: per contact",
      "suppression: Do Not Contact list checked",
    ],
    points: [
      { icon: ShieldCheck, title: "Disclosure in sentence one", desc: "The AI introduces itself as an AI before anything else is said." },
      { icon: Clock, title: "Calling windows", desc: "Calls respect an 8am to 9pm window with a configurable timezone." },
      { icon: Ban, title: "Suppression and caps", desc: "Do Not Contact numbers are skipped, attempt caps are enforced, and rate limits apply to AI calls and SMS." },
    ],
  },
];

const isList = [
  "Places qualifier calls through a Telnyx AI assistant tied to your organization",
  "Discloses that it is an AI in the first sentence of the call",
  "Uses per-lead dynamic variables: name, category, reasons and pitch_angle",
  "Records lead_score, interest, qualified and next_action for each AI call",
  "Sends a follow-up SMS automatically after connected calls",
  "Uses a per-campaign brief and greeting you control",
  "Works alongside the manual browser dialer, so a human can take over",
];

const isNotList = [
  "Not a mass autonomous dialer: it is a qualifier for a list you chose",
  "Not voice cloning, and no celebrity or ElevenLabs-style voices",
  "Not a voicemail drop or ringless voicemail tool",
  "No call recording or transcripts are provided",
  "No answering machine detection is included",
  "Not a substitute for 10DLC registration, which you complete with Telnyx",
];

const faqs = [
  {
    q: "Does the AI pretend to be a person?",
    a: "No. The assistant discloses that it is an AI in the first sentence of the call. This is a deliberate product decision, not a setting buried in a menu.",
  },
  {
    q: "What does the AI know about the lead before it calls?",
    a: "It receives per-lead dynamic variables: the lead name, business category, the reasons the lead was flagged and the pitch angle. These come from the Google Maps sourcing and enrichment step.",
  },
  {
    q: "What do I get back after a call?",
    a: "A lead score from 1 to 10, an interest level, a qualified flag and a suggested next action. These are stored with the lead and the campaign.",
  },
  {
    q: "Is there a follow-up message?",
    a: "Yes. After a connected call, a follow-up SMS is sent automatically through Telnyx SMS. Opt-outs such as STOP are detected and respected.",
  },
  {
    q: "Can I control what the assistant says?",
    a: "Yes. Each campaign has its own brief, greeting and qualification criteria, and AI can be toggled on or off per campaign.",
  },
  {
    q: "Do I need my own Telnyx account?",
    a: "Voice, SMS and the AI assistant run on Telnyx. SMS in the US requires 10DLC registration, which you complete with Telnyx.",
  },
  {
    q: "Does Xovra record or transcribe the calls?",
    a: "No. Xovra records outcomes, not audio, and does not provide call recordings or transcripts.",
  },
];

const related = [
  {
    icon: Search,
    href: "/features/lead-management",
    title: "Lead Sourcing",
    desc: "Where the per-lead context comes from.",
  },
  {
    icon: BarChart3,
    href: "/features/outcome-tracking",
    title: "Outcome Tracking",
    desc: "Where AI scores and outcomes are stored.",
  },
  {
    icon: MessageSquare,
    href: "/features/omnichannel",
    title: "Follow-Up and SMS",
    desc: "What happens after a connected call.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function AiCallingPage() {
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
            <span className="font-semibold text-[#0b1c30]">{"AI Qualifier Calls"}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"AI Qualifier Calls"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"An AI assistant that qualifies your leads,"}{" "}
                <span className="text-[#630ed4]">{"and tells them it is an AI."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Xovra connects a Telnyx AI assistant to your lead list. It places a qualifier call, opens by disclosing that it is an AI, uses what you already know about the business, and hands you a score, an interest level, and a next action."}
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
              {"A qualifier, not a mass dialer"}
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
              {"What you get"}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0b1c30] sm:text-4xl">
              {"Everything the AI qualifier does"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"The goal is simple: spend your human calling time on leads that are actually worth a conversation."}
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
              {"From lead row to qualified outcome"}
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
              {"What AI Qualifier Calls are, and are not"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"We would rather you know the boundaries before you sign up than discover them later."}</p>
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
              {"Questions about AI qualifier calls"}
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
                {"Qualify more leads before a human picks up the phone"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"Bring your Telnyx account and a campaign. We will help you set up the assistant, the brief and the greeting."}
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
                {"AI disclosure, calling windows and suppression lists are on by default. SMS requires 10DLC registration with Telnyx."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
