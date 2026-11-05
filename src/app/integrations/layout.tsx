import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra Integrations – Telnyx, Google Sheets, Claude & Gemini",
  description:
    "Xovra connects to Telnyx for voice and SMS, Google Sheets for leads and outcomes, Claude and Gemini for live AI rebuttals, and exports leads as HubSpot-compatible CSV.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
