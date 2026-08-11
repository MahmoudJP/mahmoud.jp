"use client";

import { ArrowRight, BookOpen, CircleAlert, Layers3, ListTodo, Sparkles } from "lucide-react";
import type { StudioProject } from "@/lib/studio-data";
import type { StudioDocument, StudioNote, StudioRecord, StudioWorkflow } from "@/lib/studio-store";

type Props = {
  projects: StudioProject[];
  notes: StudioNote[];
  documents: StudioDocument[];
  records: StudioRecord[];
  onOpenProjects: () => void;
  onOpenWork: () => void;
  onOpenKnowledge: () => void;
};

const workflowMeta: { id: StudioWorkflow; label: string; color: string }[] = [
  { id: "inbox", label: "Inbox", color: "#8f7bea" },
  { id: "next", label: "Next", color: "#d7b56d" },
  { id: "doing", label: "Doing", color: "#5ed5a4" },
  { id: "waiting", label: "Waiting", color: "#e78d93" },
  { id: "done", label: "Done", color: "#667080" },
];

function donutGradient(items: { count: number; color: string }[]) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  if (!total) return "conic-gradient(#282d37 0 100%)";
  let cursor = 0;
  const stops = items.map((item) => {
    const start = cursor;
    cursor += item.count / total * 100;
    return `${item.color} ${start}% ${cursor}%`;
  });
  return `conic-gradient(${stops.join(",")})`;
}

export function StudioOverviewCharts({
  projects,
  notes,
  documents,
  records,
  onOpenProjects,
  onOpenWork,
  onOpenKnowledge,
}: Props) {
  const workflow = workflowMeta.map((item) => ({
    ...item,
    count: notes.filter((note) => note.workflow === item.id).length,
  }));
  const totalWork = notes.length;
  const completed = workflow.find((item) => item.id === "done")?.count ?? 0;
  const completion = totalWork ? Math.round(completed / totalWork * 100) : 0;
  const maxWorkflow = Math.max(1, ...workflow.map((item) => item.count));

  const stateGroups = [
    { label: "Live / active", count: projects.filter((project) => ["Live", "Active"].includes(project.state)).length, color: "#5ed5a4" },
    { label: "Building", count: projects.filter((project) => ["Building", "In progress"].includes(project.state)).length, color: "#8f7bea" },
    { label: "Planned / paused", count: projects.filter((project) => !["Live", "Active", "Building", "In progress"].includes(project.state)).length, color: "#d7b56d" },
  ];
  const maxState = Math.max(1, ...stateGroups.map((item) => item.count));

  const knowledgeByProject = projects.map((project) => ({
    project,
    count: documents.filter((document) => document.projectSlug === project.slug).length
      + records.filter((record) => record.category === "decision" && record.projectSlug === project.slug).length,
  })).sort((a, b) => b.count - a.count);
  const maxKnowledge = Math.max(1, ...knowledgeByProject.map((item) => item.count));

  const priorityRank = { high: 0, medium: 1, low: 2 } as const;
  const focus = notes
    .filter((note) => note.workflow !== "done")
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 4);

  return (
    <section className="studio-visual-board" aria-labelledby="studio-pulse-title">
      <header className="studio-visual-board-head">
        <div><p className="studio-kicker">WORKSPACE INTELLIGENCE</p><h2 id="studio-pulse-title">Your studio at a glance</h2><p>Real data from your projects, work queue, and knowledge base—no decorative metrics.</p></div>
        <span><Sparkles size={14} /> Live workspace data</span>
      </header>

      <div className="studio-chart-grid">
        <article className="studio-chart-card studio-pipeline-card">
          <header><div><ListTodo size={17} /><span><small>WORK PIPELINE</small><strong>Flow and completion</strong></span></div><button onClick={onOpenWork}>Manage <ArrowRight size={13} /></button></header>
          <div className="studio-donut-layout">
            <div className="studio-donut" style={{ background: donutGradient(workflow) }} role="img" aria-label={`${completion}% of tracked work is complete`}>
              <div><strong>{completion}%</strong><small>complete</small></div>
            </div>
            <div className="studio-chart-legend">
              {workflow.map((item) => <div key={item.id}><i style={{ background: item.color }} /><span>{item.label}</span><strong>{item.count}</strong></div>)}
            </div>
          </div>
          <div className="studio-mini-bars" aria-label="Work by workflow">
            {workflow.map((item) => <div key={item.id}><span>{item.label}</span><b><i style={{ width: `${item.count / maxWorkflow * 100}%`, background: item.color }} /></b><strong>{item.count}</strong></div>)}
          </div>
        </article>

        <article className="studio-chart-card studio-project-health-card">
          <header><div><Layers3 size={17} /><span><small>PORTFOLIO SHAPE</small><strong>Project momentum</strong></span></div><button onClick={onOpenProjects}>Explore <ArrowRight size={13} /></button></header>
          <div className="studio-horizontal-chart">
            {stateGroups.map((item) => <div key={item.label}><div><span>{item.label}</span><strong>{item.count}</strong></div><b><i style={{ width: `${item.count / maxState * 100}%`, background: item.color }} /></b></div>)}
          </div>
          <div className="studio-chart-summary"><strong>{projects.length}</strong><span>projects tracked with source, release, and run context</span></div>
        </article>

        <article className="studio-chart-card studio-knowledge-chart-card">
          <header><div><BookOpen size={17} /><span><small>KNOWLEDGE COVERAGE</small><strong>Context by project</strong></span></div><button onClick={onOpenKnowledge}>Open docs <ArrowRight size={13} /></button></header>
          <div className="studio-horizontal-chart compact">
            {knowledgeByProject.slice(0, 6).map(({ project, count }) => <div key={project.slug}><div><span>{project.name}</span><strong>{count}</strong></div><b><i style={{ width: `${count / maxKnowledge * 100}%` }} /></b></div>)}
          </div>
          <p className="studio-chart-footnote">{documents.length} docs · {records.filter((record) => record.category === "decision").length} decisions</p>
        </article>

        <article className="studio-chart-card studio-focus-card">
          <header><div><CircleAlert size={17} /><span><small>FOCUS QUEUE</small><strong>Highest-value next actions</strong></span></div><button onClick={onOpenWork}>Open board <ArrowRight size={13} /></button></header>
          <div className="studio-focus-list">
            {focus.map((note) => {
              const project = projects.find((item) => item.slug === note.projectSlug);
              return <button key={note.id} onClick={onOpenWork}><i className={`priority-${note.priority}`} /><span><strong>{note.title}</strong><small>{project?.name ?? "Unsorted"} · {note.workflow}</small></span><ArrowRight size={13} /></button>;
            })}
            {!focus.length && <div className="studio-focus-empty"><Sparkles size={18} /><span><strong>Queue is clear</strong><small>Capture the next idea when it appears.</small></span></div>}
          </div>
        </article>
      </div>
    </section>
  );
}
