import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { isStudioOwnerEmail, studioAuthOptions } from "@/lib/studio-auth";
import { CloudOpsSyncPanel } from "./CloudOpsSyncPanel";

export const dynamic = "force-dynamic";

export default async function CloudOpsSyncPage() {
  const session = await getServerSession(studioAuthOptions);
  if (!isStudioOwnerEmail(session?.user?.email)) redirect("/studio/login");
  return <main className="min-h-screen bg-[#070b12] px-4 py-8 text-white sm:px-8"><div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Mahmoud Studio · Secure service</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">CloudOps Coach Sync</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">Pair private app installations, inspect the encrypted vault state, and rotate access without exposing study data or AWS credentials.</p></div><Link href="/studio" className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-black text-slate-200 hover:bg-white/5">Back to Studio</Link></div><CloudOpsSyncPanel /></div></main>;
}
