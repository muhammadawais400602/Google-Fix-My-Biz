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
  Flag,
  Gauge,
  Hash,
  Inbox,
  Info,
  MessageSquare,
  MessagesSquare,
  Minus,
  Plus,
  Scale,
  Send,
  ShieldCheck,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: MessagesSquare, label: "Threaded by phone number" },
  { icon: User, label: "Lead name resolution" },
  { icon: Ban, label: "Opt-outs visible" },
];

const panel = {
  title: "Conversations",
  subtitle: "SMS threads by phone number",
  footnote: "Illustrative layout with made-up example text. Only SMS is shown here.",
  icon: MessagesSquare,
};

const panelRows = [
  {
    icon: User,
    label: "Smile Dental Clinic",
    value: "in: Sure, send me the details",
  },
  {
    icon: User,
    label: "+971 55 000 0000",
    value: "out: Thanks for your time earlier today",
  },
  {
    icon: Ban,
    label: "Roof Pros",
    value: "in: STOP, contact marked as opted out",
  },
  {
    icon: Inbox,
    label: "New reply",
    value: "Unread inbound messages appear at the top",
  },
];

const glance = [
  {
    icon: MessagesSquare,
    title: "Threading",
    desc: "Messages are grouped by phone number so each lead has one conversation.",
  },
  {
    icon: Inbox,
    title: "Inbound and outbound",
    desc: "See what you sent and what came back in a single timeline.",
  },
  {
    icon: User,
    title: "Name resolution",
    desc: "Known numbers show the lead's name rather than only a phone number.",
  },
  {
    icon: Ban,
    title: "Opt-out aware",
    desc: "Replies like STOP are detected and the contact is marked do-not-contact.",
  },
];

const capabilities: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string; href?: string }[] = [
  {
    icon: MessagesSquare,
    title: "Conversation threads",
    desc: "One thread per phone number keeps the whole exchange in order, including automatic follow-ups sent after AI calls.",
  },
  {
    icon: Inbox,
    title: "Inbound messages",
    desc: "Replies arrive through Telnyx SMS and show up in the thread, ready for you to answer.",
  },
  {
    icon: Send,
    title: "Outbound messages",
    desc: "Reply from your organization's numbers. Sends are rate limited.",
  },
  {
    icon: User,
    title: "Lead name lookup",
    desc: "Phone numbers are matched to leads from your campaigns, so you see a business name where one is known.",
  },
  {
    icon: Ban,
    title: "Opt-out detection",
    desc: "STOP, UNSUBSCRIBE and similar words are detected and the contact is added to the suppression list.",
  },
  {
    icon: Users,
    title: "Team and numbers",
    desc: "Organizations with owner, admin and agent roles each have their own numbers, so conversations stay with the right account.",
  },
];

const steps = [
  {
    icon: Send,
    title: "Message goes out",
    desc: "A follow-up SMS is sent manually, or automatically after a connected AI call.",
  },
  {
    icon: Inbox,
    title: "Reply comes in",
    desc: "Telnyx delivers the inbound SMS to Xovra.",
  },
  {
    icon: Hash,
    title: "Grouped by number",
    desc: "The message joins the thread for that phone number.",
  },
  {
    icon: User,
    title: "Name resolved",
    desc: "If the number belongs to a lead in your campaigns, the thread shows that lead's name.",
  },
  {
    icon: Ban,
    title: "Opt-outs checked",
    desc: "Stop keywords add the number to Do Not Contact so it is not messaged again.",
  },
];

const dives = [
  {
    eyebrow: "Threads",
    title: "One conversation per contact",
    desc: "Scattered messages make it easy to double-text someone or miss a reply. Threads by phone number keep the context together.",
    icon: MessagesSquare,
    panelTitle: "A thread",
    panelLines: [
      "out: Thanks for the chat, here is the summary.",
      "in: Looks interesting, can you call Thursday?",
      "out: Yes, I will call Thursday morning.",
    ],
    points: [
      { icon: Hash, title: "Keyed by phone number", desc: "All messages with the same number stay together in one thread." },
      { icon: Send, title: "Inbound and outbound together", desc: "Read both sides of the exchange in order." },
      { icon: Bot, title: "Automatic follow-ups included", desc: "Texts sent after AI calls appear in the same thread." },
    ],
  },
  {
    eyebrow: "Lead names",
    title: "Know who is texting you",
    desc: "A reply from an unknown number is not very helpful. Because campaigns hold your lead data, Xovra can show the business name instead.",
    icon: User,
    panelTitle: "Name resolution",
    panelLines: [
      "+971 55 000 0000",
      "matched to campaign lead",
      "display: Smile Dental Clinic",
    ],
    points: [
      { icon: Building2, title: "Matches your leads", desc: "Numbers imported into campaigns map back to lead names." },
      { icon: Info, title: "Unknown numbers stay numbers", desc: "If no lead matches, you see the phone number." },
      { icon: Flag, title: "Campaign context", desc: "You can tell which campaign a conversation belongs to." },
    ],
  },
  {
    eyebrow: "Safe messaging",
    title: "Opt-outs and limits built in",
    desc: "Texting is a regulated channel. Opt-out detection, suppression and rate limits mean the safe path is the default one.",
    icon: ShieldCheck,
    panelTitle: "Messaging safeguards",
    panelLines: [
      "STOP detected: contact suppressed",
      "append-only Do Not Contact list",
      "rate limits on SMS",
      "10DLC registered through Telnyx",
    ],
    points: [
      { icon: Ban, title: "Stop keywords", desc: "STOP and UNSUBSCRIBE trigger suppression automatically." },
      { icon: Gauge, title: "Rate limits", desc: "SMS sending is rate limited to avoid accidental floods." },
      { icon: Scale, title: "10DLC", desc: "You register with Telnyx for US messaging. Xovra does not file that for you." },
    ],
  },
];

const isList = [
  "Shows inbound and outbound SMS through Telnyx",
  "Threads messages by phone number",
  "Resolves phone numbers to lead names when a lead matches",
  "Marks opt-outs from STOP and similar keywords",
  "Works with organization numbers, roles and number pools",
];

const isNotList = [
  "Not a call recording or call history inbox",
  "No transcripts of calls or voicemails",
  "No WhatsApp inbox: WhatsApp drafts open through wa.me links",
  "No round-robin assignment of conversations",
  "No email inbox: email drafts open in your own client",
];

const faqs = [
  {
    q: "Which channels show up here?",
    a: "SMS only, through Telnyx. WhatsApp and email drafts open in your own apps and are not displayed in Xovra.",
  },
  {
    q: "How are conversations grouped?",
    a: "By phone number. Every message to and from that number appears in one thread.",
  },
  {
    q: "Will I see the lead name?",
    a: "Yes, when the number matches a lead in your campaigns. Otherwise the phone number is shown.",
  },
  {
    q: "Are calls or recordings listed?",
    a: "No. Xovra does not provide call recordings or transcripts, and this view is for SMS messages.",
  },
  {
    q: "Can conversations be routed to team members automatically?",
    a: "No. There is no round-robin or automatic routing. Teams use owner, admin and agent roles with per-org numbers.",
  },
  {
    q: "What happens when someone opts out?",
    a: "The opt-out keyword is detected, the number is added to the Do Not Contact list, and future sends are skipped.",
  },
];

const related = [
  {
    icon: MessageSquare,
    href: "/features/omnichannel",
    title: "Follow-Up and SMS",
    desc: "How messages get sent.",
  },
  {
    icon: Bot,
    href: "/features/ai-calling",
    title: "AI Qualifier Calls",
    desc: "Where automatic follow-ups begin.",
  },
  {
    icon: BarChart3,
    href: "/features/outcome-tracking",
    title: "Outcome Tracking",
    desc: "Costs and results.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function MessagesConversationsPage() {
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
            <span className="font-semibold text-[#0b1c30]">{"Messages & Conversations"}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"Messages and conversations"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"Every SMS thread,"}{" "}
                <span className="text-[#630ed4]">{"with the lead's name on it."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Messages and Conversations collects inbound and outbound SMS into threads by phone number, and shows the lead name instead of a bare number when it knows who it is."}
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
              {"A focused SMS conversation view"}
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
              {"What you can do in Messages"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"It is an SMS view. It does not try to be a shared inbox for every channel."}
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
              {"From text to thread"}
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
              {"What Messages & Conversations is, and is not"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"SMS threads for cold calling follow-up, nothing more elaborate."}</p>
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
              {"Questions about messages"}
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
                {"See every reply in one place"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"Connect Telnyx, register for 10DLC, and keep your SMS conversations tidy."}
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
                {"SMS only. 10DLC registration with Telnyx is required for US messaging."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
