"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ArrowRight,
  Activity,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  FileArchive,
  FolderGit2,
  Home,
  Layers3,
  ListTodo,
  LogOut,
  Map,
  Menu,
  Pencil,
  Plus,
  Rocket,
  BriefcaseBusiness,
  CircleDollarSign,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { studioProjects, type StudioProject } from "@/lib/studio-data";
import { StudioHandoffPanel, StudioOperations, StudioRecordsPanel } from "./StudioSystems";
import { StudioProjectsWorkspace } from "./StudioProjects";
import type {
  StudioDocument,
  StudioDocumentType,
  StudioNote,
  StudioPriority,
  StudioRecord,
  StudioWorkflow,
} from "@/lib/studio-store";

type Tab = "home" | "projects" | "work" | "mind-map" | "knowledge" | "operations" | "assets" | "career" | "finance";
type KnowledgeMode = "docs" | "decisions" | "handoff";
type DocumentDraft = Pick<StudioDocument, "title" | "projectSlug" | "type" | "summary" | "content" | "tags">;

const navigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "projects" as const, label: "Projects", icon: Layers3 },
  { id: "work" as const, label: "Inbox & Work", icon: ListTodo },
  { id: "mind-map" as const, label: "Mind Map", icon: Map },
  { id: "knowledge" as const, label: "Knowledge", icon: BookOpen },
  { id: "operations" as const, label: "Operations", icon: Activity },
  { id: "assets" as const, label: "Assets", icon: FileArchive },
  { id: "career" as const, label: "Career", icon: BriefcaseBusiness },
  { id: "finance" as const, label: "Finance", icon: CircleDollarSign },
];

const workflows: { id: StudioWorkflow; label: string; hint: string }[] = [
  { id: "inbox", label: "Inbox", hint: "Unsorted thoughts" },
  { id: "next", label: "Next", hint: "Ready to start" },
  { id: "doing", label: "Doing", hint: "Active work" },
  { id: "waiting", label: "Waiting", hint: "Blocked or paused" },
  { id: "done", label: "Done", hint: "Completed" },
];

const documentTypes: { id: StudioDocumentType; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "setup", label: "Setup" },
  { id: "architecture", label: "Architecture" },
  { id: "decision", label: "Decision" },
  { id: "runbook", label: "Runbook" },
  { id: "reference", label: "Reference" },
  { id: "handoff", label: "AI Handoff" },
];

const emptyDocument: DocumentDraft = {
  title: "",
  projectSlug: null,
  type: "reference",
  summary: "",
  content: "# Context\n\n# Important details\n\n# Next actions",
  tags: [],
};

function collectMapSnapshot() {
  const snapshot: Record<string, string> = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key && (key.startsWith("mm-") || key === "mind-map-v1")) snapshot[key] = localStorage.getItem(key) ?? "";
  }
  return snapshot;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderKnowledge(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("### ")) return <h4 key={index}>{line.slice(4)}</h4>;
    if (line.startsWith("## ")) return <h3 key={index}>{line.slice(3)}</h3>;
    if (line.startsWith("# ")) return <h2 key={index}>{line.slice(2)}</h2>;
    if (line.startsWith("- ")) return <div className="studio-doc-bullet" key={index}><i /> <span>{line.slice(2)}</span></div>;
    if (!line.trim()) return <div className="studio-doc-space" key={index} />;
    return <p key={index}>{line}</p>;
  });
}

function buildAIContext(document: StudioDocument, projects: StudioProject[]) {
  const project = projects.find((item) => item.slug === document.projectSlug);
  return [
    "# Mahmoud Studio — AI Knowledge Context",
    "",
    `Document: ${document.title}`,
    `Type: ${document.type}`,
    `Status: ${document.status}`,
    `Project: ${project?.name ?? "Global"}`,
    `Updated: ${document.updatedAt}`,
    `Tags: ${document.tags.join(", ") || "None"}`,
    "",
    "## Summary",
    document.summary || "No summary provided.",
    ...(project ? [
      "",
      "## Related project state",
      `Repository label: ${project.name}`,
      `Platform: ${project.platform}`,
      `Branch: ${project.branch}`,
      `Latest remote checkpoint: ${project.commit} — ${project.latest}`,
      `Stable checkpoint: ${project.stable}`,
      `Live version: ${project.live}`,
      `State: ${project.state}`,
    ] : []),
    "",
    "## Knowledge",
    document.content,
    "",
    "## Instructions for the AI",
    "- Treat latest code, stable checkpoint, and live version as separate states.",
    "- Read repository instructions and verify the working tree before changing code.",
    "- Never deploy, publish, release, or roll back without Mahmoud's explicit approval.",
    "- Preserve existing work and report assumptions clearly.",
  ].join("\n");
}

export function StudioDashboard({ user, deploymentCommit }: { user: { name: string; email: string }; deploymentCommit?: string }) {
  const projects = useMemo(() => studioProjects.map((project) => project.slug === "mahmoud-jp" && deploymentCommit
    ? { ...project, commit: deploymentCommit, latest: "Project run center and capacity audit deployed" }
    : project), [deploymentCommit]);
  const [tab, setTab] = useState<Tab>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [notes, setNotes] = useState<StudioNote[]>([]);
  const [documents, setDocuments] = useState<StudioDocument[]>([]);
  const [records, setRecords] = useState<StudioRecord[]>([]);
  const [knowledgeMode, setKnowledgeMode] = useState<KnowledgeMode>("docs");
  const [capture, setCapture] = useState("");
  const [captureProject, setCaptureProject] = useState("");
  const [capturePriority, setCapturePriority] = useState<StudioPriority>("medium");
  const [selectedProject, setSelectedProject] = useState<StudioProject>(projects[0]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [documentDraft, setDocumentDraft] = useState<DocumentDraft>(emptyDocument);
  const [editingDocument, setEditingDocument] = useState(false);
  const [knowledgeProject, setKnowledgeProject] = useState("");
  const [query, setQuery] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [copyLabel, setCopyLabel] = useState("Copy AI context");
  const [mapReady, setMapReady] = useState(false);
  const [syncLabel, setSyncLabel] = useState("Connecting…");
  const lastMap = useRef("");

  const loadNotes = useCallback(async () => {
    try {
      const response = await fetch("/api/studio/notes", { cache: "no-store" });
      if (response.ok) setNotes(((await response.json()) as { notes: StudioNote[] }).notes);
    } finally {
      setLoadingNotes(false);
    }
  }, []);

  const loadDocuments = useCallback(async () => {
    try {
      const response = await fetch("/api/studio/documents", { cache: "no-store" });
      if (response.ok) {
        const items = ((await response.json()) as { documents: StudioDocument[] }).documents;
        setDocuments(items);
        setSelectedDocumentId((current) => current ?? items[0]?.id ?? null);
      }
    } finally {
      setLoadingDocuments(false);
    }
  }, []);

  const loadRecords = useCallback(async () => {
    try {
      const response = await fetch("/api/studio/records", { cache: "no-store" });
      if (response.ok) setRecords(((await response.json()) as { records: StudioRecord[] }).records);
    } catch {
      // The other Studio areas remain usable while private storage reconnects.
    }
  }, []);

  useEffect(() => {
    void loadNotes();
    void loadDocuments();
    const recordsTimer = window.setTimeout(() => void loadRecords(), 0);
    return () => window.clearTimeout(recordsTimer);
  }, [loadNotes, loadDocuments, loadRecords]);

  useEffect(() => {
    let active = true;
    async function restoreMap() {
      try {
        const response = await fetch("/api/studio/mind-map", { cache: "no-store" });
        if (!response.ok) throw new Error("Map unavailable");
        const data = (await response.json()) as { snapshot: Record<string, string> | null };
        if (data.snapshot) {
          Object.entries(data.snapshot).forEach(([key, value]) => localStorage.setItem(key, value));
          lastMap.current = JSON.stringify(data.snapshot);
          setSyncLabel("Synced from private storage");
        } else {
          setSyncLabel("Ready for first cloud backup");
        }
      } catch {
        setSyncLabel("Local mode · cloud retry pending");
      } finally {
        if (active) setMapReady(true);
      }
    }
    void restoreMap();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    const timer = window.setInterval(async () => {
      const snapshot = collectMapSnapshot();
      const serialized = JSON.stringify(snapshot);
      if (!Object.keys(snapshot).length || serialized === lastMap.current) return;
      setSyncLabel("Saving changes…");
      try {
        const response = await fetch("/api/studio/mind-map", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ snapshot }),
        });
        if (!response.ok) throw new Error("Save failed");
        lastMap.current = serialized;
        setSyncLabel("All changes saved");
      } catch {
        setSyncLabel("Saved locally · cloud retry pending");
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [mapReady]);

  async function addNote(
    title: string,
    projectSlug?: string,
    workflow: StudioWorkflow = "inbox",
    priority: StudioPriority = "medium",
  ) {
    const clean = title.trim();
    if (!clean) return;
    const response = await fetch("/api/studio/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: clean,
        kind: projectSlug ? "project" : workflow === "inbox" ? "inbox" : "task",
        projectSlug: projectSlug ?? null,
        workflow,
        priority,
      }),
    });
    if (!response.ok) return;
    const { note } = (await response.json()) as { note: StudioNote };
    setNotes((current) => [note, ...current]);
    setCapture("");
  }

  async function updateNote(note: StudioNote, updates: Partial<StudioNote>) {
    const optimistic = { ...note, ...updates };
    setNotes((current) => current.map((item) => item.id === note.id ? optimistic : item));
    const response = await fetch("/api/studio/notes", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: note.id, ...updates }),
    });
    if (response.ok) {
      const { note: saved } = (await response.json()) as { note: StudioNote };
      setNotes((current) => current.map((item) => item.id === saved.id ? saved : item));
    } else {
      setNotes((current) => current.map((item) => item.id === note.id ? note : item));
    }
  }

  async function deleteNote(note: StudioNote) {
    if (!window.confirm(`Delete “${note.title}”?`)) return;
    setNotes((current) => current.filter((item) => item.id !== note.id));
    await fetch(`/api/studio/notes?id=${encodeURIComponent(note.id)}`, { method: "DELETE" });
  }

  function openTab(nextTab: Tab) {
    setTab(nextTab);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function openKnowledgeForProject(project: StudioProject) {
    setKnowledgeProject(project.slug);
    setKnowledgeMode("docs");
    openTab("knowledge");
  }

  function openHandoffForProject(project: StudioProject) {
    setKnowledgeProject(project.slug);
    setKnowledgeMode("handoff");
    openTab("knowledge");
  }

  function openWorkForProject(project: StudioProject) {
    setCaptureProject(project.slug);
    openTab("work");
  }

  function beginNewDocument() {
    setDocumentDraft({ ...emptyDocument, projectSlug: knowledgeProject || null });
    setSelectedDocumentId(null);
    setEditingDocument(true);
  }

  function beginEditDocument(document: StudioDocument) {
    setDocumentDraft({
      title: document.title,
      projectSlug: document.projectSlug,
      type: document.type,
      summary: document.summary,
      content: document.content,
      tags: document.tags,
    });
    setEditingDocument(true);
  }

  async function saveDocument() {
    if (!documentDraft.title.trim()) return;
    const existing = documents.find((document) => document.id === selectedDocumentId);
    const response = await fetch("/api/studio/documents", {
      method: existing ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...(existing ? { id: existing.id } : {}),
        ...documentDraft,
      }),
    });
    if (!response.ok) return;
    const { document } = (await response.json()) as { document: StudioDocument };
    setDocuments((current) => existing
      ? current.map((item) => item.id === document.id ? document : item)
      : [document, ...current]);
    setSelectedDocumentId(document.id);
    setEditingDocument(false);
  }

  async function deleteDocument(document: StudioDocument) {
    if (["studio-operating-guide", "ai-handoff-protocol", "project-run-readiness-guide"].includes(document.id)) return;
    if (!window.confirm(`Delete “${document.title}”?`)) return;
    await fetch(`/api/studio/documents?id=${encodeURIComponent(document.id)}`, { method: "DELETE" });
    const remaining = documents.filter((item) => item.id !== document.id);
    setDocuments(remaining);
    setSelectedDocumentId(remaining[0]?.id ?? null);
  }

  async function copyAIContext(document: StudioDocument) {
    await navigator.clipboard.writeText(buildAIContext(document, projects));
    setCopyLabel("Copied for AI");
    window.setTimeout(() => setCopyLabel("Copy AI context"), 1800);
  }

  function downloadAIContext(document: StudioDocument) {
    const blob = new Blob([buildAIContext(document, projects)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${document.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "knowledge"}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const filteredProjects = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return projects;
    return projects.filter((project) => `${project.name} ${project.platform} ${project.state} ${project.latest} ${project.stable} ${project.live}`.toLowerCase().includes(value));
  }, [projects, query]);

  const filteredDocuments = useMemo(() => {
    const value = query.trim().toLowerCase();
    return documents.filter((document) => {
      const projectMatches = !knowledgeProject || document.projectSlug === knowledgeProject;
      const textMatches = !value || `${document.title} ${document.summary} ${document.content} ${document.tags.join(" ")}`.toLowerCase().includes(value);
      return projectMatches && textMatches;
    });
  }, [documents, knowledgeProject, query]);

  const selectedDocument = documents.find((document) => document.id === selectedDocumentId) ?? filteredDocuments[0] ?? null;
  const activeWork = notes.filter((note) => note.workflow === "doing").length;
  const openWork = notes.filter((note) => note.workflow !== "done").length;
  const inboxCount = notes.filter((note) => note.workflow === "inbox").length;
  const liveProjects = projects.filter((project) => project.state === "Live" || project.state === "Active").length;
  const initials = user.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "MA";

  return (
    <div className="studio-dashboard-shell">
      <aside className={`studio-sidebar ${mobileNav ? "open" : ""}`}>
        <button className="studio-close-nav" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button>
        <button className="studio-brand" onClick={() => openTab("home")}>
          <span>M</span><div><strong>Mahmoud Studio</strong><small>Private workspace</small></div>
        </button>
        <nav aria-label="Workspace navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const count = item.id === "work" ? openWork : item.id === "knowledge" ? documents.length + records.filter((record) => record.category === "decision").length : 0;
            return (
              <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => openTab(item.id)}>
                <Icon size={17} /> {item.label}
                {count > 0 && <b>{count}</b>}
              </button>
            );
          })}
        </nav>
        <div className="studio-sidebar-foot">
          <div><ShieldCheck size={14} /> Google protected</div>
          <Link href="/">Portfolio <ArrowRight size={13} /></Link>
        </div>
      </aside>
      {mobileNav && <button className="studio-nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <main className={`studio-dashboard-main ${tab === "mind-map" ? "map-open" : ""}`}>
        <header className="studio-topbar">
          <button className="studio-menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <label className="studio-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the current workspace…" /></label>
          <div className="studio-account"><span>{initials}</span><div><strong>{user.name}</strong><small>{user.email}</small></div><button onClick={() => void signOut({ callbackUrl: "/studio" })} aria-label="Sign out"><LogOut size={16} /></button></div>
        </header>

        {tab === "home" && (
          <div className="studio-dashboard-content">
            <section className="studio-dashboard-hero">
              <div><p className="studio-kicker">PRIVATE COMMAND CENTER</p><h1>See what matters. Continue quickly.</h1><p>Start with a project, understand its current code and live version, then move directly to the next action without searching across tools.</p></div>
              <button onClick={() => openTab("work")}><Plus size={17} /> Capture work</button>
            </section>
            <form className="studio-capture" onSubmit={(event) => { event.preventDefault(); void addNote(capture); }}>
              <Plus size={18} /><input value={capture} onChange={(event) => setCapture(event.target.value)} placeholder="Capture an idea before it disappears…" /><button disabled={!capture.trim()}>Add to inbox</button>
            </form>
            <section className="studio-metrics">
              <article><span className="violet"><FolderGit2 size={17} /></span><div><small>Projects</small><strong>{projects.length}</strong><p>With release context</p></div></article>
              <article><span className="green"><Rocket size={17} /></span><div><small>Live products</small><strong>{liveProjects}</strong><p>Deliberately released</p></div></article>
              <article><span className="gold"><ListTodo size={17} /></span><div><small>Active work</small><strong>{activeWork}</strong><p>{inboxCount} waiting in inbox</p></div></article>
              <article><span className="pink"><BookOpen size={17} /></span><div><small>Knowledge</small><strong>{documents.length + records.filter((record) => record.category === "decision").length}</strong><p>Docs and decisions</p></div></article>
            </section>
            <div className="studio-home-grid">
              <section className="studio-panel">
                <div className="studio-panel-heading"><div><p className="studio-kicker">PROJECT SHORTCUTS</p><h2>Choose a project and continue</h2></div><button onClick={() => openTab("projects")}>Open catalog</button></div>
                <div className="studio-activity-list">
                  {projects.slice(0, 5).map((project) => (
                    <button key={project.slug} onClick={() => { setSelectedProject(project); openTab("projects"); }}>
                      <span>{project.initials}</span><div><strong>{project.name}</strong><p>{project.latest}</p><small>{project.branch} · {project.commit}</small></div><ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </section>
              <section className="studio-panel studio-version-panel">
                <p className="studio-kicker">RELEASE RULE</p><h2>Code is not production.</h2>
                <div className="studio-version-track"><div><i className="latest" /><span><small>Latest code</small><strong>Saved remotely</strong></span></div><div><i className="stable" /><span><small>Stable checkpoint</small><strong>Tested and trusted</strong></span></div><div><i className="live" /><span><small>Live version</small><strong>Used by people</strong></span></div></div>
                <p className="studio-version-rule">A push saves progress. Stable and live move only after your explicit approval.</p>
              </section>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <StudioProjectsWorkspace
            projects={filteredProjects.length ? filteredProjects : projects}
            activeProject={filteredProjects.find((project) => project.slug === selectedProject.slug) ?? filteredProjects[0] ?? selectedProject}
            notes={notes}
            documents={documents}
            records={records}
            onSelect={setSelectedProject}
            onOpenKnowledge={openKnowledgeForProject}
            onOpenHandoff={openHandoffForProject}
            onOpenWork={openWorkForProject}
            onAddWork={async (title, project) => { await addNote(title, project.slug, "next"); }}
          />
        )}

        {tab === "work" && (
          <div className="studio-dashboard-content studio-work-view">
            <div className="studio-page-heading"><div><p className="studio-kicker">INBOX & WORK</p><h1>Capture once. Organize here.</h1><p>Raw thoughts and actionable work live together, then move through a clear workflow without creating another system.</p></div><span>{openWork} open</span></div>
            <form className="studio-work-composer" onSubmit={(event) => { event.preventDefault(); void addNote(capture, captureProject || undefined, "inbox", capturePriority); }}>
              <textarea value={capture} onChange={(event) => setCapture(event.target.value)} placeholder="Capture an idea, task, bug, reminder, or question…" />
              <div className="studio-work-fields">
                <select value={captureProject} onChange={(event) => setCaptureProject(event.target.value)} aria-label="Project">
                  <option value="">No project yet</option>
                  {projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}
                </select>
                <select value={capturePriority} onChange={(event) => setCapturePriority(event.target.value as StudioPriority)} aria-label="Priority">
                  <option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option>
                </select>
                <span><ShieldCheck size={13} /> Saved privately</span>
                <button disabled={!capture.trim()}>Capture</button>
              </div>
            </form>
            {loadingNotes ? <div className="studio-empty">Loading your private work…</div> : (
              <div className="studio-work-board">
                {workflows.map((lane) => {
                  const laneNotes = notes.filter((note) => note.workflow === lane.id);
                  return <section className={`studio-work-lane lane-${lane.id}`} key={lane.id}>
                    <header><div><strong>{lane.label}</strong><small>{lane.hint}</small></div><b>{laneNotes.length}</b></header>
                    <div className="studio-work-cards">
                      {!laneNotes.length && <p className="studio-lane-empty">Nothing here</p>}
                      {laneNotes.map((note) => {
                        const project = projects.find((item) => item.slug === note.projectSlug);
                        return <article key={note.id}>
                          <div className="studio-work-card-meta"><span className={`priority-${note.priority}`}>{note.priority}</span><small>{project?.name ?? "Unsorted"}</small></div>
                          <h3>{note.title}</h3>
                          <p>{formatDate(note.updatedAt)}</p>
                          <footer>
                            {lane.id === "inbox" && <button onClick={() => void updateNote(note, { workflow: "next" })}>Plan <ArrowRight size={11} /></button>}
                            {lane.id === "next" && <button onClick={() => void updateNote(note, { workflow: "doing" })}>Start <ArrowRight size={11} /></button>}
                            {lane.id === "doing" && <><button onClick={() => void updateNote(note, { workflow: "waiting" })}>Wait</button><button className="complete" onClick={() => void updateNote(note, { workflow: "done" })}><Check size={11} /> Done</button></>}
                            {lane.id === "waiting" && <button onClick={() => void updateNote(note, { workflow: "doing" })}>Resume <ArrowRight size={11} /></button>}
                            {lane.id === "done" && <button onClick={() => void updateNote(note, { workflow: "next" })}>Reopen</button>}
                            <button className="trash" onClick={() => void deleteNote(note)} aria-label="Delete"><Trash2 size={12} /></button>
                          </footer>
                        </article>;
                      })}
                    </div>
                  </section>;
                })}
              </div>
            )}
          </div>
        )}

        {tab === "knowledge" && <nav className="studio-subtabs studio-knowledge-tabs" aria-label="Knowledge sections"><button className={knowledgeMode === "docs" ? "active" : ""} onClick={() => setKnowledgeMode("docs")}><FileText size={14} /> Docs</button><button className={knowledgeMode === "decisions" ? "active" : ""} onClick={() => setKnowledgeMode("decisions")}><CheckCircle2 size={14} /> Decisions</button><button className={knowledgeMode === "handoff" ? "active" : ""} onClick={() => setKnowledgeMode("handoff")}><Sparkles size={14} /> AI Handoff</button></nav>}

        {tab === "knowledge" && knowledgeMode === "docs" && (
          <div className="studio-knowledge-view">
            <aside className="studio-knowledge-browser">
              <div className="studio-knowledge-browser-head"><div><p className="studio-kicker">KNOWLEDGE / DOCS</p><h1>Knowledge</h1></div><button onClick={beginNewDocument} aria-label="New document"><Plus size={16} /></button></div>
              <select value={knowledgeProject} onChange={(event) => { setKnowledgeProject(event.target.value); setSelectedDocumentId(null); }} aria-label="Filter by project">
                <option value="">All knowledge</option>
                {projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}
              </select>
              <div className="studio-document-list">
                {loadingDocuments && <p>Loading knowledge…</p>}
                {!loadingDocuments && !filteredDocuments.length && <p>No documents match this view.</p>}
                {filteredDocuments.map((document) => {
                  const project = projects.find((item) => item.slug === document.projectSlug);
                  return <button className={selectedDocument?.id === document.id && !editingDocument ? "active" : ""} key={document.id} onClick={() => { setSelectedDocumentId(document.id); setEditingDocument(false); }}>
                    <FileText size={15} /><span><strong>{document.title}</strong><small>{project?.name ?? "Global"} · {document.type}</small></span>
                  </button>;
                })}
              </div>
              <div className="studio-ai-ready"><Sparkles size={14} /><span><strong>AI-ready context</strong><small>Structured, portable, and project-aware.</small></span></div>
            </aside>

            <section className="studio-document-panel">
              {editingDocument ? (
                <div className="studio-document-editor">
                  <header><div><p className="studio-kicker">DOCUMENT EDITOR</p><h2>{selectedDocumentId ? "Edit knowledge" : "New knowledge"}</h2></div><button onClick={() => setEditingDocument(false)}><X size={16} /></button></header>
                  <div className="studio-document-form-grid">
                    <label>Title<input value={documentDraft.title} onChange={(event) => setDocumentDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Clear document title" /></label>
                    <label>Type<select value={documentDraft.type} onChange={(event) => setDocumentDraft((current) => ({ ...current, type: event.target.value as StudioDocumentType }))}>{documentTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}</select></label>
                    <label>Project<select value={documentDraft.projectSlug ?? ""} onChange={(event) => setDocumentDraft((current) => ({ ...current, projectSlug: event.target.value || null }))}><option value="">Global knowledge</option>{projects.map((project) => <option key={project.slug} value={project.slug}>{project.name}</option>)}</select></label>
                    <label>Tags<input value={documentDraft.tags.join(", ")} onChange={(event) => setDocumentDraft((current) => ({ ...current, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) }))} placeholder="setup, release, ai" /></label>
                  </div>
                  <label>Summary<textarea className="summary" value={documentDraft.summary} onChange={(event) => setDocumentDraft((current) => ({ ...current, summary: event.target.value }))} placeholder="Explain what this document contains and when to use it." /></label>
                  <label>Markdown content<textarea className="content" value={documentDraft.content} onChange={(event) => setDocumentDraft((current) => ({ ...current, content: event.target.value }))} /></label>
                  <footer><span><ShieldCheck size={13} /> Private cloud storage</span><button disabled={!documentDraft.title.trim()} onClick={() => void saveDocument()}><Save size={14} /> Save document</button></footer>
                </div>
              ) : selectedDocument ? (
                <article className="studio-document-reader">
                  <header className="studio-document-toolbar">
                    <div><span className="studio-doc-type">{selectedDocument.type}</span><span>{selectedDocument.status}</span></div>
                    <div><button onClick={() => void copyAIContext(selectedDocument)}><Copy size={14} /> {copyLabel}</button><button onClick={() => downloadAIContext(selectedDocument)}><Download size={14} /> Markdown</button><button onClick={() => beginEditDocument(selectedDocument)}><Pencil size={14} /> Edit</button>{!["studio-operating-guide", "ai-handoff-protocol", "project-run-readiness-guide"].includes(selectedDocument.id) && <button className="danger" onClick={() => void deleteDocument(selectedDocument)}><Trash2 size={14} /></button>}</div>
                  </header>
                  <div className="studio-document-title"><p className="studio-kicker">HUMAN + AI KNOWLEDGE</p><h1>{selectedDocument.title}</h1><p>{selectedDocument.summary}</p><div>{selectedDocument.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="studio-document-body">{renderKnowledge(selectedDocument.content)}</div>
                  <footer className="studio-document-footer"><span>Updated {formatDate(selectedDocument.updatedAt)}</span><span><Sparkles size={13} /> AI context includes project and release state</span></footer>
                </article>
              ) : (
                <div className="studio-empty"><BookOpen size={24} /><strong>Your knowledge base is ready.</strong><p>Create a document or select one from the sidebar.</p><button onClick={beginNewDocument}>Create document</button></div>
              )}
            </section>
          </div>
        )}

        {tab === "knowledge" && knowledgeMode === "decisions" && <StudioRecordsPanel category="decision" records={records} setRecords={setRecords} query={query} />}
        {tab === "knowledge" && knowledgeMode === "handoff" && <StudioHandoffPanel documents={documents} notes={notes} records={records} projects={projects} initialProject={knowledgeProject} />}

        {tab === "operations" && <StudioOperations records={records} setRecords={setRecords} query={query} />}
        {tab === "assets" && <StudioRecordsPanel category="asset" records={records} setRecords={setRecords} query={query} />}
        {tab === "career" && <StudioRecordsPanel category="career" records={records} setRecords={setRecords} query={query} />}
        {tab === "finance" && <StudioRecordsPanel category="finance" records={records} setRecords={setRecords} query={query} />}

        {tab === "mind-map" && (
          <div className="studio-map-view"><div className="studio-map-strip"><div><p className="studio-kicker">THINKING SPACE</p><h1>Mind Map</h1></div><span className={syncLabel.includes("pending") ? "warn" : ""}><i /> {syncLabel}</span></div><div className="studio-map-frame">{mapReady ? <iframe src="/studio/mind-map/index.html" title="Mahmoud's private mind map" /> : <div>Preparing your private map…</div>}</div></div>
        )}
      </main>

    </div>
  );
}
