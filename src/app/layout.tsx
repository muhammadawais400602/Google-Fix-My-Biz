import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import "./xovra.css";
import Header from "@/components/xovra/Header";
import Footer from "@/components/xovra/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Xovra – AI-Powered Cold Calling Platform",
  description: "Xovra scrapes leads from Google Maps, enriches and scores them, then lets you call with a browser-based softphone or AI qualifier. Usage-based pricing, no contracts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
