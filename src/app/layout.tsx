import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { siteConfig } from "../lib/siteConfig";

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
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500", "600", "700"],
});

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Automation for Delivery Systems | PMO Reporting Audit",
    template: "%s | ChisokuLabs",
  },
  description:
    "ChisokuLabs builds AI automation into delivery systems—starting with the PMO reporting layer for growth-stage SMEs in the GCC and Singapore.",
  keywords: [
    "AI automation delivery systems",
    "PMO reporting automation",
    "PMO automation audit GCC",
    "project reporting AI Singapore",
    "ChisokuLabs",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AI Automation for Delivery Systems | ChisokuLabs",
    description:
      "Find delivery drag in the PMO reporting layer—then automate what repeats.",
    siteName: "ChisokuLabs",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ChisokuLabs — AI automation for delivery systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Delivery Systems | ChisokuLabs",
    description:
      "Starting with the PMO reporting layer for GCC and Singapore growth-stage SMEs.",
    images: ["/og.png"],
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
      className={`${libreFranklin.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <Script
          id="chisokulabs-org-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChisokuLabs",
              url: siteUrl,
              description: `${siteConfig.tagline}. ${siteConfig.subline}.`,
              sameAs: [siteConfig.linkedIn],
              logo: `${siteUrl}/brand/favicon-mark.png`,
            }),
          }}
        />
        <div className="site-shell">
          <Nav />
          <main className="site-main pt-20">{children}</main>
          <Footer />
        </div>
        <Script
          id="chisokulabs-services-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "PMO Automation Audit",
              description:
                "AI automation for delivery systems, starting with the PMO reporting layer.",
              provider: {
                "@type": "Organization",
                name: "ChisokuLabs",
                url: siteUrl,
              },
              areaServed: ["GCC", "Singapore"],
              offers: {
                "@type": "Offer",
                priceCurrency: siteConfig.pricing.currency,
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: siteConfig.pricing.min,
                  maxPrice: siteConfig.pricing.max,
                  priceCurrency: siteConfig.pricing.currency,
                },
              },
              url: `${siteUrl}/pmo-automation-audit`,
            }),
          }}
        />
      </body>
    </html>
  );
}
