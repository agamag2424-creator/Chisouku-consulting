// Market pages (PRD 9.10, E7). Every dated fact carries the issuer's own page as its source; each link was opened and
// checked against the fact in E7.0 (evidence/E7.0-sources.md). Wording approved by the founder (IN-10, 17 Oct 2026).
// UAE e-invoicing cards are dated (brief A2): call uaeMarket(now) when rendering so the ASP card follows the clock.

import {
  aspAppointmentCard,
  uaeEInvoicingSource,
  uaeFinanceAnnouncement,
} from "../lib/uaeTimeline";

export type MarketKey = "uae" | "saudiArabia";

export type MarketSource = { label: string; url: string };

export type MarketFact = {
  /** Written in full, as the source states it. */
  date: string;
  title: string;
  text: string;
  source: MarketSource;
  /** Second citation, shown after the primary source. */
  also?: MarketSource;
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

const uaeProgrammes = [
  multiEntity,
  { title: "Free-zone and mainland entities", text: "Entities under different rules, on one platform and one go-live plan." },
  s4Migration,
] as const;

/** UAE market page. Facts follow `now` so the ASP card switches on 31 October 2026 GST. */
export function uaeMarket(now: Date = new Date()): Market {
  const source = uaeEInvoicingSource;
  const also = uaeFinanceAnnouncement;
  return {
    path: "/go-live-readiness-uae",
    name: "Go-live readiness in the UAE",
    country: { name: "United Arab Emirates", code: "AE" },
    inName: "the UAE",
    whyNow: "Fixed dates are adding go-lives to UAE programmes.",
    facts: [
      { ...aspAppointmentCard(now), source, also },
      {
        date: "31 March 2027 and 1 July 2027",
        title: "Smaller businesses follow",
        text: "Businesses with revenue under AED 50 million must appoint an ASP by 31 March 2027 and go live by 1 July 2027.",
        source,
        also,
      },
      {
        date: "1 January 2027",
        title: "UAE e-invoicing becomes mandatory",
        text: "For businesses with revenue of AED 50 million or more. For many programmes, that adds an ERP integration go-live.",
        source,
        also,
      },
      sapMaintenance,
    ],
    programmes: uaeProgrammes,
  };
}

export const markets: Record<MarketKey, Market> = {
  // Name, path and whyNow do not depend on the clock. Pages that render facts call uaeMarket(now).
  get uae() {
    return uaeMarket();
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
