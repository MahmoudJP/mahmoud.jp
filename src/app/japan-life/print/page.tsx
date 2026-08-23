import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "نسخة طباعة دليل اليابان للعرب | Mahmoud Adel",
  description:
    "نسخة طباعة/PDF من دليل اليابان للعرب: قوائم تجهيز، جمل يابانية، مساجد، مطاعم حلال، وروابط رسمية.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/japan-life/print",
  },
};

export default async function JapanLifePrintPage() {
  redirect("/studio/apps/japan-life/print");
}
