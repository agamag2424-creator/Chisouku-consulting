# E8.1 — Canonical answers and FAQ: checks (local production build)

| Check | Result |
|---|---|
| Content | `src/lib/aeoContent.ts` rewritten: new canonical answers (what we do, offers, method, markets, policy) and the 13 PRD 9.9 items; prices, platforms and fee credit from config |
| Old content | moved to `src/lib/legacyAeo.ts` for the legacy pages and llms.txt until E8.2/E8.4 and E10 |
| Answer length | longest 55 words (limit 90); every first sentence answers the question |
| Page | `/faq`: ink hero, `Accordion` (native details/summary), related links, closing band |
| JSON-LD | `FAQPage` built from the same array; e2e asserts 13 `Question` entities, each with an `Answer`, names matching the page, ≤ 90 words |
| Old-offer terms | none in `/faq` HTML (PMO, Diagnostic, Automation Audit, pack cycle, reporting drag) |
| e2e | 34 / 34 · axe 0 at 1440 and 390 · no horizontal scroll |
