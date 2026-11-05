"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Filter,
  Gauge,
  Globe,
  Info,
  Layers,
  ListChecks,
  MapPin,
  Megaphone,
  Minus,
  Plus,
  Search,
  Share2,
  Sparkles,
  Target,
  X,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content data                                                      */
/* ------------------------------------------------------------------ */

const heroBadges = [
  { icon: MapPin, label: "Niche plus city search" },
  { icon: FileSpreadsheet, label: "Google Sheet and CSV output" },
  { icon: Target, label: "Pitch angle on every lead" },
];

const panel = {
  title: "Job: dentists in Dubai",
  subtitle: "Scrape, enrich, score",
  footnote: "Example job for explanation only. Results depend on what is publicly listed on Google Maps and on each business website.",
  icon: MapPin,
};

const panelRows = [
  {
    icon: Search,
    label: "Source",
    value: "Google Maps listings for niche = dentists, city = Dubai",
  },
  {
    icon: Globe,
    label: "Website audit",
    value: "HTTPS: no, mobile-friendly: no, copyright year: 2019",
  },
  {
    icon: Megaphone,
    label: "Ads and social",
    value: "No Google Ads detected, Instagram handle found, Facebook page found",
  },
  {
    icon: Target,
    label: "Pitch angle",
    value: "WEAK_SITE, score assigned, row written to Sheet",
  },
];

const glance = [
  {
    icon: MapPin,
    title: "Google Maps scraping",
    desc: "Search by niche and city, for example dentists in Dubai, and collect the listings.",
  },
  {
    icon: Search,
    title: "Enrichment",
    desc: "Website audit, Google Ads detection and social presence added to each lead.",
  },
  {
    icon: Target,
    title: "Scoring and angles",
    desc: "Leads are scored and tagged RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE.",
  },
  {
    icon: FileSpreadsheet,
    title: "Sheet and CSV",
    desc: "Output goes to a Google Sheet and a HubSpot-compatible CSV file.",
  },
];

const capabilities: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; tag?: string; href?: string }[] = [
  {
    icon: MapPin,
    title: "Google Maps by niche and city",
    desc: "Define a niche and a city and Xovra collects matching Google Maps listings with their contact details.",
  },
  {
    icon: Globe,
    title: "Website audit",
    desc: "Checks HTTPS, mobile friendliness, copyright year and technology stack, so you can see which sites look neglected.",
  },
  {
    icon: Megaphone,
    title: "Google Ads detection",
    desc: "Looks for on-site ad tags, the Ads Transparency Center and search results to see whether a business already pays for ads.",
  },
  {
    icon: Share2,
    title: "Social presence",
    desc: "Finds Instagram handle and follower count, plus Facebook and TikTok presence, to understand where the business is active.",
  },
  {
    icon: Target,
    title: "Scoring and pitch angles",
    desc: "Each lead gets a score and one of four pitch angles: RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE.",
  },
  {
    icon: Layers,
    title: "Batch jobs from YAML",
    desc: "Describe several niche and city combinations in a YAML job file and process them in a single batch.",
  },
];

const steps = [
  {
    icon: FileText,
    title: "Define the job",
    desc: "Pick a niche and a city, or list many in a YAML job file for batch processing.",
  },
  {
    icon: MapPin,
    title: "Scrape listings",
    desc: "Xovra collects Google Maps listings that match the search.",
  },
  {
    icon: Search,
    title: "Enrich",
    desc: "Website audit, ads detection and social lookups run for each business.",
  },
  {
    icon: Target,
    title: "Score and tag",
    desc: "Leads receive a score and a pitch angle so you know the opening before the call.",
  },
  {
    icon: FileSpreadsheet,
    title: "Export",
    desc: "Rows are written to a Google Sheet and a HubSpot-compatible CSV, then imported into a campaign.",
  },
];

const dives = [
  {
    eyebrow: "Enrichment",
    title: "Know the business before you call it",
    desc: "A cold call goes better when you have a reason to be calling. Enrichment turns a Google Maps listing into a short list of concrete observations.",
    icon: Search,
    panelTitle: "What enrichment looks for",
    panelLines: [
      "website: HTTPS, mobile-friendly, copyright year, tech stack",
      "ads: on-site tags, Ads Transparency Center, SERP",
      "social: Instagram handle and followers, Facebook, TikTok",
    ],
    points: [
      { icon: Globe, title: "Website audit", desc: "Spot sites without HTTPS, that are not mobile-friendly or that still show an old copyright year." },
      { icon: Megaphone, title: "Ads detection", desc: "Three signals are checked, so a business that already spends on Google Ads is not mistaken for one that does not." },
      { icon: Share2, title: "Social presence", desc: "Instagram follower counts and Facebook or TikTok presence help you judge how active the business is online." },
    ],
  },
  {
    eyebrow: "Scoring and angles",
    title: "Every lead arrives with an opening line",
    desc: "Pitch angles are simple on purpose. Four labels tell the caller, or the AI assistant, which conversation to start.",
    icon: Target,
    panelTitle: "The four pitch angles",
    panelLines: [
      "RUNS_ADS: already pays for Google Ads",
      "NO_SITE: no website found",
      "WEAK_SITE: site exists but looks neglected",
      "STRONG_SITE: site is in good shape",
    ],
    points: [
      { icon: Megaphone, title: "RUNS_ADS", desc: "Spending on ads already, so a conversation about results or conversion fits." },
      { icon: Globe, title: "NO_SITE and WEAK_SITE", desc: "No site, or one with clear problems, gives you an obvious reason to call." },
      { icon: Gauge, title: "Score for ordering", desc: "A score lets you work the strongest leads first." },
    ],
  },
  {
    eyebrow: "Campaigns",
    title: "Turn the list into a calling plan",
    desc: "A campaign takes your leads and wraps them in the settings that decide how they are called: manual or AI mode, a brief, a greeting, retries and timing.",
    icon: ListChecks,
    panelTitle: "Campaign worklist",
    panelLines: [
      "import: Google Sheet or pasted numbers",
      "filter: no website, has socials",
      "script: Hi {name}, I noticed your {category} in {city}...",
      "retry: attempt cap and timing configurable",
    ],
    points: [
      { icon: FileSpreadsheet, title: "Import from Sheets or paste", desc: "Bring in leads from a Google Sheet, or paste a list of numbers directly." },
      { icon: Filter, title: "Worklist filtering", desc: "Filter to leads with no website, or leads that have social profiles, before you start calling." },
      { icon: FileText, title: "Script placeholders", desc: "Scripts can use {name}, {category}, {city}, {rating}, {evidence} and {caller}." },
    ],
  },
];

const isList = [
  "Scrapes Google Maps listings by niche and city",
  "Audits websites for HTTPS, mobile friendliness, copyright year and tech stack",
  "Detects Google Ads through on-site tags, Ads Transparency Center and SERP",
  "Finds Instagram, Facebook and TikTok presence",
  "Scores leads and assigns RUNS_ADS, NO_SITE, WEAK_SITE or STRONG_SITE",
  "Writes to a Google Sheet and a HubSpot-compatible CSV",
  "Runs batches from YAML job files and imports into campaigns",
];

const isNotList = [
  "No native CRM sync: export the CSV and import it into HubSpot yourself",
  "No carrier or line-type validation of phone numbers",
  "No live Do Not Call registry lookup: you maintain your own suppression list",
  "Not a database of purchased contacts: data comes from public listings",
  "Not a guarantee of complete data: some listings have missing websites or numbers",
];

const faqs = [
  {
    q: "Where does the lead data come from?",
    a: "From Google Maps listings that match your niche and city, enriched by checking each business website, Google Ads signals and social profiles.",
  },
  {
    q: "What are pitch angles?",
    a: "Four labels assigned during scoring: RUNS_ADS, NO_SITE, WEAK_SITE and STRONG_SITE. They tell you or the AI assistant which conversation to open with.",
  },
  {
    q: "Can I process many cities at once?",
    a: "Yes. Batch processing uses YAML job files, so you can describe multiple niche and city searches and run them together.",
  },
  {
    q: "Does it sync with my CRM?",
    a: "Not natively. Output goes to a Google Sheet and a CSV in HubSpot-compatible format that you can import yourself.",
  },
  {
    q: "How do leads get into a campaign?",
    a: "Import them from a Google Sheet or paste numbers. Each campaign then has its own brief, greeting, retry logic and attempt caps.",
  },
  {
    q: "Can I filter who I call first?",
    a: "The campaign worklist can be filtered, for example to leads with no website or leads that have social profiles.",
  },
  {
    q: "Does Xovra check the Do Not Call registry?",
    a: "No. Xovra provides an append-only suppression list for your own Do Not Contact numbers. Checking registries is your responsibility.",
  },
];

const related = [
  {
    icon: Bot,
    href: "/features/ai-calling",
    title: "AI Qualifier Calls",
    desc: "Use lead context in AI calls.",
  },
  {
    icon: Sparkles,
    href: "/features/objection-rebuttals",
    title: "Live AI Rebuttals",
    desc: "Context-aware help during calls.",
  },
  {
    icon: BarChart3,
    href: "/features/outcome-tracking",
    title: "Outcome Tracking",
    desc: "See how each campaign is going.",
  },
];


/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function LeadManagementPage() {
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
            <span className="font-semibold text-[#0b1c30]">{"Lead Sourcing & Campaigns"}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eaddff] px-4 py-1 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#630ed4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#630ed4]">
                  {"Lead sourcing and campaigns"}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#0b1c30] sm:text-5xl lg:text-[56px]">
                {"Find the businesses worth calling,"}{" "}
                <span className="text-[#630ed4]">{"and know why before you dial."}</span>
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#4a4455]">
                {"Xovra scrapes Google Maps by niche and city, audits each business website, checks for Google Ads and social presence, scores every lead and gives it a pitch angle. The result lands in a Google Sheet and a CSV."}
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
              {"From a search term to a call-ready list"}
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
              {"Sourcing, enrichment and campaign setup in one place"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">
              {"Everything between I want to call dentists in Dubai and the first dial."}
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
              {"The lead pipeline, step by step"}
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
              {"What lead sourcing covers"}
            </h2>
            <p className="text-base leading-relaxed text-[#4a4455]">{"Xovra sources and organizes leads for calling. It does not try to be your CRM."}</p>
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
              {"Questions about lead sourcing"}
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
                {"Stop guessing who to call next"}
              </h2>
              <p className="mb-10 max-w-2xl text-lg text-[#eaddff]">
                {"Tell us your niche and city. We will show you what a scraped, enriched and scored list looks like."}
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
                {"Output is a Google Sheet and a HubSpot-compatible CSV. No native CRM sync."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
