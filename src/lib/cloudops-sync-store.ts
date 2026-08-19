import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";

const TOKEN_KEY = "mahmoud:studio:cloudops-sync:token-hash";
const PAYLOAD_KEY = "mahmoud:studio:cloudops-sync:payload";

export type CloudOpsSyncPayload = {
  envelope: string;
  revision: number;
  updatedAt: string;
  deviceName: string;
  bytes: number;
};

type MemorySyncStore = {
  tokenHash: string | null;
  payload: CloudOpsSyncPayload | null;
};

declare global {
  var __mahmoudCloudOpsSyncMemory: MemorySyncStore | undefined;
}

function memoryStore(): MemorySyncStore {
  globalThis.__mahmoudCloudOpsSyncMemory ??= { tokenHash: null, payload: null };
  return globalThis.__mahmoudCloudOpsSyncMemory;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

function hashToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export async function getCloudOpsSyncStatus() {
  const redis = getRedis();
  const [tokenHash, payload] = redis
    ? await Promise.all([
        redis.get<string>(TOKEN_KEY),
        redis.get<CloudOpsSyncPayload>(PAYLOAD_KEY),
      ])
    : [memoryStore().tokenHash, memoryStore().payload];
  return {
    configured: Boolean(tokenHash),
    revision: payload?.revision ?? 0,
    updatedAt: payload?.updatedAt ?? null,
    deviceName: payload?.deviceName ?? null,
    bytes: payload?.bytes ?? 0,
    backend: redis ? "Upstash Redis" : "Temporary development memory",
  };
}

export async function rotateCloudOpsSyncToken() {
  const token = `coc_${randomBytes(32).toString("base64url")}`;
  const tokenHash = hashToken(token);
  const redis = getRedis();
  if (redis) await redis.set(TOKEN_KEY, tokenHash);
  else memoryStore().tokenHash = tokenHash;
  return token;
}

export async function revokeCloudOpsSyncToken() {
  const redis = getRedis();
  if (redis) await redis.del(TOKEN_KEY);
  else memoryStore().tokenHash = null;
}

export async function verifyCloudOpsSyncToken(token: string) {
  if (!token || token.length > 128) return false;
  const redis = getRedis();
  const expected = redis ? await redis.get<string>(TOKEN_KEY) : memoryStore().tokenHash;
  if (!expected) return false;
  const actualBuffer = Buffer.from(hashToken(token), "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function getCloudOpsSyncPayload() {
  const redis = getRedis();
  return redis ? await redis.get<CloudOpsSyncPayload>(PAYLOAD_KEY) : memoryStore().payload;
}

export async function saveCloudOpsSyncPayload(input: {
  envelope: string;
  deviceName: string;
  expectedRevision: number;
}) {
  const current = await getCloudOpsSyncPayload();
  const currentRevision = current?.revision ?? 0;
  if (input.expectedRevision !== currentRevision) {
    return { conflict: true as const, currentRevision, payload: current };
  }
  const payload: CloudOpsSyncPayload = {
    envelope: input.envelope,
    revision: currentRevision + 1,
    updatedAt: new Date().toISOString(),
    deviceName: input.deviceName.slice(0, 80),
    bytes: Buffer.byteLength(input.envelope, "utf8"),
  };
  const redis = getRedis();
  if (redis) await redis.set(PAYLOAD_KEY, payload);
  else memoryStore().payload = payload;
  return { conflict: false as const, payload };
}
