import "server-only";

import { unzipSync } from "fflate";
import type { StudioProject } from "@/lib/studio-data";

type GitHubArtifact = {
  id: number;
  name: string;
  expired: boolean;
  expires_at: string;
  workflow_run: { head_sha: string } | null;
};

type PreviewArchive = {
  files: Record<string, Uint8Array>;
  expiresAt: number;
};

const archiveCache = new Map<number, PreviewArchive>();
const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_WARM_ARCHIVES = 2;

export function studioPreviewArtifactName(projectSlug: string, commit: string) {
  return `Studio-Web-${projectSlug}-${commit}`;
}

export function studioGithubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Mahmoud-Studio",
  };
}

export async function loadStudioPreviewFile(project: StudioProject, commit: string, requestedAsset: string[], token: string) {
  const repository = project.repository.replace("https://github.com/", "");
  const artifactName = studioPreviewArtifactName(project.slug, commit);
  const listUrl = new URL(`https://api.github.com/repos/${repository}/actions/artifacts`);
  listUrl.searchParams.set("per_page", "10");
  listUrl.searchParams.set("name", artifactName);

  const artifactResponse = await fetch(listUrl, {
    headers: studioGithubHeaders(token),
    cache: "no-store",
  });
  if (!artifactResponse.ok) throw new Error(`GitHub artifact lookup failed (${artifactResponse.status})`);

  const artifacts = ((await artifactResponse.json()) as { artifacts: GitHubArtifact[] }).artifacts;
  const artifact = artifacts.find((item) => !item.expired && item.name === artifactName && item.workflow_run?.head_sha === commit);
  if (!artifact) return null;

  const files = await loadArchive(repository, artifact.id, token);
  const asset = normalizeAssetPath(requestedAsset);
  const direct = files[asset];
  if (direct) return { artifact, asset, bytes: direct };

  const prefixedName = Object.keys(files).find((name) => name.endsWith(`/${asset}`));
  return prefixedName ? { artifact, asset, bytes: files[prefixedName] } : null;
}

async function loadArchive(repository: string, artifactId: number, token: string) {
  const now = Date.now();
  const warm = archiveCache.get(artifactId);
  if (warm && warm.expiresAt > now) return warm.files;

  const response = await fetch(`https://api.github.com/repos/${repository}/actions/artifacts/${artifactId}/zip`, {
    headers: studioGithubHeaders(token),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub artifact download failed (${response.status})`);

  const files = unzipSync(new Uint8Array(await response.arrayBuffer()));
  archiveCache.set(artifactId, { files, expiresAt: now + CACHE_TTL_MS });
  while (archiveCache.size > MAX_WARM_ARCHIVES) {
    const oldest = archiveCache.keys().next().value;
    if (oldest === undefined) break;
    archiveCache.delete(oldest);
  }
  return files;
}

function normalizeAssetPath(parts: string[]) {
  const asset = parts.length ? parts.join("/") : "index.html";
  if (!asset || asset.includes("..") || asset.includes("\\") || asset.startsWith("/")) throw new Error("Invalid preview asset path");
  return asset.endsWith("/") ? `${asset}index.html` : asset;
}

export function previewContentType(asset: string) {
  const extension = asset.split(".").pop()?.toLowerCase();
  return ({
    css: "text/css; charset=utf-8",
    gif: "image/gif",
    html: "text/html; charset=utf-8",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "text/javascript; charset=utf-8",
    json: "application/json; charset=utf-8",
    map: "application/json; charset=utf-8",
    png: "image/png",
    svg: "image/svg+xml",
    txt: "text/plain; charset=utf-8",
    webmanifest: "application/manifest+json; charset=utf-8",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    zip: "application/zip",
  } as Record<string, string>)[extension ?? ""] ?? "application/octet-stream";
}
