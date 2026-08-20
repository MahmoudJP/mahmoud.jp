import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const publicLiveProjects = {
  snake: { owner: "MahmoudJP", repository: "snake", branch: "main" },
  "mind-map": { owner: "MahmoudJP", repository: "mind-map", branch: "main" },
} as const;

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function safeAsset(parts: string[]) {
  const asset = parts.length ? parts.join("/") : "index.html";
  if (!asset || asset.startsWith("/") || asset.includes("..") || asset.includes("\\")) return null;
  return asset;
}

function contentType(asset: string) {
  const extension = asset.includes(".") ? `.${asset.split(".").pop()?.toLowerCase()}` : "";
  return contentTypes[extension] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; asset?: string[] }> },
) {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, asset: assetParts = [] } = await context.params;
  if (!(slug in publicLiveProjects)) {
    return NextResponse.json({ error: "Live project not found" }, { status: 404 });
  }

  const asset = safeAsset(assetParts);
  if (!asset) return NextResponse.json({ error: "Invalid asset path" }, { status: 400 });

  const project = publicLiveProjects[slug as keyof typeof publicLiveProjects];
  const rawUrl = `https://raw.githubusercontent.com/${project.owner}/${project.repository}/${project.branch}/${asset.split("/").map(encodeURIComponent).join("/")}`;
  const response = await fetch(rawUrl, { cache: "no-store", redirect: "error" });
  if (!response.ok) return NextResponse.json({ error: "Live asset not found" }, { status: response.status === 404 ? 404 : 502 });

  let body: ArrayBuffer | string = await response.arrayBuffer();
  if (asset.endsWith(".html")) {
    const html = new TextDecoder().decode(body);
    const base = `<base href="/studio/live/${encodeURIComponent(slug)}/">`;
    body = /<head(?:\s[^>]*)?>/i.test(html)
      ? html.replace(/<head(\s[^>]*)?>/i, (head) => `${head}${base}`)
      : `${base}${html}`;
  }

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": contentType(asset),
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
