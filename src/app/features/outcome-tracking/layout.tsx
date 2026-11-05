import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outcome Tracking & Usage Ledger – Xovra",
  description:
    "Xovra writes call outcomes to Google Sheets, records AI lead scores and qualification, and keeps a usage ledger of voice minutes and SMS costs with balance, today and month-to-date spend.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
