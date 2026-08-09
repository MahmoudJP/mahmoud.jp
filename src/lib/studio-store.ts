import { Redis } from "@upstash/redis";

export type StudioNote = {
  id: string;
  kind: "inbox" | "project";
  projectSlug: string | null;
  title: string;
  content: string;
  status: "open" | "done";
  createdAt: string;
  updatedAt: string;
};

const NOTES_KEY = "mahmoud:studio:notes";
const MAP_KEY = "mahmoud:studio:mind-map";

type MemoryStore = {
  notes: Map<string, StudioNote>;
  map: Record<string, string> | null;
};

declare global {
  var __mahmoudStudioMemory: MemoryStore | undefined;
}

function memoryStore() {
  globalThis.__mahmoudStudioMemory ??= { notes: new Map(), map: null };
  return globalThis.__mahmoudStudioMemory;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

export async function listStudioNotes() {
  const redis = getRedis();
  if (!redis) {
    return [...memoryStore().notes.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  const rows = await redis.hgetall<Record<string, StudioNote>>(NOTES_KEY);
  return Object.values(rows ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioNote(input: {
  title: string;
  content?: string;
  kind?: "inbox" | "project";
  projectSlug?: string | null;
}) {
  const now = new Date().toISOString();
  const note: StudioNote = {
    id: crypto.randomUUID(),
    kind: input.kind === "project" ? "project" : "inbox",
    projectSlug: input.projectSlug ?? null,
    title: input.title,
    content: input.content ?? "",
    status: "open",
    createdAt: now,
    updatedAt: now,
  };

  const redis = getRedis();
  if (redis) await redis.hset(NOTES_KEY, { [note.id]: note });
  else memoryStore().notes.set(note.id, note);
  return note;
}

export async function updateStudioNote(id: string, status: "open" | "done") {
  const notes = await listStudioNotes();
  const current = notes.find((note) => note.id === id);
  if (!current) return null;
  const note = { ...current, status, updatedAt: new Date().toISOString() };
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

export async function getStudioMindMap() {
  const redis = getRedis();
  return redis ? await redis.get<Record<string, string>>(MAP_KEY) : memoryStore().map;
}

export async function saveStudioMindMap(snapshot: Record<string, string>) {
  const redis = getRedis();
  if (redis) await redis.set(MAP_KEY, snapshot);
  else memoryStore().map = snapshot;
}
