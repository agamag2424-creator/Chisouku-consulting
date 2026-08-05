import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Fit Call",
  description:
    "Request an Audit Fit Call with ChisokuLabs for PMO reporting, governance, and delivery bottlenecks.",
  keywords: [
    "PMO automation audit call",
    "PMO consulting GCC",
    "ChisokuLabs contact",
  ],
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
