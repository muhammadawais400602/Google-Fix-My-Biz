import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Sourcing & Campaigns – Google Maps Leads – Xovra",
  description:
    "Xovra scrapes Google Maps by niche and city, audits each website, detects Google Ads and social presence, scores leads, assigns pitch angles, and exports to Google Sheets and HubSpot-compatible CSV.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
