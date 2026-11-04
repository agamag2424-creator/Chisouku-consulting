import type { ReactNode } from "react";
import { pack } from "../../content/products";
import { products } from "../../lib/payments/pricing";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { Sheet } from "../ui/Sheet";
import { CheckoutForm } from "./CheckoutForm";
import { Block, FaqList, LineList, Placeholder, QuestionsLine, TextList } from "./ProductParts";

// The Pack page body (brief 3b), shared by /readiness-pack and the upgrade page, which changes only the price card.

export function PackHero({ priceCard }: { priceCard?: ReactNode }) {
  return (
    <Section
      tone="ink"
      containerClassName="grid gap-10 min-[1100px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[1100px]:items-center min-[1100px]:gap-16"
    >
      <div>
        <p className="t-small font-semibold text-paper/75">{products.pack_249.name}</p>
        <h1 className="t-h1 mt-3 text-paper">{pack.headline}</h1>
        <Placeholder>{pack.headlinePlaceholder}</Placeholder>
        <p className="t-body mt-5 max-w-[60ch] text-paper/80">{pack.subheadline}</p>
      </div>
      {priceCard ?? (
        <Sheet className="flex flex-col gap-5 p-6 text-ink shadow-2xl min-[641px]:p-8">
          <div className="flex flex-col gap-1">
            <p className="t-data text-[40px] leading-none tracking-[-0.03em]">{pack.price}</p>
            <p className="t-small text-muted">{pack.priceCredit}</p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {pack.priceNotes.map((note) => (
              <li key={note} className="t-small text-ink">
                {note}
              </li>
            ))}
          </ul>
          <CheckoutForm product="pack" buttonLabel={pack.button} />
        </Sheet>
      )}
    </Section>
  );
}

export function PackBody() {
  return (
    <Section tone="paper">
      <div className="flex max-w-[780px] flex-col gap-14">
        <Block title={pack.includedTitle}>
          <p className="t-body text-ink">
            <strong className="font-semibold">{pack.workbooksLead}</strong> {pack.workbooksText}
          </p>
          <LineList items={pack.workbooks} numbered />
          <LineList items={pack.extras} />
        </Block>

        <div className="grid gap-10 min-[900px]:grid-cols-2">
          <Block title={pack.forTitle}>
            <TextList items={pack.for} />
          </Block>
          <Block title={pack.notForTitle}>
            <TextList items={pack.notFor} />
          </Block>
        </div>

        <Block title={pack.isTitle}>
          <p className="t-body text-ink">{pack.is}</p>
        </Block>

        <Block title={pack.creditTitle}>
          <LineList items={pack.credit} />
          <div>
            <Button href="/readiness-report" variant="text">
              {products.report_149.name}
            </Button>
          </div>
        </Block>

        <FaqList items={pack.faqs} />

        <Block title={pack.deliveryTitle}>
          <LineList items={pack.delivery} />
          <QuestionsLine />
        </Block>
      </div>
    </Section>
  );
}
