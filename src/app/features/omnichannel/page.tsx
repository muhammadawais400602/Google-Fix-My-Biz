"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Gauge,
  Hash,
  Inbox,
  Info,
  Mail,
  MessageSquare,
  MessagesSquare,
  Minus,
  Phone,
  Plus,
  Scale,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: MessageSquare, label: "Two-way Telnyx SMS" },
  { icon: Ban, label: "STOP and UNSUBSCRIBE detection" },
  { icon: Mail, label: "mailto: and wa.me drafts" },
];

const panel = {
  title: "After the call",
  subtitle: "Pick a follow-up channel",
  footnote: "Illustrative layout. SMS requires a 10DLC registration completed by you with Telnyx. Email and WhatsApp open in your own apps.",
  icon: MessageSquare,
};

const panelRows = [
  {
    icon: Send,
    label: "SMS",
    value: "Sent through Telnyx from your organization's number",
  },
  {
    icon: Mail,
    label: "Email",
    value: "mailto: link opens a draft in your email client",
  },
  {
    icon: Share2,
    label: "WhatsApp",
    value: "wa.me link opens WhatsApp with the message prefilled",
  },
  {
    icon: Ban,
    label: "Opt-out",
    value: "A reply of STOP adds the number to suppression",
  },
];

const glance = [
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    desc: "Send and receive text messages through Telnyx, with replies kept in conversation.",
  },
  {
    icon: Ban,
    title: "Opt-out handling",
    desc: "STOP, UNSUBSCRIBE and similar replies are detected and respected.",
  },
  {
    icon: Mail,
    title: "Email drafts",
    desc: "mailto: links open prefilled drafts in your own email client.",
  },
  {
    icon: Share2,
    title: "WhatsApp drafts",
    desc: "wa.me links open WhatsApp with your message ready to send.",
  },
];

const capabilities: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string; href?: string }[] = [
  {
    icon: Send,
    title: "Send SMS",
    desc: "Send text messages to leads through Telnyx SMS from the numbers assigned to your organization.",
  },
  {
    icon: Inbox,
    title: "Receive replies",
    desc: "Inbound messages come back into Xovra and are grouped into a thread for that phone number.",
  },
  {
    icon: Ban,
    title: "Opt-out detection",
    desc: "Keywords such as STOP and UNSUBSCRIBE are recognized so you stop messaging people who asked you to.",
  },
  {
    icon: Bot,
    title: "Auto follow-up after AI calls",
    desc: "A follow-up SMS goes out automatically after connected AI qualifier calls.",
  },
  {
    icon: Sparkles,
    title: "AI-written drafts",
    desc: "Claude or Gemini can draft the message using lead context, so it refers to the right business.",
  },
  {
    icon: Gauge,
    title: "Rate limits",
    desc: "Sending is rate limited, and calling windows and attempt caps help you avoid over-contacting people.",
  },
];

const steps = [
  {
    icon: Phone,
    title: "Finish the call",
    desc: "Record the outcome with a shortcut or let the AI qualifier produce one.",
  },
  {
    icon: Sparkles,
    title: "Draft the message",
    desc: "Generate a short follow-up, or write your own using the campaign script placeholders.",
  },
  {
    icon: Send,
    title: "Choose the channel",
    desc: "Send SMS through Telnyx, or open an email or WhatsApp draft.",
  },
  {
    icon: Inbox,
    title: "Replies thread in",
    desc: "Responses to SMS appear under the lead's phone number.",
  },
  {
    icon: Ban,
    title: "Opt-outs honored",
    desc: "STOP-style replies are detected and the contact is suppressed.",
  },
];

const dives = [
  {
    eyebrow: "Two-way SMS",
    title: "Text the lead, read the answer",
    desc: "SMS runs on Telnyx, so messages leave from numbers that belong to your organization and replies arrive in the same place.",
    icon: MessageSquare,
    panelTitle: "A simple SMS thread",
    panelLines: [
      "out: Hi Sam, thanks for taking my call about your clinic website.",
      "in: Sure, send me the details",
      "out: Here is a short summary and a link...",
    ],
    points: [
      { icon: Send, title: "Outbound", desc: "Messages send through your Telnyx account and numbers." },
      { icon: Inbox, title: "Inbound", desc: "Replies are received and stored so you can respond in context." },
      { icon: Hash, title: "Per-number threads", desc: "Messages are grouped by phone number, one thread per contact." },
    ],
  },
  {
    eyebrow: "Opt-outs and compliance",
    title: "Stopping means stopping",
    desc: "SMS is regulated, and customers expect an opt-out to work. Xovra recognizes common stop keywords and puts those numbers on your suppression list.",
    icon: Scale,
    panelTitle: "Opt-out flow",
    panelLines: [
      "inbound: STOP",
      "detected: opt-out keyword",
      "action: number added to Do Not Contact",
      "future sends: skipped",
    ],
    points: [
      { icon: Ban, title: "Keyword detection", desc: "STOP, UNSUBSCRIBE and similar replies are treated as opt-outs." },
      { icon: ShieldCheck, title: "Append-only suppression", desc: "The Do Not Contact list only grows, so numbers do not quietly drop off it." },
      { icon: Info, title: "10DLC registration", desc: "US application-to-person messaging needs 10DLC. You register with Telnyx, and Xovra does not do that for you." },
    ],
  },
  {
    eyebrow: "Drafts for email and WhatsApp",
    title: "Use the apps you already have",
    desc: "Rather than pretend to be an omnichannel platform, Xovra prepares a draft and hands it to the app you already use.",
    icon: Share2,
    panelTitle: "How drafts are opened",
    panelLines: [
      "email: mailto:lead@example.com?subject=...&body=...",
      "whatsapp: https://wa.me/<number>?text=...",
      "you review, edit and press send",
    ],
    points: [
      { icon: Mail, title: "mailto:", desc: "Opens your default email client with the message ready." },
      { icon: Share2, title: "wa.me", desc: "Opens WhatsApp on web or phone with the text prefilled." },
      { icon: UserCheck, title: "You press send", desc: "Nothing is sent without you, which keeps messages in your own voice." },
    ],
  },
];

const isList = [
  "Sends and receives SMS through Telnyx",
  "Threads messages by phone number",
  "Detects STOP, UNSUBSCRIBE and other opt-out keywords",
  "Sends a follow-up SMS automatically after connected AI calls",
  "Drafts follow-ups for email via mailto: and WhatsApp via wa.me",
  "Applies rate limits and respects suppression lists",
];

const isNotList = [
  "Not automated multi-step sequences or drip campaigns",
  "Not a WhatsApp Business API integration",
  "Not an omnichannel platform: email and WhatsApp open in your own apps",
  "Not a replacement for 10DLC registration, which you do with Telnyx",
  "No email sending from Xovra servers",
];

const faqs = [
  {
    q: "Which carrier sends the SMS?",
    a: "Telnyx. You connect your Telnyx account, and messages go out from the numbers assigned to your organization.",
  },
  {
    q: "Do I need to register for 10DLC?",
    a: "Yes, for US messaging. You register your brand and campaign with Telnyx. Xovra does not handle that registration.",
  },
  {
    q: "What happens if someone replies STOP?",
    a: "Opt-out keywords such as STOP and UNSUBSCRIBE are detected and the number is added to your Do Not Contact list.",
  },
  {
    q: "Does it send WhatsApp messages?",
    a: "Not through an API. Xovra creates a wa.me link that opens WhatsApp with your message prefilled, and you send it.",
  },
  {
    q: "Does it send emails?",
    a: "Xovra builds a mailto: link that opens a draft in your own email client. You review and send it.",
  },
  {
    q: "Can I build automated sequences?",
    a: "No. Follow-up is deliberate: one message after a call, either automatic after a connected AI call or sent by you.",
  },
  {
    q: "Where do replies show up?",
    a: "In Messages and Conversations, grouped into a thread by phone number.",
  },
];

const related = [
  {
    icon: MessagesSquare,
    href: "/features/unified-inbox",
    title: "Messages & Conversations",
    desc: "Read and answer SMS threads.",
  },
  {
    icon: Bot,
    href: "/features/ai-calling",
    title: "AI Qualifier Calls",
    desc: "Triggers automatic follow-up SMS.",
  },
  {
    icon: Sparkles,
    href: "/features/objection-rebuttals",
    title: "Live AI Rebuttals",
    desc: "Draft follow-ups with context.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function FollowUpSmsPage() {
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
            <span className="font-semibold text-[#0b1c30]">{"Follow-Up & SMS"}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"Follow-up and SMS"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"Follow up while the call is still fresh,"}{" "}
                <span className="text-[#630ed4]">{"with SMS that respects opt-outs."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Xovra sends and receives two-way SMS through Telnyx, threads replies by phone number, and honors STOP requests. For email and WhatsApp it prepares drafts that open in your own apps."}
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
              {"Simple, honest follow-up"}
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
              {"What follow-up looks like in Xovra"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"SMS is built in. Email and WhatsApp are drafted for you and sent from your own accounts."}
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
              {"From call outcome to message"}
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
              {"What Follow-Up & SMS is, and is not"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"A focused follow-up tool for cold calling, not a marketing automation suite."}</p>
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
              {"Questions about follow-up and SMS"}
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
                {"Follow up the same day, without the busywork"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"Connect Telnyx, register for 10DLC, and let Xovra handle drafts, threading and opt-outs."}
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
                {"SMS requires 10DLC registration with Telnyx. Email and WhatsApp drafts open in your own apps."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
