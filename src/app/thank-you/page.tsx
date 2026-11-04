import type { Metadata } from "next";
import { TestModeBanner } from "../../components/products/ProductParts";
import { ThankYouStatus } from "../../components/products/ThankYouStatus";
import { Section } from "../../components/ui/Section";
import { isUuid } from "../../lib/payments/orders";

// After checkout (brief section 5). Not indexed, not in the sitemap, and a page view is never counted as a purchase:
// purchases are recorded only by the Razorpay webhook.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Thank you | ChisokuLabs" },
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ order?: string | string[] }> }) {
  const { order } = await searchParams;
  return (
    <>
      <TestModeBanner />
      <Section tone="page">
        <div className="max-w-[720px]">
          {isUuid(order) ? (
            <ThankYouStatus orderId={order} />
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="t-h2 text-ink">We couldn&apos;t find that order</h1>
              <p className="t-body text-ink">Check the link in your confirmation email, or email hello@chisokulabs.com.</p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
