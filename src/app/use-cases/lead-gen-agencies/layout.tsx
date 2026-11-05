import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outbound Calling Platform for Lead Gen Agencies – Xovra",
  description:
    "Run outbound for multiple clients with a separate organization per client, Google Maps lead sourcing, AI qualifier or manual calling, and outcomes tracked in Google Sheets.",
  openGraph: {
    title: "Outbound Calling Platform for Lead Gen Agencies – Xovra",
    description:
      "Run outbound for multiple clients with a separate organization per client, Google Maps lead sourcing, AI qualifier or manual calling, and outcomes tracked in Google Sheets.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
