# E1.6 — checks (local production build, `next start` on :3100)

| Check | Result |
|---|---|
| Lint / typecheck / build | 0 problems / OK / OK |
| Unit tests | 10 / 10 |
| e2e (Playwright 1.56.1) | 11 / 11: hero 6 (reported → evidenced once, no second move, view switch and claim pick at 1440 and 390, reduced motion, no JS) and estimator 5 (adds "the slider moves the same value") |
| axe (WCAG 2.1 A/AA) on `/`, 1440 and 390 | 0 violations |
| Hex literals in `src/components`, `src/app` | none |
| Evidence colours | only on evidence status: R5 marks, RAG and score badges, the contradiction figure, note, bracket and the cross-check strip's contradiction link |
| Client JS | homepage chunk with hero + estimator 5,118 B gzipped; hero alone (as built for `/_ui`) 3,339 B, so the estimator is about 1.8 KB. Whole homepage +840 B against E1.5 |
| Lighthouse mobile on `/`, two sets of 3 runs | 85 / 92 / 93 (median 92) and 90 / 91 / 93 (median 91). a11y 100, best practices 96, SEO 100. LCP is the H1 (median about 3.0 s), CLS 0, TBT about 180–220 ms (E1.5: 80 ms) |

Screenshots: `home--desktop-part0..2.png`, `home--mobile-part0..3.png` (taken with reduced motion so the hero is settled in the evidenced view), `hero--desktop-evidenced.png` (normal motion, 3.5 s after load). The approved design source is in `design/`.
