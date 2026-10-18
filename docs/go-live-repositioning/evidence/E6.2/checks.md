# E6.2 — checks (local production builds)

| Check | Result |
|---|---|
| Component | `src/components/trust/PrincipalBlock.tsx`: the PRD 8.3 paragraph (IN-3 approved), signature line, experience chips; no image, name or links |
| Used on | `/` (replaces the inline section 9), `/readiness-evidence-check`, `/go-live-decision-review` (via `OfferLayout`, before the closing band) |
| Homepage unchanged | full-page screenshots before and after: pixel-identical at 1440 and 390 |
| Flag off | built with `principalBlock: false`: "Principal-led" and "11+ years" appear 0 times on `/` and both offer pages; reverted to `true` |
| e2e / axe | 28 / 28; 0 violations on both offer pages (1440, 390) |

Screenshots: `principal--readiness-evidence-check--{desktop,mobile}.png`, `principal--go-live-decision-review--{desktop,mobile}.png`.
