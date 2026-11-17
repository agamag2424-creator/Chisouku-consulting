// Unlisted market pages. Old URLs stay live. Copy is the PMO Health Audit, not a go-live or e-invoicing offer.

export type MarketKey = "uae" | "saudiArabia";

export type Market = {
  path: "/go-live-readiness-uae" | "/go-live-readiness-saudi-arabia";
  /** Breadcrumb and title. */
  name: string;
  country: { name: string; code: string };
  /** Short form used in running text ("in the UAE"). */
  inName: string;
  whyNow: string;
  programmes: readonly { title: string; text: string }[];
};

const programmes = [
  {
    title: "One programme",
    text: "A sponsor or PMO lead who wants an independent read of one programme before a full audit.",
  },
  {
    title: "A portfolio",
    text: "Governance, reporting, RAID, cadence, prioritisation and the PMO operating model.",
  },
  {
    title: "Remote by default",
    text: "On site by arrangement. The UK is first.",
  },
] as const;

export const markets: Record<MarketKey, Market> = {
  uae: {
    path: "/go-live-readiness-uae",
    name: "PMO health in the UAE",
    country: { name: "United Arab Emirates", code: "AE" },
    inName: "the UAE",
    whyNow: "The UK is first. The UAE is by arrangement, remote by default.",
    programmes,
  },
  saudiArabia: {
    path: "/go-live-readiness-saudi-arabia",
    name: "PMO health in Saudi Arabia",
    country: { name: "Saudi Arabia", code: "SA" },
    inName: "Saudi Arabia",
    whyNow: "The UK is first. Work in Saudi Arabia is remote, and by arrangement.",
    programmes,
  },
};
