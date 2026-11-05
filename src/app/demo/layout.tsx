import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo – Xovra",
  description:
    "Book a 20-minute Xovra demo. See the Google Maps scraper, AI qualifier calls, live rebuttals, and two-way SMS in action with your own leads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
