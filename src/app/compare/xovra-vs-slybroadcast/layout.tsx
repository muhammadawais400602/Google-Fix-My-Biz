import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra vs Slybroadcast: Voicemail Drops vs AI Cold Calling",
  description:
    "Slybroadcast delivers pre-recorded voicemails. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, a browser softphone, AI qualifier calls and two-way SMS. An honest comparison of two different outbound strategies.",
  openGraph: {
    title: "Xovra vs Slybroadcast: Voicemail Drops vs AI Cold Calling",
    description:
      "Slybroadcast delivers pre-recorded voicemails. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, a browser softphone, AI qualifier calls and two-way SMS. An honest comparison of two different outbound strategies.",
    type: "article",
  },
  alternates: {
    canonical: "/compare/xovra-vs-slybroadcast",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
