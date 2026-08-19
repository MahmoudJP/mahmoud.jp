import { createHmac } from "node:crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_CLOUDOPS_URL = "https://cloudops-coach-private.vercel.app/";

function launchToken(secret: string) {
  const payload = Buffer.from(JSON.stringify({
    purpose: "launch",
    expiresAt: Date.now() + 30_000,
  })).toString("base64url");
  const message = `v1.${payload}`;
  const signature = createHmac("sha256", secret).update(message).digest("base64url");
  return `${message}.${signature}`;
}

export async function GET() {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.STUDIO_LAUNCH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Secure CloudOps launch is not configured" }, { status: 503 });
  }

  const target = new URL(process.env.CLOUDOPS_ONLINE_URL ?? DEFAULT_CLOUDOPS_URL);
  target.searchParams.set("studio_launch", launchToken(secret));

  return NextResponse.redirect(target, {
    status: 303,
    headers: {
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
