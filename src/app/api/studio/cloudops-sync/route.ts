import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import {
  getCloudOpsSyncPayload,
  getCloudOpsSyncStatus,
  revokeCloudOpsSyncToken,
  rotateCloudOpsSyncToken,
  saveCloudOpsSyncPayload,
  verifyCloudOpsSyncToken,
} from "@/lib/cloudops-sync-store";

export const dynamic = "force-dynamic";
const MAX_ENVELOPE_BYTES = 2 * 1024 * 1024;

function allowedOrigins() {
  const configured = (process.env.CLOUDOPS_SYNC_ALLOWED_ORIGINS ?? "https://cloudops.mahmoud.jp")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (process.env.NODE_ENV === "development") configured.push("http://127.0.0.1:5180", "http://localhost:5180");
  return new Set(configured);
}

function isAllowedOrigin(origin: string) {
  if (allowedOrigins().has(origin)) return true;
  try {
    const url = new URL(origin);
    return (url.protocol === "http:" && (url.hostname === "127.0.0.1" || url.hostname === "localhost")) ||
      origin === "tauri://localhost" || origin === "http://tauri.localhost";
  } catch { return false; }
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  return origin && isAllowedOrigin(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        Vary: "Origin",
      }
    : {};
}

function json(request: Request, body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  for (const [key, value] of Object.entries(corsHeaders(request))) headers.set(key, value);
  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

function bearerToken(request: Request) {
  const value = request.headers.get("authorization") ?? "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function isOwner() {
  const session = await getServerSession(studioAuthOptions);
  return isStudioOwnerEmail(session?.user?.email);
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || !isAllowedOrigin(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function GET(request: Request) {
  const token = bearerToken(request);
  if (token) {
    if (!(await verifyCloudOpsSyncToken(token))) return json(request, { error: "Unauthorized" }, { status: 401 });
    const payload = await getCloudOpsSyncPayload();
    return json(request, payload ?? { envelope: null, revision: 0, updatedAt: null, deviceName: null, bytes: 0 });
  }
  if (!(await isOwner())) return json(request, { error: "Unauthorized" }, { status: 401 });
  return json(request, await getCloudOpsSyncStatus());
}

export async function POST(request: Request) {
  const token = bearerToken(request);
  if (token) {
    if (!(await verifyCloudOpsSyncToken(token))) return json(request, { error: "Unauthorized" }, { status: 401 });
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_ENVELOPE_BYTES + 4096) return json(request, { error: "Payload too large" }, { status: 413 });
    const body = await request.json().catch(() => null) as { envelope?: unknown; deviceName?: unknown; expectedRevision?: unknown } | null;
    if (!body || typeof body.envelope !== "string" || typeof body.deviceName !== "string" || !Number.isInteger(body.expectedRevision) || Number(body.expectedRevision) < 0) {
      return json(request, { error: "Invalid sync payload" }, { status: 400 });
    }
    if (Buffer.byteLength(body.envelope, "utf8") > MAX_ENVELOPE_BYTES) return json(request, { error: "Payload too large" }, { status: 413 });
    try {
      const envelope = JSON.parse(body.envelope) as {
        format?: string; version?: number; algorithm?: string; kdf?: string;
        iterations?: number; salt?: string; iv?: string; data?: string;
      };
      const validEnvelope = envelope.format === "cloudops-encrypted-backup" &&
        envelope.version === 1 && envelope.algorithm === "AES-GCM" && envelope.kdf === "PBKDF2-SHA256" &&
        Number.isInteger(envelope.iterations) && Number(envelope.iterations) >= 100_000 && Number(envelope.iterations) <= 1_000_000 &&
        typeof envelope.salt === "string" && envelope.salt.length >= 16 && envelope.salt.length <= 128 &&
        typeof envelope.iv === "string" && envelope.iv.length >= 12 && envelope.iv.length <= 128 &&
        typeof envelope.data === "string" && envelope.data.length > 0;
      if (!validEnvelope) {
        return json(request, { error: "Only encrypted CloudOps backups are accepted" }, { status: 400 });
      }
    } catch {
      return json(request, { error: "Invalid encrypted envelope" }, { status: 400 });
    }
    const result = await saveCloudOpsSyncPayload({ envelope: body.envelope, deviceName: body.deviceName, expectedRevision: body.expectedRevision as number });
    if (result.conflict) return json(request, { error: "Remote data changed", revision: result.currentRevision, updatedAt: result.payload?.updatedAt ?? null }, { status: 409 });
    return json(request, { revision: result.payload.revision, updatedAt: result.payload.updatedAt, bytes: result.payload.bytes });
  }

  if (!sameOrigin(request) || !(await isOwner())) return json(request, { error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { action?: string } | null;
  if (body?.action !== "rotate-token") return json(request, { error: "Unknown action" }, { status: 400 });
  const syncToken = await rotateCloudOpsSyncToken();
  return json(request, { syncToken, status: await getCloudOpsSyncStatus() });
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request) || !(await isOwner())) return json(request, { error: "Unauthorized" }, { status: 401 });
  await revokeCloudOpsSyncToken();
  return json(request, { revoked: true });
}
