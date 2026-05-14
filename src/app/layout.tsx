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

const siteUrl = "https://chisokulabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI-Led PMO & Enterprise Transformation | ChisokuLab",
    template: "%s | ChisokuLab",
  },
  description:
    "ChisokuLab helps enterprises embed AI into PMO operations and programme delivery — turning AI investment into measurable execution outcomes.",
  keywords: [
    "AI-led PMO",
    "AI project management",
    "AI enterprise transformation",
    "ChisokuLab",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AI-Led PMO & Enterprise Transformation | ChisokuLab",
    description:
      "ChisokuLab helps enterprises embed AI into PMO operations and programme delivery — turning AI investment into measurable execution outcomes.",
    siteName: "ChisokuLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Led PMO & Enterprise Transformation | ChisokuLab",
    description:
      "ChisokuLab helps enterprises embed AI into PMO operations and programme delivery — turning AI investment into measurable execution outcomes.",
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
                "ChisokuLab helps enterprises embed AI into PMO operations and programme delivery.",
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
              serviceType: "AI-Led PMO & Enterprise Transformation",
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
