import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { GoogleSignInButton } from "./GoogleSignInButton";

export const metadata: Metadata = {
  title: "Owner Access | Mahmoud Studio",
  robots: { index: false, follow: false },
};

export default async function StudioLoginPage() {
  const session = await getServerSession(studioAuthOptions);
  if (isStudioOwnerEmail(session?.user?.email)) redirect("/studio/dashboard");

  return (
    <main className="studio-login-page">
      <Link href="/studio" className="studio-back"><ArrowLeft size={15} /> Back to Studio</Link>
      <section className="studio-login-card">
        <div className="studio-login-icon"><LockKeyhole size={24} /></div>
        <p className="studio-kicker">PRIVATE WORKSPACE</p>
        <h1>Owner access</h1>
        <p>Sign in with the approved Google account to open private ideas, project notes, versions, and the mind map.</p>
        <GoogleSignInButton />
        <div className="studio-login-security"><ShieldCheck size={15} /><span>Other Google accounts are denied automatically.</span></div>
      </section>
      <p className="studio-login-foot">The public Studio remains available without signing in.</p>
    </main>
  );
}
