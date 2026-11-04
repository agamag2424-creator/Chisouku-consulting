import Link from "next/link";
import { formatUsd, products } from "../../lib/payments/pricing";

// Paid funnel brief section 6: a compact list of the self-serve options, in the homepage's existing style.
// The page shows it only once the paid products render (see routeLive in siteConfig).

const options = [
  { href: "/readiness", name: "Go-live readiness check", price: "Free" },
  { href: products.report_149.path, name: products.report_149.name, price: formatUsd(products.report_149.amountCents) },
  { href: products.pack_249.path, name: products.pack_249.name, price: formatUsd(products.pack_249.amountCents) },
] as const;

export function SelfServeOptions() {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <h3 className="t-h3 text-ink">Self-serve options</h3>
      <ul className="mt-5 grid gap-3 min-[900px]:grid-cols-3">
        {options.map((option) => (
          <li key={option.href}>
            <Link
              href={option.href}
              data-cta={`self-serve${option.href.replace(/\//g, "-")}`}
              className="flex h-full min-h-14 items-center justify-between gap-4 rounded-sheet border border-line bg-paper px-5 py-4 text-ink transition-colors hover:border-ink"
            >
              <span className="t-small font-semibold">{option.name}</span>
              <span className="t-data shrink-0 text-[14px] text-muted">{option.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
