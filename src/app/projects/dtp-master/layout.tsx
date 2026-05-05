import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "DTP Master | Mahmoud Adel",
  description:
    "A portfolio case-study page for DTP Master, a Windows toolkit in development for multilingual desktop publishing workflows.",
  alternates: {
    canonical: "/projects/dtp-master",
  },
  openGraph: {
    title: "DTP Master | Mahmoud Adel",
    description:
      "A portfolio case-study page for a Windows toolkit in development for multilingual desktop publishing workflows.",
    url: `${siteUrl}/projects/dtp-master`,
    type: "website",
  },
};

export default function DtpMasterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
