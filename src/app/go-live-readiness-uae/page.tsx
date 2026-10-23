import { notFound } from "next/navigation";
import { MarketPage, marketMetadata } from "../../components/markets/MarketPage";
import { uaeMarket } from "../../content/markets";
import { routeRenders } from "../../lib/siteConfig";

// PRD 9.10 UAE market page (E7.1). Rendered per request so the ASP card switches on 31 October 2026 GST (brief A2).
export const dynamic = "force-dynamic";

export const metadata = routeRenders("/go-live-readiness-uae")
  ? marketMetadata(uaeMarket())
  : { robots: { index: false, follow: false } };

export default function UaeMarketPage() {
  const market = uaeMarket();
  if (!routeRenders(market.path)) notFound();
  return <MarketPage market={market} />;
}
