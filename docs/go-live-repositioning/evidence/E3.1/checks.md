# E3.1 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK (`/method` prerendered static) |
| Unit tests | 11 / 11 |
| e2e (Playwright 1.56.1) | 19 / 19, three runs in a row: method 2 new (1440 and 360: H1, five elements with "What failure looks like", register, 4 contradiction types, 3 conditions, none of Assess / Architect / Activate / Accelerate / AI Impact Model / PMO, no horizontal scroll) plus all earlier tests |
| Hero after the data move | hero tests 6 / 6 (claims now read from `src/content/samplePack.ts`) |
| axe (WCAG 2.1 A/AA) | 0 violations on `/method` and `/`, at 1440 and 390 |
| Lighthouse mobile `/method` | 86 / 91 / 92, median 91; a11y 100, best practices 96, SEO 100, CLS 0 |
| Test fix | the estimator e2e now waits for hydration before typing (one run had filled the slider before React attached; the value reset to the server-rendered 4) |

Screenshots: `method--desktop-part*.png`, `method--mobile-part*.png`.
