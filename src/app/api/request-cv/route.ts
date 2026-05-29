import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const { email, message, website } = await req.json();

    // Honeypot: silently accept bots without sending.
    if (website) return NextResponse.json({ ok: true });

    if (typeof email !== "string" || !email.includes("@") || email.length > 200) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (typeof message !== "undefined" && (typeof message !== "string" || message.length > 5000)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }

    const note = typeof message === "string" && message.trim() ? message.trim() : "(no message)";

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "mahmoud.jp <noreply@mahmoud.jp>",
      to: "m@mahmoud.jp",
      replyTo: email,
      subject: `CV request from ${email}`,
      text: `Someone requested your CV via mahmoud.jp.\n\nEmail: ${email}\n\nMessage:\n${note}`,
    });

    if (error) {
      return NextResponse.json({ error: "Send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
