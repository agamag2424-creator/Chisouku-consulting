# E1.3 Lighthouse (mobile, Lighthouse 12.8.2, local next start, 17 Oct 2026)

Route: /  ·  LCP element: the hero <h1>

| Perf | A11y | BP | SEO | FCP ms | LCP ms | TBT ms | CLS |
|---|---|---|---|---|---|---|---|
| 97 | 100 | 96 | 100 | 800 | 2655 | 64 | 0.000 |
| 96 | 100 | 96 | 100 | 762 | 2633 | 103 | 0.000 |
| 97 | 100 | 96 | 100 | 764 | 2632 | 53 | 0.000 |

**Median performance: 97** (baseline before E1: 57; TBT 2,610 ms → ~64 ms).

optimizeCss A/B (3-run medians): on 94 / TBT 164 ms; off 96 / TBT 69 ms → kept **off**.
content-visibility:auto on below-fold sections: no measurable gain (96 with, 96–97 without) and it blanks full-page captures → not used.
