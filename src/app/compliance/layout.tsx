import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra Compliance – Suppression, Calling Windows & Attempt Caps",
  description:
    "How Xovra helps you stay on the right side of TCPA rules: suppression lists with STOP detection, calling window enforcement, attempt caps, upfront AI disclosure, and server-side checks. Not legal advice.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
