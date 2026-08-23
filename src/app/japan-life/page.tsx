import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  redirect("/studio/apps/japan-life");
}
