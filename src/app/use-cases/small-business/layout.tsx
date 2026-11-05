import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Calling for Small Business – Xovra",
  description:
    "Find local leads on Google Maps, call from your browser, and let an AI qualifier handle first-touch calls. Usage-based pricing with SMS follow-up built in.",
  openGraph: {
    title: "Cold Calling for Small Business – Xovra",
    description:
      "Find local leads on Google Maps, call from your browser, and let an AI qualifier handle first-touch calls. Usage-based pricing with SMS follow-up built in.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
