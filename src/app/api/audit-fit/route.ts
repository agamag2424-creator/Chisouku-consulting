import { NextResponse } from "next/server";
import { isRequestKey, requestTypes } from "../../../content/contactForm";
import { siteConfig } from "../../../lib/siteConfig";

// "Discuss your programme" delivery (PRD 11, E9.1): validates, drops honeypot submissions, emails the founder through
// Resend. It never reports success for a message nobody receives, and never logs what a visitor wrote.

type Payload = Partial<Record<
  "name" | "email" | "company" | "country" | "role" | "request_type" | "platform" | "decision_month" | "message" | "website",
  unknown
>>;

const text = (value: unknown, max = 200) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled: a bot. Answer as if it worked, send nothing.
  if (text(body.website)) return NextResponse.json({ ok: true });

  const name = text(body.name);
  const email = text(body.email);
  const company = text(body.company);
  const country = text(body.country);
  const requestType = text(body.request_type);
  if (!name || !email || !company || !country || !isRequestKey(requestType)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const requestLabel = requestTypes[requestType as keyof typeof requestTypes].label;

  const summary = [
    `Request: ${requestLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Country: ${country}`,
    `Role: ${text(body.role)}`,
    `Platform: ${text(body.platform)}`,
    `Go-live decision date: ${text(body.decision_month)}`,
    ``,
    `Message:`,
    text(body.message, 5000),
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[contact] RESEND_API_KEY is not set; submission not delivered");
    return NextResponse.json({ ok: false, error: "Delivery unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: siteConfig.formSender,
        to: [siteConfig.email],
        reply_to: email,
        subject: `[ChisokuLabs] ${requestLabel} — ${company}`,
        text: summary,
      }),
    });
    if (!response.ok) {
      console.error(`[contact] Resend returned ${response.status}; submission not delivered`);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } catch {
    console.error("[contact] Resend request failed; submission not delivered");
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
