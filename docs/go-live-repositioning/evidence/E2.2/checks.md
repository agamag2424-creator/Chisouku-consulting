# E2.2 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK (`/go-live-decision-review` prerendered static) |
| Unit tests | 11 / 11 |
| e2e (Playwright 1.56.1) | 17 / 17: 3 new for this page (1440 and 360: 200, H1, config prices, the five timeline steps, fee credit, no horizontal scroll; nav link and Service JSON-LD) plus E2.1 and homepage tests |
| axe (WCAG 2.1 A/AA) | 0 violations at 1440 and 390 |
| Prices, days, fee credit, continuous price | from `siteConfig` only |
| Lighthouse mobile (PRD 5.5 gate ≥ 90) | 95 / 96 / 96, **median 96**; a11y 100, best practices 96, SEO 100; LCP 2.7 s, TBT 75 ms, CLS 0 |

Screenshots: `decision-review--desktop-part*.png`, `decision-review--mobile-part*.png`.
