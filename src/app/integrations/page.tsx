"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  HelpCircle,
  Info,
  MessageSquare,
  Network,
  PhoneCall,
  Plug,
  Sparkles,
  Table,
  Workflow,
  Zap,
} from "lucide-react";

type Integration = {
  id: string;
  name: string;
  role: string;
  icon: typeof PhoneCall;
  summary: string;
  does: string[];
  notes: string;
  anchor: string;
};

const integrations: Integration[] = [
  {
    id: "telnyx",
    name: "Telnyx",
    role: "Telephony backbone",
    icon: PhoneCall,
    summary:
      "Telnyx powers everything that touches a phone: browser calls, AI calls, and text messages.",
    does: [
      "Browser WebRTC softphone for manual calling",
      "AI assistant for qualifier calls",
      "Two-way SMS, inbound and outbound",
      "Phone numbers per organization, with number pools and health monitoring",
    ],
    notes:
      "You need a Telnyx account and numbers. For US text messaging you must complete 10DLC registration with Telnyx yourself.",
    anchor: "Required for calling and texting",
  },
  {
    id: "sheets",
    name: "Google Sheets",
    role: "Lead source and outcome log",
    icon: Table,
    summary:
      "Use a Google Sheet as the place leads come from and the place outcomes are written back to.",
    does: [
      "Read leads from a connected sheet",
      "Write call outcomes back so your sheet stays current",
      "Share results with teammates who live in spreadsheets",
    ],
    notes:
      "Sheets is a lead and outcome store. It does not run a two-way sync with any CRM.",
    anchor: "Optional",
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    role: "AI rebuttals and follow-ups",
    icon: Brain,
    summary:
      "Claude generates live rebuttal suggestions during calls and can draft follow-up messages.",
    does: [
      "Suggest a response when a prospect raises an objection",
      "Draft follow-up text for you to send",
      "Work from the lead's details and your script",
    ],
    notes:
      "Claude produces text. It does not make calls, and it does not place or record anything on its own.",
    anchor: "AI backend option",
  },
  {
    id: "gemini",
    name: "Gemini (Google)",
    role: "Alternative AI backend",
    icon: Sparkles,
    summary:
      "Gemini is available as an alternative to Claude for rebuttals and follow-up generation.",
    does: [
      "Generate live rebuttals during a call",
      "Draft follow-up messages",
      "Serve as a swap-in backend if you prefer it",
    ],
    notes: "Same role as Claude. You choose which backend to use.",
    anchor: "AI backend option",
  },
  {
    id: "csv",
    name: "CSV export (HubSpot format)",
    role: "Move leads into your CRM",
    icon: FileSpreadsheet,
    summary:
      "Export leads and outcomes as a CSV laid out to match HubSpot's import format.",
    does: [
      "Download enriched, scored leads as a file",
      "Import the file into HubSpot using its standard CSV import",
      "Use the same file as a starting point for other tools that accept CSV",
    ],
    notes:
      "This is a file export, not a live connection. There is no native HubSpot sync.",
    anchor: "Manual import",
  },
];

const howItFits = [
  {
    step: "1",
    icon: Table,
    title: "Leads arrive",
    body: "Scrape Google Maps inside Xovra, or bring leads from a Google Sheet.",
  },
  {
    step: "2",
    icon: PhoneCall,
    title: "Telnyx carries the call",
    body: "Calls and texts run through Telnyx, either from your browser or through the AI assistant.",
  },
  {
    step: "3",
    icon: Brain,
    title: "Claude or Gemini helps",
    body: "Whichever AI backend you choose suggests rebuttals and writes follow-ups.",
  },
  {
    step: "4",
    icon: Download,
    title: "Outcomes go out",
    body: "Outcomes are written to your sheet, and leads can be exported as a CSV for your CRM.",
  },
];

const comingSoon = [
  {
    icon: Network,
    title: "CRM sync",
    body: "Direct sync with CRM platforms so you do not have to move CSV files by hand.",
  },
  {
    icon: Zap,
    title: "Zapier",
    body: "A way to connect Xovra events to the other tools you use.",
  },
  {
    icon: Workflow,
    title: "Webhooks and API",
    body: "Programmatic access for teams who want to build their own flows.",
  },
];

const faqItems = [
  {
    q: "Does Xovra integrate with Salesforce, Pipedrive, Close, or GoHighLevel?",
    a: "Not today. The only CRM-facing feature is the HubSpot-compatible CSV export. CRM sync is on our list of things we may build, but there is no date.",
  },
  {
    q: "Is there a native HubSpot integration?",
    a: "No. You export a CSV formatted for HubSpot and import it with HubSpot's own import tool.",
  },
  {
    q: "Can I use my own telephony provider?",
    a: "Xovra is built on Telnyx for voice, SMS, and AI assistants. There is no option to swap in a different carrier.",
  },
  {
    q: "Which AI model should I pick, Claude or Gemini?",
    a: "Both fill the same role. Try each on your own scripts and keep the one whose rebuttals you prefer.",
  },
  {
    q: "Do you support Zapier, Make, or Slack?",
    a: "Not yet. Zapier is on the coming-soon list. We have no plans to claim Make or Slack until they exist.",
  },
];

const limits = [
  "No native CRM integrations of any kind",
  "No Zapier, Make, or Slack connections",
  "No call recording or transcript export",
  "No WhatsApp or email channels",
];

export default function IntegrationsPage() {
  return (
    <main className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 bg-[#eaddff] text-[#630ed4] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <Plug className="w-3.5 h-3.5" />
          Integrations
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
          A small stack,
          <span className="block text-[#630ed4]">honestly described.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#4a4455] leading-relaxed">
          Xovra connects to Telnyx, Google Sheets, Claude, Gemini, and a
          HubSpot-compatible CSV export. That is the full list today.
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

      {/* Quick index */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {integrations.map((i) => {
            const Icon = i.icon;
            return (
              <a
                key={i.id}
                href={`#${i.id}`}
                className="inline-flex items-center gap-2 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                <Icon className="w-4 h-4 text-[#630ed4]" />
                {i.name}
              </a>
            );
          })}
        </div>
      </section>

      {/* Integration cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="space-y-6">
          {integrations.map((i, idx) => {
            const Icon = i.icon;
            return (
              <article
                key={i.id}
                id={i.id}
                className="bg-white border border-[#e3e0f1] rounded-3xl p-6 md:p-8 grid md:grid-cols-[1fr_1.4fr] gap-8 scroll-mt-24"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        idx % 2 === 0
                          ? "bg-[#630ed4] text-white"
                          : "bg-[#eaddff] text-[#630ed4]"
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{i.name}</h2>
                      <p className="text-sm text-[#7c3aed] font-medium">{i.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[#4a4455] leading-relaxed">{i.summary}</p>
                  <span className="mt-4 inline-block text-xs font-semibold bg-[#e3e0f1] text-[#630ed4] px-3 py-1 rounded-full">
                    {i.anchor}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#4a4455]">
                    What it does in Xovra
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {i.does.map((d) => (
                      <li key={d} className="flex gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#630ed4] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 bg-[#eff4ff] rounded-xl p-4 flex gap-3">
                    <Info className="w-5 h-5 text-[#630ed4] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#4a4455] leading-relaxed">{i.notes}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it fits */}
      <section className="bg-[#213145] text-[#eaf1ff] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How the pieces fit together</h2>
            <p className="mt-3 text-[#d2bbff] max-w-2xl mx-auto">
              A lead goes in, a conversation happens, and an outcome comes out.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItFits.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.step} className="bg-[#2b3d54] rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#630ed4] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold text-[#d2bbff] opacity-60">
                      {h.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{h.title}</h3>
                  <p className="mt-1.5 text-sm text-[#d2bbff] leading-relaxed">{h.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-[#e5eeff] text-[#4a4455] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Coming soon
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">On the roadmap</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            These are ideas we are considering, not features you can use today.
            We have no release dates to share.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {comingSoon.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-[#eff4ff] border border-dashed border-[#d2bbff] rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-7 h-7 text-[#630ed4]" />
                  <span className="text-xs font-semibold bg-[#e3e0f1] text-[#630ed4] px-2.5 py-1 rounded-full">
                    Planned
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-lg">{c.title}</h3>
                <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-[#4a4455]">
          Need one of these to adopt Xovra?{" "}
          <Link href="/contact" className="text-[#630ed4] font-semibold underline">
            Tell us
          </Link>{" "}
          and it will help us prioritize.
        </p>
      </section>

      {/* Limits */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#e3e0f1] rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-[#630ed4]" />
            <h2 className="text-2xl font-bold">What is not connected</h2>
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {limits.map((l) => (
              <li
                key={l}
                className="bg-[#f8f9ff] rounded-xl px-4 py-3 text-sm text-[#4a4455]"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold inline-flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-[#630ed4]" />
            Integration questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((f) => (
            <div key={f.q} className="bg-white border border-[#e3e0f1] rounded-xl p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-[#4a4455] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#630ed4] text-white rounded-3xl px-8 py-14 text-center">
          <MessageSquare className="w-10 h-10 mx-auto text-[#d2bbff]" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Connect Telnyx and start calling
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[#eaddff]">
            Bring your Telnyx account, point Xovra at your leads, and make
            your first call from the browser.
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
