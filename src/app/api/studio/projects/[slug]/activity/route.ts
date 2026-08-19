import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { studioProjects } from "@/lib/studio-data";

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string } | null;
  };
};

type GitHubArtifact = {
  id: number;
  name: string;
  size_in_bytes: number;
  expired: boolean;
  created_at: string;
  expires_at: string;
  workflow_run: { head_sha: string } | null;
};

function githubHeaders(token?: string) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Mahmoud-Studio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await context.params;
  const project = studioProjects.find((item) => item.slug === slug);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const repository = project.repository.replace("https://github.com/", "");
  const token = process.env.STUDIO_GITHUB_TOKEN;
  if (project.visibility === "Private" && !token) {
    return NextResponse.json({
      source: "snapshot",
      reason: "Add a read-only STUDIO_GITHUB_TOKEN to sync private repository edits and build files automatically.",
      commits: project.fallbackEdits.map((edit) => ({ ...edit, url: `${project.repository}/commit/${edit.commit}`, artifacts: [] })),
    });
  }

  const headers = githubHeaders(token);
  const commitsResponse = await fetch(`https://api.github.com/repos/${repository}/commits?sha=${encodeURIComponent(project.branch)}&per_page=12`, {
    headers,
    cache: "no-store",
  });

  if (!commitsResponse.ok) {
    return NextResponse.json({
      source: "snapshot",
      reason: `GitHub returned ${commitsResponse.status}; showing the last verified Studio snapshot.`,
      commits: project.fallbackEdits.map((edit) => ({ ...edit, url: `${project.repository}/commit/${edit.commit}`, artifacts: [] })),
    });
  }

  const commits = await commitsResponse.json() as GitHubCommit[];
  let artifacts: GitHubArtifact[] = [];
  if (token) {
    const artifactsResponse = await fetch(`https://api.github.com/repos/${repository}/actions/artifacts?per_page=100`, {
      headers,
      cache: "no-store",
    });
    if (artifactsResponse.ok) artifacts = ((await artifactsResponse.json()) as { artifacts: GitHubArtifact[] }).artifacts;
  }

  return NextResponse.json({
    source: "github",
    reason: token ? null : "Public commit history is live. Build downloads require the read-only Studio GitHub connection.",
    commits: commits.map((item) => ({
      commit: item.sha.slice(0, 7),
      fullCommit: item.sha,
      date: item.commit.author?.date ?? "",
      title: item.commit.message.split("\n")[0],
      author: item.commit.author?.name ?? "Unknown",
      url: item.html_url,
      artifacts: artifacts
        .filter((artifact) => !artifact.expired && artifact.workflow_run?.head_sha === item.sha)
        .map((artifact) => ({
          id: artifact.id,
          name: artifact.name,
          kind: artifact.name === `Studio-Web-${project.slug}-${item.sha}` ? "web-preview" : "download",
          size: artifact.size_in_bytes,
          createdAt: artifact.created_at,
          expiresAt: artifact.expires_at,
        })),
    })),
  });
}
