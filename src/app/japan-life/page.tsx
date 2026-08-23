import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { JapanLifeApp } from "./JapanLifeApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Japan Life | Private Mahmoud Studio App",
  description: "Private Arabic Japan life workspace for Mahmoud Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/japan-life",
  },
};

export default async function JapanLifePage() {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) {
    redirect("/studio/login?callbackUrl=/japan-life");
  }

  return <JapanLifeApp />;
}
