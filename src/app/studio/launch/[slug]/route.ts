import { createHmac } from "node:crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const launchTargets = {
  "jlpt-master": {
    url: "https://jlpt-master-private.vercel.app/",
    secret: () => process.env.STUDIO_LAUNCH_SECRET_JLPT,
  },
  koryuu: {
    url: "https://koryuu-studio-private.vercel.app/",
    secret: () => process.env.STUDIO_LAUNCH_SECRET_KORYUU,
  },
  mylife: {
    url: "https://mylife-studio-private.vercel.app/",
    secret: () => process.env.STUDIO_LAUNCH_SECRET_MYLIFE,
  },
} as const;

type LaunchSlug = keyof typeof launchTargets;

function createLaunchToken(secret: string, projectSlug: LaunchSlug) {
  const payload = Buffer.from(JSON.stringify({
    purpose: "launch",
    projectSlug,
    expiresAt: Date.now() + 30_000,
  })).toString("base64url");
  const message = `v1.${payload}`;
  const signature = createHmac("sha256", secret).update(message).digest("base64url");
  return `${message}.${signature}`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  if (!(slug in launchTargets)) {
    return NextResponse.json({ error: "Online project not found" }, { status: 404 });
  }

  const projectSlug = slug as LaunchSlug;
  const target = launchTargets[projectSlug];
  const secret = target.secret();
  if (!secret) {
    return NextResponse.json({ error: "Secure project launch is not configured" }, { status: 503 });
  }

  const url = new URL(target.url);
  url.searchParams.set("studio_launch", createLaunchToken(secret, projectSlug));
  return NextResponse.redirect(url, {
    status: 303,
    headers: {
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
