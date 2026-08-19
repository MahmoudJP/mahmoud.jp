"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  ExternalLink,
  GitBranch,
  GitCommit,
  FolderGit2,
  FileCode2,
  Globe2,
  ListTodo,
  LoaderCircle,
  MonitorDown,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { StudioProject } from "@/lib/studio-data";
import type { StudioDocument, StudioNote, StudioRecord } from "@/lib/studio-store";

type Props = {
  projects: StudioProject[];
  activeProject: StudioProject;
  notes: StudioNote[];
  documents: StudioDocument[];
  records: StudioRecord[];
  onSelect: (project: StudioProject) => void;
  onOpenKnowledge: (project: StudioProject) => void;
  onOpenHandoff: (project: StudioProject) => void;
  onOpenWork: (project: StudioProject) => void;
  onAddWork: (title: string, project: StudioProject) => Promise<void>;
};

type ProjectArtifact = {
  id: number;
  name: string;
  size: number;
  createdAt: string;
  expiresAt: string;
};

type ProjectActivity = {
  source: "github" | "snapshot";
  reason: string | null;
  commits: Array<{
    commit: string;
    fullCommit?: string;
    date: string;
    title: string;
    author?: string;
    url: string;
    artifacts: ProjectArtifact[];
  }>;
};

function projectOwnerAndName(project: StudioProject) {
  return project.repository.replace("https://github.com/", "");
}

function buildSetupCommand(project: StudioProject) {
  const repository = projectOwnerAndName(project);
  const folder = project.slug;
  return [
    `gh repo clone ${repository} ${folder}`,
    `git -C ${folder} fetch --all --prune`,
    `git -C ${folder} switch ${project.branch}`,
    `git -C ${folder} pull --ff-only origin ${project.branch}`,
  ].join("\n");
}

export function buildProjectAIStarter(
  project: StudioProject,
  notes: StudioNote[],
  documents: StudioDocument[],
  records: StudioRecord[],
) {
  const openWork = notes.filter((note) => note.projectSlug === project.slug && note.workflow !== "done");
  const projectDocs = documents.filter((document) => document.projectSlug === project.slug);
  const decisions = records.filter((record) => record.category === "decision" && record.projectSlug === project.slug && record.status !== "superseded");
  const health = records.filter((record) => record.category === "health" && record.projectSlug === project.slug);
  const repository = projectOwnerAndName(project);

  return [
    "# Mahmoud Studio — AI Project Starter",
    "",
    "> Give this file to ChatGPT or Codex and ask it to continue this project. It contains coordination context, not passwords or source code.",
    "",
    "## Objective for the AI",
    `Continue **${project.name}** from the newest code saved on GitHub. First verify the repository state, read its instructions, and summarize what you found before editing.`,
    "",
    "## Project identity",
    `- Project: ${project.name}`,
    `- Repository: ${project.repository}`,
    `- Visibility: ${project.visibility}`,
    `- Platform: ${project.platform}`,
    `- Preferred local path under the projects root: ${project.localPath}`,
    `- Active development branch: ${project.branch}`,
    `- Latest recorded remote commit: ${project.commit}`,
    `- Latest recorded code state: ${project.latest}`,
    `- Stable checkpoint: ${project.stable}`,
    `- Currently live: ${project.live}`,
    `- Project status: ${project.state}`,
    `- Run readiness: ${project.runSummary}`,
    `- Build footprint: ${project.buildFootprint}`,
    "",
    "## How this project can be tried",
    ...project.runOptions.map((option) => `- ${option.platform} / ${option.label}: ${option.status}. ${option.detail}${option.href ? ` Link: ${option.href}` : ""}${option.file ? ` File: ${option.file}` : ""}`),
    "",
    "## Important repository files",
    ...project.importantFiles.map((file) => `- \`${file.path}\` — ${file.purpose}`),
    "",
    "## Recent verified edit checkpoints",
    ...project.fallbackEdits.map((edit) => `- ${edit.date} · \`${edit.commit}\` · ${edit.title}`),
    "",
    "## Download or update the newest code",
    "### If the project is not on this device",
    "1. Confirm GitHub access with `gh auth status`. If needed, run `gh auth login`.",
    `2. From the desired projects directory, run: \`gh repo clone ${repository} ${project.slug}\``,
    `3. Run: \`cd ${project.slug}\``,
    `4. Run: \`git fetch --all --prune\``,
    `5. Run: \`git switch ${project.branch}\``,
    `6. Run: \`git pull --ff-only origin ${project.branch}\``,
    "",
    "### If the project already exists on this device",
    "1. Open the repository and run `git status --short --branch`.",
    "2. If there are local changes, STOP. Explain them and do not overwrite, reset, clean, or switch branches.",
    "3. If the tree is clean, run `git fetch --all --prune`.",
    `4. Run \`git switch ${project.branch}\` then \`git pull --ff-only origin ${project.branch}\`.`,
    `5. Run \`git rev-parse --short HEAD\` and compare it with the recorded checkpoint \`${project.commit}\`. If GitHub is newer, treat GitHub as the source of truth and report the difference.`,
    "",
    "## Read before changing code",
    "Read these files when present: `AGENTS.md`, `README.md`, `CHANGELOG.md`, `docs/STATUS.md`, and any setup or architecture document linked below.",
    "",
    "## Open work",
    ...(openWork.length ? openWork.map((note) => `- [${note.workflow}] [${note.priority}] ${note.title}`) : ["- No open project work is recorded in Studio."]),
    "",
    "## Current decisions",
    ...(decisions.length ? decisions.map((record) => `### ${record.title}\n${record.details.decision || record.summary || "Decision details not recorded."}\n\nRationale: ${record.details.rationale || "Not recorded."}`) : ["- No current decisions are recorded for this project."]),
    "",
    "## Project knowledge",
    ...(projectDocs.length ? projectDocs.map((document) => `### ${document.title}\nType: ${document.type} · Status: ${document.status}\n${document.summary}\n\n${document.content}`) : ["- No project-specific knowledge documents are recorded yet."]),
    "",
    "## Health signals",
    ...(health.length ? health.map((record) => `- ${record.title}: ${record.status}${record.details.response ? ` — ${record.details.response}` : ""}`) : ["- No project health checks are recorded yet."]),
    "",
    "## Working rules",
    "- GitHub is the source of truth for saved code; unpushed work on another device is not included here.",
    "- Latest code, stable checkpoint, and live version are separate states.",
    "- Do not deploy, publish, promote, roll back, or create a release unless Mahmoud explicitly asks.",
    "- Never place passwords, tokens, `.env` contents, private keys, or payment details in chat or commits.",
    "- Preserve existing work, validate changes in proportion to risk, and finish with a concise handoff.",
  ].join("\n");
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

export function StudioProjectsWorkspace({ projects, activeProject, notes, documents, records, onSelect, onOpenKnowledge, onOpenHandoff, onOpenWork, onAddWork }: Props) {
  const [idea, setIdea] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [activityResult, setActivityResult] = useState<{ slug: string; activity: ProjectActivity } | null>(null);
  const projectNotes = useMemo(() => notes.filter((note) => note.projectSlug === activeProject.slug), [activeProject.slug, notes]);
  const openWork = projectNotes.filter((note) => note.workflow !== "done");
  const doingWork = projectNotes.filter((note) => note.workflow === "doing");
  const projectDocuments = documents.filter((document) => document.projectSlug === activeProject.slug);
  const decisions = records.filter((record) => record.category === "decision" && record.projectSlug === activeProject.slug && record.status !== "superseded");
  const health = records.filter((record) => record.category === "health" && record.projectSlug === activeProject.slug);
  const readinessGates = [
    { label: "Project context", passed: projectDocuments.length > 0, detail: projectDocuments.length ? `${projectDocuments.length} knowledge document${projectDocuments.length === 1 ? "" : "s"}` : "Add architecture, setup, or runbook context" },
    { label: "Next action", passed: openWork.length > 0, detail: openWork.length ? `${openWork.length} open item${openWork.length === 1 ? "" : "s"}` : "Capture the next concrete action" },
    { label: "Runnable path", passed: activeProject.runOptions.some((option) => ["ready", "local-only"].includes(option.status)), detail: activeProject.runOptions.some((option) => option.status === "ready") ? "Verified ready option exists" : "Local run path recorded" },
    { label: "Health evidence", passed: health.some((record) => record.status === "healthy"), detail: health.length ? `${health.filter((record) => record.status === "healthy").length}/${health.length} checks healthy` : "Record a build, test, domain, or backup check" },
    { label: "Decision trail", passed: decisions.length > 0, detail: decisions.length ? `${decisions.length} current decision${decisions.length === 1 ? "" : "s"}` : "Record important technical choices" },
  ];
  const readinessScore = Math.round(readinessGates.filter((gate) => gate.passed).length / readinessGates.length * 100);
  const activity = activityResult?.slug === activeProject.slug ? activityResult.activity : null;
  const activityLoading = !activity;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/studio/projects/${encodeURIComponent(activeProject.slug)}/activity`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Activity request failed: ${response.status}`);
        return await response.json() as ProjectActivity;
      })
      .then((nextActivity) => { if (!cancelled) setActivityResult({ slug: activeProject.slug, activity: nextActivity }); })
      .catch(() => {
        if (!cancelled) setActivityResult({ slug: activeProject.slug, activity: {
          source: "snapshot",
          reason: "Live history is unavailable; showing the last verified Studio snapshot.",
          commits: activeProject.fallbackEdits.map((edit) => ({ ...edit, url: `${activeProject.repository}/commit/${edit.commit}`, artifacts: [] })),
        } });
      });
    return () => { cancelled = true; };
  }, [activeProject]);

  async function copySetup() {
    await navigator.clipboard.writeText(buildSetupCommand(activeProject));
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  function downloadStarter() {
    downloadMarkdown(`${activeProject.slug}-ai-starter.md`, buildProjectAIStarter(activeProject, notes, documents, records));
  }

  async function saveIdea() {
    if (!idea.trim()) return;
    await onAddWork(idea, activeProject);
    setIdea("");
  }

  return <div className="studio-projects-workspace">
    <aside className="studio-project-catalog">
      <header><div><p className="studio-kicker">PROJECTS</p><h1>Your catalog</h1></div><span>{projects.length}</span></header>
      <p className="studio-catalog-help">Choose one project. Everything you need to understand and continue it appears on the right.</p>
      <div className="studio-project-list">
        {projects.map((project) => <button key={project.slug} className={project.slug === activeProject.slug ? "active" : ""} onClick={() => onSelect(project)}>
          <span className="studio-project-monogram">{project.initials}</span>
          <span className="studio-project-list-copy"><strong>{project.name}</strong><small>{project.latest}</small><code>{project.commit} · {project.branch}</code></span>
          <i className={project.state === "Live" || project.state === "Active" ? "good" : ""} />
        </button>)}
      </div>
    </aside>

    <section className="studio-project-focus">
      <header className="studio-project-focus-head">
        <div className="studio-project-identity"><span>{activeProject.initials}</span><div><p>{activeProject.platform} · {activeProject.visibility}</p><h1>{activeProject.name}</h1><small className={activeProject.state === "Live" || activeProject.state === "Active" ? "good" : ""}>{activeProject.state}</small></div></div>
        <div className="studio-project-primary-actions">
          <button className="primary" onClick={downloadStarter}><Download size={16} /><span><strong>Download AI Starter</strong><small>Ready for ChatGPT or Codex</small></span></button>
          <button onClick={() => void copySetup()}><Clipboard size={15} /> {copyState === "copied" ? "Setup copied" : "Copy setup command"}</button>
          <a href={activeProject.repository} target="_blank" rel="noreferrer"><FolderGit2 size={15} /> Open repository <ExternalLink size={12} /></a>
        </div>
      </header>

      <section className="studio-project-resume">
        <div><p className="studio-kicker">QUICK READ</p><h2>{activeProject.publicSummary}</h2><div>{activeProject.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
        <aside><Sparkles size={18} /><span><strong>Continue on another device</strong><p>Download the AI Starter, give it to ChatGPT or Codex, and it will know what to clone, which branch to use, what changed, and what it must not overwrite.</p></span></aside>
      </section>

      <section className="studio-version-board" aria-label="Project version states">
        <article className="latest"><header><GitCommit size={17} /><span>01</span></header><small>Latest saved code</small><h3>{activeProject.latest}</h3><code>{activeProject.commit}</code><p><GitBranch size={12} /> {activeProject.branch}</p></article>
        <ArrowRight size={18} />
        <article className="stable"><header><CheckCircle2 size={17} /><span>02</span></header><small>Stable checkpoint</small><h3>{activeProject.stable}</h3><p><Check size={12} /> Tested and trusted</p></article>
        <ArrowRight size={18} />
        <article className="live"><header><Rocket size={17} /><span>03</span></header><small>Currently live</small><h3>{activeProject.live}</h3><p>What people use now</p></article>
      </section>

      <section className="studio-project-run-center">
        <header><div><p className="studio-kicker">TRY & RUN</p><h2>Use the real option available for this project.</h2><p>{activeProject.runSummary}</p></div><span>{activeProject.buildFootprint}</span></header>
        <div className="studio-project-run-grid">
          {activeProject.runOptions.map((option) => {
            const ready = option.status === "ready";
            const href = ready ? option.href : option.status === "local-only" && option.file
              ? `${activeProject.repository}/blob/${activeProject.branch}/${option.file}`
              : undefined;
            const Icon = option.kind === "online" ? Globe2 : option.kind === "download" ? MonitorDown : option.kind === "local" ? FileCode2 : LoaderCircle;
            const content = <><span className={`status-${option.status}`}><Icon size={17} /></span><div><small>{option.platform} · {option.status.replaceAll("-", " ")}</small><strong>{option.label}</strong><p>{option.detail}</p>{option.file && <code>{option.file}</code>}</div>{href && <ExternalLink size={14} />}</>;
            return href
              ? <a key={`${option.platform}-${option.label}`} href={href} target="_blank" rel="noreferrer" download={option.kind === "download" ? true : undefined}>{content}</a>
              : <article key={`${option.platform}-${option.label}`}>{content}</article>;
          })}
        </div>
      </section>

      <section className="studio-project-evidence-grid">
        <article className="studio-project-edits">
          <header><div><p className="studio-kicker">EDIT HISTORY</p><h2>Every pushed edit is a checkpoint.</h2></div><span className={activity?.source === "github" ? "live" : "snapshot"}>{activity?.source === "github" ? "Live GitHub" : "Verified snapshot"}</span></header>
          {activityLoading && <div className="studio-project-loading"><LoaderCircle size={17} /> Loading repository history…</div>}
          {!activityLoading && activity?.reason && <p className="studio-project-sync-note">{activity.reason}</p>}
          <div className="studio-project-edit-list">
            {!activityLoading && activity?.commits.slice(0, 6).map((edit) => <div key={edit.fullCommit ?? edit.commit}>
              <i />
              <span><a href={edit.url} target="_blank" rel="noreferrer">{edit.title}</a><small>{new Date(edit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · <code>{edit.commit}</code></small></span>
              {edit.artifacts.length ? <span className="studio-artifact-list">{edit.artifacts.map((artifact) => <a key={artifact.id} className="studio-artifact-button" href={`/api/studio/projects/${activeProject.slug}/artifacts/${artifact.id}`}><Download size={13} /> {artifact.name}</a>)}</span> : <em>Source saved</em>}
            </div>)}
          </div>
        </article>

        <article className="studio-project-files">
          <header><div><p className="studio-kicker">IMPORTANT FILES</p><h2>Read these before changing the project.</h2></div><span>{activeProject.importantFiles.length}</span></header>
          <div>{activeProject.importantFiles.map((file) => <a key={file.path} href={`${activeProject.repository}/blob/${activeProject.branch}/${file.path}`} target="_blank" rel="noreferrer"><FileCode2 size={16} /><span><strong>{file.label}</strong><code>{file.path}</code><small>{file.purpose}</small></span><ExternalLink size={13} /></a>)}</div>
        </article>
      </section>

      <section className="studio-project-glance">
        <article><span><ListTodo size={17} /></span><div><small>Open work</small><strong>{openWork.length}</strong><p>{doingWork.length ? `${doingWork.length} currently in progress` : "Nothing marked as doing"}</p></div><button onClick={() => onOpenWork(activeProject)}>Open work <ArrowRight size={13} /></button></article>
        <article><span><BookOpen size={17} /></span><div><small>Knowledge</small><strong>{projectDocuments.length}</strong><p>{decisions.length} current decisions</p></div><button onClick={() => onOpenKnowledge(activeProject)}>Open knowledge <ArrowRight size={13} /></button></article>
        <article><span><ShieldCheck size={17} /></span><div><small>Health</small><strong>{health.length || "—"}</strong><p>{health.length ? `${health.filter((record) => record.status === "healthy").length} healthy checks` : "No checks recorded yet"}</p></div><button onClick={() => onOpenHandoff(activeProject)}>Full handoff <ArrowRight size={13} /></button></article>
      </section>

      <section className="studio-readiness-gates">
        <header>
          <div><p className="studio-kicker">DEVELOPMENT READINESS</p><h2>Know what is missing before changing code.</h2><p>These gates use recorded Studio evidence. They do not claim a test or release happened unless it is documented.</p></div>
          <div className="studio-readiness-ring" style={{ background: `conic-gradient(#5ed5a4 0 ${readinessScore}%,#252b34 ${readinessScore}% 100%)` }} role="img" aria-label={`${readinessScore}% development readiness`}><span><strong>{readinessScore}%</strong><small>ready</small></span></div>
        </header>
        <div>{readinessGates.map((gate) => <article className={gate.passed ? "passed" : "missing"} key={gate.label}>{gate.passed ? <CheckCircle2 size={16} /> : <span>!</span>}<div><strong>{gate.label}</strong><small>{gate.detail}</small></div></article>)}</div>
      </section>

      <div className="studio-project-bottom">
        <section className="studio-project-next">
          <header><div><p className="studio-kicker">NEXT ACTIONS</p><h2>What should happen next?</h2></div><button onClick={() => onOpenWork(activeProject)}>See all work</button></header>
          <div>{openWork.slice(0, 4).map((note) => <article key={note.id}><span className={`priority-${note.priority}`}>{note.priority}</span><div><strong>{note.title}</strong><small>{note.workflow}</small></div></article>)}{!openWork.length && <div className="studio-project-empty"><CheckCircle2 size={20} /><span><strong>No open work for this project.</strong><small>Add the next idea below when you have one.</small></span></div>}</div>
        </section>
        <section className="studio-project-capture">
          <p className="studio-kicker">CAPTURE FOR LATER</p><h2>Leave the next thought here.</h2><p>It will go directly to this project in Inbox & Work.</p>
          <textarea value={idea} onChange={(event) => setIdea(event.target.value)} placeholder={`Idea, task, bug, or reminder for ${activeProject.name}…`} />
          <button disabled={!idea.trim()} onClick={() => void saveIdea()}><Plus size={14} /> Save to project work</button>
        </section>
      </div>

      <footer className="studio-project-source"><FolderGit2 size={14} /><span><strong>Source of truth:</strong> {activeProject.repository}</span><code>{activeProject.localPath}</code></footer>
    </section>
  </div>;
}
