import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { studioProjects } from "@/lib/studio-data";

export async function GET(_request: Request, context: { params: Promise<{ slug: string; artifactId: string }> }) {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, artifactId } = await context.params;
  const project = studioProjects.find((item) => item.slug === slug);
  const token = process.env.STUDIO_GITHUB_TOKEN;
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  if (!token) return NextResponse.json({ error: "Private build downloads are not connected yet." }, { status: 503 });
  if (!/^\d+$/.test(artifactId)) return NextResponse.json({ error: "Invalid artifact" }, { status: 400 });

  const repository = project.repository.replace("https://github.com/", "");
  const response = await fetch(`https://api.github.com/repos/${repository}/actions/artifacts/${artifactId}/zip`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Mahmoud-Studio",
    },
    redirect: "manual",
    cache: "no-store",
  });

  const location = response.headers.get("location");
  if (location) return NextResponse.redirect(location);
  return NextResponse.json({ error: "The build file is unavailable or expired." }, { status: response.status || 404 });
}
