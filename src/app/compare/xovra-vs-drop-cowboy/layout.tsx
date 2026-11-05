import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra vs Drop Cowboy: Voicemail Drops vs AI Cold Calling",
  description:
    "Drop Cowboy sends ringless voicemails. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, a browser softphone, AI qualifier calls, live AI rebuttals and two-way SMS. An honest comparison of the two approaches.",
  openGraph: {
    title: "Xovra vs Drop Cowboy: Voicemail Drops vs AI Cold Calling",
    description:
      "Drop Cowboy sends ringless voicemails. Xovra is an AI-powered cold calling platform with Google Maps lead scraping, a browser softphone, AI qualifier calls, live AI rebuttals and two-way SMS. An honest comparison of the two approaches.",
    type: "article",
  },
  alternates: {
    canonical: "/compare/xovra-vs-drop-cowboy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
