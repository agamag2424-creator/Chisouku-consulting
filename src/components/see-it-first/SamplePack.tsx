"use client";

import * as React from "react";
import Image from "next/image";
import { packPages, sampleLabel } from "../../content/samplePack";
import { siteConfig } from "../../lib/siteConfig";
import { track } from "../../lib/track";

/** Both pack pages inline, the PDF download, and the two analytics events (PRD 11). No form. */
export function SamplePack() {
  const pagesRef = React.useRef<HTMLUListElement>(null);

  // sample_pack_view: once, when the pages first enter the viewport.
  React.useEffect(() => {
    const pages = pagesRef.current;
    if (!pages || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("sample_pack_view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(pages);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-6">
      <ul ref={pagesRef} className="grid gap-6 min-[1100px]:grid-cols-2">
        {packPages.map((page, index) => (
          <li key={page.src}>
            <a
              href={page.src}
              className="block overflow-hidden rounded-sheet border border-line bg-paper shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={page.src}
                width={page.width}
                height={page.height}
                alt={page.alt}
                sizes="(min-width: 1100px) 600px, 100vw"
                className="h-auto w-full"
              />
              <span className="sr-only">{`Open page ${index + 1} full size`}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
        <p className="text-[13px] text-muted">{sampleLabel}</p>
        <a
          href={siteConfig.samplePackPath}
          download
          data-cta="sample-pack-download"
          data-cta-variant="primary"
          onClick={() => track("sample_pack_download")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-ink bg-ink px-6 text-[17px] font-semibold text-paper transition-colors hover:border-teal hover:bg-teal"
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
            <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12" />
          </svg>
          Download the PDF
        </a>
      </div>
    </div>
  );
}
