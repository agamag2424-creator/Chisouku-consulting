// Market pages (PRD 9.10, E7). Every dated fact carries the issuer's own page as its source; each link was opened and
// checked against the fact in E7.0 (evidence/E7.0-sources.md). Wording approved by the founder (IN-10, 17 Oct 2026).

export type MarketKey = "uae" | "saudiArabia";

export type MarketFact = {
  /** Written in full, as the source states it. */
  date: string;
  title: string;
  text: string;
  source: { label: string; url: string };
};

export type Market = {
  path: "/go-live-readiness-uae" | "/go-live-readiness-saudi-arabia";
  /** Breadcrumb and title. */
  name: string;
  country: { name: string; code: string };
  /** Short form used in running text ("in the UAE"). */
  inName: string;
  whyNow: string;
  facts: readonly MarketFact[];
  programmes: readonly { title: string; text: string }[];
};

const sapMaintenance: MarketFact = {
  date: "End of 2027",
  title: "SAP Business Suite 7 mainstream maintenance ends",
  text: "This includes SAP ERP 6.0. Optional extended maintenance runs to the end of 2030.",
  source: {
    label: "SAP Support: maintenance strategy for SAP Business Suite 7",
    url: "https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html",
  },
};

const s4Migration = {
  title: "S/4HANA migrations",
  text: "Moving from SAP ERP 6.0 before mainstream maintenance ends.",
} as const;

const multiEntity = {
  title: "Multi-entity groups",
  text: "Several companies going live on one platform, often in waves.",
} as const;

export const markets: Record<MarketKey, Market> = {
  uae: {
    path: "/go-live-readiness-uae",
    name: "Go-live readiness in the UAE",
    country: { name: "United Arab Emirates", code: "AE" },
    inName: "the UAE",
    whyNow: "Two dates are adding go-lives to UAE programmes.",
    facts: [
      {
        date: "1 January 2027",
        title: "UAE e-invoicing becomes mandatory",
        text: "For businesses with revenue of AED 50 million or more. For many programmes, that adds an ERP integration go-live.",
        source: {
          label: "UAE Ministry of Finance: Ministerial Resolution No. 66 of 2026",
          url: "https://mof.gov.ae/wp-content/uploads/2026/05/Ministerial-Resolution-No.-66-of-2026-Amending-Certain-Provisions-of-Ministerial-Resolution-No.-244-of-2025-Regarding-the-Implementation-of-the-Electronic-Invoicing-System-En-20260514.pdf",
        },
      },
      sapMaintenance,
    ],
    programmes: [
      multiEntity,
      { title: "Free-zone and mainland entities", text: "Entities under different rules, on one platform and one go-live plan." },
      s4Migration,
    ],
  },
  saudiArabia: {
    path: "/go-live-readiness-saudi-arabia",
    name: "Go-live readiness in Saudi Arabia",
    country: { name: "Saudi Arabia", code: "SA" },
    inName: "Saudi Arabia",
    whyNow: "Two dates are adding go-lives to Saudi programmes.",
    facts: [
      {
        date: "1 February 2027",
        title: "ZATCA e-invoicing integration, wave 25",
        text: "Taxpayers whose VAT-subject revenue exceeded SAR 187,500 in any year from 2022 to 2025 connect their invoicing systems to the Fatoora platform. Phase 2 integration continues in waves.",
        source: {
          label: "ZATCA: twenty-fifth integration wave, 24 July 2026",
          url: "https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx",
        },
      },
      sapMaintenance,
    ],
    programmes: [
      multiEntity,
      s4Migration,
      { title: "Fatoora integrations", text: "Connecting invoicing to ZATCA inside a wider ERP programme." },
    ],
  },
};
