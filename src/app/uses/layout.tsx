import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uses | Mahmoud Adel",
  description:
    "The software, languages, and workflow Mahmoud Adel uses for multilingual DTP, translation quality control, interpretation, and development.",
  alternates: {
    canonical: "/uses",
  },
  openGraph: {
    title: "Uses | Mahmoud Adel",
    description:
      "Tools and workflow for multilingual DTP, translation QC, interpretation, and development.",
    url: `${siteUrl}/uses`,
    type: "website",
  },
};

export default function UsesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
