import { Redis } from "@upstash/redis";

export type StudioWorkflow = "inbox" | "next" | "doing" | "waiting" | "done";
export type StudioPriority = "low" | "medium" | "high";

export type StudioNote = {
  id: string;
  kind: "inbox" | "task" | "project";
  projectSlug: string | null;
  title: string;
  content: string;
  status: "open" | "done";
  workflow: StudioWorkflow;
  priority: StudioPriority;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StudioDocumentType =
  | "overview"
  | "setup"
  | "architecture"
  | "decision"
  | "runbook"
  | "reference"
  | "handoff";

export type StudioDocument = {
  id: string;
  title: string;
  projectSlug: string | null;
  type: StudioDocumentType;
  summary: string;
  content: string;
  tags: string[];
  status: "draft" | "current" | "archived";
  createdAt: string;
  updatedAt: string;
};

export type StudioRecordCategory =
  | "activity"
  | "decision"
  | "health"
  | "automation"
  | "asset"
  | "career"
  | "finance";

export type StudioRecord = {
  id: string;
  category: StudioRecordCategory;
  title: string;
  projectSlug: string | null;
  status: string;
  summary: string;
  details: Record<string, string>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const NOTES_KEY = "mahmoud:studio:notes";
const DOCUMENTS_KEY = "mahmoud:studio:documents";
const RECORDS_KEY = "mahmoud:studio:records";
const MAP_KEY = "mahmoud:studio:mind-map";

const defaultActivityRecords: StudioRecord[] = [
  {
    id: "activity-studio-foundation",
    category: "activity",
    title: "Built the private Mahmoud Studio workspace",
    projectSlug: "mahmoud-jp",
    status: "completed",
    summary: "Created one Google-protected command center for projects, work, knowledge, operations, assets, career, finance, and the mind map.",
    details: {
      date: "2026-08-09",
      objective: "Replace scattered project context with one private workspace on mahmoud.jp.",
      changes: "Added the Studio dashboard, owner-only Google access, structured project catalog, private notes, knowledge documents, operational records, and Redis-backed storage.",
      outcome: "Mahmoud can open his workspace from any device and continue from one source of context.",
      validation: "Production build passed and owner-only routes rejected anonymous access.",
      commits: "781ce87, 8d850a2",
      nextStep: "Keep recording meaningful work and decisions inside Studio.",
    },
    tags: ["studio", "foundation", "private-workspace"],
    createdAt: "2026-08-09T12:00:00.000Z",
    updatedAt: "2026-08-10T12:00:00.000Z",
  },
  {
    id: "activity-cloudops-learning-system",
    category: "activity",
    title: "Completed the CloudOps Coach learning system",
    projectSlug: "cloudops-associate",
    status: "completed",
    summary: "Expanded the AWS CloudOps Associate trainer into a bilingual learning product with lessons, questions, labs, reviews, and private online access.",
    details: {
      date: "2026-08-19",
      objective: "Turn the rough AWS trainer into a complete, understandable exam-preparation product.",
      changes: "Added the SOA-C03 curriculum, Egyptian Arabic explanations, bilingual quiz translation, mock exams, guided labs, incident simulations, analytics, encrypted progress sync, and private Git-connected deployment.",
      outcome: "CloudOps Coach now runs online from Studio and also has validated Windows and Apple Silicon test artifacts.",
      validation: "Curriculum checks, web build, desktop CI, Windows smoke test, encrypted sync integration, and production browser launch passed.",
      commits: "9a96555, 46f6eca",
      nextStep: "Use the question analytics to focus the next study pass on weak domains.",
    },
    tags: ["aws", "cloudops", "learning", "deployment"],
    createdAt: "2026-08-19T12:00:00.000Z",
    updatedAt: "2026-08-19T12:00:00.000Z",
  },
  {
    id: "activity-jlpt-private-launch",
    category: "activity",
    title: "Added secure automatic JLPT deployment",
    projectSlug: "jlpt-master",
    status: "completed",
    summary: "Connected the latest private JLPT main branch to a protected online Studio launch.",
    details: {
      date: "2026-08-20",
      objective: "Open and test the latest JLPT code online without making the private app public.",
      changes: "Added a signed 30-second Studio handoff, a secure 12-hour browser session, automatic GitHub deployment, and disabled persistent service-worker registration on the private host.",
      outcome: "The newest main branch opens from Studio while direct visits remain blocked.",
      validation: "49 tests, lint, protected production build, anonymous 401 check, and authenticated browser launch passed.",
      commits: "18a1ec4",
      nextStep: "Continue content and performance work from the latest main branch.",
    },
    tags: ["jlpt", "private-deployment", "security"],
    createdAt: "2026-08-20T00:00:00.000Z",
    updatedAt: "2026-08-20T00:00:00.000Z",
  },
  {
    id: "activity-koryuu-private-launch",
    category: "activity",
    title: "Added secure automatic Koryuu preview",
    projectSlug: "koryuu",
    status: "completed",
    summary: "Created a private, automatically updated Koryuu review surface without changing the future public Cloudflare release plan.",
    details: {
      date: "2026-08-20",
      objective: "Review the latest Koryuu source online from Studio.",
      changes: "Connected the static export to a private GitHub-driven Vercel project with the signed Studio access gate.",
      outcome: "The full Koryuu site opens privately from Studio and direct visits remain blocked.",
      validation: "Lint, static production build, anonymous 401 check, and authenticated browser launch passed.",
      commits: "112fa7d",
      nextStep: "Review branding, legal pages, and the separate public Cloudflare launch.",
    },
    tags: ["koryuu", "preview", "deployment"],
    createdAt: "2026-08-20T00:01:00.000Z",
    updatedAt: "2026-08-20T00:01:00.000Z",
  },
  {
    id: "activity-mylife-private-launch",
    category: "activity",
    title: "Added secure automatic MyLife web preview",
    projectSlug: "mylife",
    status: "completed",
    summary: "Made the latest private MyLife web export available for safe testing inside Studio.",
    details: {
      date: "2026-08-20",
      objective: "Test MyLife quickly in a browser while preserving private source and native release boundaries.",
      changes: "Added automatic Expo web export, signed Studio access, and a protected 12-hour browser session.",
      outcome: "The MyLife dashboard opens from Studio; browser data remains local and mobile-only features still require native builds.",
      validation: "TypeScript check, Expo web export, anonymous 401 check, and authenticated dashboard launch passed.",
      commits: "ecaa17f",
      nextStep: "Create Android and iOS test builds when native feature testing begins.",
    },
    tags: ["mylife", "expo", "web-preview"],
    createdAt: "2026-08-20T00:02:00.000Z",
    updatedAt: "2026-08-20T00:02:00.000Z",
  },
  {
    id: "activity-snake-online-fix",
    category: "activity",
    title: "Repaired the Snake online runner",
    projectSlug: "snake",
    status: "completed",
    summary: "Fixed Studio asset resolution so the Play button loads the real game engine instead of displaying a non-functional shell.",
    details: {
      date: "2026-08-20",
      objective: "Make Snake genuinely playable from its latest GitHub source inside Studio.",
      changes: "The latest-source HTML proxy now injects a project-scoped base URL before returning static pages, so relative CSS and JavaScript files resolve under the correct project route.",
      outcome: "Snake loads its engine and plugins from the current main branch without a copied deployment.",
      validation: "Static route checks, JavaScript syntax checks, production build, and live Play-button browser test passed.",
      commits: "Studio deployment containing the Activity Memory update",
      nextStep: "Future Snake pushes continue to appear automatically through the same live-source route.",
    },
    tags: ["snake", "bug-fix", "live-source"],
    createdAt: "2026-08-20T01:00:00.000Z",
    updatedAt: "2026-08-20T01:00:00.000Z",
  },
  {
    id: "activity-studio-ai-session",
    category: "activity",
    title: "Added project AI Sessions to Studio",
    projectSlug: "mahmoud-jp",
    status: "completed",
    summary: "Studio can now start, carry, export, and finish a structured coding session for any project without losing cross-device context.",
    details: {
      date: "2026-08-20",
      objective: "Turn a project page into the single starting point for a safe AI coding session.",
      changes: "Added session modes and objectives, persistent active-session state, a copyable/downloadable AI Session Pack, strict Git and deployment guardrails, completion validation fields, and automatic Activity Log memory.",
      outcome: "A session can be started on one device, continued with ChatGPT or Codex, and completed as permanent project history in Studio.",
      validation: "End-to-end browser QA passed for creation, persistence, pack generation, completion, and Activity Log conversion. ESLint and the Next.js production build passed.",
      commits: "bc59e9e",
      nextStep: "Start future coding work from the project-level AI Session button so objectives and outcomes stay connected.",
    },
    tags: ["studio", "ai-session", "cross-device", "activity-memory"],
    createdAt: "2026-08-20T02:00:00.000Z",
    updatedAt: "2026-08-20T02:00:00.000Z",
  },
  {
    id: "activity-japan-life-guide",
    category: "activity",
    title: "Published the Arabic Japan Life Guide",
    projectSlug: "japan-life-guide",
    status: "completed",
    summary: "Added a public Arabic guide for Arabs in Japan and people planning to come, with mosques, halal food, official links, phrase cards, and a print/PDF pack.",
    details: {
      date: "2026-08-23",
      objective: "Create the strongest first version of a practical Arabic Japan guide on mahmoud.jp.",
      changes: "Added /japan-life and /japan-life/print, structured the data in src/lib/japan-life.ts, added Google Maps search links, official sources, halal/mosque references, Arabic checklists, emergency numbers, and Japanese phrasebook entries.",
      outcome: "The guide is live on mahmoud.jp and can be opened or printed from any device.",
      validation: "ESLint passed with only pre-existing demo warnings, Next.js production build passed, and live URLs returned 200 OK after deployment.",
      commits: "d66ea18",
      nextStep: "Expand with city-specific PDFs, Arabic videos, user-submitted verified halal places, and official municipal links by prefecture.",
    },
    tags: ["japan", "arabic", "halal", "mosques", "public-guide"],
    createdAt: "2026-08-23T23:45:00.000Z",
    updatedAt: "2026-08-23T23:45:00.000Z",
  },
  {
    id: "activity-studio-catalog-refresh-2026-08-24",
    category: "activity",
    title: "Refreshed Studio project catalog status",
    projectSlug: "mahmoud-jp",
    status: "completed",
    summary: "Updated Studio so it shows Japan Life Guide as its own project and reflects the latest GitHub commits for DTP Master, MyLife, JLPT Master, CloudOps Coach, Koryuu, and mahmoud.jp.",
    details: {
      date: "2026-08-24",
      objective: "Make the Projects catalog match the real current project state.",
      changes: "Added a Japan Life Guide project card, updated the mahmoud.jp dashboard text, and refreshed visible latest commit metadata across the recently updated projects.",
      outcome: "Studio now distinguishes between a live website project, the Japan guide feature, private web previews, and desktop/source checkpoints.",
      validation: "GitHub remote heads were checked before editing the catalog; the website lint/build passed before publishing.",
      commits: "Catalog update in mahmoud.jp after d66ea18",
      nextStep: "Keep Studio metadata in sync whenever a project gets a new meaningful checkpoint.",
    },
    tags: ["studio", "catalog", "status", "projects"],
    createdAt: "2026-08-24T00:50:00.000Z",
    updatedAt: "2026-08-24T00:50:00.000Z",
  },
  {
    id: "activity-studio-primary-open-buttons",
    category: "activity",
    title: "Unified green open buttons across Studio projects",
    projectSlug: "mahmoud-jp",
    status: "completed",
    summary: "Made every project with a runnable path show a green primary action button, whether it opens an online app, downloads a ready build, or opens the local run file.",
    details: {
      date: "2026-08-24",
      objective: "Let Mahmoud open or start every tracked project from the same green action area in the Projects screen.",
      changes: "Changed the primary action resolver to prefer latest online previews, then ready online launches, ready downloads, and finally local run files for native projects.",
      outcome: "Web projects keep the Open latest online button, DTP Master gets a ready download button, and native Mac utilities get a visible local-run entry instead of no green action.",
      validation: "Studio TypeScript and production build were run after the change.",
      commits: "Studio primary action update",
      nextStep: "Build and upload native packages later if SuperNotch and Switcher should become one-click downloads instead of local-build entries.",
    },
    tags: ["studio", "projects", "open-button", "workflow"],
    createdAt: "2026-08-24T00:58:00.000Z",
    updatedAt: "2026-08-24T00:58:00.000Z",
  },
  {
    id: "activity-japan-life-private-app-redesign",
    category: "activity",
    title: "Made Japan Life private and redesigned it as an app",
    projectSlug: "japan-life-guide",
    status: "completed",
    summary: "Removed Japan Life from public navigation and search surfaces, protected it with Studio authentication, and replaced the public-page layout with a cleaner app-style workspace.",
    details: {
      date: "2026-08-24",
      objective: "Keep Japan Life private until Mahmoud explicitly approves publishing, and make the experience feel like a usable mobile/web app instead of a public portfolio page.",
      changes: "Added Studio auth protection for /japan-life and /japan-life/print, removed the route from Navbar and sitemap, disallowed it in robots.txt, changed Studio metadata to Private, and rebuilt the guide as a tabbed searchable app shell.",
      outcome: "Anonymous visitors are redirected to Studio login, while Mahmoud can open the private app from Studio and continue shaping it for future Android, iOS, and web versions.",
      validation: "Lint, production build, and unauthenticated redirect checks were run before publishing.",
      commits: "Private Japan Life app redesign",
      nextStep: "Move to a true cross-platform app stack when Mahmoud approves product direction, branding, and publication rules.",
    },
    tags: ["japan-life", "private", "app-redesign", "studio-auth"],
    createdAt: "2026-08-24T01:10:00.000Z",
    updatedAt: "2026-08-24T01:10:00.000Z",
  },
  {
    id: "activity-studio-project-catalog-categories",
    category: "activity",
    title: "Reorganized Studio project selection",
    projectSlug: "mahmoud-jp",
    status: "completed",
    summary: "Changed the Projects screen from one long list into a searchable, categorized catalog that can scale as more apps are added.",
    details: {
      date: "2026-08-24",
      objective: "Make choosing and managing projects easier as Mahmoud adds more applications over time.",
      changes: "Added project categories, catalog search, Featured and category filters, grouped project sections, and moved Japan Life to a Studio app route.",
      outcome: "Projects are easier to scan by family: core website, apps, learning tools, desktop work, utilities, games, and Studio tools.",
      validation: "ESLint and Next.js production build passed before deployment.",
      commits: "Studio catalog categorization update",
      nextStep: "Add richer app metadata later: owner, maturity, next release, revenue model, and platform badges.",
    },
    tags: ["studio", "projects", "catalog", "categories"],
    createdAt: "2026-08-24T01:25:00.000Z",
    updatedAt: "2026-08-24T01:25:00.000Z",
  },
  {
    id: "activity-snake-neon-circuit",
    category: "activity",
    title: "Rebuilt Snake as Neon Circuit",
    projectSlug: "snake",
    status: "completed",
    summary: "Reworked the game into a polished three-mode desktop and mobile experience and repaired the underlying collision and input bugs.",
    details: {
      date: "2026-08-20",
      objective: "Make Snake visually strong, easier to understand, and significantly better to play on keyboard and touch.",
      changes: "Added Classic, Rush, and Zen modes; live score, level, combo, speed, length, and power telemetry; responsive touch controls; procedural sound and music; motion and haptic settings; per-mode records; and a complete pause, game-over, replay, and mode-selection flow.",
      outcome: "The newest public main branch is immediately playable through the private Studio live-source runner with no build or installation.",
      validation: "JavaScript syntax and diff checks passed. Browser QA covered mode switching, Classic movement, pause/resume, Rush hard-wall death, replay/menu return, and active Zen rendering.",
      commits: "d58d8e9",
      nextStep: "Play-test scoring balance and add optional challenge missions only after real-session feedback.",
    },
    tags: ["snake", "neon-circuit", "gameplay", "responsive-ui", "accessibility"],
    createdAt: "2026-08-20T02:30:00.000Z",
    updatedAt: "2026-08-20T02:30:00.000Z",
  },
];

type MemoryStore = {
  notes: Map<string, StudioNote>;
  documents: Map<string, StudioDocument>;
  records: Map<string, StudioRecord>;
  map: Record<string, string> | null;
};

declare global {
  var __mahmoudStudioMemory: MemoryStore | undefined;
}

function memoryStore() {
  globalThis.__mahmoudStudioMemory ??= {
    notes: new Map(),
    documents: new Map(),
    records: new Map(),
    map: null,
  };
  return globalThis.__mahmoudStudioMemory;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

function normalizeNote(note: Partial<StudioNote> & Pick<StudioNote, "id" | "title" | "createdAt" | "updatedAt">): StudioNote {
  const legacyDone = note.status === "done";
  const workflow = note.workflow ?? (legacyDone ? "done" : note.kind === "project" ? "next" : "inbox");
  return {
    id: note.id,
    kind: note.kind === "project" || note.kind === "task" ? note.kind : "inbox",
    projectSlug: note.projectSlug ?? null,
    title: note.title,
    content: note.content ?? "",
    status: workflow === "done" ? "done" : "open",
    workflow,
    priority: note.priority ?? "medium",
    dueAt: note.dueAt ?? null,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

export async function listStudioNotes() {
  const redis = getRedis();
  const rows = redis
    ? await redis.hgetall<Record<string, StudioNote>>(NOTES_KEY)
    : Object.fromEntries(memoryStore().notes);
  return Object.values(rows ?? {})
    .map((note) => normalizeNote(note))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioNote(input: {
  title: string;
  content?: string;
  kind?: "inbox" | "task" | "project";
  projectSlug?: string | null;
  workflow?: StudioWorkflow;
  priority?: StudioPriority;
  dueAt?: string | null;
}) {
  const now = new Date().toISOString();
  const workflow = input.workflow ?? (input.kind === "project" || input.kind === "task" ? "next" : "inbox");
  const note: StudioNote = {
    id: crypto.randomUUID(),
    kind: input.kind === "project" || input.kind === "task" ? input.kind : "inbox",
    projectSlug: input.projectSlug ?? null,
    title: input.title,
    content: input.content ?? "",
    status: workflow === "done" ? "done" : "open",
    workflow,
    priority: input.priority ?? "medium",
    dueAt: input.dueAt ?? null,
    createdAt: now,
    updatedAt: now,
  };

  const redis = getRedis();
  if (redis) await redis.hset(NOTES_KEY, { [note.id]: note });
  else memoryStore().notes.set(note.id, note);
  return note;
}

export async function updateStudioNote(
  id: string,
  updates: Partial<Pick<StudioNote, "title" | "content" | "projectSlug" | "workflow" | "priority" | "dueAt">>,
) {
  const notes = await listStudioNotes();
  const current = notes.find((note) => note.id === id);
  if (!current) return null;
  const workflow = updates.workflow ?? current.workflow;
  const note: StudioNote = {
    ...current,
    ...updates,
    status: workflow === "done" ? "done" : "open",
    workflow,
    updatedAt: new Date().toISOString(),
  };
  const redis = getRedis();
  if (redis) await redis.hset(NOTES_KEY, { [note.id]: note });
  else memoryStore().notes.set(note.id, note);
  return note;
}

export async function deleteStudioNote(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(NOTES_KEY, id);
  else memoryStore().notes.delete(id);
}

const defaultDocuments: StudioDocument[] = [
  {
    id: "studio-operating-guide",
    title: "Mahmoud Studio — Operating Guide",
    projectSlug: null,
    type: "overview",
    summary: "The source-of-truth rules for projects, releases, work, knowledge, and AI collaboration.",
    content: `# Purpose
Mahmoud Studio is the private command center for Mahmoud's ideas, projects, versions, releases, work, and long-term knowledge.

# Source of truth
- GitHub is the source of truth for saved code.
- Latest code means the newest saved remote commit.
- Stable means a tested checkpoint Mahmoud trusts.
- Live means the version currently used by people.
- A pushed commit does not automatically become stable or live.
- Every pushed commit is an edit checkpoint, even when it is not a named version.
- A test build is a runnable file produced from one exact commit. If no build artifact exists, Studio must say source saved instead of offering a fake run button.

# Working workflow
1. Capture raw thoughts in Inbox & Work.
2. Connect actionable work to a project.
3. Save important context in Knowledge.
4. Push code to preserve progress.
5. Produce a test build or web preview only when the project needs one.
6. Mark a version stable only after validation.
7. Promote a version live only after explicit approval.

# AI collaboration rules
- Read the relevant project brief and knowledge documents before changing code.
- Preserve the distinction between latest, stable, and live versions.
- Never deploy, publish, release, or roll back without explicit approval.
- Record important decisions and handoff context after meaningful work.
- Prefer concise, verifiable status over assumptions.`,
    tags: ["studio", "workflow", "source-of-truth", "ai"],
    status: "current",
    createdAt: "2026-08-09T00:00:00.000Z",
    updatedAt: "2026-08-09T00:00:00.000Z",
  },
  {
    id: "ai-handoff-protocol",
    title: "AI Handoff Protocol",
    projectSlug: null,
    type: "handoff",
    summary: "A consistent context package for continuing work with an AI assistant on any device.",
    content: `# Before starting
- Identify the exact project and repository.
- Confirm the default and active branches.
- Read AGENTS.md, README.md, CHANGELOG.md, and docs/STATUS.md when present.
- Check the latest remote commit and the working tree before editing.

# Required handoff fields
- Objective
- Repository and local path
- Active branch
- Latest remote commit
- Stable version
- Live version
- Completed work
- Validation performed
- Open work
- Known risks
- Recommended next action

# Completion rule
Work is complete only when the requested outcome is implemented, validated in proportion to risk, documented, and safely saved remotely when publishing was requested.`,
    tags: ["ai", "handoff", "devices", "workflow"],
    status: "current",
    createdAt: "2026-08-09T00:00:00.000Z",
    updatedAt: "2026-08-09T00:00:00.000Z",
  },
  {
    id: "project-run-readiness-guide",
    title: "Project Run & Build Readiness",
    projectSlug: null,
    type: "runbook",
    summary: "How Studio represents ordinary edits, online previews, local launchers, test builds, stable checkpoints, and live releases.",
    content: `# States
- Edit checkpoint: any pushed Git commit, even when it has no version number.
- Online preview: a browser-ready deployment for the exact source being tested.
- Local launcher: a source file that starts the project locally and may require an installed toolchain.
- Test build: a runnable package produced from one exact commit.
- Stable checkpoint: a tested state Mahmoud trusts.
- Live release: the version deliberately promoted for real users.

# Truthful run buttons
- Show Try Online only when a working protected or public URL exists.
- Show Download only when a verified artifact exists for the selected commit and platform.
- Show Local only when the repository contains the named launcher or direct HTML file.
- If no runnable file exists, say Source saved or Build required.

# Privacy
- Never copy private project builds into the public mahmoud.jp repository.
- Private previews need protected hosting or authenticated artifact downloads.
- Keep secrets, signing material, user data, and local databases out of build artifacts.

# Retention
- Ordinary test artifacts may expire to control storage.
- Stable and live packages should be kept deliberately and documented separately.`,
    tags: ["projects", "edits", "builds", "previews", "releases"],
    status: "current",
    createdAt: "2026-08-10T00:00:00.000Z",
    updatedAt: "2026-08-10T00:00:00.000Z",
  },
  {
    id: "activity-memory-protocol",
    title: "Activity Memory Protocol",
    projectSlug: null,
    type: "handoff",
    summary: "How to preserve meaningful AI work as private, searchable project memory that can be continued on any device.",
    content: `# Purpose
Activity Log is the private memory of meaningful work completed with an AI assistant. It is a human-readable history and a continuation source for the next AI session.

# What to record
- One entry for each meaningful session, fix, deployment, investigation, or decision.
- Link the entry to the exact project whenever possible.
- Record the objective, what changed, outcome, validation, commits or versions, and the best next step.
- Use short tags for technologies, work type, and important topics.

# What not to record
- Passwords, access tokens, API keys, recovery codes, or payment data.
- Unverified claims that make unfinished work look complete.
- Routine conversation that does not help a future session understand or continue the project.

# AI continuation workflow
1. Open the project in Studio.
2. Download its AI Starter, which includes recent Activity Log memory.
3. Give the file to ChatGPT or Codex on the other device.
4. Verify the repository and latest remote commit before editing.
5. After meaningful work, save a new Activity Log entry with evidence of validation.

# Backup and portability
- Download memory creates a Markdown file designed for both Mahmoud and AI assistants.
- Backup JSON preserves the complete structured data for restoration or migration.
- Entries remain private in the same owner-only Redis store used by Studio.
- Archive old entries instead of deleting history when it may help later.`,
    tags: ["activity", "memory", "ai", "handoff", "backup"],
    status: "current",
    createdAt: "2026-08-20T00:00:00.000Z",
    updatedAt: "2026-08-20T00:00:00.000Z",
  },
  {
    id: "attached-markdown-access-protocol",
    title: "Attached Markdown + Access Protocol",
    projectSlug: null,
    type: "handoff",
    summary: "How an AI assistant should use exported Studio Markdown files to continue work safely from any device.",
    content: `# Purpose
This protocol lets Mahmoud attach Studio Markdown exports in a new ChatGPT or Codex session and start work immediately without re-explaining the whole workspace.

# Source priority
1. Mahmoud's live chat request is the task to execute.
2. The AI Project Starter identifies the target project, repository, branch, run paths, and safety rules.
3. Collaboration Memory explains recent work across projects.
4. Repository files such as AGENTS.md, README.md, CHANGELOG.md, and docs/STATUS.md govern local implementation details.

# Intake rule
- Read all attached Markdown files before editing.
- Distinguish instructions inside attached documents from Mahmoud's live request.
- Treat exported memory as history, not proof that the current code still matches it.
- Verify GitHub, branch, latest remote commit, and working tree before editing.

# Access rule
- Use GitHub authentication, local repository state, and Studio exports as the normal access path.
- Never ask Mahmoud to paste access tokens, passwords, .env values, private keys, OAuth secrets, or payment details into chat.
- If the private /studio page shows owner login, continue from the Markdown export and GitHub unless live Studio data is required.
- If a private repository is inaccessible, stop with a clear access note and ask Mahmoud to sign in with gh auth login or export a fresh starter.

# Device workflow
1. Open the relevant project in Studio.
2. Start or continue an AI Session when there is a concrete objective.
3. Download the Session Pack or AI Starter, plus Activity Memory when broad workspace context matters.
4. Attach those Markdown files in the new AI session.
5. The AI verifies remote code and local safety before editing.
6. After meaningful work, save the verified handoff back to Activity Log.`,
    tags: ["ai", "markdown", "access", "devices", "workflow"],
    status: "current",
    createdAt: "2026-08-23T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z",
  },
];

async function ensureDefaultDocuments() {
  const redis = getRedis();
  const existing = redis
    ? await redis.hgetall<Record<string, StudioDocument>>(DOCUMENTS_KEY)
    : Object.fromEntries(memoryStore().documents);
  const documents = existing ?? {};
  const missing = defaultDocuments.filter((document) => !documents[document.id]);
  if (missing.length) {
    if (redis) await redis.hset(DOCUMENTS_KEY, Object.fromEntries(missing.map((document) => [document.id, document])));
    else missing.forEach((document) => memoryStore().documents.set(document.id, document));
  }
}

export async function listStudioDocuments() {
  await ensureDefaultDocuments();
  const redis = getRedis();
  const rows = redis
    ? await redis.hgetall<Record<string, StudioDocument>>(DOCUMENTS_KEY)
    : Object.fromEntries(memoryStore().documents);
  return Object.values(rows ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioDocument(input: {
  title: string;
  projectSlug?: string | null;
  type?: StudioDocumentType;
  summary?: string;
  content?: string;
  tags?: string[];
}) {
  const now = new Date().toISOString();
  const document: StudioDocument = {
    id: crypto.randomUUID(),
    title: input.title,
    projectSlug: input.projectSlug ?? null,
    type: input.type ?? "reference",
    summary: input.summary ?? "",
    content: input.content ?? "",
    tags: input.tags ?? [],
    status: "current",
    createdAt: now,
    updatedAt: now,
  };
  const redis = getRedis();
  if (redis) await redis.hset(DOCUMENTS_KEY, { [document.id]: document });
  else memoryStore().documents.set(document.id, document);
  return document;
}

export async function updateStudioDocument(
  id: string,
  updates: Partial<Pick<StudioDocument, "title" | "projectSlug" | "type" | "summary" | "content" | "tags" | "status">>,
) {
  const documents = await listStudioDocuments();
  const current = documents.find((document) => document.id === id);
  if (!current) return null;
  const document: StudioDocument = { ...current, ...updates, updatedAt: new Date().toISOString() };
  const redis = getRedis();
  if (redis) await redis.hset(DOCUMENTS_KEY, { [document.id]: document });
  else memoryStore().documents.set(document.id, document);
  return document;
}

export async function deleteStudioDocument(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(DOCUMENTS_KEY, id);
  else memoryStore().documents.delete(id);
}

export async function listStudioRecords() {
  const redis = getRedis();
  const existing = redis
    ? await redis.hgetall<Record<string, StudioRecord>>(RECORDS_KEY)
    : Object.fromEntries(memoryStore().records);
  const rows = existing ?? {};
  const missingActivities = defaultActivityRecords.filter((record) => !rows[record.id]);
  if (missingActivities.length) {
    if (redis) await redis.hset(RECORDS_KEY, Object.fromEntries(missingActivities.map((record) => [record.id, record])));
    else missingActivities.forEach((record) => memoryStore().records.set(record.id, record));
    missingActivities.forEach((record) => { rows[record.id] = record; });
  }
  return Object.values(rows ?? {}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createStudioRecord(input: {
  category: StudioRecordCategory;
  title: string;
  projectSlug?: string | null;
  status?: string;
  summary?: string;
  details?: Record<string, string>;
  tags?: string[];
}) {
  const now = new Date().toISOString();
  const record: StudioRecord = {
    id: crypto.randomUUID(),
    category: input.category,
    title: input.title,
    projectSlug: input.projectSlug ?? null,
    status: input.status ?? "active",
    summary: input.summary ?? "",
    details: input.details ?? {},
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now,
  };
  const redis = getRedis();
  if (redis) await redis.hset(RECORDS_KEY, { [record.id]: record });
  else memoryStore().records.set(record.id, record);
  return record;
}

export async function updateStudioRecord(
  id: string,
  updates: Partial<Pick<StudioRecord, "title" | "projectSlug" | "status" | "summary" | "details" | "tags">>,
) {
  const records = await listStudioRecords();
  const current = records.find((record) => record.id === id);
  if (!current) return null;
  const record: StudioRecord = { ...current, ...updates, updatedAt: new Date().toISOString() };
  const redis = getRedis();
  if (redis) await redis.hset(RECORDS_KEY, { [record.id]: record });
  else memoryStore().records.set(record.id, record);
  return record;
}

export async function deleteStudioRecord(id: string) {
  const redis = getRedis();
  if (redis) await redis.hdel(RECORDS_KEY, id);
  else memoryStore().records.delete(id);
}

export async function getStudioMindMap() {
  const redis = getRedis();
  return redis ? await redis.get<Record<string, string>>(MAP_KEY) : memoryStore().map;
}

export async function saveStudioMindMap(snapshot: Record<string, string>) {
  const redis = getRedis();
  if (redis) await redis.set(MAP_KEY, snapshot);
  else memoryStore().map = snapshot;
}

export async function getStudioStorageUsage() {
  const [notes, documents, records, map] = await Promise.all([
    listStudioNotes(),
    listStudioDocuments(),
    listStudioRecords(),
    getStudioMindMap(),
  ]);
  const bytes = new TextEncoder().encode(JSON.stringify({ notes, documents, records, map })).byteLength;
  return {
    backend: getRedis() ? "Upstash Redis" : "Temporary memory",
    bytes,
    keys: 4,
    counts: {
      notes: notes.length,
      documents: documents.length,
      records: records.length,
      mindMapValues: map ? Object.keys(map).length : 0,
    },
    measuredAt: new Date().toISOString(),
  };
}
