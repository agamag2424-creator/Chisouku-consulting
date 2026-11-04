// Paid funnel: signatures, prices, upgrade eligibility, download links, webhook idempotency, Azure SAS links.
// Run: npm run test:unit. An in-memory fake stands in for Postgres; it understands only the SQL in lib/payments/store.ts.
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { registerHooks } from "node:module";
import { describe, test } from "node:test";

registerHooks({
  resolve(specifier, context, nextResolve) {
    const fromSource = (context.parentURL ?? "").includes("/src/");
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    if (fromSource && relative && !/\.[cm]?[jt]sx?$/.test(specifier)) return nextResolve(`${specifier}.ts`, context);
    return nextResolve(specifier, context);
  },
});

const { products, formatUsd, REPORT_CREDIT_DAYS } = await import("../src/lib/payments/pricing.ts");
const razorpay = await import("../src/lib/payments/razorpay.ts");
const orders = await import("../src/lib/payments/orders.ts");
const { handleRazorpayEvent } = await import("../src/lib/payments/webhook.ts");
const { handleCreateOrder } = await import("../src/lib/server/routes/checkout.ts");
const { handleDownload, handleWebhook, isAdminKey } = await import("../src/lib/server/routes/orders.ts");
const { blobConfig, signedBlobUrl } = await import("../src/lib/server/blob.ts");

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date("2026-11-04T10:00:00Z");

/** Minimal in-memory stand-in for the three tables, keyed on the exact statements store.ts sends. */
function fakeDb() {
  const tables = { orders: [], events: [] };
  let next = 1;
  const id = () => `00000000-0000-4000-8000-${String(next++).padStart(12, "0")}`;
  const clean = (sql) => sql.replace(/\s+/g, " ").trim();
  const db = {
    tables,
    async query(text, params = []) {
      const sql = clean(text);
      const rows = (list) => ({ rows: list, rowCount: list.length });
      const find = (key, value) => tables.orders.filter((order) => order[key] === value);
      if (sql.startsWith("insert into orders")) {
        const columns = sql.match(/\(([^)]+)\) values/)[1].split(", ");
        const order = {
          id: id(), payment_id: null, status: "created", created_at: NOW.toISOString(), paid_at: null, delivered_at: null,
          downloaded_at: null, download_token: null, link_expires_at: null,
        };
        columns.forEach((column, index) => (order[column] = params[index]));
        tables.orders.push(order);
        return rows([{ ...order }]);
      }
      if (sql === "select * from orders where id = $1") return rows(find("id", params[0]));
      if (sql === "select * from orders where razorpay_order_id = $1") return rows(find("razorpay_order_id", params[0]));
      if (sql === "select * from orders where payment_id = $1") return rows(find("payment_id", params[0]));
      if (sql === "select * from orders where download_token = $1") return rows(find("download_token", params[0]));
      if (sql.startsWith("update orders set status = $3, payment_id = $2, paid_at = $4")) {
        const hit = tables.orders.filter((o) => o.razorpay_order_id === params[0] && o.status === "created" && o.payment_id === null);
        hit.forEach((o) => Object.assign(o, { status: params[2], payment_id: params[1], paid_at: params[3] }));
        return rows(hit.map((o) => ({ ...o })));
      }
      if (sql.startsWith("update orders set download_token = $2")) {
        const hit = tables.orders.filter((o) => o.id === params[0] && o.download_token === null && ["paid", "needs_review"].includes(o.status));
        hit.forEach((o) => Object.assign(o, { download_token: params[1], link_expires_at: params[2], delivered_at: params[3], status: o.status === "paid" ? "delivered" : o.status }));
        return rows(hit.map((o) => ({ ...o })));
      }
      if (sql.startsWith("update orders set status = 'refunded'")) {
        const hit = tables.orders.filter((o) => o.payment_id === params[0] && o.status !== "refunded");
        hit.forEach((o) => (o.status = "refunded"));
        return rows(hit.map((o) => ({ ...o })));
      }
      if (sql.startsWith("update orders set downloaded_at = $2")) {
        const hit = tables.orders.filter((o) => o.id === params[0] && o.downloaded_at === null);
        hit.forEach((o) => (o.downloaded_at = params[1]));
        return { rows: [], rowCount: hit.length };
      }
      if (sql.startsWith("insert into analytics_events")) {
        const [name, orderId, props] = params;
        if (name === "purchase" && tables.events.some((e) => e.name === "purchase" && e.order_id === orderId)) return rows([]);
        tables.events.push({ name, order_id: orderId, props: JSON.parse(props) });
        return { rows: [], rowCount: 1 };
      }
      throw new Error(`fake db: unexpected SQL: ${sql}`);
    },
  };
  return db;
}

function seedOrder(db, fields) {
  const order = {
    id: `11111111-1111-4111-8111-${String(db.tables.orders.length + 1).padStart(12, "0")}`,
    razorpay_order_id: `order_${db.tables.orders.length + 1}`, payment_id: null, product: "report_149", amount_cents: 14900,
    currency: "USD", email: "buyer@example.com", assessment_id: null, readiness_band: null, utm_source: null, utm_medium: null,
    utm_campaign: null, utm_content: null, status: "created", created_at: NOW.toISOString(), paid_at: null, delivered_at: null,
    downloaded_at: null, download_token: null, link_expires_at: null, credit_applied: false, source_report_order_id: null, ...fields,
  };
  db.tables.orders.push(order);
  return order;
}

const captured = (orderId, paymentId, amount = 14900) => ({
  event: "payment.captured",
  payload: { payment: { entity: { id: paymentId, order_id: orderId, amount, currency: "USD" } } },
});

function deps(db, sent = []) {
  return { db, now: NOW, siteUrl: "https://www.chisokulabs.com", sendEmail: async (email) => (sent.push(email), true) };
}

describe("price config", () => {
  test("three products in US cents, from one table", () => {
    assert.equal(products.report_149.amountCents, 14900);
    assert.equal(products.pack_249.amountCents, 24900);
    assert.equal(products.pack_upgrade_100.amountCents, 10000);
    assert.equal(formatUsd(14900), "USD 149");
    assert.equal(REPORT_CREDIT_DAYS, 60);
  });

  test("create-order ignores an amount sent by the browser", async () => {
    const db = fakeDb();
    let sentAmount = null;
    const request = new Request("https://x/api/checkout/create-order", {
      method: "POST",
      body: JSON.stringify({ product: "report", email: "Buyer@Example.com", amount: 1, utm_source: "linkedin", band: "partly_ready" }),
    });
    const response = await handleCreateOrder(request, {
      db,
      razorpay: { keyId: "rzp_test_abc", keySecret: "secret", webhookSecret: null, mode: "test" },
      now: NOW,
      createRazorpayOrder: async (_config, order) => ((sentAmount = order.amount), { id: "order_new", amount: order.amount, currency: "USD", status: "created" }),
    });
    assert.equal(response.status, 200);
    assert.equal(sentAmount, 14900);
    const body = await response.json();
    assert.equal(body.amount, 14900);
    assert.equal(db.tables.orders[0].email, "buyer@example.com");
    assert.equal(db.tables.orders[0].readiness_band, "partly_ready");
    assert.equal(db.tables.orders[0].utm_source, "linkedin");
  });
});

describe("signatures", () => {
  test("checkout callback: HMAC of order_id|payment_id with the key secret", () => {
    const signature = createHmac("sha256", "key_secret").update("order_1|pay_1").digest("hex");
    assert.equal(razorpay.verifyPaymentSignature("order_1", "pay_1", signature, "key_secret"), true);
    assert.equal(razorpay.verifyPaymentSignature("order_1", "pay_2", signature, "key_secret"), false);
    assert.equal(razorpay.verifyPaymentSignature("order_1", "pay_1", signature, "other_secret"), false);
    assert.equal(razorpay.verifyPaymentSignature("order_1", "pay_1", "zz", "key_secret"), false);
    assert.equal(razorpay.verifyPaymentSignature("order_1", "pay_1", undefined, "key_secret"), false);
  });

  test("webhook: HMAC of the raw body with the webhook secret; no secret means reject", () => {
    const body = '{"event":"payment.captured"}';
    const signature = createHmac("sha256", "hook_secret").update(body).digest("hex");
    assert.equal(razorpay.verifyWebhookSignature(body, signature, "hook_secret"), true);
    assert.equal(razorpay.verifyWebhookSignature(`${body} `, signature, "hook_secret"), false);
    assert.equal(razorpay.verifyWebhookSignature(body, signature, null), false);
  });

  test("webhook route: a bad signature is a 400 and touches nothing", async () => {
    const db = fakeDb();
    const request = new Request("https://x/api/webhooks/razorpay", {
      method: "POST",
      headers: { "x-razorpay-signature": "00" },
      body: JSON.stringify(captured("order_1", "pay_1")),
    });
    const response = await handleWebhook(request, { ...deps(db), webhookSecret: "hook_secret" });
    assert.equal(response.status, 400);
    assert.equal(db.tables.events.length, 0);
  });

  test("keys must match the mode: test keys only in test mode, live keys only in live mode", () => {
    assert.ok(razorpay.razorpayConfig({ RAZORPAY_KEY_ID: "rzp_test_a", RAZORPAY_KEY_SECRET: "s" }));
    assert.equal(razorpay.razorpayConfig({ RAZORPAY_KEY_ID: "rzp_live_a", RAZORPAY_KEY_SECRET: "s" }), null);
    assert.ok(razorpay.razorpayConfig({ RAZORPAY_MODE: "live", RAZORPAY_KEY_ID: "rzp_live_a", RAZORPAY_KEY_SECRET: "s" }));
    assert.equal(razorpay.razorpayConfig({ RAZORPAY_MODE: "live", RAZORPAY_KEY_ID: "rzp_test_a", RAZORPAY_KEY_SECRET: "s" }), null);
  });
});

describe("upgrade eligibility", () => {
  const delivered = (days) => ({ product: "report_149", status: "delivered", delivered_at: new Date(NOW.getTime() - days * DAY).toISOString() });

  test("a delivered report within 60 days qualifies; day 60 counts, day 61 does not", () => {
    assert.deepEqual(orders.upgradeEligibility(delivered(10), NOW), { eligible: true, daysSinceReport: 10 });
    assert.deepEqual(orders.upgradeEligibility(delivered(60), NOW), { eligible: true, daysSinceReport: 60 });
    assert.deepEqual(orders.upgradeEligibility(delivered(61), NOW), { eligible: false, reason: "expired" });
  });

  test("refunded, undelivered, missing or non-report orders do not qualify", () => {
    assert.equal(orders.upgradeEligibility({ ...delivered(5), status: "refunded" }, NOW).reason, "refunded");
    assert.equal(orders.upgradeEligibility({ product: "report_149", status: "paid", delivered_at: null }, NOW).reason, "not_delivered");
    assert.equal(orders.upgradeEligibility({ ...delivered(5), product: "pack_249" }, NOW).reason, "not_report");
    assert.equal(orders.upgradeEligibility(null, NOW).reason, "not_found");
  });
});

describe("download links", () => {
  test("tokens are 43 URL-safe characters and unique", () => {
    const a = orders.newDownloadToken();
    assert.ok(orders.isDownloadToken(a));
    assert.notEqual(a, orders.newDownloadToken());
  });

  test("a link works for 30 days, then expires; a refund blocks it at once", () => {
    const order = { status: "delivered", download_token: orders.newDownloadToken(), link_expires_at: orders.downloadExpiry(NOW) };
    assert.equal(orders.downloadLinkState(order, NOW), "ok");
    assert.equal(orders.downloadLinkState(order, new Date(NOW.getTime() + 29 * DAY)), "ok");
    assert.equal(orders.downloadLinkState(order, new Date(NOW.getTime() + 30 * DAY)), "expired");
    assert.equal(orders.downloadLinkState({ ...order, status: "refunded" }, NOW), "refunded");
    assert.equal(orders.downloadLinkState({ ...order, download_token: null }, NOW), "not_ready");
  });

  test("the download route logs the first download only, and sends expired links to the help page", async () => {
    const db = fakeDb();
    const token = orders.newDownloadToken();
    seedOrder(db, { product: "pack_249", status: "delivered", payment_id: "pay_9", download_token: token, link_expires_at: orders.downloadExpiry(NOW) });
    const blob = { account: "chisokulabs", key: Buffer.from("k").toString("base64"), container: "pack", blobPath: "pack.zip" };
    const routeDeps = { db, blob, now: NOW, signUrl: () => "https://chisokulabs.blob.core.windows.net/pack/pack.zip?sig=x" };
    const first = await handleDownload(token, routeDeps);
    assert.equal(first.status, 302);
    assert.match(first.headers.get("location"), /^https:\/\/chisokulabs\.blob\.core\.windows\.net\//);
    await handleDownload(token, routeDeps);
    assert.equal(db.tables.events.filter((e) => e.name === "pack_downloaded").length, 1);
    assert.ok(db.tables.orders[0].downloaded_at);
    const late = await handleDownload(token, { ...routeDeps, now: new Date(NOW.getTime() + 31 * DAY) });
    assert.equal(late.headers.get("location"), "/download/unavailable?reason=expired");
  });
});

describe("webhook", () => {
  test("payment.captured is idempotent: a replay changes nothing and sends nothing", async () => {
    const db = fakeDb();
    seedOrder(db, { razorpay_order_id: "order_r" });
    const sent = [];
    assert.equal(await handleRazorpayEvent(captured("order_r", "pay_r"), deps(db, sent)), "paid");
    assert.equal(await handleRazorpayEvent(captured("order_r", "pay_r"), deps(db, sent)), "duplicate");
    assert.equal(db.tables.orders[0].status, "paid");
    assert.equal(db.tables.events.filter((e) => e.name === "purchase").length, 1);
    // Buyer confirmation and the 48-hour ops alert, once each.
    assert.equal(sent.length, 2);
    assert.match(sent[1].subject, /^New report order .+, due by .+ IST$/);
  });

  test("a Pack payment gets a 30-day download link, emailed once", async () => {
    const db = fakeDb();
    seedOrder(db, { razorpay_order_id: "order_p", product: "pack_249", amount_cents: 24900 });
    const sent = [];
    await handleRazorpayEvent(captured("order_p", "pay_p", 24900), deps(db, sent));
    await handleRazorpayEvent(captured("order_p", "pay_p", 24900), deps(db, sent));
    const order = db.tables.orders[0];
    assert.equal(order.status, "delivered");
    assert.ok(orders.isDownloadToken(order.download_token));
    assert.equal(Date.parse(order.link_expires_at) - NOW.getTime(), 30 * DAY);
    assert.equal(sent.length, 1);
    assert.ok(sent[0].text.includes(`/download/${order.download_token}`));
  });

  test("an upgrade records pack_upgrade with days since the report; an ineligible one is flagged needs_review", async () => {
    const db = fakeDb();
    const reportOrder = seedOrder(db, { status: "delivered", payment_id: "pay_rep", delivered_at: new Date(NOW.getTime() - 12 * DAY).toISOString() });
    seedOrder(db, { razorpay_order_id: "order_u", product: "pack_upgrade_100", amount_cents: 10000, credit_applied: true, source_report_order_id: reportOrder.id });
    assert.equal(await handleRazorpayEvent(captured("order_u", "pay_u", 10000), deps(db)), "paid");
    assert.deepEqual(db.tables.events.find((e) => e.name === "pack_upgrade").props, { days_since_report: 12, credit_applied: true });

    reportOrder.status = "refunded";
    seedOrder(db, { razorpay_order_id: "order_u2", product: "pack_upgrade_100", amount_cents: 10000, credit_applied: true, source_report_order_id: reportOrder.id });
    const sent = [];
    assert.equal(await handleRazorpayEvent(captured("order_u2", "pay_u2", 10000), deps(db, sent)), "needs_review");
    assert.equal(db.tables.orders.at(-1).status, "needs_review");
    assert.ok(sent.some((email) => email.subject.startsWith("Order needs review")));
  });

  test("a wrong amount is accepted but flagged needs_review", async () => {
    const db = fakeDb();
    seedOrder(db, { razorpay_order_id: "order_w" });
    assert.equal(await handleRazorpayEvent(captured("order_w", "pay_w", 100), deps(db)), "needs_review");
  });

  test("refund.processed marks the order refunded once and blocks the download", async () => {
    const db = fakeDb();
    seedOrder(db, { product: "pack_249", status: "delivered", payment_id: "pay_f", download_token: orders.newDownloadToken(), link_expires_at: orders.downloadExpiry(NOW) });
    const refund = { event: "refund.processed", payload: { refund: { entity: { payment_id: "pay_f" } } } };
    assert.equal(await handleRazorpayEvent(refund, deps(db)), "refunded");
    assert.equal(await handleRazorpayEvent(refund, deps(db)), "refund_unknown");
    assert.equal(db.tables.events.filter((e) => e.name === "refunded").length, 1);
    assert.equal(orders.downloadLinkState(db.tables.orders[0], NOW), "refunded");
  });

  test("the ops alert links to the private delivery page only when an admin token is set", async () => {
    const token = "a".repeat(48);
    for (const [adminToken, expectLink] of [[token, true], [undefined, false]]) {
      const db = fakeDb();
      seedOrder(db, { razorpay_order_id: "order_o" });
      const sent = [];
      await handleRazorpayEvent(captured("order_o", "pay_o"), { ...deps(db, sent), adminToken });
      const alert = sent.find((email) => email.subject.startsWith("New report order"));
      assert.equal(alert.to, "hello@chisokulabs.com");
      assert.equal(alert.text.includes(`/ops/deliver?order=${db.tables.orders[0].id}&key=${token}`), expectLink);
    }
  });

  test("admin keys: exact match only, and the token must be at least 32 characters", () => {
    const token = "b".repeat(40);
    assert.equal(isAdminKey(token, token), true);
    assert.equal(isAdminKey(`${token}x`, token), false);
    assert.equal(isAdminKey(undefined, token), false);
    assert.equal(isAdminKey("short", "short"), false);
  });

  test("unknown events and unknown orders are ignored", async () => {
    const db = fakeDb();
    assert.equal(await handleRazorpayEvent({ event: "payment.failed" }, deps(db)), "ignored");
    assert.equal(await handleRazorpayEvent(captured("order_missing", "pay_x"), deps(db)), "unknown_order");
  });
});

describe("Azure Blob signed links", () => {
  test("read-only, HTTPS-only, 10-minute link to the one blob, signed with the account key", () => {
    const config = blobConfig({
      AZURE_STORAGE_ACCOUNT: "chisokulabsfiles",
      AZURE_STORAGE_KEY: Buffer.from("account-key").toString("base64"),
      PACK_CONTAINER: "pack",
      PACK_BLOB_PATH: "/v1/Go Live Pack.zip",
    });
    assert.ok(config);
    const url = new URL(signedBlobUrl(config, NOW, 10, "pack.zip"));
    assert.equal(url.origin, "https://chisokulabsfiles.blob.core.windows.net");
    assert.equal(url.pathname, "/pack/v1/Go%20Live%20Pack.zip");
    const q = url.searchParams;
    assert.equal(q.get("sp"), "r");
    assert.equal(q.get("sr"), "b");
    assert.equal(q.get("spr"), "https");
    assert.equal(q.get("se"), "2026-11-04T10:10:00Z");
    assert.equal(q.get("rscd"), 'attachment; filename="pack.zip"');
    const stringToSign = ["r", q.get("st"), q.get("se"), "/blob/chisokulabsfiles/pack/v1/Go Live Pack.zip", "", "", "https", q.get("sv"), "b", "", "", "", q.get("rscd"), "", "", ""].join("\n");
    const expected = createHmac("sha256", Buffer.from("account-key")).update(stringToSign).digest("base64");
    assert.equal(q.get("sig"), expected);
  });

  test("missing or malformed settings give no config", () => {
    assert.equal(blobConfig({ AZURE_STORAGE_ACCOUNT: "Bad_Name", AZURE_STORAGE_KEY: "a", PACK_CONTAINER: "pack", PACK_BLOB_PATH: "p.zip" }), null);
    assert.equal(blobConfig({}), null);
  });
});
