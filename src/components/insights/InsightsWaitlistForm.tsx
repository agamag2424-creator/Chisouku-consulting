import { siteConfig } from "@/lib/siteConfig";

export function InsightsWaitlistForm() {
  return (
    <div
      className="rounded-[10px] border border-[var(--color-border)] bg-[rgba(13,24,41,0.55)] p-4 text-left"
    >
      <p className="text-[13px] text-[var(--color-text-secondary)]">
        Join the ChisokuLab Substack to receive the launch briefings as soon as
        they go live.
      </p>
      <a
        href={siteConfig.substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex w-full justify-center rounded-[8px] bg-[var(--color-cyan)] px-[24px] py-[14px] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-void)] transition-shadow hover:shadow-[0_0_20px_var(--color-cyan-glow)] sm:w-auto"
      >
        Subscribe on Substack
      </a>
    </div>
  );
}

