import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Xovra – AI-Powered Cold Calling for Sales Teams",
  description:
    "Xovra is an AI-powered cold calling platform. Find leads on Google Maps, enrich and score them, then call, text, and track outcomes from one workspace.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
