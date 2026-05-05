import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing | Mahmoud Adel",
  description:
    "Notes by Mahmoud Adel on multilingual DTP, Arabic typesetting, Japanese-Arabic translation quality, localization, and practical production workflows.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | Mahmoud Adel",
    description:
      "Notes on multilingual DTP, Arabic typesetting, translation quality, and localization workflows.",
    url: `${siteUrl}/writing`,
    type: "website",
  },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
