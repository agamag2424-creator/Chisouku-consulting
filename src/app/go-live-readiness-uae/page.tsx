import { notFound } from "next/navigation";
import { MarketPage, marketMetadata } from "../../components/markets/MarketPage";
import { markets } from "../../content/markets";
import { routeRenders } from "../../lib/siteConfig";

// PRD 9.10 UAE market page (E7.1).
const market = markets.uae;

export const metadata = routeRenders(market.path) ? marketMetadata(market) : { robots: { index: false, follow: false } };

export default function UaeMarketPage() {
  if (!routeRenders(market.path)) notFound();
  return <MarketPage market={market} />;
}
