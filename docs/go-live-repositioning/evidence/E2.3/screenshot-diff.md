# E2.3 — screenshot diff (before and after the OfferLayout refactor)

Full-page screenshots of both offer pages from a local production build, before (E2.2 head `c552736`) and after this change, compared pixel by pixel (Pillow `ImageChops.difference`).

| Page | Width | Size | Result |
|---|---|---|---|
| `/readiness-evidence-check` | 1440 | 1440 × 4036 | identical (0 px differ) |
| `/readiness-evidence-check` | 390 | 390 × 5966 | identical (0 px differ) |
| `/go-live-decision-review` | 1440 | 1440 × 4709 | identical (0 px differ) |
| `/go-live-decision-review` | 390 | 390 × 7497 | identical (0 px differ) |

Page files: Evidence Check 124 → 58 lines, Decision Review 146 → 65 lines; the structure now lives once in `src/components/offers/OfferLayout.tsx`.
