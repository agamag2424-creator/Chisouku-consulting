# E8 progress (handoff note)

Update this file after each story so a new session can resume.

| Story | Branch | PR | State |
|---|---|---|---|
| E8.0 Step 0 | site/E8.0-step0-audit | #88 | done |
| E8.1 Canonical answers and FAQ | site/E8.1-faq | #89 | done |
| E8.2 Glossary | site/E8.2-glossary | #90 | done |
| E8.3 Answer guides | site/E8.3-guides | | not started |
| E8.4 Structured data, llms.txt, metadata | site/E8.4-structured-data | see PRs | done (built before E8.3; branches from E8.2) |
| E8.5 Sitemap, robots, OG images | site/E8.5-sitemap-og | | not started |

Rules carried over: each story branches from the previous one; PRs stack; new wording goes into the PRD for approval; at the end of E8, post all Evidence Reports and stop.

E8.3 (guides) comes after E8.4/E8.5: it is the longest copy job, and the guide routes stay off (`routeLive` false) until it lands, so the sitemap and llms.txt leave them out.
