// UAE and Saudi Arabia pages (September port PRD, Story 6.1): the same ladder and the same GBP prices as the UK pages.

export type MarketKey = "uae" | "saudiArabia";

export type Market = {
  path: "/pmo-uae" | "/pmo-saudi-arabia";
  /** Breadcrumb and title. */
  name: string;
  country: { name: string; code: string };
  /** Short form used in running text ("in the UAE"). */
  inName: string;
  /** How work is delivered there. */
  delivery: string;
};

export const markets: Record<MarketKey, Market> = {
  uae: {
    path: "/pmo-uae",
    name: "PMO Health Check in the UAE",
    country: { name: "United Arab Emirates", code: "AE" },
    inName: "the UAE",
    delivery: "Remote by default, on site in the UAE where agreed.",
  },
  saudiArabia: {
    path: "/pmo-saudi-arabia",
    name: "PMO Health Check in Saudi Arabia",
    country: { name: "Saudi Arabia", code: "SA" },
    inName: "Saudi Arabia",
    delivery: "Remote by default, on site in Saudi Arabia where agreed.",
  },
};
