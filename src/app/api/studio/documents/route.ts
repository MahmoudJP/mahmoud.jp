import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import {
  createStudioDocument,
  deleteStudioDocument,
  listStudioDocuments,
  updateStudioDocument,
  type StudioDocument,
  type StudioDocumentType,
} from "@/lib/studio-store";

const documentTypes: StudioDocumentType[] = [
  "overview",
  "setup",
  "architecture",
  "decision",
  "runbook",
  "reference",
  "handoff",
];

async function isAuthorized() {
  const session = await getServerSession(studioAuthOptions);
  return isStudioOwnerEmail(session?.user?.email);
}

function cleanTags(tags: unknown) {
  return Array.isArray(tags)
    ? tags.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim().slice(0, 40)).filter(Boolean).slice(0, 12)
    : [];
}

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ documents: await listStudioDocuments() });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Partial<StudioDocument>;
  const title = payload.title?.trim().slice(0, 180);
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const document = await createStudioDocument({
    title,
    projectSlug: payload.projectSlug?.trim().slice(0, 80) || null,
    type: documentTypes.includes(payload.type as StudioDocumentType) ? payload.type : "reference",
    summary: payload.summary?.trim().slice(0, 600) ?? "",
    content: payload.content?.trim().slice(0, 40000) ?? "",
    tags: cleanTags(payload.tags),
  });
  return NextResponse.json({ document }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Partial<StudioDocument>;
  if (!payload.id) return NextResponse.json({ error: "Document id is required" }, { status: 400 });
  const document = await updateStudioDocument(payload.id, {
    ...(payload.title !== undefined ? { title: payload.title.trim().slice(0, 180) } : {}),
    ...(payload.projectSlug !== undefined ? { projectSlug: payload.projectSlug?.trim().slice(0, 80) || null } : {}),
    ...(documentTypes.includes(payload.type as StudioDocumentType) ? { type: payload.type } : {}),
    ...(payload.summary !== undefined ? { summary: payload.summary.trim().slice(0, 600) } : {}),
    ...(payload.content !== undefined ? { content: payload.content.trim().slice(0, 40000) } : {}),
    ...(payload.tags !== undefined ? { tags: cleanTags(payload.tags) } : {}),
    ...(payload.status === "draft" || payload.status === "current" || payload.status === "archived" ? { status: payload.status } : {}),
  });
  return document ? NextResponse.json({ document }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Document id is required" }, { status: 400 });
  await deleteStudioDocument(id);
  return NextResponse.json({ ok: true });
}
