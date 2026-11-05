"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Bot,
  ChevronDown,
  Clock,
  Gavel,
  Gauge,
  Info,
  ListChecks,
  MessageSquare,
  Repeat,
  Scale,
  Server,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Phone,
} from "lucide-react";

const features = [
  {
    id: "suppression",
    icon: Ban,
    title: "Suppression lists",
    summary:
      "Numbers that opt out are recorded in an append-only suppression list and are never contacted again.",
    points: [
      "Append-only JSONL log, so entries are added and not quietly edited away",
      "Opt-out detection on inbound texts for keywords such as STOP and UNSUBSCRIBE",
      "Checked before every outbound call and text",
    ],
  },
  {
    id: "window",
    icon: Clock,
    title: "Calling window enforcement",
    summary:
      "Outbound contact is blocked outside allowed hours. The default window is 8am to 9pm, and the timezone is configurable.",
    points: [
      "Default window of 8am to 9pm",
      "Configurable timezone",
      "Enforced on the server, not just hidden in the interface",
    ],
  },
  {
    id: "caps",
    icon: Repeat,
    title: "Attempt caps per contact",
    summary:
      "Limit how many times any one contact can be tried. The default cap is 6, and you can change it.",
    points: [
      "Default of 6 attempts per contact",
      "Configurable to match your own policy",
      "Stops over-calling the same person by accident",
    ],
  },
  {
    id: "disclosure",
    icon: Bot,
    title: "AI disclosure on every AI call",
    summary:
      "AI qualifier calls state that the caller is an AI in the first sentence.",
    points: [
      "Disclosure is part of the opening, not buried later",
      "Applies to calls placed by the Telnyx AI assistant",
      "Supports the transparency expected under TCPA guidance on artificial voices",
    ],
  },
  {
    id: "server",
    icon: Server,
    title: "Server-side enforcement",
    summary:
      "Suppression, calling window, and attempt cap are all checked on the server before any outbound call or text goes out.",
    points: [
      "All three checks run on every outbound attempt",
      "A tampered browser cannot skip them",
      "A blocked attempt is stopped before any money is spent",
    ],
  },
  {
    id: "limits",
    icon: Gauge,
    title: "Rate limits on spending routes",
    summary:
      "Routes that cost money are rate limited, which caps how quickly a mistake or a runaway script can spend.",
    points: [
      "AI calls: 20 per 60 seconds",
      "SMS: 60 per 60 seconds",
      "Usage recorded per event in a ledger",
    ],
  },
];

const checks = [
  { step: "1", label: "Is the number on the suppression list?", result: "If yes, blocked" },
  { step: "2", label: "Is it inside the calling window?", result: "If no, blocked" },
  { step: "3", label: "Has the attempt cap been reached?", result: "If yes, blocked" },
  { step: "4", label: "Is the rate limit exceeded?", result: "If yes, blocked" },
  { step: "5", label: "All clear", result: "Call or text goes out" },
];

const tcpaFacts = [
  {
    icon: Gavel,
    title: "The law in brief",
    body: "The Telephone Consumer Protection Act (TCPA) restricts certain automated calls and texts, and the FCC has stated that AI-generated voices count as artificial voices under it. Rules differ depending on who you contact, how, and whether you have consent.",
  },
  {
    icon: Scale,
    title: "Penalties can be significant",
    body: "TCPA violations can carry statutory damages per call or message, which add up fast across a list. Many states also have their own telemarketing laws, some stricter than federal rules.",
  },
  {
    icon: Phone,
    title: "Consent depends on the contact",
    body: "Rules for business-to-business calls, existing relationships, and consumer numbers are not the same. Whether you need prior written consent for a given contact is a question for your counsel.",
  },
  {
    icon: ListChecks,
    title: "Registries are your job",
    body: "National and state Do Not Call registries may apply to your list. Xovra does not check those registries for you, so scrub your lists before you import them.",
  },
];

const tenDlc = [
  {
    title: "What it is",
    body: "10DLC (10-digit long code) is the system US carriers use to vet businesses that send application-to-person text messages from standard local numbers.",
  },
  {
    title: "Who does it",
    body: "You do. Registration is done directly with Telnyx under your own brand and campaign. Xovra does not handle it and has no registration wizard.",
  },
  {
    title: "When you need it",
    body: "Before sending SMS to US numbers at any scale. Unregistered traffic is likely to be filtered or blocked by carriers.",
  },
  {
    title: "Does it affect calls?",
    body: "No. 10DLC is about text messages. Voice calling does not use it.",
  },
];

const responsibilities = [
  { who: "Xovra", items: [
    "Enforces suppression, calling window, and attempt cap on the server",
    "Detects STOP and UNSUBSCRIBE replies and suppresses the number",
    "Has the AI state it is an AI at the start of every AI call",
    "Rate limits AI calls and SMS",
  ]},
  { who: "You", items: [
    "Have a lawful basis and any required consent to contact each person",
    "Scrub your lists against Do Not Call registries",
    "Register your brand and campaign for 10DLC with Telnyx",
    "Write truthful scripts and set sensible window and cap values",
    "Get your own legal advice for your situation",
  ]},
];

const notProvided = [
  "Do Not Call registry lookups",
  "STIR/SHAKEN attestation controls",
  "SOC 2, HIPAA, or GDPR certification",
  "Call recording, transcripts, or consent playback",
  "A 10DLC registration wizard",
  "Answering machine detection",
];

const faqs = [
  {
    q: "Does Xovra make my outreach TCPA compliant?",
    a: "No tool can do that on its own. Xovra enforces some guardrails, namely suppression, calling windows, and attempt caps, and has AI calls disclose themselves. Whether your outreach is lawful also depends on your lists, your consent, and your content. Talk to a lawyer about your situation.",
  },
  {
    q: "What happens when someone replies STOP?",
    a: "Inbound messages are checked for opt-out keywords such as STOP and UNSUBSCRIBE. When one is detected the number is added to the append-only suppression list, and future calls and texts to it are blocked on the server.",
  },
  {
    q: "Can I change the 8am to 9pm calling window?",
    a: "Yes. The default is 8am to 9pm, and the timezone is configurable. You are responsible for choosing values that are lawful where your contacts are located, which may be stricter than the default.",
  },
  {
    q: "Can I raise the attempt cap above 6?",
    a: "The cap is configurable and the default is 6. Higher caps increase the chance of harassing a contact, so think about it carefully.",
  },
  {
    q: "Does Xovra check the Do Not Call registry?",
    a: "No. There is no DNC registry lookup. If DNC rules apply to your list, scrub it before importing.",
  },
  {
    q: "Is 10DLC registration included?",
    a: "No. You register with Telnyx yourself. Xovra has no registration wizard and does not manage your campaign status.",
  },
  {
    q: "Do AI calls say they are AI?",
    a: "Yes. AI qualifier calls disclose that the caller is an AI in the first sentence.",
  },
  {
    q: "Can the browser override the checks?",
    a: "No. The checks run on the server before any outbound call or text, so changing what the browser does does not bypass them.",
  },
];

export default function CompliancePage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 bg-[#eaddff] text-[#630ed4] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          Compliance
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
          Guardrails built into
          <span className="block text-[#630ed4]">every outbound attempt.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#4a4455] leading-relaxed">
          Xovra checks suppression, calling hours, and attempt limits on the
          server before any call or text goes out. Here is exactly what exists,
          and what is still your responsibility.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#e3e0f1] text-[#630ed4] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#eaddff] transition-colors"
          >
            Book a Demo
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-[#e5eeff] rounded-2xl p-5 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-[#630ed4] shrink-0" />
          <p className="text-sm text-[#4a4455] leading-relaxed">
            <strong className="text-[#0b1c30]">Not legal advice.</strong> This
            page describes product features and general background. It does not
            tell you what is legal for your business. Laws vary by state and
            situation, so consult a qualified attorney.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">What Xovra enforces</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            These are the compliance features that exist in the product today.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.id}
                id={f.id}
                className="bg-white border border-[#e3e0f1] rounded-2xl p-6 scroll-mt-24"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eaddff] text-[#630ed4] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-[#4a4455] leading-relaxed">{f.summary}</p>
                <ul className="mt-4 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#630ed4] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Check pipeline */}
      <section className="bg-[#213145] text-[#eaf1ff] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              What happens before a call goes out
            </h2>
            <p className="mt-3 text-[#d2bbff] max-w-2xl mx-auto">
              Every outbound attempt passes through the same checks on the
              server.
            </p>
          </div>
          <ol className="space-y-3">
            {checks.map((c, idx) => (
              <li
                key={c.step}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 ${
                  idx === checks.length - 1 ? "bg-[#630ed4]" : "bg-[#2b3d54]"
                }`}
              >
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#eaddff] text-[#630ed4] font-bold flex items-center justify-center">
                  {c.step}
                </span>
                <span className="flex-1 font-medium">{c.label}</span>
                <span className="text-sm text-[#d2bbff] text-right">{c.result}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TCPA background */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">TCPA background</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            General context only, to help you ask better questions of your
            lawyer.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {tcpaFacts.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="bg-white border border-[#e3e0f1] rounded-2xl p-6 flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-[#e5eeff] text-[#630ed4] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{t.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10DLC */}
      <section className="bg-[#eff4ff] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[#630ed4] font-semibold text-sm">
              <MessageSquare className="w-4 h-4" />
              Text messaging
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              10DLC: required, and handled by you at Telnyx
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tenDlc.map((t) => (
              <div key={t.title} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-[#630ed4]">{t.title}</h3>
                <p className="mt-2 text-sm text-[#4a4455] leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Who is responsible for what</h2>
          <p className="mt-3 text-[#4a4455]">
            A tool can enforce limits. It cannot decide whether you have the
            right to contact someone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {responsibilities.map((r, idx) => (
            <div
              key={r.who}
              className={`rounded-2xl p-7 ${
                idx === 0 ? "bg-white border-2 border-[#630ed4]" : "bg-white border border-[#e3e0f1]"
              }`}
            >
              <h3 className="text-xl font-bold text-[#630ed4]">{r.who}</h3>
              <ul className="mt-4 space-y-3">
                {r.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#630ed4] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Not provided */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#e3e0f1] rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#630ed4]" />
            <h2 className="text-2xl font-bold">What Xovra does not provide</h2>
          </div>
          <p className="mt-3 text-sm text-[#4a4455]">
            Listed plainly so you can plan around it.
          </p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {notProvided.map((n) => (
              <li
                key={n}
                className="flex gap-3 bg-[#f8f9ff] rounded-xl px-4 py-3 text-sm text-[#4a4455]"
              >
                <XCircle className="w-5 h-5 text-[#7c3aed] shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold inline-flex items-center gap-3">
            <Info className="w-7 h-7 text-[#630ed4]" />
            Compliance questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white border border-[#e3e0f1] rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold hover:bg-[#f8f9ff]"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#630ed4] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#4a4455] leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#630ed4] text-white rounded-3xl px-8 py-14 text-center">
          <ShieldCheck className="w-10 h-10 mx-auto text-[#d2bbff]" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Calling with guardrails on
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[#eaddff]">
            Get early access and see the suppression, window, and cap checks
            working on your own campaigns.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#630ed4] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#eaddff] transition-colors"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[#d2bbff] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#7c3aed] transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
