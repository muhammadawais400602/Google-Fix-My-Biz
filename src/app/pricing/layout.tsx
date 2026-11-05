import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xovra Pricing – Usage-Based AI Cold Calling, Pay Per Use",
  description:
    "Xovra uses simple usage-based pricing: $0.02/min manual calling, $0.25/min AI calling, and $0.03 per SMS part. No monthly minimums, no contracts, free to start in early access.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
