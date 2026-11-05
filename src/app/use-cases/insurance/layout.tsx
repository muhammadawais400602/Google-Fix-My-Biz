import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cold Calling for Insurance Agents and IMOs – Xovra",
  description:
    "Source business prospects from Google Maps, enrich with website and social data, pre-screen with an AI qualifier, and stay within calling windows, suppression lists, and attempt caps.",
  openGraph: {
    title: "AI Cold Calling for Insurance Agents and IMOs – Xovra",
    description:
      "Source business prospects from Google Maps, enrich with website and social data, pre-screen with an AI qualifier, and stay within calling windows, suppression lists, and attempt caps.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
