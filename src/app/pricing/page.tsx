"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarX,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  EyeOff,
  FileSignature,
  Headphones,
  Info,
  MessageSquare,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Users,
  Wallet,
  Receipt,
  Gauge,
  Calculator,
  Clock,
  Sparkles,
} from "lucide-react";

type Rate = {
  id: string;
  icon: typeof PhoneCall;
  title: string;
  price: string;
  unit: string;
  description: string;
  includes: string[];
  accent: string;
  highlighted: boolean;
};

const rates: Rate[] = [
  {
    id: "manual",
    icon: Headphones,
    title: "Manual Calling",
    price: "$0.02",
    unit: "per minute",
    description:
      "One-at-a-time calling from the browser softphone. You decide who to call, and you do the talking.",
    includes: [
      "Browser WebRTC softphone over Telnyx",
      "Per-lead call scripts with placeholders",
      "Pitch-angle labels on every lead",
      "Outcome tracking back to your sheet",
    ],
    accent: "bg-[#e5eeff] text-[#630ed4]",
    highlighted: false,
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Qualifier Calling",
    price: "$0.25",
    unit: "per minute",
    description:
      "An AI assistant places a qualifier call and discloses that it is an AI in the first sentence.",
    includes: [
      "Telnyx AI assistant makes the call",
      "AI disclosure in the opening line",
      "Live rebuttals via Claude or Gemini",
      "Server-side suppression, window, and cap checks",
    ],
    accent: "bg-[#eaddff] text-[#630ed4]",
    highlighted: true,
  },
  {
    id: "sms",
    icon: MessageSquare,
    title: "Two-Way SMS",
    price: "$0.03",
    unit: "per message part",
    description:
      "Send and receive texts through Telnyx. Long messages are billed per part, the same way carriers count them.",
    includes: [
      "Outbound billed per message part",
      "STOP and UNSUBSCRIBE detection",
      "Replies land in the same inbox",
      "Rate limited to protect your balance",
    ],
    accent: "bg-[#e5eeff] text-[#630ed4]",
    highlighted: false,
  },
];

const principles = [
  {
    icon: CalendarX,
    title: "No monthly minimums",
    body: "There is no platform fee to keep your account open. If you do not call, you do not pay.",
  },
  {
    icon: FileSignature,
    title: "No contracts",
    body: "No annual commitments and no cancellation penalties. Stop whenever you like.",
  },
  {
    icon: EyeOff,
    title: "No hidden fees",
    body: "The three rates on this page are the rates in the product. Usage is recorded per event so you can see exactly what you were charged for.",
  },
  {
    icon: Wallet,
    title: "Prepaid-style balance",
    body: "Your dashboard shows balance, today's spend, and month-to-date spend so there are no surprises.",
  },
];

const plans = [
  {
    name: "Early Access",
    badge: "Available now",
    badgeColor: "bg-[#eaddff] text-[#630ed4]",
    price: "Free to start",
    priceNote: "Then pay per use at the rates above",
    subtitle:
      "Everything in the product today, with no subscription. Built for solo callers, small agencies, and teams who want to test an outbound workflow.",
    features: [
      "Google Maps lead scraping by niche and city",
      "Lead enrichment and pitch-angle scoring",
      "Browser softphone for manual calling",
      "AI qualifier calls with upfront AI disclosure",
      "Live AI rebuttals (Claude or Gemini)",
      "Two-way SMS",
      "Campaigns in manual or AI mode",
      "Google Sheet sync and HubSpot-format CSV export",
      "Suppression list, calling windows, and attempt caps",
    ],
    cta: "Get Early Access",
    href: "/contact",
    style: "primary" as const,
    highlighted: true,
    disabled: false,
  },
  {
    name: "Teams",
    badge: "Coming soon",
    badgeColor: "bg-[#e5eeff] text-[#4a4455]",
    price: "To be announced",
    priceNote: "No pricing has been set yet",
    subtitle:
      "For agencies and sales teams that need shared workspaces. Organizations, roles, and invites already exist in the product; we are still deciding how to package them.",
    features: [
      "Organizations with owner, admin, and agent roles",
      "Team invites from settings",
      "Per-organization phone numbers and AI assistants",
      "Number pools with health monitoring",
      "Talk to us about what your team needs",
    ],
    cta: "Contact Us",
    href: "/contact",
    style: "surface" as const,
    highlighted: false,
    disabled: false,
  },
];

const examples = [
  {
    scenario: "Solo caller, light week",
    lines: [
      { label: "5 hours of manual calling", value: "$6.00" },
      { label: "100 SMS parts", value: "$3.00" },
    ],
    total: "$9.00",
  },
  {
    scenario: "Agency testing AI qualifiers",
    lines: [
      { label: "10 hours of manual calling", value: "$12.00" },
      { label: "3 hours of AI qualifier calls", value: "$45.00" },
      { label: "400 SMS parts", value: "$12.00" },
    ],
    total: "$69.00",
  },
  {
    scenario: "Manual-only outreach month",
    lines: [
      { label: "40 hours of manual calling", value: "$48.00" },
      { label: "No AI or SMS", value: "$0.00" },
    ],
    total: "$48.00",
  },
];

const tracking = [
  {
    icon: Receipt,
    title: "Per-event usage ledger",
    body: "Each call and each text is written as its own usage event rather than rolled into a running total, so charges can be traced back to what happened.",
  },
  {
    icon: Gauge,
    title: "Balance at a glance",
    body: "See your current balance, what you spent today, and month-to-date spend without leaving the dashboard.",
  },
  {
    icon: Clock,
    title: "Voice minutes and SMS costs",
    body: "Manual voice minutes, AI voice minutes, and SMS costs are tracked separately so you can see which channel is driving spend.",
  },
  {
    icon: ShieldCheck,
    title: "Rate limits on spending routes",
    body: "AI calls are limited to 20 per 60 seconds and SMS to 60 per 60 seconds, which caps how fast a mistake can cost you.",
  },
];

const notIncluded = [
  "Telnyx carrier charges for phone numbers or 10DLC registration fees you pay to Telnyx directly",
  "Legal review of your scripts, lists, or consent practices",
  "Call recording or transcripts (not offered)",
  "Native CRM sync (CSV export only for now)",
];

const faqs = [
  {
    q: "How does billing work?",
    a: "Billing is usage-based. Manual calling is $0.02 per minute, AI calling is $0.25 per minute, and outbound SMS is $0.03 per message part. Every call and text is recorded as its own event in a usage ledger, and your dashboard shows balance, today's spend, and month-to-date spend.",
  },
  {
    q: "Is there a subscription?",
    a: "No. There are no subscription tiers today, no monthly minimums, and no contracts. Early Access is free to start and you pay only for what you use. A Teams package may come later, but no pricing has been set.",
  },
  {
    q: "Is there a free trial or a money-back guarantee?",
    a: "We do not offer a time-limited trial or a refund guarantee. Because there is no subscription, the closest equivalent is that you can start for free and spend as little as you want. Contact us if you have a billing question about a specific charge.",
  },
  {
    q: "Do I need 10DLC registration to send texts?",
    a: "For application-to-person SMS to US numbers, carriers require 10DLC registration. You register your brand and campaign directly with Telnyx. Xovra does not manage that registration for you and does not have a registration wizard, so plan for it before you rely on SMS. Voice calling does not require 10DLC.",
  },
  {
    q: "Who provides the phone service?",
    a: "Telnyx. Voice, SMS, and the AI assistant run on Telnyx. Numbers and AI assistants are set up per organization.",
  },
  {
    q: "Why does AI calling cost more than manual calling?",
    a: "An AI call includes the AI assistant running for the whole conversation, plus live rebuttal generation when it is used. A manual call only uses the softphone and carrier minutes, so it costs less.",
  },
  {
    q: "Can I set a spending limit?",
    a: "Outbound AI calls and SMS are rate limited in the server, and your dashboard shows your running balance. If you need a hard cap tailored to your account, contact us and tell us what you are trying to protect.",
  },
  {
    q: "Are my calls recorded?",
    a: "No. Xovra does not record calls or produce transcripts.",
  },
  {
    q: "Will pricing change?",
    a: "These are the current rates. We are in early access, so rates and packaging may change as we learn. We will not apply changes retroactively to usage that has already happened.",
  },
];

const comparison = [
  { label: "Platform fee", value: "None" },
  { label: "Contract length", value: "None" },
  { label: "Manual calling", value: "$0.02 / min" },
  { label: "AI calling", value: "$0.25 / min" },
  { label: "Outbound SMS", value: "$0.03 / part" },
];

export default function PricingPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 bg-[#eaddff] text-[#630ed4] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          Early Access Pricing
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
          Usage-Based Pricing.
          <span className="block text-[#630ed4]">Pay Only for What You Use.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#4a4455]">
          Xovra has no subscription tiers. You pay a small per-minute rate for
          calling and a per-message rate for texting. No monthly minimums, no
          contracts, and no hidden fees.
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

      {/* Quick strip */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {comparison.map((c) => (
            <div
              key={c.label}
              className="bg-[#eff4ff] rounded-xl px-4 py-4 text-center"
            >
              <p className="text-xs uppercase tracking-wide text-[#4a4455]">
                {c.label}
              </p>
              <p className="mt-1 text-lg font-bold text-[#0b1c30]">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rates */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Three rates. That is the whole list.</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            Each rate maps to something you can do in the product today.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rates.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className={`rounded-2xl p-7 flex flex-col ${
                  r.highlighted
                    ? "bg-[#213145] text-[#eaf1ff] shadow-xl md:-translate-y-2"
                    : "bg-white border border-[#e3e0f1]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    r.highlighted ? "bg-[#630ed4] text-white" : r.accent
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{r.title}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight">{r.price}</span>
                  <span
                    className={`text-sm ${
                      r.highlighted ? "text-[#d2bbff]" : "text-[#4a4455]"
                    }`}
                  >
                    {r.unit}
                  </span>
                </div>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    r.highlighted ? "text-[#eaf1ff]" : "text-[#4a4455]"
                  }`}
                >
                  {r.description}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {r.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          r.highlighted ? "text-[#d2bbff]" : "text-[#630ed4]"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="bg-[#eff4ff] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Simple on purpose</h2>
            <p className="mt-3 text-[#4a4455]">
              We would rather you spend a few dollars finding out if Xovra
              works for you than sign a contract to find out.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-lg bg-[#eaddff] text-[#630ed4] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#4a4455] leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">How to get started</h2>
          <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
            There is one way to use Xovra today, and a Teams option we are
            still shaping.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-white border-2 border-[#630ed4] shadow-lg"
                  : "bg-white border border-[#e3e0f1]"
              }`}
            >
              <span
                className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${plan.badgeColor}`}
              >
                {plan.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-[#630ed4]">{plan.price}</p>
              <p className="text-sm text-[#4a4455]">{plan.priceNote}</p>
              <p className="mt-4 text-sm text-[#4a4455] leading-relaxed">{plan.subtitle}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <Check className="w-5 h-5 text-[#630ed4] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-colors ${
                  plan.style === "primary"
                    ? "bg-[#630ed4] hover:bg-[#7c3aed] text-white"
                    : "bg-[#e3e0f1] text-[#630ed4] hover:bg-[#eaddff]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="bg-[#eff4ff] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[#630ed4] font-semibold text-sm">
              <Calculator className="w-4 h-4" />
              Illustrative math
            </span>
            <h2 className="mt-2 text-3xl font-bold">What usage might look like</h2>
            <p className="mt-3 text-[#4a4455] max-w-2xl mx-auto">
              These examples are arithmetic on the published rates, not
              customer data or predictions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((ex) => (
              <div key={ex.scenario} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-lg">{ex.scenario}</h3>
                <ul className="mt-4 space-y-2">
                  {ex.lines.map((l) => (
                    <li
                      key={l.label}
                      className="flex justify-between text-sm text-[#4a4455]"
                    >
                      <span>{l.label}</span>
                      <span className="font-medium text-[#0b1c30]">{l.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-[#e3e0f1] flex justify-between items-baseline">
                  <span className="text-sm text-[#4a4455]">Total</span>
                  <span className="text-2xl font-bold text-[#630ed4]">{ex.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              See every charge as it happens
            </h2>
            <p className="mt-4 text-[#4a4455] leading-relaxed">
              Usage-based pricing only works if you can see the usage. Xovra
              keeps an event-by-event ledger and shows your spend in the
              dashboard.
            </p>
            <div className="mt-8 bg-[#e5eeff] rounded-2xl p-6 flex gap-4">
              <Info className="w-5 h-5 text-[#630ed4] shrink-0 mt-0.5" />
              <p className="text-sm text-[#4a4455] leading-relaxed">
                Carrier-side costs outside Xovra, such as 10DLC registration
                fees charged by Telnyx, are billed by Telnyx and not included in
                the rates on this page.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tracking.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="bg-white border border-[#e3e0f1] rounded-2xl p-5">
                  <Icon className="w-6 h-6 text-[#630ed4]" />
                  <h3 className="mt-3 font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4a4455] leading-relaxed">{t.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Not included */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#213145] text-[#eaf1ff] rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3">
            <CircleDollarSign className="w-6 h-6 text-[#d2bbff]" />
            <h2 className="text-2xl font-bold">What the rates do not cover</h2>
          </div>
          <p className="mt-3 text-sm text-[#d2bbff]">
            So there are no surprises, here is what sits outside the three
            per-use rates.
          </p>
          <ul className="mt-6 space-y-3">
            {notIncluded.map((n) => (
              <li key={n} className="flex gap-3 text-sm">
                <Check className="w-5 h-5 text-[#d2bbff] shrink-0" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Pricing questions, answered plainly</h2>
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

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-[#630ed4] text-white rounded-3xl px-8 py-14 text-center">
          <Rocket className="w-10 h-10 mx-auto text-[#d2bbff]" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Start free. Pay as you call.
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-[#eaddff]">
            Join early access, find leads, make your first calls, and watch the
            ledger to see exactly what it costs.
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
              <Users className="w-4 h-4" />
              Book a Demo
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#d2bbff] inline-flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            No contracts. No monthly minimums.
          </p>
        </div>
      </section>
    </main>
  );
}
