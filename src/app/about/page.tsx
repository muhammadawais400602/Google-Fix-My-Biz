"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Clock,
  FileSpreadsheet,
  Gauge,
  Headphones,
  Layers,
  ListChecks,
  MapPin,
  MessageSquare,
  PhoneCall,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Heart,
  Eye,
  Handshake,
  Download,
} from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "Finding leads takes hours",
    body: "Building a list of local businesses usually means searching maps by hand, copying names and numbers into a spreadsheet, and hoping nothing is out of date.",
  },
  {
    icon: ListChecks,
    title: "Nobody knows who to call first",
    body: "A raw list does not tell you which business is running ads, which has no website, and which has a site worth pitching on. Reps guess, or call top to bottom.",
  },
  {
    icon: Clock,
    title: "Calling is slow, repetitive work",
    body: "Dialing, reading the same opener, logging the result, and sending the follow-up text are all manual steps that eat the day.",
  },
  {
    icon: Scale,
    title: "Compliance is easy to forget",
    body: "Calling windows, opt-outs, and how many times you have already tried a contact are details that slip when you are moving fast.",
  },
];

const workflow = [
  {
    step: "01",
    icon: MapPin,
    title: "Scrape",
    body: "Pick a niche and a city. Xovra pulls matching businesses from Google Maps so you start with a real list instead of a blank sheet.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Enrich",
    body: "Each lead gets a website audit, Google Ads detection, and a look at social presence, so you know what the business already has.",
  },
  {
    step: "03",
    icon: Target,
    title: "Score",
    body: "Leads are tagged with a pitch angle: RUNS_ADS, NO_SITE, WEAK_SITE, or STRONG_SITE. That tells you what to lead with before you dial.",
  },
  {
    step: "04",
    icon: PhoneCall,
    title: "Call",
    body: "Call one lead at a time from your browser, or let an AI assistant run the qualifier call. Use per-lead scripts, and text them afterward.",
  },
  {
    step: "05",
    icon: FileSpreadsheet,
    title: "Track",
    body: "Outcomes flow back to a Google Sheet, and you can export leads as a HubSpot-compatible CSV when it is time to move them into your CRM.",
  },
];

const capabilities = [
  {
    icon: Headphones,
    title: "Browser softphone",
    body: "A WebRTC softphone over Telnyx for manual, one-at-a-time calling. No desk phone or separate dialer app.",
  },
  {
    icon: Bot,
    title: "AI qualifier calls",
    body: "A Telnyx AI assistant can place qualifier calls. It says it is an AI in the first sentence of every call.",
  },
  {
    icon: Brain,
    title: "Live AI rebuttals",
    body: "During a call, Claude or Gemini can suggest rebuttals so you are not stuck when a prospect pushes back.",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS",
    body: "Send follow-up texts and read replies in the same place, with STOP and UNSUBSCRIBE handled automatically.",
  },
  {
    icon: Users,
    title: "Teams and organizations",
    body: "Owner, admin, and agent roles, team invites, per-organization numbers and AI assistants, and number pools with health monitoring.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails on outbound",
    body: "Suppression lists, calling windows, and attempt caps are checked on the server before anything goes out.",
  },
];

const principles = [
  {
    icon: Eye,
    title: "Say what it is",
    body: "AI calls announce themselves. Our own pages describe what the product does today and nothing it does not.",
  },
  {
    icon: Wrench,
    title: "Practical over flashy",
    body: "We build for the person who has a list and a phone and wants to get through it faster, not for a demo reel.",
  },
  {
    icon: Handshake,
    title: "Fair, usage-based pricing",
    body: "You pay per minute and per message. No contracts, and no platform fee for the privilege of having an account.",
  },
  {
    icon: Heart,
    title: "Respect the person on the line",
    body: "Honoring opt-outs, calling hours, and contact limits is good practice, not just a legal checkbox.",
  },
];

const audiences = [
  {
    title: "Agencies",
    body: "Web, marketing, and ads agencies that prospect local businesses and want to open with the right angle.",
  },
  {
    title: "Sales teams",
    body: "Small outbound teams who want shared workspaces, roles, and numbers without stitching tools together.",
  },
  {
    title: "Solo operators",
    body: "Freelancers and founders who do their own prospecting and need to move quickly through a list.",
  },
];

const statusItems = [
  {
    label: "Stage",
    value: "Early access",
    note: "The product is live and we are working closely with the first users.",
  },
  {
    label: "Team",
    value: "Small",
    note: "A small team building tools for sales teams and agencies.",
  },
  {
    label: "Pricing",
    value: "Usage-based",
    note: "$0.02/min manual, $0.25/min AI, $0.03 per SMS part.",
  },
  {
    label: "Telephony",
    value: "Telnyx",
    note: "Voice, SMS, and AI assistants run on Telnyx.",
  },
];

const notYet = [
  "Native CRM sync. Today you export a HubSpot-compatible CSV.",
  "Call recording and transcripts.",
  "A power or predictive dialer. Manual calling is one lead at a time.",
  "Subscription plans and a billing dashboard. Pricing is usage-based.",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 bg-[#eaddff] text-[#630ed4] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          About Xovra
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
          Smarter outbound calling,
          <span className="block text-[#630ed4]">built on data and AI.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#4a4455] leading-relaxed">
          Xovra is an AI-powered cold calling platform. It finds local
          business leads, works out who is worth calling and why, and helps you
          call, text, and track the results from one place.
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

      {/* Status */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusItems.map((s) => (
            <div key={s.label} className="bg-[#eff4ff] rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wide text-[#4a4455]">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#630ed4]">{s.value}</p>
              <p className="mt-2 text-xs text-[#4a4455] leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#213145] text-[#eaf1ff] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#d2bbff] text-sm font-semibold uppercase tracking-wider">
            Our mission
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            Make outbound calling smarter with AI and data.
          </h2>
          <p className="mt-5 text-[#d2bbff] leading-relaxed max-w-2xl mx-auto">
            Cold calling still works for local businesses, but most of the time
            goes into everything around the call. We want people to spend that
            time talking to the right prospects with the right opener, not
            copying rows between tabs.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">The problem we are solving</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            Finding and calling leads is manual, tedious work. Most of it
            happens before and after the actual conversation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white border border-[#e3e0f1] rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#eaddff] text-[#630ed4] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-[#eff4ff] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              How it works: scrape, enrich, score, call, track
            </h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
              One workflow from an empty search to a logged outcome.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.step} className="bg-white rounded-2xl p-5 relative">
                  <span className="text-xs font-bold text-[#7c3aed]">{w.step}</span>
                  <div className="mt-2 w-11 h-11 rounded-lg bg-[#e3e0f1] text-[#630ed4] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-lg">{w.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What is in the product today</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            A focused set of tools, all connected to the same lead list.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white border border-[#e3e0f1] rounded-2xl p-6">
                <div className="w-11 h-11 rounded-lg bg-[#e5eeff] text-[#630ed4] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{c.title}</h3>
                <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who */}
      <section className="bg-[#e5eeff] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Who Xovra is for</h2>
            <p className="mt-3 text-[#4a4455]">
              We are a small team building tools for sales teams and agencies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-xl text-[#630ed4]">{a.title}</h3>
                <p className="mt-2 text-sm text-[#4a4455] leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How we think about building this</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white border border-[#e3e0f1] rounded-2xl p-6">
                <Icon className="w-7 h-7 text-[#630ed4]" />
                <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Honest limits */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#e3e0f1] rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3">
            <Gauge className="w-6 h-6 text-[#630ed4]" />
            <h2 className="text-2xl font-bold">What Xovra does not do yet</h2>
          </div>
          <p className="mt-3 text-sm text-[#4a4455]">
            We would rather you know the limits before you sign up.
          </p>
          <ul className="mt-5 space-y-3">
            {notYet.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-[#4a4455]">
                <Download className="w-4 h-4 text-[#7c3aed] shrink-0 mt-0.5 rotate-180" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#4a4455]">
            See the{" "}
            <Link href="/integrations" className="text-[#630ed4] font-semibold underline">
              integrations
            </Link>{" "}
            and{" "}
            <Link href="/compliance" className="text-[#630ed4] font-semibold underline">
              compliance
            </Link>{" "}
            pages for the details.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#630ed4] text-white rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">See it on your own leads</h2>
          <p className="mt-3 max-w-xl mx-auto text-[#eaddff]">
            Pick a niche and a city, and watch the list turn into scored,
            call-ready leads.
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
