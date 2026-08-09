import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import {
  createStudioRecord,
  deleteStudioRecord,
  listStudioRecords,
  updateStudioRecord,
  type StudioRecord,
  type StudioRecordCategory,
} from "@/lib/studio-store";

const categories: StudioRecordCategory[] = ["decision", "health", "automation", "asset", "career", "finance"];

async function isAuthorized() {
  const session = await getServerSession(studioAuthOptions);
  return isStudioOwnerEmail(session?.user?.email);
}

function cleanText(value: unknown, length: number) {
  return typeof value === "string" ? value.trim().slice(0, length) : "";
}

function cleanTags(tags: unknown) {
  return Array.isArray(tags)
    ? tags.filter((tag): tag is string => typeof tag === "string").map((tag) => cleanText(tag, 40)).filter(Boolean).slice(0, 12)
    : [];
}

function cleanDetails(details: unknown) {
  if (!details || typeof details !== "object" || Array.isArray(details)) return {};
  return Object.fromEntries(
    Object.entries(details)
      .filter(([key, value]) => /^[a-z][a-zA-Z0-9_-]{0,59}$/.test(key) && typeof value === "string")
      .slice(0, 24)
      .map(([key, value]) => [key, cleanText(value, 5000)]),
  );
}

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ records: await listStudioRecords() });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Partial<StudioRecord>;
  const title = cleanText(payload.title, 180);
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  if (!categories.includes(payload.category as StudioRecordCategory)) {
    return NextResponse.json({ error: "Valid category is required" }, { status: 400 });
  }
  const record = await createStudioRecord({
    category: payload.category as StudioRecordCategory,
    title,
    projectSlug: cleanText(payload.projectSlug, 80) || null,
    status: cleanText(payload.status, 40) || "active",
    summary: cleanText(payload.summary, 2000),
    details: cleanDetails(payload.details),
    tags: cleanTags(payload.tags),
  });
  return NextResponse.json({ record }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Partial<StudioRecord>;
  if (!payload.id) return NextResponse.json({ error: "Record id is required" }, { status: 400 });
  const record = await updateStudioRecord(payload.id, {
    ...(payload.title !== undefined ? { title: cleanText(payload.title, 180) } : {}),
    ...(payload.projectSlug !== undefined ? { projectSlug: cleanText(payload.projectSlug, 80) || null } : {}),
    ...(payload.status !== undefined ? { status: cleanText(payload.status, 40) || "active" } : {}),
    ...(payload.summary !== undefined ? { summary: cleanText(payload.summary, 2000) } : {}),
    ...(payload.details !== undefined ? { details: cleanDetails(payload.details) } : {}),
    ...(payload.tags !== undefined ? { tags: cleanTags(payload.tags) } : {}),
  });
  return record ? NextResponse.json({ record }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Record id is required" }, { status: 400 });
  await deleteStudioRecord(id);
  return NextResponse.json({ ok: true });
}
