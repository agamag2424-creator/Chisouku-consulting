import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "../styles/globals.css";
import { JsonLdScript } from "../components/aeo/JsonLdScript";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { organizationJsonLd, websiteJsonLd } from "../lib/jsonLd";
import { defaultDescription, defaultTitle, ogImage } from "../lib/seo";
import { siteConfig } from "../lib/siteConfig";
import { Analytics } from "@vercel/analytics/next";
import { CtaTracker } from "../components/analytics/CtaTracker";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

// Type (change 4): Source Serif 4 for headings, Source Sans 3 for text, IBM Plex Mono for calculator and scorecard numbers.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500", "700"],
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | ChisokuLabs",
  },
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "ChisokuLabs",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: "/brand/favicon-mark.png",
    apple: "/brand/apple-touch-icon.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${sourceSerif.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <JsonLdScript id="chisokulabs-org-ld-json" data={organizationJsonLd()} />
        <JsonLdScript id="chisokulabs-website-ld-json" data={websiteJsonLd()} />
        <div className="site-shell">
          <Nav />
          <main className="site-main pt-20">{children}</main>
          <Footer />
        </div>
        {/* The old-offer Service JSON-LD is gone; E8.4 adds Service and Offer blocks for the new offers. */}
        <Analytics />
        {siteConfig.umamiWebsiteId && process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview" && (
          // Umami Cloud: cookieless page views and the events in lib/track.ts. Loads only when an ID is set.
          <Script src="https://cloud.umami.is/script.js" data-website-id={siteConfig.umamiWebsiteId} strategy="afterInteractive" />
        )}
        <CtaTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
