import { NextResponse } from "next/server";
import { siteConfig } from "../../../lib/siteConfig";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  role?: string;
  company_size?: string;
  challenge?: string;
  tools?: string;
  urgency?: string;
  interest?: string;
};

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const country = String(body.country ?? "").trim();

  if (!name || !email || !company || !country) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const summary = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Country: ${country}`,
    `Role: ${body.role ?? ""}`,
    `Company size: ${body.company_size ?? ""}`,
    `Urgency: ${body.urgency ?? ""}`,
    `Interest: ${body.interest ?? ""}`,
    `Challenge: ${body.challenge ?? ""}`,
    `Tools: ${body.tools ?? ""}`,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ChisokuLabs Site <onboarding@resend.dev>",
          to: [siteConfig.email],
          subject: `Audit Fit Call — ${company}`,
          text: summary,
        }),
      });
    } catch {
      // Calendly still captures the lead; do not block booking.
    }
  } else {
    console.info("[audit-fit]", summary);
  }

  return NextResponse.json({ ok: true });
}
