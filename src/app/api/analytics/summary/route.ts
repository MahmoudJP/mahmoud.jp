import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics-store";

export const runtime = "nodejs";

function isAllowed(req: NextRequest) {
  const key = process.env.ANALYTICS_DASHBOARD_KEY;
  if (!key) return false;

  return req.headers.get("x-dashboard-key") === key || req.nextUrl.searchParams.get("key") === key;
}

export async function GET(req: NextRequest) {
  if (!isAllowed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary();

  return NextResponse.json(summary, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-dashboard-key, content-type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
