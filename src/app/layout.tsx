import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { AmbientScanline } from "../components/layout/AmbientScanline";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://chisokulab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ChisokuLab | AI Governance & AI Solutions Consulting",
    template: "%s | ChisokuLab",
  },
  description:
    "ChisokuLab helps mid-market companies govern AI and build AI solutions — from shadow AI chaos to governed intelligence and measurable business value.",
  keywords: [
    "AI governance",
    "AI consulting",
    "AI solutions",
    "shadow IT",
    "shadow AI",
    "PMO modernization",
    "responsible AI",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ChisokuLab | AI Governance & AI Solutions Consulting",
    description:
      "ChisokuLab helps mid-market companies govern AI and build AI solutions — from shadow AI chaos to governed intelligence and measurable business value.",
    siteName: "ChisokuLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChisokuLab | AI Governance & AI Solutions Consulting",
    description:
      "ChisokuLab helps mid-market companies govern AI and build AI solutions — from shadow AI chaos to governed intelligence and measurable business value.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--color-void)] text-[var(--color-text-primary)]">
        <Script
          id="chisokulab-org-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChisokuLab",
              url: siteUrl,
              description:
                "ChisokuLab helps mid-market companies govern AI and build AI solutions.",
              sameAs: [],
              logo: `${siteUrl}/icon.png`,
            }),
          }}
        />
        <AmbientScanline />
        <Nav />
        <div className="pt-14 min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Script
          id="chisokulab-services-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "AI Governance & AI Solutions Consulting",
              provider: {
                "@type": "Organization",
                name: "ChisokuLab",
                url: siteUrl,
              },
              areaServed: {
                "@type": "GeoCircle",
                name: "Global (remote-first)",
              },
              url: siteUrl,
            }),
          }}
        />
      </body>
    </html>
  );
}
