import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live AI Rebuttals – Claude or Gemini During Calls – Xovra",
  description:
    "Xovra generates objection handling live during calls with Claude or Gemini, using the lead's own data. Nothing is pre-written. Plus AI follow-up drafts for email, SMS and WhatsApp links.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
