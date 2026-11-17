import type { Metadata } from "next";
import { IBM_Plex_Mono, Libre_Franklin, Source_Sans_3 } from "next/font/google";
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

// September 2026 type: Libre Franklin for headings, Source Sans 3 for text, IBM Plex Mono for labels and data.
const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
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
      className={`${libreFranklin.variable} ${sourceSans.variable} ${plexMono.variable}`}
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
        <CtaTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
