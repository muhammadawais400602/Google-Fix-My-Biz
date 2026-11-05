"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Home,
  Bot,
  PhoneIncoming,
  MapPin,
  MessageSquare,
  ClipboardCheck,
  Users,
  Building2,
  Rocket,
  UserCheck,
  Search,
  BrainCircuit,
  CalendarCheck,
  Phone,
  Target,
  FileSpreadsheet,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const demoSteps = [
  {
    num: "01",
    icon: MapPin,
    title: "Live Google Maps Scrape",
    body: "Pick a niche and a city. We run the scraper in front of you and watch leads populate — business name, phone, website, rating, review count. Then we show how enrichment scores each lead and assigns a pitch angle like NO_SITE or WEAK_SITE.",
    tag: "Real leads, real-time",
    tagIcon: Search,
  },
  {
    num: "02",
    icon: PhoneIncoming,
    title: "Manual Call from the Browser",
    body: "We place a real call using the in-browser WebRTC softphone powered by Telnyx. You hear the audio, see the lead card with all context, and watch the live AI rebuttal panel suggest responses as the conversation unfolds.",
    tag: "Browser-based, no downloads",
    tagIcon: Phone,
  },
  {
    num: "03",
    icon: Bot,
    title: "AI Qualifier Call",
    body: "We switch to AI mode and let the Telnyx AI assistant call a lead. It discloses it is AI upfront, introduces the pitch using the lead's context, scores interest, and logs the outcome — all hands-free.",
    tag: "Full AI disclosure built in",
    tagIcon: BrainCircuit,
  },
  {
    num: "04",
    icon: MessageSquare,
    title: "Two-Way SMS Follow-Up",
    body: "After a connected call, we send a follow-up SMS and show the conversation thread. You see opt-out detection (STOP/UNSUBSCRIBE) and how replies flow back into the lead's timeline.",
    tag: "10DLC compliant",
    tagIcon: Target,
  },
];

const demoStepFull = {
  num: "05",
  icon: ClipboardCheck,
  title: "Your Campaign Setup",
  body: "We set up a campaign together — choose manual or AI mode, write a brief and greeting, configure calling windows and suppression rules. You leave the demo with a working campaign ready to go.",
  tag: "Walk out ready to dial",
};

const audienceCards = [
  {
    icon: Users,
    title: "Solo Operators & Small Teams",
    body: "Doing your own prospecting and need to find and call leads without spending all day on it. Want to see how the scraper-to-call workflow actually works.",
    goal: "Save hours on prospecting",
  },
  {
    icon: Building2,
    title: "Agency Owners",
    body: "Running outbound for multiple clients and need per-org separation, dedicated numbers, and campaign-level control. Want to see multi-tenant features.",
    goal: "Per-client org isolation",
  },
  {
    icon: Rocket,
    title: "Founders Testing Outbound",
    body: "Exploring whether AI-assisted cold calling works for your market. Want to see a real call happen before committing any budget.",
    goal: "Validate before investing",
  },
  {
    icon: UserCheck,
    title: "Sales Team Leads",
    body: "Looking to give reps better lead context and live AI rebuttals during calls. Want to see the rebuttal panel and lead scoring in action.",
    goal: "Better conversations, faster",
  },
];

const prepSteps = [
  {
    num: "01",
    title: "Pick a Niche and City",
    body: "Think about what type of businesses you want to reach — dentists in Miami, roofers in Dallas, gyms in Chicago. We'll scrape leads live during the demo.",
    tag: "Any Google Maps business category",
    tagIcon: MapPin,
  },
  {
    num: "02",
    title: "Bring a Lead List (Optional)",
    body: "If you already have leads, export them as a CSV or Google Sheet. We can import them and show you enrichment and scoring on your own data.",
    tag: "CSV or Google Sheets",
    tagIcon: FileSpreadsheet,
  },
  {
    num: "03",
    title: "Have Your Questions Ready",
    body: "Compliance rules, AI calling costs, SMS setup, multi-tenant orgs — bring whatever matters most. We answer directly during the session.",
    tag: "Direct, transparent answers",
    tagIcon: BrainCircuit,
  },
];

const faqs = [
  {
    q: "How long is the demo?",
    a: "20 minutes. We show the platform live — scraping, calling, AI qualifier, SMS. If you want to go deeper on any feature, we can extend or schedule a follow-up.",
  },
  {
    q: "Is this a sales call?",
    a: "We show the platform and give honest answers about whether Xovra fits your use case. If it doesn't, we'll say so. No pressure, no follow-up spam.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "Nothing required. Optionally, pick a niche and city so we can scrape leads live, or bring a CSV of existing leads for us to import and score.",
  },
  {
    q: "What does it cost after the demo?",
    a: "Usage-based pricing: $0.02/min for manual calls, $0.25/min for AI qualifier calls, $0.03 per SMS part. No subscriptions, no minimums, no contracts.",
  },
  {
    q: "Do you integrate with my CRM?",
    a: "Currently Xovra exports to Google Sheets and HubSpot-format CSV. Native CRM integrations are on the roadmap but not available yet.",
  },
  {
    q: "Can I bring my team to the demo?",
    a: "Yes. Send the calendar invite to anyone who needs to see it — we'll cover everyone's questions in the session.",
  },
];

const testimonials = [
  {
    quote:
      "They scraped leads for my niche live on the call and placed a real AI qualifier call. I could hear exactly what my prospects would hear.",
    name: "Agency Owner",
    company: "Digital Marketing Agency",
  },
  {
    quote:
      "I came in skeptical about AI calling. Hearing the AI disclose itself upfront and still have a natural conversation sold me on the approach.",
    name: "Sales Manager",
    company: "B2B Services Company",
  },
  {
    quote:
      "The usage-based pricing was the hook. No monthly minimums, just pay for what I use. The demo showed me it actually works that way.",
    name: "Solo Founder",
    company: "Local Services Business",
  },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

const calendarDays = [
  { day: 20, disabled: true },
  { day: 21, disabled: true },
  { day: 22, disabled: true },
  { day: 23, disabled: true },
  { day: 24, disabled: false },
  { day: 25, disabled: false },
  { day: 26, disabled: true },
  { day: 27, disabled: false },
  { day: 28, disabled: false },
  { day: 29, disabled: false },
  { day: 30, disabled: false },
  { day: 31, disabled: false },
  { day: 1, disabled: true },
  { day: 2, disabled: true },
];

/* ─── Component ────────────────────────────────────────── */

export default function DemoPage() {
  const [selectedSlot, setSelectedSlot] = useState("10:30 AM");
  const [selectedDay, setSelectedDay] = useState(24);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#f8f9ff] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex items-center gap-2 text-sm text-[#4a4455] mb-6">
            <Link
              href="/"
              className="hover:text-[#7c3aed] transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#ccc3d8]" />
            <span className="text-[#7c3aed] font-medium">Book a Demo</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#eaddff]/40 text-[#7c3aed] text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
                Live Platform Demo
              </div>
              <h1 className="text-4xl lg:text-[56px] lg:leading-[60px] tracking-tight text-[#0b1c30] mb-4 font-bold leading-[1.08]">
                See Xovra Find and Call a Real Lead —{" "}
                <span className="text-[#7c3aed]">Live, In Front of You</span>
              </h1>
              <p className="text-lg text-[#4a4455] mb-8 max-w-2xl leading-relaxed">
                In 20 minutes, we&apos;ll scrape leads from Google Maps, enrich
                and score them, place a manual call from the browser, run an AI
                qualifier call, and send a follow-up SMS — all live.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6 w-full sm:w-auto">
                <a
                  href="#scheduler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#7c3aed] hover:bg-[#630ed4] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Book Your Demo Below
                  <ArrowDown className="w-[18px] h-[18px]" />
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#e3e0f1] text-[#0b1c30] font-semibold hover:bg-[#eff4ff] transition-all"
                >
                  Have a Question First?
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4a4455]">
                {[
                  "20-minute live walkthrough",
                  "No slides, no pitch deck",
                  "Your leads, your niche",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#630ed4]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Calendar mock */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-[#e3e0f1]/60 overflow-hidden">
                <div className="bg-[#630ed4] p-6 text-white">
                  <h2 className="text-lg font-bold mb-1">
                    Pick a Time That Works
                  </h2>
                  <p className="text-sm text-[#d2bbff]">
                    20-minute live demo • No commitment
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-[#0b1c30]">
                      October 2026
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#4a4455]">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#4a4455]">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#4a4455] mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <span key={i} className="py-1 font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                    {calendarDays.map((d) => (
                      <button
                        key={d.day}
                        disabled={d.disabled}
                        onClick={() => setSelectedDay(d.day)}
                        className={`py-2 rounded-lg font-medium transition-all ${
                          d.disabled
                            ? "text-[#ccc3d8] cursor-not-allowed"
                            : selectedDay === d.day
                              ? "bg-[#630ed4] text-white shadow"
                              : "text-[#0b1c30] hover:bg-[#eff4ff]"
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#4a4455] mb-2 font-medium">
                    Available times (EST)
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {timeSlots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSlot(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          selectedSlot === s
                            ? "bg-[#630ed4] text-white shadow"
                            : "bg-[#eff4ff] text-[#630ed4] hover:bg-[#eaddff]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-3 rounded-xl bg-[#630ed4] hover:bg-[#7c3aed] text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {confirmed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Demo Booked — Check Your Email
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-5 h-5" />
                        Confirm {selectedSlot} on Oct {selectedDay}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE SHOW YOU */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#630ed4] mb-3 block">
              The 20-Minute Agenda
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] mb-4">
              What We Show You — Live
            </h2>
            <p className="text-base text-[#4a4455] max-w-2xl mx-auto">
              No slides. No pre-recorded videos. Every step runs against real
              data in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {demoSteps.map((s) => (
              <div
                key={s.num}
                className="relative bg-[#f8f9ff] rounded-2xl p-8 border border-[#e3e0f1]/60"
              >
                <span className="absolute top-6 right-6 text-5xl font-black text-[#630ed4]/10">
                  {s.num}
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#630ed4] flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaddff]/50 text-[10px] font-bold uppercase tracking-wider text-[#630ed4]">
                    <s.tagIcon className="w-3 h-3" />
                    {s.tag}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1c30] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#4a4455] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Step 5 full-width */}
          <div className="bg-[#213145] rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-[#630ed4] flex items-center justify-center shrink-0">
              <demoStepFull.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-[#d2bbff] uppercase tracking-wider">
                  Step {demoStepFull.num}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#eaddff]/20 text-[10px] font-bold uppercase tracking-wider text-[#d2bbff]">
                  {demoStepFull.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {demoStepFull.title}
              </h3>
              <p className="text-sm text-[#eaf1ff] leading-relaxed max-w-2xl">
                {demoStepFull.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#630ed4] mb-3 block">
              Is This Demo for You?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] mb-4">
              Who Books a Demo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 border border-[#e3e0f1]/60 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#630ed4] flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30] mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-[#4a4455] leading-relaxed mb-4 flex-1">
                  {c.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#630ed4] bg-[#eaddff]/40 px-3 py-1.5 rounded-full self-start">
                  <Target className="w-3 h-3" />
                  {c.goal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREP STEPS */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#630ed4] mb-3 block">
              Get More Out of Your Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] mb-4">
              How to Prepare
            </h2>
            <p className="text-base text-[#4a4455] max-w-xl mx-auto">
              Nothing is required, but these make the demo more relevant to your
              business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {prepSteps.map((s) => (
              <div
                key={s.num}
                className="bg-[#f8f9ff] rounded-2xl p-8 border border-[#e3e0f1]/60 relative"
              >
                <span className="absolute top-6 right-6 text-5xl font-black text-[#630ed4]/10">
                  {s.num}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaddff]/50 text-[10px] font-bold uppercase tracking-wider text-[#630ed4] w-fit mb-4">
                  <s.tagIcon className="w-3 h-3" />
                  {s.tag}
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#4a4455] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full bg-[#f8f9ff] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#630ed4] mb-3 block">
              After the Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] mb-4">
              What People Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-[#e3e0f1]/60"
              >
                <p className="text-sm text-[#4a4455] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-[#0b1c30] text-sm">{t.name}</p>
                  <p className="text-xs text-[#4a4455]">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-white py-24">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] mb-4">
              Demo FAQ
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-[#f8f9ff] rounded-xl border border-[#e3e0f1]/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-[#0b1c30] text-sm">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#630ed4] transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[#4a4455] leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="scheduler"
        className="w-full bg-[#213145] py-24"
      >
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to See It Live?
          </h2>
          <p className="text-base text-[#eaf1ff] mb-8 max-w-xl mx-auto">
            20 minutes. Real leads. Real calls. No slides. Book a time that
            works, or get early access to start on your own.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#630ed4] hover:bg-[#7c3aed] text-white font-semibold shadow-lg transition-all"
            >
              Book a Demo
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#eaf1ff]/30 text-[#eaf1ff] font-semibold hover:bg-white/10 transition-all"
            >
              Get Early Access
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
