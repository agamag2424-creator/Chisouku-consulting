# E8.2 — Glossary: checks (local production build)

| Check | Result |
|---|---|
| Terms | 16 (PRD 10 list), each 1–3 sentences, in `glossaryTerms` (`src/lib/aeoContent.ts`) |
| Anchors | every term has `id` = slug on its `<dt>`; e2e opens each `DefinedTerm.url` hash and finds the term; `/glossary#rollback-point` scrolls into view |
| Navigation | term chips in the hero link to each anchor |
| JSON-LD | `DefinedTermSet` "ChisokuLabs go-live readiness glossary" with 16 `DefinedTerm` entries from the same array |
| Old-offer terms | none in `/glossary` HTML |
| e2e | 35 / 35 · axe 0 at 1440 and 390 · no horizontal scroll |
