import type { Metadata } from "next";
import { JapanLifePrintApp } from "./JapanLifePrintApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Japan Life Print Pack | Mahmoud Studio",
  description: "Private printable Japan Life pack inside Mahmoud Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function StudioJapanLifePrintPage() {
  return <JapanLifePrintApp />;
}
