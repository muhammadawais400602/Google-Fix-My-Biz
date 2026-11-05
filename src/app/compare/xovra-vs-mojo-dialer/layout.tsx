import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra vs Mojo Dialer: Power Dialing vs AI-Assisted Calling",
  description:
    "Mojo Dialer is a multi-line power dialer popular with real estate teams. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, enrichment, AI qualifier calls and live AI rebuttals. An honest comparison, including where Mojo is faster.",
  openGraph: {
    title: "Xovra vs Mojo Dialer: Power Dialing vs AI-Assisted Calling",
    description:
      "Mojo Dialer is a multi-line power dialer popular with real estate teams. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, enrichment, AI qualifier calls and live AI rebuttals. An honest comparison, including where Mojo is faster.",
    type: "article",
  },
  alternates: {
    canonical: "/compare/xovra-vs-mojo-dialer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
