import { Redis } from "@upstash/redis";

export type StudioWorkflow = "inbox" | "next" | "doing" | "waiting" | "done";
export type StudioPriority = "low" | "medium" | "high";

export type StudioNote = {
  id: string;
  kind: "inbox" | "task" | "project";
  projectSlug: string | null;
  title: string;
  content: string;
  status: "open" | "done";
  workflow: StudioWorkflow;
  priority: StudioPriority;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StudioDocumentType =
  | "overview"
  | "setup"
  | "architecture"
  | "decision"
  | "runbook"
  | "reference"
  | "handoff";

export type StudioDocument = {
  id: string;
  title: string;
  projectSlug: string | null;
  type: StudioDocumentType;
  summary: string;
  content: string;
  tags: string[];
  status: "draft" | "current" | "archived";
  createdAt: string;
  updatedAt: string;
};

export type StudioRecordCategory =
  | "decision"
  | "health"
  | "automation"
  | "asset"
  | "career"
  | "finance";

export type StudioRecord = {
  id: string;
  category: StudioRecordCategory;
  title: string;
  projectSlug: string | null;
  status: string;
  summary: string;
  details: Record<string, string>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const NOTES_KEY = "mahmoud:studio:notes";
const DOCUMENTS_KEY = "mahmoud:studio:documents";
const RECORDS_KEY = "mahmoud:studio:records";
const MAP_KEY = "mahmoud:studio:mind-map";

type MemoryStore = {
  notes: Map<string, StudioNote>;
  documents: Map<string, StudioDocument>;
  records: Map<string, StudioRecord>;
  map: Record<string, string> | null;
};

declare global {
  var __mahmoudStudioMemory: MemoryStore | undefined;
}

function memoryStore() {
  globalThis.__mahmoudStudioMemory ??= {
    notes: new Map(),
    documents: new Map(),
    records: new Map(),
    map: null,
  };
  return globalThis.__mahmoudStudioMemory;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

function normalizeNote(note: Partial<StudioNote> & Pick<StudioNote, "id" | "title" | "createdAt" | "updatedAt">): StudioNote {
  const legacyDone = note.status === "done";
  const workflow = note.workflow ?? (legacyDone ? "done" : note.kind === "project" ? "next" : "inbox");
  return {
    id: note.id,
    kind: note.kind === "project" || note.kind === "task" ? note.kind : "inbox",
    projectSlug: note.projectSlug ?? null,
    title: note.title,
    content: note.content ?? "",
    status: workflow === "done" ? "done" : "open",
    workflow,
    priority: note.priority ?? "medium",
    dueAt: note.dueAt ?? null,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

export async function listStudioNotes() {
  const redis = getRedis();
  const rows = redis
    ? await redis.hgetall<Record<string, StudioNote>>(NOTES_KEY)
    : Object.fromEntries(memoryStore().notes);
  return Object.values(rows ?? {})
    .map((note) => normalizeNote(note))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioNote(input: {
  title: string;
  content?: string;
  kind?: "inbox" | "task" | "project";
  projectSlug?: string | null;
  workflow?: StudioWorkflow;
  priority?: StudioPriority;
  dueAt?: string | null;
}) {
  const now = new Date().toISOString();
  const workflow = input.workflow ?? (input.kind === "project" || input.kind === "task" ? "next" : "inbox");
  const note: StudioNote = {
    id: crypto.randomUUID(),
    kind: input.kind === "project" || input.kind === "task" ? input.kind : "inbox",
    projectSlug: input.projectSlug ?? null,
    title: input.title,
    content: input.content ?? "",
    status: workflow === "done" ? "done" : "open",
    workflow,
    priority: input.priority ?? "medium",
    dueAt: input.dueAt ?? null,
    createdAt: now,
    updatedAt: now,
  };

  const redis = getRedis();
  if (redis) await redis.hset(NOTES_KEY, { [note.id]: note });
  else memoryStore().notes.set(note.id, note);
  return note;
}

export async function updateStudioNote(
  id: string,
  updates: Partial<Pick<StudioNote, "title" | "content" | "projectSlug" | "workflow" | "priority" | "dueAt">>,
) {
  const notes = await listStudioNotes();
  const current = notes.find((note) => note.id === id);
  if (!current) return null;
  const workflow = updates.workflow ?? current.workflow;
  const note: StudioNote = {
    ...current,
    ...updates,
    status: workflow === "done" ? "done" : "open",
    workflow,
    updatedAt: new Date().toISOString(),
  };
  const redis = getRedis();
  if (redis) await redis.hset(NOTES_KEY, { [note.id]: note });
  else memoryStore().notes.set(note.id, note);
  return note;
}

export async function deleteStudioNote(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(NOTES_KEY, id);
  else memoryStore().notes.delete(id);
}

const defaultDocuments: StudioDocument[] = [
  {
    id: "studio-operating-guide",
    title: "Mahmoud Studio — Operating Guide",
    projectSlug: null,
    type: "overview",
    summary: "The source-of-truth rules for projects, releases, work, knowledge, and AI collaboration.",
    content: `# Purpose
Mahmoud Studio is the private command center for Mahmoud's ideas, projects, versions, releases, work, and long-term knowledge.

# Source of truth
- GitHub is the source of truth for saved code.
- Latest code means the newest saved remote commit.
- Stable means a tested checkpoint Mahmoud trusts.
- Live means the version currently used by people.
- A pushed commit does not automatically become stable or live.
- Every pushed commit is an edit checkpoint, even when it is not a named version.
- A test build is a runnable file produced from one exact commit. If no build artifact exists, Studio must say source saved instead of offering a fake run button.

# Working workflow
1. Capture raw thoughts in Inbox & Work.
2. Connect actionable work to a project.
3. Save important context in Knowledge.
4. Push code to preserve progress.
5. Produce a test build or web preview only when the project needs one.
6. Mark a version stable only after validation.
7. Promote a version live only after explicit approval.

# AI collaboration rules
- Read the relevant project brief and knowledge documents before changing code.
- Preserve the distinction between latest, stable, and live versions.
- Never deploy, publish, release, or roll back without explicit approval.
- Record important decisions and handoff context after meaningful work.
- Prefer concise, verifiable status over assumptions.`,
    tags: ["studio", "workflow", "source-of-truth", "ai"],
    status: "current",
    createdAt: "2026-08-09T00:00:00.000Z",
    updatedAt: "2026-08-09T00:00:00.000Z",
  },
  {
    id: "ai-handoff-protocol",
    title: "AI Handoff Protocol",
    projectSlug: null,
    type: "handoff",
    summary: "A consistent context package for continuing work with an AI assistant on any device.",
    content: `# Before starting
- Identify the exact project and repository.
- Confirm the default and active branches.
- Read AGENTS.md, README.md, CHANGELOG.md, and docs/STATUS.md when present.
- Check the latest remote commit and the working tree before editing.

# Required handoff fields
- Objective
- Repository and local path
- Active branch
- Latest remote commit
- Stable version
- Live version
- Completed work
- Validation performed
- Open work
- Known risks
- Recommended next action

# Completion rule
Work is complete only when the requested outcome is implemented, validated in proportion to risk, documented, and safely saved remotely when publishing was requested.`,
    tags: ["ai", "handoff", "devices", "workflow"],
    status: "current",
    createdAt: "2026-08-09T00:00:00.000Z",
    updatedAt: "2026-08-09T00:00:00.000Z",
  },
  {
    id: "project-run-readiness-guide",
    title: "Project Run & Build Readiness",
    projectSlug: null,
    type: "runbook",
    summary: "How Studio represents ordinary edits, online previews, local launchers, test builds, stable checkpoints, and live releases.",
    content: `# States
- Edit checkpoint: any pushed Git commit, even when it has no version number.
- Online preview: a browser-ready deployment for the exact source being tested.
- Local launcher: a source file that starts the project locally and may require an installed toolchain.
- Test build: a runnable package produced from one exact commit.
- Stable checkpoint: a tested state Mahmoud trusts.
- Live release: the version deliberately promoted for real users.

# Truthful run buttons
- Show Try Online only when a working protected or public URL exists.
- Show Download only when a verified artifact exists for the selected commit and platform.
- Show Local only when the repository contains the named launcher or direct HTML file.
- If no runnable file exists, say Source saved or Build required.

# Privacy
- Never copy private project builds into the public mahmoud.jp repository.
- Private previews need protected hosting or authenticated artifact downloads.
- Keep secrets, signing material, user data, and local databases out of build artifacts.

# Retention
- Ordinary test artifacts may expire to control storage.
- Stable and live packages should be kept deliberately and documented separately.`,
    tags: ["projects", "edits", "builds", "previews", "releases"],
    status: "current",
    createdAt: "2026-08-10T00:00:00.000Z",
    updatedAt: "2026-08-10T00:00:00.000Z",
  },
];

async function ensureDefaultDocuments() {
  const redis = getRedis();
  const existing = redis
    ? await redis.hgetall<Record<string, StudioDocument>>(DOCUMENTS_KEY)
    : Object.fromEntries(memoryStore().documents);
  const documents = existing ?? {};
  const missing = defaultDocuments.filter((document) => !documents[document.id]);
  if (missing.length) {
    if (redis) await redis.hset(DOCUMENTS_KEY, Object.fromEntries(missing.map((document) => [document.id, document])));
    else missing.forEach((document) => memoryStore().documents.set(document.id, document));
  }
}

export async function listStudioDocuments() {
  await ensureDefaultDocuments();
  const redis = getRedis();
  const rows = redis
    ? await redis.hgetall<Record<string, StudioDocument>>(DOCUMENTS_KEY)
    : Object.fromEntries(memoryStore().documents);
  return Object.values(rows ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioDocument(input: {
  title: string;
  projectSlug?: string | null;
  type?: StudioDocumentType;
  summary?: string;
  content?: string;
  tags?: string[];
}) {
  const now = new Date().toISOString();
  const document: StudioDocument = {
    id: crypto.randomUUID(),
    title: input.title,
    projectSlug: input.projectSlug ?? null,
    type: input.type ?? "reference",
    summary: input.summary ?? "",
    content: input.content ?? "",
    tags: input.tags ?? [],
    status: "current",
    createdAt: now,
    updatedAt: now,
  };
  const redis = getRedis();
  if (redis) await redis.hset(DOCUMENTS_KEY, { [document.id]: document });
  else memoryStore().documents.set(document.id, document);
  return document;
}

export async function updateStudioDocument(
  id: string,
  updates: Partial<Pick<StudioDocument, "title" | "projectSlug" | "type" | "summary" | "content" | "tags" | "status">>,
) {
  const documents = await listStudioDocuments();
  const current = documents.find((document) => document.id === id);
  if (!current) return null;
  const document: StudioDocument = { ...current, ...updates, updatedAt: new Date().toISOString() };
  const redis = getRedis();
  if (redis) await redis.hset(DOCUMENTS_KEY, { [document.id]: document });
  else memoryStore().documents.set(document.id, document);
  return document;
}

export async function deleteStudioDocument(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(DOCUMENTS_KEY, id);
  else memoryStore().documents.delete(id);
}

export async function listStudioRecords() {
  const redis = getRedis();
  const rows = redis
    ? await redis.hgetall<Record<string, StudioRecord>>(RECORDS_KEY)
    : Object.fromEntries(memoryStore().records);
  return Object.values(rows ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioRecord(input: {
  category: StudioRecordCategory;
  title: string;
  projectSlug?: string | null;
  status?: string;
  summary?: string;
  details?: Record<string, string>;
  tags?: string[];
}) {
  const now = new Date().toISOString();
  const record: StudioRecord = {
    id: crypto.randomUUID(),
    category: input.category,
    title: input.title,
    projectSlug: input.projectSlug ?? null,
    status: input.status ?? "active",
    summary: input.summary ?? "",
    details: input.details ?? {},
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now,
  };
  const redis = getRedis();
  if (redis) await redis.hset(RECORDS_KEY, { [record.id]: record });
  else memoryStore().records.set(record.id, record);
  return record;
}

export async function updateStudioRecord(
  id: string,
  updates: Partial<Pick<StudioRecord, "title" | "projectSlug" | "status" | "summary" | "details" | "tags">>,
) {
  const records = await listStudioRecords();
  const current = records.find((record) => record.id === id);
  if (!current) return null;
  const record: StudioRecord = { ...current, ...updates, updatedAt: new Date().toISOString() };
  const redis = getRedis();
  if (redis) await redis.hset(RECORDS_KEY, { [record.id]: record });
  else memoryStore().records.set(record.id, record);
  return record;
}

export async function deleteStudioRecord(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(RECORDS_KEY, id);
  else memoryStore().records.delete(id);
}

export async function getStudioMindMap() {
  const redis = getRedis();
  return redis ? await redis.get<Record<string, string>>(MAP_KEY) : memoryStore().map;
}

export async function saveStudioMindMap(snapshot: Record<string, string>) {
  const redis = getRedis();
  if (redis) await redis.set(MAP_KEY, snapshot);
  else memoryStore().map = snapshot;
}

export async function getStudioStorageUsage() {
  const [notes, documents, records, map] = await Promise.all([
    listStudioNotes(),
    listStudioDocuments(),
    listStudioRecords(),
    getStudioMindMap(),
  ]);
  const bytes = new TextEncoder().encode(JSON.stringify({ notes, documents, records, map })).byteLength;
  return {
    backend: getRedis() ? "Upstash Redis" : "Temporary memory",
    bytes,
    keys: 4,
    counts: {
      notes: notes.length,
      documents: documents.length,
      records: records.length,
      mindMapValues: map ? Object.keys(map).length : 0,
    },
    measuredAt: new Date().toISOString(),
  };
}
