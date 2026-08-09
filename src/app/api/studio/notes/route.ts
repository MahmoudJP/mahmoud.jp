import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import {
  createStudioNote,
  deleteStudioNote,
  listStudioNotes,
  updateStudioNote,
  type StudioPriority,
  type StudioWorkflow,
} from "@/lib/studio-store";

const workflows: StudioWorkflow[] = ["inbox", "next", "doing", "waiting", "done"];
const priorities: StudioPriority[] = ["low", "medium", "high"];

async function isAuthorized() {
  const session = await getServerSession(studioAuthOptions);
  return isStudioOwnerEmail(session?.user?.email);
}

export async function GET() {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ notes: await listStudioNotes() });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as {
    title?: string;
    content?: string;
    kind?: "inbox" | "task" | "project";
    projectSlug?: string | null;
    workflow?: StudioWorkflow;
    priority?: StudioPriority;
    dueAt?: string | null;
  };
  const title = payload.title?.trim().slice(0, 240);
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const note = await createStudioNote({
    title,
    content: payload.content?.trim().slice(0, 4000),
    kind: payload.kind,
    projectSlug: payload.projectSlug?.trim().slice(0, 80) || null,
    workflow: workflows.includes(payload.workflow as StudioWorkflow) ? payload.workflow : undefined,
    priority: priorities.includes(payload.priority as StudioPriority) ? payload.priority : undefined,
    dueAt: payload.dueAt?.trim().slice(0, 40) || null,
  });
  return NextResponse.json({ note }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as {
    id?: string;
    title?: string;
    content?: string;
    projectSlug?: string | null;
    workflow?: StudioWorkflow;
    priority?: StudioPriority;
    dueAt?: string | null;
  };
  if (!payload.id) return NextResponse.json({ error: "Note id is required" }, { status: 400 });
  const note = await updateStudioNote(payload.id, {
    ...(payload.title !== undefined ? { title: payload.title.trim().slice(0, 240) } : {}),
    ...(payload.content !== undefined ? { content: payload.content.trim().slice(0, 4000) } : {}),
    ...(payload.projectSlug !== undefined ? { projectSlug: payload.projectSlug?.trim().slice(0, 80) || null } : {}),
    ...(workflows.includes(payload.workflow as StudioWorkflow) ? { workflow: payload.workflow } : {}),
    ...(priorities.includes(payload.priority as StudioPriority) ? { priority: payload.priority } : {}),
    ...(payload.dueAt !== undefined ? { dueAt: payload.dueAt?.trim().slice(0, 40) || null } : {}),
  });
  return note ? NextResponse.json({ note }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Note id is required" }, { status: 400 });
  await deleteStudioNote(id);
  return NextResponse.json({ ok: true });
}
