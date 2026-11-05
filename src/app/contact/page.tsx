"use client";

import { useState } from "react";
import {
  Zap,
  Phone,
  Megaphone,
  ArrowRight,
  CalendarDays,
  MapPin,
  Building2,
  ChevronDown,
  Lock,
  Gauge,
  ShieldCheck,
  Network,
  CheckCircle2,
} from "lucide-react";

const inquiryOptions = [
  { value: "enterprise-demo", label: "Book an Enterprise Demo (Multi-Seat)" },
  { value: "wholesale-sip", label: "High-Volume Minutes & Custom SIP Setup" },
  { value: "10dlc-support", label: "A2P 10DLC Registration Help" },
  { value: "voice-clone", label: "AI Voice Agent Configuration" },
  { value: "general", label: "General Integration & API Questions" },
];

const countryOptions = [
  { value: "+1", label: "\u{1F1FA}\u{1F1F8} +1" },
  { value: "+44", label: "\u{1F1EC}\u{1F1E7} +44" },
  { value: "+61", label: "\u{1F1E6}\u{1F1FA} +61" },
  { value: "+49", label: "\u{1F1E9}\u{1F1EA} +49" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    companySize: "",
    phoneNumber: "",
    countryCode: "+1",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  function resetForm() {
    setSubmitted(false);
    setForm({
      fullName: "",
      workEmail: "",
      companySize: "",
      phoneNumber: "",
      countryCode: "+1",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Ambient Backdrop */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#d2bbff]/20 blur-3xl -z-10" />
        <div className="pointer-events-none absolute top-48 left-10 h-[350px] w-[350px] rounded-full bg-[#d3e4fe]/40 blur-3xl -z-10" />

        <div className="max-w-[75rem] mx-auto px-4 lg:px-8 py-12 lg:py-24">
          {/* Section Header */}
          <div className="flex flex-col items-start max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaddff] text-[#630ed4] text-[12px] font-bold uppercase tracking-[0.08em] mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#630ed4] animate-pulse" />
              Get in Touch
            </div>
            <h1 className="text-[32px] lg:text-[56px] font-bold text-[#0b1c30] tracking-tight leading-[1.08] mb-4">
              Talk to a Real Person About Your Outbound Goals
            </h1>
            <p className="text-lg text-[#5e5d6b] max-w-2xl leading-relaxed">
              Whether you&apos;re running your first cold campaign or building a 50-seat call center — our team can help you set up, scale, and stay compliant.
            </p>
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Direct Channels Block */}
              <div className="bg-white p-8 rounded-xl shadow-[0_1px_3px_rgba(15,15,26,0.04),0_8px_24px_rgba(15,15,26,0.03)] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#630ed4]">Direct Routing</span>
                  <span className="text-[12px] font-semibold text-[#5e5d6b]">Avg Response &lt; 8m</span>
                </div>

                <div className="flex flex-col gap-4">
                  <a href="mailto:sales@xovra.ai" className="group flex items-center justify-between p-3 rounded-lg bg-[#eff4ff]/70 hover:bg-[#e5eeff] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#630ed4] group-hover:scale-105 transition-transform">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0b1c30]">Sales &amp; Enterprise</span>
                        <span className="text-sm text-[#5e5d6b]">sales@xovra.ai</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#5e5d6b] group-hover:text-[#630ed4] group-hover:translate-x-1 transition-all" />
                  </a>

                  <a href="mailto:support@xovra.ai" className="group flex items-center justify-between p-3 rounded-lg bg-[#eff4ff]/70 hover:bg-[#e5eeff] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#630ed4] group-hover:scale-105 transition-transform">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0b1c30]">Technical Support &amp; 10DLC</span>
                        <span className="text-sm text-[#5e5d6b]">support@xovra.ai</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#5e5d6b] group-hover:text-[#630ed4] group-hover:translate-x-1 transition-all" />
                  </a>

                  <a href="mailto:press@xovra.ai" className="group flex items-center justify-between p-3 rounded-lg bg-[#eff4ff]/70 hover:bg-[#e5eeff] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#eaddff] flex items-center justify-center text-[#630ed4] group-hover:scale-105 transition-transform">
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0b1c30]">Press &amp; Partnerships</span>
                        <span className="text-sm text-[#5e5d6b]">press@xovra.ai</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#5e5d6b] group-hover:text-[#630ed4] group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                {/* NOC Status Sub-Panel */}
                <div className="mt-1 bg-[#213145] text-[#eaf1ff] p-4 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7c3aed] shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#d2bbff]">Telecom NOC</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#cbdbf5] font-mono">99.99% SLA</span>
                  </div>
                  <p className="text-sm text-[#f8f9ff] mt-2">
                    Global SIP Trunking NOC: 24/7/365 active monitoring. Auto-failover across 14 carrier routes.
                  </p>
                </div>
              </div>

              {/* Schedule Strategy Call Card */}
              <div className="bg-gradient-to-br from-[#eff4ff] via-white to-[#eff4ff] p-8 rounded-xl shadow-[0_1px_3px_rgba(15,15,26,0.04),0_8px_24px_rgba(15,15,26,0.03)] flex flex-col gap-4 relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-[#630ed4]/10 text-[#630ed4] flex items-center justify-center">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eaddff] text-[#630ed4] text-[12px] font-semibold mb-2">
                    Direct Engineering Walkthrough
                  </div>
                  <h3 className="text-2xl font-bold text-[#0b1c30] tracking-tight leading-tight">
                    Want a live walkthrough of the AI rebuttal engine and Telnyx setup?
                  </h3>
                  <p className="text-base text-[#5e5d6b] mt-2 leading-relaxed">
                    Pick a 15-minute slot with our Head of Solutions. We&apos;ll run mock cold calls live against your toughest sales objections.
                  </p>
                </div>
                <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#eaddff] text-[#630ed4] text-sm font-semibold shadow-sm hover:shadow-md transition-all self-start">
                  Book a Live Demo Call
                  <ArrowRight className="h-[18px] w-[18px]" />
                </a>
              </div>

              {/* Global Physical Footprint */}
              <div className="bg-white p-8 rounded-xl shadow-[0_1px_3px_rgba(15,15,26,0.04),0_8px_24px_rgba(15,15,26,0.03)] flex flex-col gap-6">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#5e5d6b]">Location</span>
                <div className="flex flex-col bg-[#eff4ff]/50 p-4 rounded-lg">
                  <div className="flex items-center gap-1 text-[#630ed4] mb-1">
                    <MapPin className="h-[18px] w-[18px]" />
                    <span className="text-sm font-bold text-[#0b1c30]">Remote-First</span>
                  </div>
                  <p className="text-sm text-[#5e5d6b] leading-snug">
                    Remote-first team. We respond fast, wherever you are.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white p-8 lg:p-12 rounded-xl shadow-[0_4px_24px_rgba(15,15,26,0.06)] relative">
                {/* Success State Overlay */}
                {submitted && (
                  <div className="absolute inset-0 bg-white/[0.98] rounded-xl z-20 flex flex-col items-center justify-center p-12 text-center backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h3 className="text-[32px] font-bold text-[#0b1c30] tracking-tight leading-tight mb-2">
                      Message Transmitted!
                    </h3>
                    <p className="text-lg text-[#5e5d6b] max-w-md mb-6 leading-relaxed">
                      A sales engineer has received your parameters and will respond within <strong className="text-[#0b1c30]">15 minutes</strong> with technical specifications and dialing sandbox access.
                    </p>
                    <div className="p-4 bg-[#eff4ff] rounded-xl w-full max-w-sm mb-6 text-left">
                      <div className="flex justify-between items-center text-[#5e5d6b] text-[12px] font-semibold mb-1">
                        <span>Inquiry Ticket</span>
                        <span className="font-mono text-[#630ed4] font-bold">#DIA-9042</span>
                      </div>
                      <div className="flex justify-between items-center text-[#5e5d6b] text-[12px] font-semibold">
                        <span>Routing Priority</span>
                        <span className="text-emerald-700 font-semibold">Elevated (SLA: 15m)</span>
                      </div>
                    </div>
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-sm font-semibold rounded-full transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                )}

                {/* Form Header */}
                <div className="flex items-center justify-between pb-4 mb-6">
                  <div>
                    <h2 className="text-[32px] font-bold text-[#0b1c30] tracking-tight leading-tight">
                      Tell Us What You&apos;re Working On
                    </h2>
                    <p className="text-base text-[#5e5d6b] mt-0.5">
                      We&apos;ll match you with the right setup for your team size, campaign type, and dial volume.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-[#eff4ff] rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[12px] font-medium text-[#4a4455]">Rep Available</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Row 1: Full Name & Work Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-sm font-semibold text-[#0b1c30] flex items-center justify-between">
                        Full Name <span className="text-[#630ed4] text-xs">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-[#eff4ff]/60 focus:bg-white text-[#0b1c30] text-base px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 shadow-inner transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="workEmail" className="text-sm font-semibold text-[#0b1c30] flex items-center justify-between">
                        Work Email <span className="text-[#630ed4] text-xs">*</span>
                      </label>
                      <input
                        id="workEmail"
                        name="workEmail"
                        type="email"
                        required
                        value={form.workEmail}
                        onChange={handleChange}
                        placeholder="s.jenkins@acmesales.com"
                        className="w-full bg-[#eff4ff]/60 focus:bg-white text-[#0b1c30] text-base px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 shadow-inner transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="companySize" className="text-sm font-semibold text-[#0b1c30]">
                        Company &amp; SDR Team Size
                      </label>
                      <input
                        id="companySize"
                        name="companySize"
                        type="text"
                        value={form.companySize}
                        onChange={handleChange}
                        placeholder="Acme Corp • 15 SDRs"
                        className="w-full bg-[#eff4ff]/60 focus:bg-white text-[#0b1c30] text-base px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 shadow-inner transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phoneNumber" className="text-sm font-semibold text-[#0b1c30]">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          className="bg-[#eff4ff]/60 text-[#0b1c30] text-base px-2 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 cursor-pointer"
                        >
                          {countryOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          placeholder="(555) 234-5678"
                          className="w-full bg-[#eff4ff]/60 focus:bg-white text-[#0b1c30] text-base px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 shadow-inner transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Subject Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-sm font-semibold text-[#0b1c30] flex items-center justify-between">
                      Inquiry Focus <span className="text-[#630ed4] text-xs">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full bg-[#eff4ff]/60 focus:bg-white text-base px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 cursor-pointer appearance-none ${form.subject ? "text-[#0b1c30]" : "text-[#4a4455]"}`}
                      >
                        <option disabled value="">Select an area of interest...</option>
                        {inquiryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5e5d6b]">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message Area */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-[#0b1c30] flex items-center justify-between">
                      Project Details &amp; Volume Target <span className="text-[#630ed4] text-xs">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your current outbound setup, monthly call volume, CRM stack, and core goals..."
                      className="w-full bg-[#eff4ff]/60 focus:bg-white text-[#0b1c30] text-base p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#630ed4]/20 shadow-inner resize-none transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-4 px-8 rounded-xl bg-[#630ed4] text-white text-xl font-bold tracking-tight shadow-[0_4px_24px_rgba(124,58,237,0.35)] hover:bg-[#7c3aed] hover:shadow-[0_8px_32px_rgba(124,58,237,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer group ${submitting ? "opacity-80 cursor-not-allowed" : ""}`}
                    >
                      <span>{submitting ? "Routing to Telephony Team..." : "Send Message"}</span>
                      <ArrowRight className="h-[22px] w-[22px] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>

                {/* Trust & Compliance Statement */}
                <div className="mt-6 pt-4 flex items-center gap-2 text-[#5e5d6b] justify-center sm:justify-start">
                  <Lock className="h-[18px] w-[18px] text-[#630ed4] shrink-0" />
                  <p className="text-sm leading-tight text-[#5e5d6b]">
                    Your data stays private &middot; No spam, ever.
                  </p>
                </div>
              </div>

              {/* Fast FAQ Pill Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-white rounded-xl shadow-sm flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-[#630ed4]" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0b1c30]">Usage-Based</span>
                    <span className="text-[12px] text-[#5e5d6b]">Pay only for what you use</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#630ed4]" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0b1c30]">Compliant</span>
                    <span className="text-[12px] text-[#5e5d6b]">Suppression &amp; calling windows</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm flex items-center gap-2">
                  <Network className="h-5 w-5 text-[#630ed4]" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0b1c30]">Exports</span>
                    <span className="text-[12px] text-[#5e5d6b]">Google Sheets &amp; CSV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
