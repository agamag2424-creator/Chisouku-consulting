import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "../styles/globals.css";
import { JsonLdScript } from "../components/aeo/JsonLdScript";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { organizationJsonLd, websiteJsonLd } from "../lib/jsonLd";
import { defaultDescription, defaultTitle, ogImage } from "../lib/seo";
import { siteConfig } from "../lib/siteConfig";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500"],
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
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
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
        <SpeedInsights />
      </body>
    </html>
  );
}
