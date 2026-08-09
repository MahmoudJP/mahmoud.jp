import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { getStudioMindMap, saveStudioMindMap } from "@/lib/studio-store";

async function isAuthorized() {
  const session = await getServerSession(studioAuthOptions);
  return isStudioOwnerEmail(session?.user?.email);
}

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ snapshot: await getStudioMindMap() });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as { snapshot?: Record<string, string> };
  if (!payload.snapshot || typeof payload.snapshot !== "object") {
    return NextResponse.json({ error: "A map snapshot is required" }, { status: 400 });
  }
  if (JSON.stringify(payload.snapshot).length > 1_500_000) {
    return NextResponse.json({ error: "Map snapshot is too large" }, { status: 413 });
  }
  await saveStudioMindMap(payload.snapshot);
  return NextResponse.json({ ok: true, updatedAt: new Date().toISOString() });
}
