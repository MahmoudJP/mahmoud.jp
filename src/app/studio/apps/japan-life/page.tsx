import type { Metadata } from "next";
import { JapanLifeApp } from "@/app/japan-life/JapanLifeApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Japan Life | Mahmoud Studio",
  description: "Private Arabic Japan life app inside Mahmoud Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function StudioJapanLifePage() {
  return <JapanLifeApp />;
}
