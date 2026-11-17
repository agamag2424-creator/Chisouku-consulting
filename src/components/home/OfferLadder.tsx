import { healthAudit, ladder } from "../../content/offer";
import { foundingActive } from "../../lib/siteConfig";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

/** The ladder: free self-check, then the £395 Health Check, then the Audit, with prices from siteConfig. */
export function OfferLadder({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-4 min-[960px]:grid-cols-3", className)}>
      {ladder.steps.map((step, index) => (
        <li
          key={step.key}
          className={cn(
            "panel relative flex flex-col p-6 min-[641px]:p-7",
            step.key === "healthCheck" && "border-ink shadow-[0_28px_80px_rgba(17,24,32,0.12)]",
          )}
          data-ladder-step={step.key}
        >
          <p className="label text-muted">
            Step {index + 1}
          </p>
          <h3 className="t-h3 mt-3 text-ink">{step.name}</h3>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-ink">
            {step.price}
            {step.key === "healthAudit" && <span className="text-[15px] font-semibold text-muted"> list</span>}
          </p>
          {step.key === "healthAudit" && foundingActive() && healthAudit.foundingPrice && (
            <p className="mt-1 text-[15px] font-semibold text-gold-ink">{healthAudit.foundingPrice} founding</p>
          )}
          <p className="mt-2 label text-gold-ink">{step.meta}</p>
          <p className="t-small mt-4 text-muted">{step.body}</p>
          <div className="mt-auto pt-6">
            <Button href={step.href} variant={step.key === "healthCheck" ? "primary" : "secondary"}>
              {step.key === "selfCheck" ? "Take the self-check" : `About the ${step.name.replace("PMO ", "")}`}
            </Button>
          </div>
        </li>
      ))}
    </ol>
  );
}
