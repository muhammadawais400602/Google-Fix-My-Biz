import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra vs CallTools: Call Center Software vs AI Cold Calling",
  description:
    "CallTools is predictive dialer and contact center software built for call centers. Xovra is a lightweight, browser-based AI cold calling platform with built-in lead sourcing, AI qualifier calls and usage-based pricing. An honest comparison for small revenue teams.",
  openGraph: {
    title: "Xovra vs CallTools: Call Center Software vs AI Cold Calling",
    description:
      "CallTools is predictive dialer and contact center software built for call centers. Xovra is a lightweight, browser-based AI cold calling platform with built-in lead sourcing, AI qualifier calls and usage-based pricing. An honest comparison for small revenue teams.",
    type: "article",
  },
  alternates: {
    canonical: "/compare/xovra-vs-calltools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
