"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ArrowRight,
  Box,
  Check,
  CheckCircle2,
  CircleDot,
  FolderGit2,
  Home,
  Inbox,
  Lightbulb,
  LogOut,
  Map,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { studioProjects, type StudioProject } from "@/lib/studio-data";

type Tab = "home" | "mind-map" | "projects" | "inbox";
type Note = {
  id: string;
  kind: "inbox" | "project";
  projectSlug: string | null;
  title: string;
  content: string;
  status: "open" | "done";
  createdAt: string;
  updatedAt: string;
};

const navigation = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "mind-map" as const, label: "Mind Map", icon: Map },
  { id: "projects" as const, label: "Projects", icon: FolderGit2 },
  { id: "inbox" as const, label: "Inbox", icon: Inbox },
];

function collectMapSnapshot() {
  const snapshot: Record<string, string> = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key && (key.startsWith("mm-") || key === "mind-map-v1")) snapshot[key] = localStorage.getItem(key) ?? "";
  }
  return snapshot;
}

export function StudioDashboard({ user }: { user: { name: string; email: string } }) {
  const [tab, setTab] = useState<Tab>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [capture, setCapture] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);
  const [query, setQuery] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [syncLabel, setSyncLabel] = useState("Connecting…");
  const lastMap = useRef("");

  const loadNotes = useCallback(async () => {
    try {
      const response = await fetch("/api/studio/notes", { cache: "no-store" });
      if (response.ok) setNotes(((await response.json()) as { notes: Note[] }).notes);
    } finally {
      setLoadingNotes(false);
    }
  }, []);

  useEffect(() => { void loadNotes(); }, [loadNotes]);

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

  async function addNote(title: string, projectSlug?: string) {
    const clean = title.trim();
    if (!clean) return;
    const response = await fetch("/api/studio/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: clean, kind: projectSlug ? "project" : "inbox", projectSlug: projectSlug ?? null }),
    });
    if (!response.ok) return;
    const { note } = (await response.json()) as { note: Note };
    setNotes((current) => [note, ...current]);
    setCapture("");
    setProjectIdea("");
  }

  async function toggleNote(note: Note) {
    const status = note.status === "done" ? "open" : "done";
    setNotes((current) => current.map((item) => item.id === note.id ? { ...item, status } : item));
    await fetch("/api/studio/notes", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: note.id, status }),
    });
  }

  function openTab(nextTab: Tab) {
    setTab(nextTab);
    setMobileNav(false);
  }

  const filteredProjects = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return studioProjects;
    return studioProjects.filter((project) => `${project.name} ${project.platform} ${project.state}`.toLowerCase().includes(value));
  }, [query]);

  const inboxNotes = notes.filter((note) => note.kind === "inbox");
  const openNotes = inboxNotes.filter((note) => note.status !== "done").length;
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
            return (
              <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => openTab(item.id)}>
                <Icon size={17} /> {item.label}
                {item.id === "inbox" && openNotes > 0 && <b>{openNotes}</b>}
              </button>
            );
          })}
        </nav>
        <div className="studio-sidebar-foot">
          <div><ShieldCheck size={14} /> Google protected</div>
          <Link href="/studio">Public Studio <ArrowRight size={13} /></Link>
        </div>
      </aside>
      {mobileNav && <button className="studio-nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <main className={`studio-dashboard-main ${tab === "mind-map" ? "map-open" : ""}`}>
        <header className="studio-topbar">
          <button className="studio-menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <label className="studio-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects and ideas…" /></label>
          <div className="studio-account"><span>{initials}</span><div><strong>{user.name}</strong><small>{user.email}</small></div><button onClick={() => void signOut({ callbackUrl: "/studio" })} aria-label="Sign out"><LogOut size={16} /></button></div>
        </header>

        {tab === "home" && (
          <div className="studio-dashboard-content">
            <section className="studio-dashboard-hero">
              <div><p className="studio-kicker">PRIVATE COMMAND CENTER</p><h1>Your work, in one calm place.</h1><p>Capture ideas, continue any project, and always know what is saved, stable, and live.</p></div>
              <button onClick={() => openTab("mind-map")}><Map size={17} /> Open mind map</button>
            </section>
            <form className="studio-capture" onSubmit={(event) => { event.preventDefault(); void addNote(capture); }}>
              <Plus size={18} /><input value={capture} onChange={(event) => setCapture(event.target.value)} placeholder="Capture an idea before it disappears…" /><button disabled={!capture.trim()}>Add to inbox</button>
            </form>
            <section className="studio-metrics">
              <article><span className="violet"><FolderGit2 size={17} /></span><div><small>Tracked projects</small><strong>{studioProjects.length}</strong><p>One source of truth</p></div></article>
              <article><span className="green"><CheckCircle2 size={17} /></span><div><small>Validated builds</small><strong>5</strong><p>Safe checkpoints</p></div></article>
              <article><span className="gold"><CircleDot size={17} /></span><div><small>Live products</small><strong>3</strong><p>Deliberately released</p></div></article>
              <article><span className="pink"><Inbox size={17} /></span><div><small>Inbox</small><strong>{openNotes}</strong><p>Waiting for review</p></div></article>
            </section>
            <div className="studio-home-grid">
              <section className="studio-panel">
                <div className="studio-panel-heading"><div><p className="studio-kicker">RECENT CHECKPOINTS</p><h2>Continue where you left off</h2></div><button onClick={() => openTab("projects")}>View all</button></div>
                <div className="studio-activity-list">
                  {studioProjects.slice(0, 5).map((project) => (
                    <button key={project.slug} onClick={() => setSelectedProject(project)}>
                      <span>{project.initials}</span><div><strong>{project.name}</strong><p>{project.latest}</p><small>{project.branch} · {project.commit}</small></div><ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </section>
              <section className="studio-panel studio-version-panel">
                <p className="studio-kicker">VERSION CLARITY</p><h2>Code is not production.</h2>
                <div className="studio-version-track"><div><i className="latest" /><span><small>Latest code</small><strong>Safe to continue</strong></span></div><div><i className="stable" /><span><small>Stable version</small><strong>Tested checkpoint</strong></span></div><div><i className="live" /><span><small>Live version</small><strong>Used by people</strong></span></div></div>
                <p className="studio-version-rule">A push saves your work. Nothing goes live until you explicitly choose it.</p>
              </section>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="studio-dashboard-content">
            <div className="studio-page-heading"><div><p className="studio-kicker">CODE & RELEASES</p><h1>Projects</h1><p>Latest code, stable checkpoints, and live releases in one view.</p></div><span>{filteredProjects.length} projects</span></div>
            <div className="studio-project-grid">
              {filteredProjects.map((project) => (
                <button className="studio-project-card" key={project.slug} onClick={() => setSelectedProject(project)}>
                  <div className="studio-project-top"><span>{project.initials}</span><b className={project.state === "Live" || project.state === "Active" ? "good" : ""}>{project.state}</b></div>
                  <h2>{project.name}</h2><p>{project.platform}</p>
                  <div className="studio-project-versions"><div><small>Latest code</small><strong>{project.commit}</strong></div><div><small>Stable</small><strong>{project.stable}</strong></div><div><small>Live</small><strong>{project.live}</strong></div></div>
                  <footer><span>{project.branch}</span><span>{project.updated} <ArrowRight size={12} /></span></footer>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "inbox" && (
          <div className="studio-dashboard-content studio-inbox-view">
            <div className="studio-page-heading"><div><p className="studio-kicker">QUICK CAPTURE</p><h1>Inbox</h1><p>A temporary home for thoughts before you connect them to a project or map.</p></div></div>
            <form className="studio-inbox-composer" onSubmit={(event) => { event.preventDefault(); void addNote(capture); }}><textarea value={capture} onChange={(event) => setCapture(event.target.value)} placeholder="What is on your mind?" /><div><span><ShieldCheck size={13} /> Saved privately</span><button disabled={!capture.trim()}>Capture idea</button></div></form>
            <section className="studio-notes-list">
              {loadingNotes && <div className="studio-empty">Loading your private inbox…</div>}
              {!loadingNotes && !inboxNotes.length && <div className="studio-empty"><Lightbulb size={24} /><strong>Your inbox is clear.</strong><p>Capture an idea above. You can organize it later.</p></div>}
              {inboxNotes.map((note) => <article key={note.id} className={note.status === "done" ? "done" : ""}><button onClick={() => void toggleNote(note)} aria-label="Toggle complete">{note.status === "done" && <Check size={14} />}</button><div><h3>{note.title}</h3><p>{new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p></div><span>{note.projectSlug ?? "Unsorted"}</span></article>)}
            </section>
          </div>
        )}

        {tab === "mind-map" && (
          <div className="studio-map-view"><div className="studio-map-strip"><div><p className="studio-kicker">THINKING SPACE</p><h1>Mind Map</h1></div><span className={syncLabel.includes("pending") ? "warn" : ""}><i /> {syncLabel}</span></div><div className="studio-map-frame">{mapReady ? <iframe src="/studio/mind-map/index.html" title="Mahmoud's private mind map" /> : <div>Preparing your private map…</div>}</div></div>
        )}
      </main>

      {selectedProject && (
        <div className="studio-drawer-shell"><button className="studio-drawer-backdrop" onClick={() => setSelectedProject(null)} aria-label="Close project details" /><aside className="studio-project-drawer">
          <button className="studio-drawer-close" onClick={() => setSelectedProject(null)} aria-label="Close"><X size={18} /></button>
          <div className="studio-drawer-title"><span>{selectedProject.initials}</span><div><p>{selectedProject.platform}</p><h2>{selectedProject.name}</h2></div></div>
          <div className="studio-drawer-status"><div><small>Latest saved code</small><strong>{selectedProject.latest}</strong><code>{selectedProject.commit} · {selectedProject.branch}</code></div><div><small>Stable checkpoint</small><strong>{selectedProject.stable}</strong></div><div><small>Currently live</small><strong>{selectedProject.live}</strong></div></div>
          <section className="studio-drawer-ideas"><p className="studio-kicker">PROJECT IDEAS</p><h3>Leave context for your next session</h3><form onSubmit={(event) => { event.preventDefault(); void addNote(projectIdea, selectedProject.slug); }}><textarea value={projectIdea} onChange={(event) => setProjectIdea(event.target.value)} placeholder={`Add an idea for ${selectedProject.name}…`} /><button disabled={!projectIdea.trim()}><Sparkles size={14} /> Save idea</button></form>{notes.filter((note) => note.projectSlug === selectedProject.slug).map((note) => <div className="studio-project-note" key={note.id}><Lightbulb size={13} /> {note.title}</div>)}</section>
          <p className="studio-drawer-rule"><Box size={14} /> Pushing code updates the latest checkpoint. Stable and live versions change only after your explicit approval.</p>
        </aside></div>
      )}
    </div>
  );
}
