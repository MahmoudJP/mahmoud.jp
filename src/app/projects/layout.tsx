import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Mahmoud Adel",
  description:
    "Projects by Mahmoud Adel, including tools for multilingual DTP, translation quality control, Arabic layout checks, and localization workflows.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Mahmoud Adel",
    description:
      "Tools and experiments for multilingual DTP, translation quality control, and localization workflows.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
