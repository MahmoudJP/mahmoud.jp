import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: "Mahmoud Studio | Projects, Systems & Experiments",
  description: "A curated view of the products, tools, and systems Mahmoud builds across design, language, and technology.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Mahmoud Studio",
    description: "Projects, systems, and experiments across design, language, and technology.",
    url: "/studio",
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="studio-root">{children}</div>;
}
