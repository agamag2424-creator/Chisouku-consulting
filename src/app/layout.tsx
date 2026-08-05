import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";

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

const siteUrl = "https://chisokulabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PMO Automation Audit for GCC SMEs | ChisokuLabs",
    template: "%s | ChisokuLabs",
  },
  description:
    "ChisokuLabs helps growth-stage SMEs in the GCC and Singapore find project reporting, governance, and delivery bottlenecks through a focused PMO Automation Audit.",
  keywords: [
    "PMO automation audit GCC",
    "project reporting automation Singapore",
    "PMO maturity diagnostic",
    "delivery governance consulting",
    "ChisokuLabs",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "PMO Automation Audit for GCC SMEs | ChisokuLabs",
    description:
      "Find project reporting, governance, and delivery bottlenecks before they slow growth.",
    siteName: "ChisokuLabs",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ChisokuLabs PMO Automation Audit preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PMO Automation Audit for GCC SMEs | ChisokuLabs",
    description:
      "A focused audit for growth-stage SMEs with reporting, governance, and delivery bottlenecks.",
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
              description:
                "ChisokuLabs helps growth-stage SMEs in the GCC and Singapore find project reporting, governance, and delivery bottlenecks.",
              sameAs: ["https://www.linkedin.com/in/agamag24"],
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
              provider: {
                "@type": "Organization",
                name: "ChisokuLabs",
                url: siteUrl,
              },
              areaServed: ["GCC", "Singapore"],
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: 4000,
                  maxPrice: 5000,
                  priceCurrency: "USD",
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
