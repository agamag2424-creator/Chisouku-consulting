import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--color-border)] text-[var(--color-text-muted)]">
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-center gap-4 px-[40px] py-[32px] text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          © 2026 ChisokuLab Pvt Ltd. All rights reserved.
        </div>
        <div className="flex flex-col items-center gap-1 sm:flex-1 sm:flex-row sm:justify-center sm:gap-2">
          <a
            href="mailto:agam@chisokulabs.com"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            agam@chisokulabs.com
          </a>
          <span className="hidden text-[var(--color-text-muted)] sm:inline">
            ·
          </span>
          <a
            href="https://www.linkedin.com/in/agamag24"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
          <Link
            href="/ai-governance"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            AI Governance
          </Link>
          <Link
            href="/ai-solutions"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            AI Solutions
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            Privacy &amp; Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

