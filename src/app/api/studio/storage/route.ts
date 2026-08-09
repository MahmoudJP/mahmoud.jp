import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { getStudioStorageUsage } from "@/lib/studio-store";

export async function GET() {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getStudioStorageUsage());
}
