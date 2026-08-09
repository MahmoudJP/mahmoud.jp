import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: "Private Workspace | Mahmoud Studio",
  description: "Mahmoud's private project, version, notes, and mind-map workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="studio-root">{children}</div>;
}
