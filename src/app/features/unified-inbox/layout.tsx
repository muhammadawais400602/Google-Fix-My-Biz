import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages & Conversations – SMS Threads – Xovra",
  description:
    "Xovra groups two-way Telnyx SMS into threads by phone number, shows inbound and outbound messages, and resolves phone numbers to lead names. No recordings or transcripts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
