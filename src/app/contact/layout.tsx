import type { Metadata } from "next";
import { siteConfig } from "../../lib/siteConfig";

const title = "Audit Fit Call";
const description =
  "Fit call for AI automation in delivery systems — starting at PMO reporting. Diagnostic, Audit, or Implementation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI automation delivery systems",
    "PMO automation audit call",
    "PMO consulting GCC Singapore",
    "ChisokuLabs contact",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | ChisokuLabs`,
    description,
    url: `${siteConfig.url}/contact`,
    images: ["/og-contact.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ChisokuLabs`,
    description,
    images: ["/og-contact.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
