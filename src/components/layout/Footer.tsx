import Link from "next/link";
import { BrandMark } from "../brand/BrandMark";
import { navLinks, siteConfig } from "../../lib/siteConfig";

const guideLinks = [
  { href: "/pmo-reporting-automation", label: "PMO reporting automation" },
  { href: "/diagnostic-vs-audit", label: "Diagnostic vs Audit" },
  { href: "/pmo-automation-singapore", label: "Singapore" },
  { href: "/pmo-automation-gcc", label: "GCC" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-ink/12 bg-[var(--color-charcoal)] text-paper/80">
      <div className="container grid gap-10 px-[var(--content-padding-x-mobile)] py-12 md:grid-cols-[1.1fr_1fr_1fr] md:px-[var(--content-padding-x)]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-9 w-9" inverted />
            <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-[-0.03em] text-paper">
              ChisokuLabs
            </span>
          </Link>
          <p className="text-[13px] font-bold text-teal-tint">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 max-w-[560px] text-sm leading-6">
            {siteConfig.subline}. For growth-stage SMEs in the GCC and Singapore —
            Free PMO Diagnostic, then PMO Automation Audit, then optional implementation.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="font-bold text-paper">Site</div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-paper">
              {link.label}
            </Link>
          ))}
          <Link href="/faq" className="block hover:text-paper">
            FAQ
          </Link>
          <Link href="/glossary" className="block hover:text-paper">
            Glossary
          </Link>
          <Link href="/contact" className="block hover:text-paper">
            Audit Fit Call
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-1">
          <div className="space-y-3">
            <div className="font-bold text-paper">Guides</div>
            {guideLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-paper">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            <div className="font-bold text-paper">Contact</div>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-paper">
              {siteConfig.email}
            </a>
            <a href="/llms.txt" className="block hover:text-paper">
              llms.txt
            </a>
            <Link href="/privacy" className="block hover:text-paper">
              Privacy
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-paper/65">
        © 2026 ChisokuLabs Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
