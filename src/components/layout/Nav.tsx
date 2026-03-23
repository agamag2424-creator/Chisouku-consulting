"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlowButton } from "../ui/GlowButton";
import { cn } from "../../lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/ai-governance", label: "AI Governance" },
  { href: "/ai-solutions", label: "AI Solutions" },
  { href: "/ai-governance-course", label: "Course" },
  { href: "/insights", label: "Insights" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname?.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[var(--content-max-width)] items-center justify-between",
            "px-[var(--content-padding-x-mobile)] md:px-[var(--content-padding-x)]",
            "border-b border-[var(--color-border)]",
          )}
          style={{
            background: "rgba(5,10,18,0.75)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-[12px] font-extrabold tracking-[0.22em] text-[var(--color-text-primary)]">
              CHISOKULAB
            </span>
            <span className="text-[11px] font-normal text-[var(--color-text-muted)]">
              | The Control Room
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[12px] font-medium tracking-[0.04em]",
                    "transition-colors duration-200",
                    isActive(link.href)
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                  )}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </div>
            <GlowButton href="/contact" size="sm">
              BOOK A CALL
            </GlowButton>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="h-[2px] w-full rounded-full bg-[var(--color-text-primary)]" />
              <span className="h-[2px] w-full rounded-full bg-[var(--color-text-primary)]" />
              <span className="h-[2px] w-full rounded-full bg-[var(--color-text-primary)]" />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-[rgba(5,10,18,0.95)] text-[var(--color-text-primary)]"
          style={{ backdropFilter: "blur(24px)" }}
        >
          <div className="flex items-center justify-between px-6 pt-4">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-text-secondary)]">
              MENU
            </span>
            <button
              type="button"
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full bg-[var(--color-text-primary)]" />
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-[var(--color-text-primary)]" />
              </span>
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-[20px] font-semibold tracking-[0.08em]",
                  isActive(link.href)
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                )}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 px-6 pb-10">
            <GlowButton href="/contact" size="sm" className="w-full max-w-xs">
              BOOK A CALL
            </GlowButton>
          </div>
        </div>
      )}
    </>
  );
}

