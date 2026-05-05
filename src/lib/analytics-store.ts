import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

export type AnalyticsItem = {
  label: string;
  value: number;
};

export type AnalyticsSummary = {
  updatedAt: string;
  visitors: number;
  pageViews: number;
  pages: AnalyticsItem[];
  referrers: AnalyticsItem[];
  countries: AnalyticsItem[];
  devices: AnalyticsItem[];
};

type TrackEvent = {
  path: string;
  referrer: string;
  country: string;
  device: string;
  visitorId: string;
};

const PREFIX = "mahmoud:analytics";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  return new Redis({ url, token });
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function cleanLabel(value: string, fallback = "Unknown") {
  const label = value.trim();
  if (!label) return fallback;
  return label.slice(0, 160);
}

function topItems(values: Record<string, unknown> | null, limit = 8): AnalyticsItem[] {
  return Object.entries(values || {})
    .map(([label, value]) => ({ label, value: Number(value) || 0 }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function createVisitorId(input: {
  ip: string;
  userAgent: string;
  salt?: string;
}) {
  return createHash("sha256")
    .update(`${today()}:${input.ip}:${input.userAgent}:${input.salt || "mahmoud.jp"}`)
    .digest("hex");
}

export async function trackPageView(event: TrackEvent) {
  const redis = getRedis();
  if (!redis) return { stored: false };

  const date = today();
  const visitorKey = `${PREFIX}:visitor:${date}:${event.visitorId}`;
  const isNewVisitor = await redis.set(visitorKey, "1", { ex: 60 * 60 * 48, nx: true });

  await Promise.all([
    redis.hincrby(`${PREFIX}:totals`, "pageViews", 1),
    redis.hincrby(`${PREFIX}:pages`, cleanLabel(event.path, "/"), 1),
    redis.hincrby(`${PREFIX}:referrers`, cleanLabel(event.referrer, "Direct"), 1),
    redis.hincrby(`${PREFIX}:countries`, cleanLabel(event.country, "Unknown"), 1),
    redis.hincrby(`${PREFIX}:devices`, cleanLabel(event.device, "Other"), 1),
    redis.set(`${PREFIX}:updatedAt`, date),
    isNewVisitor ? redis.hincrby(`${PREFIX}:totals`, "visitors", 1) : Promise.resolve(),
  ]);

  return { stored: true };
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const redis = getRedis();
  if (!redis) {
    return {
      updatedAt: today(),
      visitors: 0,
      pageViews: 0,
      pages: [],
      referrers: [],
      countries: [],
      devices: [],
    };
  }

  const [totals, pages, referrers, countries, devices, updatedAt] = await Promise.all([
    redis.hgetall<Record<string, unknown>>(`${PREFIX}:totals`),
    redis.hgetall<Record<string, unknown>>(`${PREFIX}:pages`),
    redis.hgetall<Record<string, unknown>>(`${PREFIX}:referrers`),
    redis.hgetall<Record<string, unknown>>(`${PREFIX}:countries`),
    redis.hgetall<Record<string, unknown>>(`${PREFIX}:devices`),
    redis.get<string>(`${PREFIX}:updatedAt`),
  ]);

  return {
    updatedAt: updatedAt || today(),
    visitors: Number(totals?.visitors) || 0,
    pageViews: Number(totals?.pageViews) || 0,
    pages: topItems(pages),
    referrers: topItems(referrers),
    countries: topItems(countries),
    devices: topItems(devices, 4),
  };
}
