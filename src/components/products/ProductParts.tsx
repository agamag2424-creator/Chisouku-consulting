import Link from "next/link";
import type { ReactNode } from "react";
import type { Faq, Line } from "../../content/products";
import { productFooterLine } from "../../content/products";
import { razorpayMode } from "../../lib/payments/razorpay";
import { siteConfig } from "../../lib/siteConfig";
import { Accordion } from "../ui/Accordion";
import { Section } from "../ui/Section";

// Building blocks for the self-serve product pages (brief section 3). Copy arrives verbatim from content/products.ts.

/** An open owner decision, shown visibly so nobody mistakes it for final copy (brief section 1). */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="mt-3 block rounded-control border-2 border-dashed border-ev-part bg-ev-part-tint px-3 py-2 text-[14px] font-semibold text-ink">
      [PLACEHOLDER: {children}]
    </span>
  );
}

/** Shown on product, upgrade and thank-you pages while Razorpay is in test mode. */
export function TestModeBanner() {
  if (razorpayMode(process.env) === "live") return null;
  return (
    <div role="note" className="bg-ev-part-tint px-[var(--content-padding-x-mobile)] py-2.5 text-center text-[14px] font-semibold text-ink">
      TEST MODE: payments use Razorpay test cards. No real money is taken.
    </div>
  );
}

export function LineList({ items, numbered = false }: { items: readonly Line[]; numbered?: boolean }) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={item.text} className="t-body flex gap-3 text-ink">
          {numbered ? (
            <span className="t-data flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] text-paper">
              {index + 1}
            </span>
          ) : (
            <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-teal" />
          )}
          <span>
            {item.lead && <strong className="font-semibold">{item.lead}</strong>}
            {item.lead ? " " : ""}
            <Emphasis text={item.text} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

/** Renders `**words**` in bold; everything else as plain text. */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function TextList({ items }: { items: readonly string[] }) {
  return <LineList items={items.map((text) => ({ text }))} />;
}

/** A titled block inside the page body. */
export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="t-h2 text-ink">{title}</h2>
      {children}
    </section>
  );
}

export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Block title="FAQs">
      <Accordion items={items.map((item) => ({ id: `faq-${item.id}`, summary: item.question, content: <p className="t-body">{item.answer}</p> }))} />
    </Block>
  );
}

const policyLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund and Cancellation Policy" },
  { href: "/shipping-policy", label: "Shipping and Delivery Policy" },
  { href: "/privacy", label: "Privacy" },
] as const;

/** "Questions: hello@chisokulabs.com · Terms · Refund … · Privacy" (brief 3a, 3b). */
export function QuestionsLine() {
  return (
    <p className="t-small flex flex-wrap gap-x-4 gap-y-2 text-ink">
      <span>
        Questions:{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal underline underline-offset-4">
          {siteConfig.email}
        </a>
      </span>
      {policyLinks.map((link) => (
        <Link key={link.href} href={link.href} className="font-semibold text-teal underline underline-offset-4 hover:text-ink">
          {link.label}
        </Link>
      ))}
    </p>
  );
}

/** Shared footer line on both product pages (brief 3c). */
export function ProductFooterLine() {
  return (
    <Section tone="page" className="py-10 min-[641px]:py-12">
      <p className="t-small max-w-[80ch] text-muted">{productFooterLine}</p>
    </Section>
  );
}
