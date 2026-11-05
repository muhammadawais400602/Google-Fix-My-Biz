import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Qualifier Calls – Telnyx AI Assistant – Xovra",
  description:
    "Xovra uses a Telnyx AI assistant to place qualifier calls with per-lead context, AI disclosure in the first sentence, lead scoring from 1 to 10, and an automatic follow-up SMS after connected calls.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
