import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Schedule a 30-minute discovery call with ChisokuLab to map your AI governance gaps and highest-value AI solution opportunities.",
  keywords: [
    "AI governance consultant",
    "book discovery call",
    "ChisokuLab contact",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

