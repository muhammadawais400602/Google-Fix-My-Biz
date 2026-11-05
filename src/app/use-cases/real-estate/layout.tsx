import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cold Calling for Real Estate Agents – Xovra",
  description:
    "Prospect local business owners with Google Maps lead sourcing, AI qualifier calls with area context, local call scripts, and SMS follow-up.",
  openGraph: {
    title: "AI Cold Calling for Real Estate Agents – Xovra",
    description:
      "Prospect local business owners with Google Maps lead sourcing, AI qualifier calls with area context, local call scripts, and SMS follow-up.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
