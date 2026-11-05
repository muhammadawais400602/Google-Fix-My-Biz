import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Calling Software for Sales Teams – Xovra",
  description:
    "Run organized outbound campaigns in manual or AI mode with team roles, per-campaign scripts, number pools, and a per-event usage ledger.",
  openGraph: {
    title: "Cold Calling Software for Sales Teams – Xovra",
    description:
      "Run organized outbound campaigns in manual or AI mode with team roles, per-campaign scripts, number pools, and a per-event usage ledger.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
