import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Fit Call",
  description:
    "Fit call for AI automation in delivery systems — starting at PMO reporting. Diagnostic, Audit, or Implementation.",
  keywords: [
    "AI automation delivery systems",
    "PMO automation audit call",
    "PMO consulting GCC Singapore",
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
