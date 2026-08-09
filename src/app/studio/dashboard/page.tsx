import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { StudioDashboard } from "./StudioDashboard";

export const dynamic = "force-dynamic";

export default async function StudioDashboardPage() {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) redirect("/studio/login");

  return (
    <StudioDashboard
      user={{
        name: session?.user?.name ?? "Mahmoud",
        email: session?.user?.email ?? "",
      }}
    />
  );
}
