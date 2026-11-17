import { notFound } from "next/navigation";
import { MarketPage, marketMetadata } from "../../components/markets/MarketPage";
import { markets } from "../../content/markets";
import { routeRenders } from "../../lib/siteConfig";

// PRD 9.10 Saudi Arabia market page (E7.2).
const market = markets.saudiArabia;

// Indexed and listed (September port PRD, Story 6.1): rewritten to the same ladder as the UK pages.
export const metadata = routeRenders(market.path) ? marketMetadata(market) : { robots: { index: false, follow: false } };

export default function SaudiArabiaMarketPage() {
  if (!routeRenders(market.path)) notFound();
  return <MarketPage market={market} />;
}
