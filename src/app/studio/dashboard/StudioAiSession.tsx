"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  CheckCircle2,
  Clipboard,
  Clock3,
  Download,
  ExternalLink,
  FileDown,
  GitBranch,
  Play,
  Save,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { StudioProject } from "@/lib/studio-data";
import type { StudioRecord } from "@/lib/studio-store";

type Props = {
  project: StudioProject;
  activeSession: StudioRecord | null;
  starter: string;
  records: StudioRecord[];
  setRecords: Dispatch<SetStateAction<StudioRecord[]>>;
  onClose: () => void;
};

const sessionModes = [
  { id: "continue", label: "Continue work", hint: "Resume from the latest saved context." },
  { id: "feature", label: "Build a feature", hint: "Add a new capability without losing current behavior." },
  { id: "fix", label: "Fix a problem", hint: "Diagnose first, then repair and verify." },
  { id: "review", label: "Review & improve", hint: "Audit quality, UX, safety, and missing work." },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildSessionPack(project: StudioProject, session: StudioRecord, starter: string) {
  return [
    "# Mahmoud Studio — Active AI Session",
    "",
    `Session ID: ${session.id}`,
    `Started: ${session.details.startedAt || session.createdAt}`,
    `Project: ${project.name}`,
    `Mode: ${session.details.mode || "continue"}`,
    `Objective: ${session.details.objective || session.summary}`,
    session.details.context ? `Extra context: ${session.details.context}` : "",
    "",
    "## What the AI must do first",
    "1. Read this complete file before changing anything.",
    "2. Inspect the repository instructions and current working tree.",
    "3. Verify the newest remote commit; Studio history is context, not proof that code has not changed.",
    "4. Explain the plan briefly, then implement and validate the requested outcome.",
    "5. Do not deploy, publish, release, roll back, delete data, or overwrite local work without Mahmoud's authorization.",
    "",
    "## Required completion handoff",
    "At the end, give Mahmoud a compact result using these exact headings so he can save it back to Studio:",
    "",
    "### What changed",
    "### Outcome",
    "### Validation",
    "### Commits / versions",
    "### Best next step",
    "",
    "---",
    "",
    starter,
  ].filter(Boolean).join("\n");
}

export function StudioAiSession({ project, activeSession, starter, records, setRecords, onClose }: Props) {
  const [session, setSession] = useState<StudioRecord | null>(activeSession);
  const [mode, setMode] = useState("continue");
  const [objective, setObjective] = useState("");
  const [context, setContext] = useState("");
  const [finishOpen, setFinishOpen] = useState(false);
  const [result, setResult] = useState({ changes: "", outcome: "", validation: "", commits: "", nextStep: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const previousSessions = useMemo(() => records
    .filter((record) => record.category === "activity" && record.projectSlug === project.slug && record.tags.includes("ai-session") && record.status !== "in-progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3), [project.slug, records]);

  async function startSession() {
    if (!objective.trim() || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/studio/records", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category: "activity",
          title: `AI session — ${objective.trim()}`,
          projectSlug: project.slug,
          status: "in-progress",
          summary: objective.trim(),
          details: {
            date: today(),
            startedAt: new Date().toISOString(),
            mode,
            objective: objective.trim(),
            context: context.trim(),
            branch: project.branch,
            startingCommit: project.commit,
            changes: "",
            outcome: "",
            validation: "",
            commits: "",
            nextStep: "",
          },
          tags: ["ai-session", mode, "active"],
        }),
      });
      if (!response.ok) throw new Error(`Session could not be saved (${response.status}).`);
      const payload = (await response.json()) as { record: StudioRecord };
      setSession(payload.record);
      setRecords((current) => [payload.record, ...current]);
      setMessage("Session saved. Your pack is ready on every device.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Session could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function copyPack() {
    if (!session) return;
    await navigator.clipboard.writeText(buildSessionPack(project, session, starter));
    setMessage("AI Session Pack copied.");
  }

  function downloadPack() {
    if (!session) return;
    downloadMarkdown(`${project.slug}-ai-session-${today()}.md`, buildSessionPack(project, session, starter));
    setMessage("AI Session Pack downloaded.");
  }

  async function finishSession(status: "completed" | "blocked") {
    if (!session || busy || (!result.changes.trim() && !result.outcome.trim())) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/studio/records", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: session.id,
          status,
          summary: result.outcome.trim() || session.summary,
          details: {
            ...session.details,
            completedAt: new Date().toISOString(),
            changes: result.changes.trim(),
            outcome: result.outcome.trim(),
            validation: result.validation.trim(),
            commits: result.commits.trim(),
            nextStep: result.nextStep.trim(),
          },
          tags: ["ai-session", session.details.mode || "continue", status],
        }),
      });
      if (!response.ok) throw new Error(`Session result could not be saved (${response.status}).`);
      const payload = (await response.json()) as { record: StudioRecord };
      setRecords((current) => current.map((record) => record.id === payload.record.id ? payload.record : record));
      setSession(payload.record);
      setFinishOpen(false);
      setMessage(status === "completed" ? "Session completed and added to project memory." : "Blocker saved. The next session will see it.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Session result could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  const isActive = session?.status === "in-progress";
  const sessionPack = session ? buildSessionPack(project, session, starter) : "";

  return (
    <div className="studio-ai-session-modal" role="dialog" aria-modal="true" aria-labelledby="ai-session-title">
      <button className="studio-ai-session-backdrop" onClick={onClose} aria-label="Close AI Session" />
      <section className="studio-ai-session-shell">
        <header className="studio-ai-session-head">
          <div className="studio-ai-session-identity"><span>{project.initials}</span><div><p className="studio-kicker">PROJECT AI SESSION</p><h1 id="ai-session-title">{project.name}</h1><small><GitBranch size={11} /> {project.branch} · {project.commit}</small></div></div>
          <button onClick={onClose} aria-label="Close"><X size={18} /></button>
        </header>

        {!session && (
          <div className="studio-ai-session-start">
            <div className="studio-ai-session-intro"><Sparkles size={22} /><div><h2>Start with one clear outcome.</h2><p>Studio will create a persistent session, assemble the latest safe project context, and prepare one file for ChatGPT or Codex.</p></div></div>
            <div className="studio-ai-session-modes">
              {sessionModes.map((item) => <button key={item.id} className={mode === item.id ? "active" : ""} onClick={() => setMode(item.id)}><strong>{item.label}</strong><small>{item.hint}</small></button>)}
            </div>
            <label className="studio-ai-session-field">What should this session accomplish?<textarea value={objective} onChange={(event) => setObjective(event.target.value)} placeholder={`Example: improve ${project.name}, fix the current problems, test it, and save the result.`} autoFocus /></label>
            <label className="studio-ai-session-field">Extra context <span>optional</span><textarea value={context} onChange={(event) => setContext(event.target.value)} placeholder="Constraints, ideas, files to inspect, or anything the AI must understand before starting." /></label>
            <aside className="studio-ai-session-safety"><ShieldCheck size={16} /><p>The pack never includes passwords or secret values. Publishing and destructive actions still require your explicit approval.</p></aside>
            {previousSessions.length > 0 && <div className="studio-ai-session-history"><small>RECENT SESSIONS</small>{previousSessions.map((item) => <div key={item.id}><CheckCircle2 size={13} /><span><strong>{item.title.replace("AI session — ", "")}</strong><small>{item.details.date || item.updatedAt.slice(0, 10)} · {item.status}</small></span></div>)}</div>}
            <footer><span>{message}</span><button disabled={!objective.trim() || busy} onClick={() => void startSession()}><Play size={15} /> {busy ? "Starting…" : "Start & save session"}</button></footer>
          </div>
        )}

        {session && (
          <div className="studio-ai-session-active">
            <div className={`studio-ai-session-status ${isActive ? "live" : session.status}`}><span><i />{isActive ? "ACTIVE SESSION" : session.status.toUpperCase()}</span><small><Clock3 size={12} /> Started {new Date(session.details.startedAt || session.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</small></div>
            <section className="studio-ai-session-goal"><p className="studio-kicker">SESSION GOAL</p><h2>{session.details.objective || session.summary}</h2>{session.details.context && <p>{session.details.context}</p>}<div><span>{session.details.mode || "continue"}</span><span>{project.branch}</span><span>{session.details.startingCommit || project.commit}</span></div></section>

            {isActive && !finishOpen && <>
              <section className="studio-ai-session-steps">
                <article className="done"><span>1</span><div><strong>Context assembled</strong><small>Project, releases, work, decisions, knowledge, and recent memory.</small></div><CheckCircle2 size={16} /></article>
                <article className="current"><span>2</span><div><strong>Give the pack to AI</strong><small>Use the same file with ChatGPT or Codex on this or another device.</small></div><FileDown size={16} /></article>
                <article><span>3</span><div><strong>Do the work</strong><small>The AI verifies GitHub before editing and returns a structured handoff.</small></div><Sparkles size={16} /></article>
                <article><span>4</span><div><strong>Save the result</strong><small>Complete the session so the next one inherits verified memory.</small></div><Save size={16} /></article>
              </section>
              <div className="studio-ai-session-actions">
                <button className="primary" onClick={downloadPack}><Download size={15} /><span><strong>Download Session Pack</strong><small>{Math.max(1, Math.ceil(new Blob([sessionPack]).size / 1024))} KB · ChatGPT / Codex ready</small></span></button>
                <button onClick={() => void copyPack()}><Clipboard size={15} /> Copy full pack</button>
                <a href={project.repository} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Open repository</a>
              </div>
              <button className="studio-ai-session-finish-button" onClick={() => setFinishOpen(true)}><CheckCircle2 size={16} /> Finish session & save what changed</button>
            </>}

            {isActive && finishOpen && <section className="studio-ai-session-finish">
              <header><div><p className="studio-kicker">SAVE THE HANDOFF</p><h2>What is true now?</h2><p>Paste the AI result or write a short verified summary. This becomes project memory.</p></div><button onClick={() => setFinishOpen(false)}><X size={15} /> Back</button></header>
              <div>
                <label>What changed<textarea value={result.changes} onChange={(event) => setResult((current) => ({ ...current, changes: event.target.value }))} placeholder="Features, files, fixes, and decisions." autoFocus /></label>
                <label>Outcome<textarea value={result.outcome} onChange={(event) => setResult((current) => ({ ...current, outcome: event.target.value }))} placeholder="What now works or was learned?" /></label>
                <label>Validation<textarea value={result.validation} onChange={(event) => setResult((current) => ({ ...current, validation: event.target.value }))} placeholder="Tests, builds, browser checks, and evidence." /></label>
                <label>Commits / versions<input value={result.commits} onChange={(event) => setResult((current) => ({ ...current, commits: event.target.value }))} placeholder="abc1234, PR #12, v1.2.0" /></label>
                <label>Best next step<input value={result.nextStep} onChange={(event) => setResult((current) => ({ ...current, nextStep: event.target.value }))} placeholder="Where should the next session continue?" /></label>
              </div>
              <footer><button className="blocked" disabled={busy || (!result.changes.trim() && !result.outcome.trim())} onClick={() => void finishSession("blocked")}>Save as blocked</button><button disabled={busy || (!result.changes.trim() && !result.outcome.trim())} onClick={() => void finishSession("completed")}><Save size={15} /> {busy ? "Saving…" : "Complete & save memory"}</button></footer>
            </section>}

            {!isActive && <section className="studio-ai-session-complete"><CheckCircle2 size={30} /><h2>Session saved to Activity Log.</h2><p>{session.details.outcome || session.summary}</p><div><button onClick={onClose}>Back to project</button><button className="secondary" onClick={() => { setSession(null); setObjective(""); setResult({ changes: "", outcome: "", validation: "", commits: "", nextStep: "" }); }}>Start another session</button></div></section>}
            {message && <p className="studio-ai-session-message">{message}</p>}
          </div>
        )}
      </section>
    </div>
  );
}
