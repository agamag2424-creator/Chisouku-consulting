// The /method section "How we use AI, safely" and the FAQ item "Do you use AI on our data?"
// must be the same sentence, from one exported constant. Run: npm run test:unit
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const expected =
  "Yes, to extract claims and cross-check evidence, under the policy. AI processing runs only through providers contracted for zero data retention, and your data is never used to train AI models. Every finding is reviewed and signed by the principal; AI does not make the go-live recommendation.";

const aeo = readFileSync(new URL("../src/lib/aeoContent.ts", import.meta.url), "utf8");
const method = readFileSync(new URL("../src/app/method/page.tsx", import.meta.url), "utf8");

function exportedString(source, name) {
  const marker = `export const ${name} =`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${name} is exported`);
  const open = source.indexOf('"', start);
  const close = source.indexOf('"', open + 1);
  assert.ok(open !== -1 && close !== -1, `${name} is a string literal`);
  return source.slice(open + 1, close);
}

test("the FAQ and /method share one verbatim AI answer", () => {
  const answer = exportedString(aeo, "aiOnOurDataAnswer");
  assert.equal(answer, expected);
  assert.match(aeo, /answer: aiOnOurDataAnswer,/);
  assert.equal(aeo.split(answer).length - 1, 1, "the sentence is written once, in the shared constant");
  assert.match(method, /import \{ aiOnOurDataAnswer \} from "\.\.\/\.\.\/lib\/aeoContent"/);
  assert.match(method, /How we use AI, safely/);
  assert.match(method, /\{aiOnOurDataAnswer\}/);
  assert.equal(method.includes(answer), false, "/method renders the constant rather than a second copy");
});
