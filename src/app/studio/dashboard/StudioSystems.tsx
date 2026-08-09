"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  HeartPulse,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { studioProjects, type StudioProject } from "@/lib/studio-data";
import type { StudioDocument, StudioNote, StudioRecord, StudioRecordCategory } from "@/lib/studio-store";
import { buildProjectAIStarter } from "./StudioProjects";

type RecordsProps = {
  records: StudioRecord[];
  setRecords: React.Dispatch<React.SetStateAction<StudioRecord[]>>;
  query?: string;
};

type Field = { key: string; label: string; placeholder: string; kind?: "date" | "url" | "number" | "textarea" };

const configs: Record<StudioRecordCategory, {
  kicker: string;
  title: string;
  description: string;
  icon: typeof Activity;
  statuses: string[];
  fields: Field[];
}> = {
  decision: {
    kicker: "DECISION LOG",
    title: "Decisions",
    description: "Record what was chosen, why it was chosen, and what it replaces. This preserves reasoning for you and AI.",
    icon: CheckCircle2,
    statuses: ["proposed", "current", "superseded"],
    fields: [
      { key: "context", label: "Context", placeholder: "What situation required a decision?", kind: "textarea" },
      { key: "decision", label: "Decision", placeholder: "What exactly did you choose?", kind: "textarea" },
      { key: "rationale", label: "Rationale", placeholder: "Why is this the best choice?", kind: "textarea" },
      { key: "alternatives", label: "Alternatives considered", placeholder: "Other options and why they were rejected", kind: "textarea" },
      { key: "consequences", label: "Consequences", placeholder: "Trade-offs, risks, and follow-up work", kind: "textarea" },
    ],
  },
  health: {
    kicker: "SYSTEM RELIABILITY",
    title: "Health",
    description: "Track project checks, domains, backups, certificates, and anything that should stay healthy.",
    icon: HeartPulse,
    statuses: ["healthy", "warning", "down", "paused"],
    fields: [
      { key: "checkUrl", label: "Check URL", placeholder: "https://example.com/health", kind: "url" },
      { key: "lastChecked", label: "Last checked", placeholder: "", kind: "date" },
      { key: "nextCheck", label: "Next check", placeholder: "", kind: "date" },
      { key: "response", label: "Result / response", placeholder: "What was verified?", kind: "textarea" },
    ],
  },
  automation: {
    kicker: "REPEATABLE WORK",
    title: "Automations",
    description: "A registry of scripts, scheduled jobs, integrations, and their latest outcome.",
    icon: Bot,
    statuses: ["active", "paused", "failing", "planned"],
    fields: [
      { key: "trigger", label: "Trigger / schedule", placeholder: "Daily at 09:00 or on push" },
      { key: "system", label: "System", placeholder: "GitHub Actions, Vercel, Codex…" },
      { key: "lastRun", label: "Last run", placeholder: "", kind: "date" },
      { key: "nextRun", label: "Next run", placeholder: "", kind: "date" },
      { key: "result", label: "Last result", placeholder: "Output, failure, or follow-up", kind: "textarea" },
    ],
  },
  asset: {
    kicker: "ASSET LIBRARY",
    title: "Assets",
    description: "Keep source links and usage context for designs, builds, documents, media, and reusable files.",
    icon: FileArchive,
    statuses: ["current", "draft", "archived"],
    fields: [
      { key: "kind", label: "Asset type", placeholder: "Logo, installer, document, image…" },
      { key: "version", label: "Version", placeholder: "v1.0.0" },
      { key: "sourceUrl", label: "Private source URL", placeholder: "Drive, GitHub, Vercel Blob…", kind: "url" },
      { key: "usage", label: "Usage and rights", placeholder: "Where it is used and any restrictions", kind: "textarea" },
    ],
  },
  career: {
    kicker: "CAREER EVIDENCE",
    title: "Career",
    description: "Turn work into evidence: achievements, measurable impact, applications, learning, and CV-ready stories.",
    icon: BriefcaseBusiness,
    statuses: ["active", "ready", "submitted", "completed", "archived"],
    fields: [
      { key: "kind", label: "Entry type", placeholder: "Achievement, application, learning, CV story…" },
      { key: "organization", label: "Organization", placeholder: "Company, client, or course" },
      { key: "date", label: "Date", placeholder: "", kind: "date" },
      { key: "impact", label: "Evidence / impact", placeholder: "Result, metric, link, or proof", kind: "textarea" },
    ],
  },
  finance: {
    kicker: "FINANCE OVERVIEW",
    title: "Finance & Subscriptions",
    description: "Track costs and renewals without storing card numbers, passwords, bank credentials, or secret keys.",
    icon: CircleDollarSign,
    statuses: ["active", "trial", "cancelled", "expired", "one-time"],
    fields: [
      { key: "kind", label: "Type", placeholder: "Subscription, domain, software, service…" },
      { key: "amount", label: "Amount", placeholder: "1200", kind: "number" },
      { key: "currency", label: "Currency", placeholder: "JPY" },
      { key: "frequency", label: "Billing frequency", placeholder: "Monthly, yearly, one-time…" },
      { key: "renewalDate", label: "Renewal date", placeholder: "", kind: "date" },
      { key: "providerUrl", label: "Provider URL", placeholder: "Account or billing page", kind: "url" },
    ],
  },
};

const emptyRecord = (category: StudioRecordCategory): Omit<StudioRecord, "id" | "createdAt" | "updatedAt"> => ({
  category,
  title: "",
  projectSlug: null,
  status: configs[category].statuses[0],
  summary: "",
  details: {},
  tags: [],
});

function formatDate(value: string) {
  if (!value) return "Not set";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function safeExternalUrl(value: string | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

export function StudioRecordsPanel({ category, records, setRecords, query = "" }: RecordsProps & { category: StudioRecordCategory }) {
  const config = configs[category];
  const Icon = config.icon;
  const [draft, setDraft] = useState(emptyRecord(category));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => record.category === category && (!needle || JSON.stringify(record).toLowerCase().includes(needle)));
  }, [category, query, records]);

  function newRecord() {
    setEditingId(null);
    setDraft(emptyRecord(category));
    setEditorOpen(true);
  }

  function editRecord(record: StudioRecord) {
    setEditingId(record.id);
    setDraft({ category, title: record.title, projectSlug: record.projectSlug, status: record.status, summary: record.summary, details: record.details, tags: record.tags });
    setEditorOpen(true);
  }

  async function saveRecord() {
    if (!draft.title.trim() || busy) return;
    setBusy(true);
    try {
      const response = await fetch("/api/studio/records", {
        method: editingId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...draft, ...(editingId ? { id: editingId } : {}) }),
      });
      if (!response.ok) return;
      const { record } = (await response.json()) as { record: StudioRecord };
      setRecords((current) => editingId ? current.map((item) => item.id === record.id ? record : item) : [record, ...current]);
      setEditorOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function removeRecord(record: StudioRecord) {
    if (!window.confirm(`Delete “${record.title}”?`)) return;
    const response = await fetch(`/api/studio/records?id=${encodeURIComponent(record.id)}`, { method: "DELETE" });
    if (response.ok) setRecords((current) => current.filter((item) => item.id !== record.id));
  }

  return (
    <div className="studio-system-page">
      <header className="studio-system-heading">
        <div><p className="studio-kicker">{config.kicker}</p><h1>{config.title}</h1><p>{config.description}</p></div>
        <button onClick={newRecord}><Plus size={16} /> Add {category}</button>
      </header>

      <section className="studio-system-summary">
        <article><Icon size={18} /><span><small>Total records</small><strong>{visible.length}</strong></span></article>
        <article><CheckCircle2 size={18} /><span><small>Active / current</small><strong>{visible.filter((record) => ["active", "current", "healthy", "ready"].includes(record.status)).length}</strong></span></article>
        <article><CalendarClock size={18} /><span><small>Project-linked</small><strong>{visible.filter((record) => record.projectSlug).length}</strong></span></article>
      </section>

      <section className="studio-record-grid">
        {visible.map((record) => {
          const project = studioProjects.find((item) => item.slug === record.projectSlug);
          const link = safeExternalUrl(record.details.sourceUrl || record.details.providerUrl || record.details.checkUrl);
          return (
            <article className="studio-record-card" key={record.id}>
              <header><span className={`record-status status-${record.status}`}>{record.status}</span><div><button onClick={() => editRecord(record)} aria-label="Edit"><Pencil size={13} /></button><button onClick={() => void removeRecord(record)} aria-label="Delete"><Trash2 size={13} /></button></div></header>
              <p className="studio-kicker">{project?.name ?? "GLOBAL"}</p>
              <h2>{record.title}</h2>
              <p>{record.summary || "No summary yet."}</p>
              <dl>{config.fields.filter((field) => record.details[field.key]).slice(0, 3).map((field) => <div key={field.key}><dt>{field.label}</dt><dd>{field.kind === "date" ? formatDate(record.details[field.key]) : record.details[field.key]}</dd></div>)}</dl>
              <footer><span>Updated {formatDate(record.updatedAt)}</span>{link && <a href={link} target="_blank" rel="noreferrer">Open <ExternalLink size={12} /></a>}</footer>
            </article>
          );
        })}
        {!visible.length && <div className="studio-system-empty"><Icon size={28} /><strong>No {config.title.toLowerCase()} yet.</strong><p>Add the first structured record. It will become part of your Studio context.</p><button onClick={newRecord}><Plus size={14} /> Add first record</button></div>}
      </section>

      {editorOpen && (
        <div className="studio-record-modal"><button className="studio-record-backdrop" onClick={() => setEditorOpen(false)} aria-label="Close editor" /><section className="studio-record-editor">
          <header><div><p className="studio-kicker">{editingId ? "EDIT RECORD" : "NEW RECORD"}</p><h2>{config.title}</h2></div><button onClick={() => setEditorOpen(false)}><X size={17} /></button></header>
          <div className="studio-record-form-grid">
            <label>Title<input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder={`Name this ${category}`} /></label>
            <label>Status<select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}>{config.statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <label>Project<select value={draft.projectSlug ?? ""} onChange={(event) => setDraft((current) => ({ ...current, projectSlug: event.target.value || null }))}><option value="">Global / personal</option>{studioProjects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}</select></label>
            <label>Tags<input value={draft.tags.join(", ")} onChange={(event) => setDraft((current) => ({ ...current, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) }))} placeholder="important, renewal, portfolio" /></label>
          </div>
          <label>Summary<textarea value={draft.summary} onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))} placeholder="A short explanation that is useful at a glance and to AI." /></label>
          <div className="studio-record-form-grid">{config.fields.map((field) => <label key={field.key} className={field.kind === "textarea" ? "wide" : ""}>{field.label}{field.kind === "textarea" ? <textarea value={draft.details[field.key] ?? ""} onChange={(event) => setDraft((current) => ({ ...current, details: { ...current.details, [field.key]: event.target.value } }))} placeholder={field.placeholder} /> : <input type={field.kind === "date" ? "date" : field.kind === "number" ? "number" : field.kind === "url" ? "url" : "text"} value={draft.details[field.key] ?? ""} onChange={(event) => setDraft((current) => ({ ...current, details: { ...current.details, [field.key]: event.target.value } }))} placeholder={field.placeholder} />}</label>)}</div>
          {category === "finance" && <p className="studio-sensitive-note"><ShieldCheck size={14} /> Store only cost and renewal metadata—never card numbers, bank details, passwords, or API keys.</p>}
          <footer><span><ShieldCheck size={13} /> Private Studio storage</span><button disabled={!draft.title.trim() || busy} onClick={() => void saveRecord()}><Save size={14} /> {busy ? "Saving…" : "Save record"}</button></footer>
        </section></div>
      )}
    </div>
  );
}

export function StudioOperations({ records, setRecords, query = "" }: RecordsProps) {
  const [section, setSection] = useState<"health" | "automation" | "analytics">("health");
  const [storage, setStorage] = useState<{ backend: string; bytes: number; keys: number; counts: { notes: number; documents: number; records: number; mindMapValues: number } } | null>(null);
  const health = records.filter((record) => record.category === "health");
  const automations = records.filter((record) => record.category === "automation");
  const totalFinance = records.filter((record) => record.category === "finance" && record.status === "active").length;
  useEffect(() => {
    fetch("/api/studio/storage", { cache: "no-store" })
      .then(async (response) => response.ok ? await response.json() : null)
      .then((usage) => { if (usage) setStorage(usage); })
      .catch(() => undefined);
  }, []);
  const storageLabel = storage ? storage.bytes < 1024 * 1024
    ? `${(storage.bytes / 1024).toFixed(1)} KB`
    : `${(storage.bytes / 1024 / 1024).toFixed(2)} MB`
    : "Measuring…";
  return (
    <div className="studio-operations">
      <nav className="studio-subtabs" aria-label="Operations sections">
        <button className={section === "health" ? "active" : ""} onClick={() => setSection("health")}><HeartPulse size={14} /> Health</button>
        <button className={section === "automation" ? "active" : ""} onClick={() => setSection("automation")}><Bot size={14} /> Automations</button>
        <button className={section === "analytics" ? "active" : ""} onClick={() => setSection("analytics")}><Activity size={14} /> Analytics</button>
      </nav>
      {section === "health" && <StudioRecordsPanel category="health" records={records} setRecords={setRecords} query={query} />}
      {section === "automation" && <StudioRecordsPanel category="automation" records={records} setRecords={setRecords} query={query} />}
      {section === "analytics" && <div className="studio-system-page"><header className="studio-system-heading"><div><p className="studio-kicker">STUDIO ANALYTICS & CAPACITY</p><h1>Analytics</h1><p>Portfolio activity, private data size, hosting footprint, and whether the current free plans are still enough.</p></div></header><section className="studio-analytics-grid"><article><small>Project portfolio</small><strong>{studioProjects.length}</strong><p>{studioProjects.filter((project) => project.state === "Live" || project.state === "Active").length} live or active</p></article><article><small>System health</small><strong>{health.filter((record) => record.status === "healthy").length}/{health.length || 0}</strong><p>Checks currently healthy</p></article><article><small>Automations</small><strong>{automations.filter((record) => record.status === "active").length}</strong><p>{automations.filter((record) => record.status === "failing").length} need attention</p></article><article><small>Active subscriptions</small><strong>{totalFinance}</strong><p>Tracked in Finance</p></article><article><small>Hosting account</small><strong>Hobby</strong><p>Vercel · $0/month · personal use</p></article><article><small>Current deployment</small><strong>13.63 MB</strong><p>Largest server function · 5.77 MB public assets</p></article><article><small>Private Studio data</small><strong>{storageLabel}</strong><p>{storage?.backend ?? "Upstash Redis"} · {storage?.keys ?? 4} logical keys</p></article><article><small>Runnable build storage</small><strong>Not connected</strong><p>GitHub Actions artifacts will be used only when a test build exists</p></article></section><div className="studio-insight"><ShieldCheck size={20} /><div><strong>No paid hosting subscription is needed now.</strong><p>The dashboard data is tiny compared with the 256 MB free Redis allowance, and the deployed website is well within Vercel Hobby limits. Review again when automated desktop builds or public traffic grow.</p></div></div></div>}
    </div>
  );
}

export function StudioHandoffPanel({
  documents,
  notes,
  records,
  projects = studioProjects,
  initialProject = "",
}: {
  documents: StudioDocument[];
  notes: StudioNote[];
  records: StudioRecord[];
  projects?: StudioProject[];
  initialProject?: string;
}) {
  const [projectSlug, setProjectSlug] = useState(initialProject || projects[0]?.slug || "");
  const [copied, setCopied] = useState(false);
  const project = projects.find((item) => item.slug === projectSlug) ?? projects[0];
  const projectDocs = documents.filter((document) => document.projectSlug === project?.slug);
  const projectWork = notes.filter((note) => note.projectSlug === project?.slug && note.workflow !== "done");
  const decisions = records.filter((record) => record.category === "decision" && record.projectSlug === project?.slug && record.status !== "superseded");
  const health = records.filter((record) => record.category === "health" && record.projectSlug === project?.slug);

  const handoff = useMemo(
    () => project ? buildProjectAIStarter(project, notes, documents, records) : "",
    [documents, notes, project, records],
  );

  async function copyHandoff() {
    await navigator.clipboard.writeText(handoff);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadHandoff() {
    const blob = new Blob([handoff], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${project?.slug ?? "project"}-ai-starter.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return <div className="studio-system-page studio-handoff-page">
    <header className="studio-system-heading"><div><p className="studio-kicker">CONTINUE ON ANY DEVICE</p><h1>AI Project Starter</h1><p>A complete, project-wide file with repository access, safe clone and update commands, release state, open work, decisions, knowledge, and health.</p></div><div className="studio-heading-actions"><button onClick={() => void copyHandoff()}><Copy size={15} /> {copied ? "Copied" : "Copy starter"}</button><button className="secondary" onClick={downloadHandoff}><Download size={15} /> Download .md</button></div></header>
    <label className="studio-handoff-project">Project<select value={projectSlug} onChange={(event) => setProjectSlug(event.target.value)}>{projects.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
    <section className="studio-handoff-stats"><article><small>Open work</small><strong>{projectWork.length}</strong></article><article><small>Knowledge docs</small><strong>{projectDocs.length}</strong></article><article><small>Current decisions</small><strong>{decisions.length}</strong></article><article><small>Health checks</small><strong>{health.length}</strong></article></section>
    <div className="studio-handoff-preview"><header><span><Sparkles size={14} /> AI-ready Markdown</span><small>Secrets are intentionally excluded</small></header><pre>{handoff}</pre></div>
  </div>;
}
