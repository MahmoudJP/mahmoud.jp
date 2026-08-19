import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { studioProjects } from "@/lib/studio-data";
import { loadStudioPreviewFile, previewContentType } from "@/lib/studio-preview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; commit: string; asset?: string[] }> },
) {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, commit, asset = [] } = await context.params;
  const project = studioProjects.find((item) => item.slug === slug);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  if (!/^[a-f0-9]{40}$/i.test(commit)) return NextResponse.json({ error: "A full Git commit is required" }, { status: 400 });

  const token = process.env.STUDIO_GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "Studio private preview access is not connected yet" }, { status: 503 });

  try {
    const file = await loadStudioPreviewFile(project, commit.toLowerCase(), asset, token);
    if (!file) return NextResponse.json({ error: "Preview file not found or the preview has expired" }, { status: 404 });

    return new NextResponse(Buffer.from(file.bytes), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": previewContentType(file.asset),
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Preview could not be loaded";
    return NextResponse.json({ error: message }, { status: message.includes("Invalid") ? 400 : 502 });
  }
}
