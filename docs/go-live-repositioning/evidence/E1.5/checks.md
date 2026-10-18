# E1.5 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Unit tests (`npm run test:unit`) | 10 / 10 pass (4 new for `slipEstimate`: defaults → USD 120,000 / week, USD 480,000 for 4 weeks, 0.2 days at USD 5,000; zero people hides the comparison; parallel run adds × 12 ÷ 52; bad input → 0) |
| e2e (`scripts/e2e`, Playwright 1.56.1) | 10 / 10 pass: 4 new estimator tests (no-JS example result, recalculation + polite announcement, parallel run + zero people, 360px no horizontal scroll) and the 6 hero tests |
| axe (WCAG 2.1 A/AA) on `/`, 1440 and 390 | 0 violations |
| Client JS impact | +1,598 B gzipped on `/` (195,216 → 196,814 B, sum of chunks referenced by the prerendered page); limit 3 KB |
| Lighthouse mobile on `/`, 3 runs | Performance 95 / 96 / 98, **median 96**; a11y 100, best practices 96, SEO 100; median LCP 2.8 s, TBT 80 ms, CLS 0 |
| Literals | no hex, no `ev-*` evidence colours, no "drag" in the new files; prices and defaults read from `siteConfig` |
| Lint / typecheck / build | 0 problems / OK / OK |

Screenshots: `estimator--{desktop,mobile-360}--{example,nojs,typed}.png` (typed = 25 people, 8 weeks, USD 40,000 a month parallel run; the 2px teal focus ring shows on the last field).
