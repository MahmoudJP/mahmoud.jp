"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  CheckCircle2,
  Clock3,
  Download,
  FileJson,
  History,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import type { StudioProject } from "@/lib/studio-data";
import type { StudioRecord } from "@/lib/studio-store";

type ActivityProps = {
  projects: StudioProject[];
  records: StudioRecord[];
  setRecords: Dispatch<SetStateAction<StudioRecord[]>>;
  query?: string;
};

type ActivityDraft = Omit<StudioRecord, "id" | "createdAt" | "updatedAt">;

const statuses = ["completed", "in-progress", "blocked", "note", "archived"];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyActivity(projectSlug = ""): ActivityDraft {
  return {
    category: "activity",
    title: "",
    projectSlug: projectSlug || null,
    status: "completed",
    summary: "",
    details: {
      date: today(),
      objective: "",
      changes: "",
      outcome: "",
      validation: "",
      commits: "",
      nextStep: "",
    },
    tags: [],
  };
}

function activityDate(record: StudioRecord) {
  return record.details.date || record.updatedAt.slice(0, 10);
}

function displayDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildMemoryMarkdown(records: StudioRecord[], projects: StudioProject[]) {
  const activities = records
    .filter((record) => record.category === "activity")
    .sort((a, b) => activityDate(b).localeCompare(activityDate(a)));
  const projectMap = new Map(projects.map((project) => [project.slug, project]));
  const grouped = new Map<string, StudioRecord[]>();
  activities.forEach((record) => {
    const key = record.projectSlug ?? "global";
    grouped.set(key, [...(grouped.get(key) ?? []), record]);
  });

  const lines = [
    "# Mahmoud Studio — Collaboration Memory",
    "",
    `Exported: ${new Date().toISOString()}`,
    `Entries: ${activities.length}`,
    "",
    "This file records meaningful work completed with AI. It is grouped by project and intentionally excludes passwords, tokens, and other credentials.",
  ];

  [...grouped.entries()]
    .sort(([a], [b]) => {
      if (a === "global") return -1;
      if (b === "global") return 1;
      return (projectMap.get(a)?.name ?? a).localeCompare(projectMap.get(b)?.name ?? b);
    })
    .forEach(([slug, entries]) => {
      const project = projectMap.get(slug);
      lines.push("", `## ${project?.name ?? "Studio-wide / Global"}`);
      if (project) {
        lines.push(`Repository: ${project.repository}`, `Branch: ${project.branch}`, "");
      }
      entries.forEach((record) => {
        lines.push(
          `### ${activityDate(record)} — ${record.title}`,
          "",
          `Status: ${record.status}`,
          `Tags: ${record.tags.join(", ") || "None"}`,
          "",
          record.summary || "No summary recorded.",
        );
        [
          ["Objective", record.details.objective],
          ["What changed", record.details.changes],
          ["Outcome", record.details.outcome],
          ["Validation", record.details.validation],
          ["Commits / versions", record.details.commits],
          ["Next step", record.details.nextStep],
        ].forEach(([label, value]) => {
          if (value) lines.push("", `**${label}:** ${value}`);
        });
        lines.push("");
      });
    });

  lines.push(
    "## Instructions for the next AI session",
    "",
    "- Use this memory as history, not as proof that current code is unchanged.",
    "- Verify the latest GitHub branch and working tree before editing.",
    "- Preserve the distinction between latest code, stable checkpoint, and live release.",
    "- Add a new Activity Log entry after meaningful work, including validation and the best next step.",
  );
  return lines.join("\n");
}

export function StudioActivityLog({ projects, records, setRecords, query = "" }: ActivityProps) {
  const [projectFilter, setProjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ActivityDraft>(emptyActivity());
  const [busy, setBusy] = useState(false);

  const allActivities = useMemo(
    () => records
      .filter((record) => record.category === "activity")
      .sort((a, b) => activityDate(b).localeCompare(activityDate(a)) || b.updatedAt.localeCompare(a.updatedAt)),
    [records],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allActivities.filter((record) => {
      const matchesProject = !projectFilter || (projectFilter === "global" ? !record.projectSlug : record.projectSlug === projectFilter);
      const matchesStatus = !statusFilter || record.status === statusFilter;
      const matchesQuery = !needle || JSON.stringify(record).toLowerCase().includes(needle);
      return matchesProject && matchesStatus && matchesQuery;
    });
  }, [allActivities, projectFilter, query, statusFilter]);

  const groups = useMemo(() => {
    const definitions = [
      { slug: "global", name: "Studio-wide", initials: "ST", project: null as StudioProject | null },
      ...projects.map((project) => ({ slug: project.slug, name: project.name, initials: project.initials, project })),
    ];
    return definitions
      .map((definition) => ({
        ...definition,
        entries: visible.filter((record) => definition.slug === "global" ? !record.projectSlug : record.projectSlug === definition.slug),
      }))
      .filter((group) => group.entries.length)
      .sort((a, b) => activityDate(b.entries[0]).localeCompare(activityDate(a.entries[0])));
  }, [projects, visible]);

  const completed = allActivities.filter((record) => record.status === "completed").length;
  const linkedProjects = new Set(allActivities.map((record) => record.projectSlug).filter(Boolean)).size;

  function beginNew() {
    setEditingId(null);
    setDraft(emptyActivity(projectFilter === "global" ? "" : projectFilter));
    setEditorOpen(true);
  }

  function beginEdit(record: StudioRecord) {
    setEditingId(record.id);
    setDraft({
      category: "activity",
      title: record.title,
      projectSlug: record.projectSlug,
      status: record.status,
      summary: record.summary,
      details: { ...emptyActivity().details, ...record.details },
      tags: record.tags,
    });
    setEditorOpen(true);
  }

  function updateDetail(key: string, value: string) {
    setDraft((current) => ({ ...current, details: { ...current.details, [key]: value } }));
  }

  async function saveActivity() {
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
      setRecords((current) => editingId
        ? current.map((item) => item.id === record.id ? record : item)
        : [record, ...current]);
      setEditorOpen(false);
    } finally {
      setBusy(false);
    }
  }

  function downloadMarkdown() {
    downloadFile(
      `mahmoud-studio-memory-${today()}.md`,
      buildMemoryMarkdown(allActivities, projects),
      "text/markdown;charset=utf-8",
    );
  }

  function downloadJson() {
    downloadFile(
      `mahmoud-studio-memory-backup-${today()}.json`,
      JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), activities: allActivities }, null, 2),
      "application/json;charset=utf-8",
    );
  }

  return (
    <div className="studio-system-page studio-memory-page">
      <header className="studio-system-heading studio-memory-heading">
        <div>
          <p className="studio-kicker">YOUR WORK MEMORY</p>
          <h1>Activity Log</h1>
          <p>Every meaningful session with AI, preserved as clear project history you can understand, search, edit, and take anywhere.</p>
        </div>
        <div className="studio-heading-actions">
          <button className="secondary" onClick={downloadJson}><FileJson size={15} /> Backup JSON</button>
          <button className="secondary" onClick={downloadMarkdown}><Download size={15} /> Download memory</button>
          <button onClick={beginNew}><Plus size={15} /> Record session</button>
        </div>
      </header>

      <section className="studio-memory-summary">
        <article><History size={18} /><span><small>Memory entries</small><strong>{allActivities.length}</strong></span></article>
        <article><CheckCircle2 size={18} /><span><small>Completed</small><strong>{completed}</strong></span></article>
        <article><Tag size={18} /><span><small>Projects covered</small><strong>{linkedProjects}</strong></span></article>
        <article><Clock3 size={18} /><span><small>Latest memory</small><strong>{allActivities[0] ? displayDate(activityDate(allActivities[0])) : "—"}</strong></span></article>
      </section>

      <section className="studio-memory-toolbar" aria-label="Filter activity memory">
        <span><Search size={14} /> Browse memory</span>
        <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} aria-label="Filter memory by project">
          <option value="">All projects</option>
          <option value="global">Studio-wide</option>
          {projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter memory by status">
          <option value="">All statuses</option>
          {statuses.map((status) => <option key={status}>{status}</option>)}
        </select>
        <strong>{visible.length} shown</strong>
        {(projectFilter || statusFilter) && <button onClick={() => { setProjectFilter(""); setStatusFilter(""); }}>Reset</button>}
      </section>

      <div className="studio-memory-groups">
        {groups.map((group) => (
          <section className="studio-memory-group" key={group.slug}>
            <header>
              <span>{group.initials}</span>
              <div><h2>{group.name}</h2><p>{group.project?.repository ?? "Cross-project Studio decisions and milestones"}</p></div>
              <b>{group.entries.length}</b>
            </header>
            <div className="studio-memory-timeline">
              {group.entries.map((record) => (
                <article key={record.id}>
                  <div className="studio-memory-date"><i /><time dateTime={activityDate(record)}>{displayDate(activityDate(record))}</time></div>
                  <div className="studio-memory-card">
                    <header>
                      <div><span className={`record-status status-${record.status}`}>{record.status}</span>{record.tags.slice(0, 3).map((tag) => <small key={tag}>#{tag}</small>)}</div>
                      <button onClick={() => beginEdit(record)} aria-label={`Edit ${record.title}`}><Pencil size={13} /></button>
                    </header>
                    <h3>{record.title}</h3>
                    <p className="studio-memory-lead">{record.summary || "No summary recorded yet."}</p>
                    <div className="studio-memory-details">
                      {record.details.objective && <div><small>Objective</small><p>{record.details.objective}</p></div>}
                      {record.details.changes && <div><small>What changed</small><p>{record.details.changes}</p></div>}
                      {record.details.outcome && <div><small>Outcome</small><p>{record.details.outcome}</p></div>}
                      {record.details.validation && <div><small>Validation</small><p>{record.details.validation}</p></div>}
                    </div>
                    {(record.details.commits || record.details.nextStep) && <footer>
                      {record.details.commits && <span><small>Commits / versions</small><code>{record.details.commits}</code></span>}
                      {record.details.nextStep && <span><small>Best next step</small><p>{record.details.nextStep}</p></span>}
                    </footer>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        {!groups.length && <div className="studio-system-empty"><History size={28} /><strong>No memory matches this view.</strong><p>Clear the filters or record the first work session for this project.</p><button onClick={beginNew}><Plus size={14} /> Record session</button></div>}
      </div>

      <aside className="studio-memory-safety"><ShieldCheck size={16} /><div><strong>Private, portable memory</strong><p>Entries are stored in the same private Redis workspace. Markdown is best for ChatGPT or Codex; JSON is the complete machine-readable backup. Never record passwords, tokens, or credentials.</p></div></aside>

      {editorOpen && (
        <div className="studio-record-modal">
          <button className="studio-record-backdrop" onClick={() => setEditorOpen(false)} aria-label="Close activity editor" />
          <section className="studio-record-editor studio-memory-editor">
            <header><div><p className="studio-kicker">{editingId ? "EDIT MEMORY" : "NEW MEMORY"}</p><h2>{editingId ? "Update work session" : "Record work session"}</h2></div><button onClick={() => setEditorOpen(false)} aria-label="Close"><X size={17} /></button></header>
            <div className="studio-record-form-grid">
              <label>Title<input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="What did we accomplish?" /></label>
              <label>Work date<input type="date" value={draft.details.date ?? ""} onChange={(event) => updateDetail("date", event.target.value)} /></label>
              <label>Project<select value={draft.projectSlug ?? ""} onChange={(event) => setDraft((current) => ({ ...current, projectSlug: event.target.value || null }))}><option value="">Studio-wide / global</option>{projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}</select></label>
              <label>Status<select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
              <label className="wide">Tags<input value={draft.tags.join(", ")} onChange={(event) => setDraft((current) => ({ ...current, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) }))} placeholder="deployment, bug-fix, learning" /></label>
            </div>
            <label>Quick summary<textarea value={draft.summary} onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))} placeholder="The short version you want to understand at a glance." /></label>
            <div className="studio-record-form-grid">
              <label className="wide">Objective<textarea value={draft.details.objective ?? ""} onChange={(event) => updateDetail("objective", event.target.value)} placeholder="What did you ask for and why?" /></label>
              <label className="wide">What changed<textarea value={draft.details.changes ?? ""} onChange={(event) => updateDetail("changes", event.target.value)} placeholder="Features, files, decisions, and fixes." /></label>
              <label className="wide">Outcome<textarea value={draft.details.outcome ?? ""} onChange={(event) => updateDetail("outcome", event.target.value)} placeholder="What is now working or understood?" /></label>
              <label className="wide">Validation<textarea value={draft.details.validation ?? ""} onChange={(event) => updateDetail("validation", event.target.value)} placeholder="Tests, builds, deployment checks, and evidence." /></label>
              <label>Commits / versions<input value={draft.details.commits ?? ""} onChange={(event) => updateDetail("commits", event.target.value)} placeholder="abc1234, PR #12, v1.2.0" /></label>
              <label>Best next step<input value={draft.details.nextStep ?? ""} onChange={(event) => updateDetail("nextStep", event.target.value)} placeholder="Where should the next session continue?" /></label>
            </div>
            <p className="studio-sensitive-note"><ShieldCheck size={14} /> Keep the useful context, but never paste passwords, API keys, OAuth tokens, or private credentials.</p>
            <footer><span><ShieldCheck size={13} /> Saved to private Studio memory</span><button disabled={!draft.title.trim() || busy} onClick={() => void saveActivity()}><Save size={14} /> {busy ? "Saving…" : "Save memory"}</button></footer>
          </section>
        </div>
      )}
    </div>
  );
}
