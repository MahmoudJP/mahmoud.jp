import { NextRequest, NextResponse } from "next/server";
import { createVisitorId, trackPageView } from "@/lib/analytics-store";

export const runtime = "nodejs";

function getDevice(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "Tablet";
  if (/mobile|iphone|android/.test(ua)) return "Mobile";
  if (ua) return "Desktop";
  return "Other";
}

function getReferrer(referrer: string, origin: string) {
  if (!referrer) return "Direct";

  try {
    const referrerUrl = new URL(referrer);
    if (origin && referrerUrl.origin === origin) return "Internal";
    return referrerUrl.hostname.replace(/^www\./, "");
  } catch {
    return referrer.slice(0, 160);
  }
}

function getPath(path: unknown) {
  if (typeof path !== "string" || !path.startsWith("/")) return "/";
  return path.split("?")[0].slice(0, 160) || "/";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get("user-agent") || "";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    await trackPageView({
      path: getPath(body.path),
      referrer: getReferrer(typeof body.referrer === "string" ? body.referrer : "", req.nextUrl.origin),
      country: req.headers.get("x-vercel-ip-country") || "Unknown",
      device: getDevice(userAgent),
      visitorId: createVisitorId({
        ip,
        userAgent,
        salt: process.env.ANALYTICS_SALT,
      }),
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
