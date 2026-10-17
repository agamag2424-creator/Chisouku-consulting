# E2.1 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK (`/readiness-evidence-check` prerendered static) |
| Unit tests | 11 / 11 |
| e2e (Playwright 1.56.1) | 14 / 14: 3 new for this page (1440 and 360: 200, H1, config prices, the three steps, fee credit, no horizontal scroll; nav link and Service JSON-LD) plus the 11 homepage tests |
| axe (WCAG 2.1 A/AA) | 0 violations on `/readiness-evidence-check` and `/`, at 1440 and 390 |
| Prices, days, fee credit | from `siteConfig` only (`OfferHero`, `PriceBlock`, `DayStrip`, `offerServiceJsonLd`) |
| Lighthouse mobile, `/readiness-evidence-check` | set 1: 80 / 86 / 91 (container had just restarted, TBT 233–557 ms); set 2: 95 / 96 / 96, median 96 (TBT 92 ms). a11y 100, best practices 96, SEO 100, CLS 0 |

Screenshots: `evidence-check--desktop-part0..1.png`, `evidence-check--mobile-part0..1.png`.
