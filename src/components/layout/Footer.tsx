import Link from "next/link";
import { BrandMark } from "../brand/BrandMark";
import { navLinks, siteConfig } from "../../lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(17,24,32,0.12)] bg-[var(--color-charcoal)] text-[#c7ced3]">
      <div className="container grid gap-10 px-[var(--content-padding-x-mobile)] py-12 md:grid-cols-[1.2fr_1fr] md:px-[var(--content-padding-x)]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3" aria-label="ChisokuLabs home">
            <BrandMark className="h-10 w-10" inverted />
            <span className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.02em] text-[#fffdf8]">
              ChisokuLabs
            </span>
          </Link>
          <p className="max-w-[560px] text-sm leading-6">
            PMO Automation Audit for growth-stage SMEs in the GCC and Singapore
            facing reporting, governance, and delivery bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="font-bold text-[#fffdf8]">Site</div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-[#fffdf8]">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="block hover:text-[#fffdf8]">
              Audit Fit Call
            </Link>
          </div>
          <div className="space-y-3">
            <div className="font-bold text-[#fffdf8]">Contact</div>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-[#fffdf8]">
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#fffdf8]"
            >
              LinkedIn
            </a>
            <Link href="/privacy" className="block hover:text-[#fffdf8]">
              Privacy
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-[#aab3ba]">
        © 2026 ChisokuLabs Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
