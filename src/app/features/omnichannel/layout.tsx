import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Follow-Up & SMS – Two-Way Telnyx SMS – Xovra",
  description:
    "Xovra sends and receives two-way SMS through Telnyx, detects STOP and UNSUBSCRIBE opt-outs, and drafts follow-ups as wa.me WhatsApp links or mailto: emails. 10DLC registration required.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
