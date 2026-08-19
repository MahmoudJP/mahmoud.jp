"use client";

import { useEffect, useState } from "react";

type SyncStatus = {
  configured: boolean;
  revision: number;
  updatedAt: string | null;
  deviceName: string | null;
  bytes: number;
  backend: string;
};

export function CloudOpsSyncPanel() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    const response = await fetch("/api/studio/cloudops-sync", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load sync status.");
    setStatus(await response.json());
  };
  useEffect(() => {
    let active = true;
    fetch("/api/studio/cloudops-sync", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load sync status.");
        return response.json() as Promise<SyncStatus>;
      })
      .then((next) => { if (active) setStatus(next); })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Could not load sync status."); });
    return () => { active = false; };
  }, []);

  const rotate = async () => {
    if (status?.configured && !window.confirm("Rotating the key disconnects every currently paired device. Continue?")) return;
    setBusy(true); setError(""); setToken("");
    try {
      const response = await fetch("/api/studio/cloudops-sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "rotate-token" }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Could not create a sync key.");
      setToken(body.syncToken);
      setStatus(body.status);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not create a sync key."); }
    finally { setBusy(false); }
  };

  const revoke = async () => {
    if (!window.confirm("Revoke the key and disconnect every paired CloudOps Coach device? Encrypted data will stay stored.")) return;
    setBusy(true); setError(""); setToken("");
    try {
      const response = await fetch("/api/studio/cloudops-sync", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not revoke the sync key.");
      await refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not revoke the sync key."); }
    finally { setBusy(false); }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(token);
    window.alert("Sync key copied. Keep it private; it is shown only once.");
  };

  return <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Owner-only pairing</div>
      <h2 className="mt-2 text-2xl font-black text-white">Create a CloudOps Sync key</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">Google sign-in protects this page. The generated key authorizes one private sync vault. CloudOps Coach encrypts progress before upload, so Studio stores ciphertext rather than readable answers or study history.</p>
      <div className="mt-5 flex flex-wrap gap-3"><button disabled={busy} onClick={() => void rotate()} className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-black text-slate-950 disabled:opacity-50">{status?.configured ? "Rotate key" : "Generate key"}</button>{status?.configured && <button disabled={busy} onClick={() => void revoke()} className="rounded-xl border border-rose-400/30 px-4 py-2.5 text-sm font-black text-rose-200 disabled:opacity-50">Revoke key</button>}</div>
      {token && <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4"><div className="text-xs font-black text-emerald-300">Copy now — this key will not be shown again</div><code className="mt-3 block break-all rounded-xl bg-black/30 p-3 text-xs text-emerald-100">{token}</code><button onClick={() => void copy()} className="mt-3 rounded-lg bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950">Copy sync key</button></div>}
      {error && <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-3 text-sm text-rose-200">{error}</div>}
    </section>
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">Vault status</div>
      <div className="mt-5 grid gap-3 text-sm text-slate-300"><Status label="Pairing key" value={status?.configured ? "Active" : "Not configured"} /><Status label="Revision" value={String(status?.revision ?? 0)} /><Status label="Last device" value={status?.deviceName ?? "No upload yet"} /><Status label="Last sync" value={status?.updatedAt ? new Date(status.updatedAt).toLocaleString() : "No upload yet"} /><Status label="Encrypted size" value={formatBytes(status?.bytes ?? 0)} /><Status label="Storage" value={status?.backend ?? "Loading…"} /></div>
      <div className="mt-5 rounded-xl border border-sky-400/20 bg-sky-400/[0.06] p-4 text-xs leading-6 text-slate-300">On every device, open CloudOps Coach → Settings → Studio Sync, paste this key, and choose a separate encryption password. The key and password serve different purposes.</div>
    </section>
  </div>;
}

function Status({ label, value }: { label: string; value: string }) { return <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"><span className="text-slate-500">{label}</span><strong className="text-right text-white">{value}</strong></div>; }
function formatBytes(bytes: number) { return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`; }
