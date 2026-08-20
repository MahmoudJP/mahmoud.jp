# Project Status

Last reviewed: 2026-08-20

## State

- Repository visibility: Public
- Production site: `mahmoud.jp`
- Production branch: `master`
- Framework: Next.js 16 with React 19
- Next.js and eslint-config-next are on 16.3.0.
- The private Mahmoud Studio workspace is live directly at `/studio` and is
  restricted to the approved owner Google account.
- The former `/studio/dashboard` URL redirects to `/studio` for compatibility.
- The mind map is integrated at `/studio/live/mind-map/` behind the same
  authentication boundary and streams the latest public GitHub source.
- Private Studio notes and mind-map data use the existing Vercel Upstash Redis
  environment.
- The Studio navigation keeps related concepts together: Projects includes
  release state, while Inbox & Work combines capture and execution.
- Knowledge / Docs stores structured Markdown with project links, summaries,
  tags, and portable AI context exports.
- The Knowledge store includes a Studio operating guide and an AI handoff
  protocol by default, plus an Activity Memory protocol for consistent,
  private cross-device continuation.
- Studio includes an Activity Log backed by the existing private Redis store.
  Entries are grouped by project, searchable, editable, archivable, and
  exportable as AI-readable Markdown or a full JSON backup. Recent entries are
  included automatically in each project's AI Starter.
- Projects now includes a persistent AI Session workflow. Each session records
  its mode, objective, optional context, active state, and project checkpoint;
  produces a safe ChatGPT/Codex Session Pack; and becomes a structured Activity
  Log entry when completed or blocked.
- Knowledge now groups Docs, a structured Decisions log, and project-wide AI
  Handoffs that assemble release state, open work, decisions, documents, and
  health signals into portable Markdown.
- Operations groups Health, Automations, and private internal Analytics.
- Assets catalogs reusable files and source links without placing binaries in
  Redis. Career stores CV-ready evidence and applications. Finance tracks cost
  and renewal metadata while explicitly excluding credentials and payment data.
- All new structured Studio records use the private Upstash Redis store and the
  owner-only Studio API boundary.
- The Projects workspace now uses a fixed catalog and a focused project view
  instead of card grids and modal drawers. Each project records its repository,
  visibility, preferred local path, branch, and checkpoint.
- Every project can export an AI Project Starter Markdown file with safe clone
  and update instructions, release state, open work, decisions, knowledge,
  health signals, and explicit no-overwrite/no-deploy rules.
- Studio typography, work cards, Knowledge, and operational records were scaled
  for faster scanning on desktop and mobile.
- Every project now records its real run paths: ready online previews, existing
  downloads, local source launchers, and packages that still require a build.
  Studio does not present a runnable button when no verified package exists.
- Projects includes a recent edit timeline. Public repositories sync directly
  with GitHub; private repositories use verified snapshots until the optional
  read-only `STUDIO_GITHUB_TOKEN` connection is configured.
- GitHub Actions artifacts can be downloaded through an authenticated Studio
  route when a workflow has produced a build for that exact commit.
- CloudOps Coach has a private **Open latest online** path. Studio issues a
  30-second signed launch ticket, CloudOps exchanges it for a secure HttpOnly
  12-hour session, and direct public visits are rejected. Its private GitHub
  repository is connected to Vercel so every push deploys automatically.
- JLPT Master, Koryuu, and MyLife now have the same automatic private launch
  flow, with an isolated signing secret and Git-connected deployment per app.
- Snake and Mind Map are served from their latest public GitHub `main` files
  through owner-only, no-store Studio routes, so future pushes need no manual
  snapshot copy.
- The latest-source runner now injects a project-scoped HTML base URL. Snake's
  relative CSS, engine, and plugin assets therefore load from the correct
  authenticated route, and the Play button was verified in a real browser.
- Snake is now recorded at `d58d8e9` as the Neon Circuit rebuild, with Classic,
  Rush, and Zen modes, responsive touch controls, live game telemetry, improved
  accessibility, and repaired obstacle/input logic. Its merged `main` source is
  immediately available through the existing Studio runner.
- Important repository files and their purpose are listed per project and are
  included in the AI Project Starter export.
- The public Snake source is streamed as an owner-only Studio web preview. The
  latest-source route is covered by the Studio authentication boundary.
- Operations / Analytics now reports the audited Vercel Hobby footprint and a
  live estimate of private Studio JSON stored in Upstash Redis.
- Home now includes a live workspace-intelligence board: work-flow completion,
  project momentum, per-project knowledge coverage, and a priority-ranked focus
  queue. Charts are computed from Studio data rather than decorative samples.
- Operations / Analytics now visualizes work completion, health, automation
  readiness, private record mix, and Redis capacity with accessible progress
  indicators and responsive layouts.
- Every project now has evidence-based development-readiness gates for context,
  next action, runnable paths, health checks, and decision history. Missing
  evidence is shown explicitly instead of being treated as complete.
- JLPT Master now reflects its current validated checkpoint, complete content
  audits, and both Windows and macOS source launchers.
- Inbox & Work can be filtered by project and priority, and global search now
  applies to work items as well as projects, knowledge, and records. `/` focuses
  search and Escape clears it.
- The private workspace received a visual refinement layer with clearer depth,
  stronger chart hierarchy, responsive mobile states, and consistent cards.
- Studio now includes `/studio/cloudops-sync`, an owner-only pairing page for
  CloudOps Coach. Pairing tokens are stored only as SHA-256 hashes; uploaded
  progress must be an AES-GCM/PBKDF2 encrypted envelope and stale revisions are
  rejected instead of overwriting newer device progress.
- The CloudOps Sync API has a 2 MB limit, strict envelope metadata validation,
  explicit localhost/Tauri/allowlisted CORS, token revocation, and no-store
  response headers. It never accepts AWS credentials or plaintext study data.
- CloudOps Coach v3.1.0 is recorded at commit `9a96555` with private Windows and
  Apple Silicon macOS artifacts. The Windows portable executable passed a local
  launch smoke test. Edit History now renders every artifact for a commit rather
  than hiding all but the first platform build.

## Import notes

- The GitHub checkout and Mac backup shared the same base commit.
- Meaningful local source files were copied into this clean working copy.
- `.env.local`, Vercel state, dependencies, build output, logs, `.DS_Store`,
  and AppleDouble `._*` files were excluded.
- `AGENTS.md` is intentionally tracked so new Codex tasks and devices receive
  the same project instructions.

## Validation completed

- Public-source secrets scan passed.
- ESLint passed with three existing warnings and no errors.
- Production build passed on Windows.
- AI Session end-to-end browser QA passed for create, persist, export/copy,
  finish, and Activity Log conversion.
- Snake JavaScript syntax checks and browser QA passed for all mode selection,
  movement, pause/resume, Rush wall death, replay/menu return, and Zen rendering.
- CloudOps Sync integration passed owner token rotation, encrypted push/pull,
  plaintext and malformed-envelope rejection, stale-write conflict, device
  metadata, and token revocation.

## Studio production validation

- `/studio` and the mind-map routes redirect anonymous visitors to the Studio
  login page.
- `RUN-LOCAL.cmd`, `OPEN-LOCAL-SITE.cmd`, and `open-local-site.command` open
  `/studio` on `localhost:3000` with a development-only local preview flag.
  This avoids Google OAuth setup for local visual testing; production builds
  ignore the bypass and keep the owner-only authentication requirement.
- Private Studio APIs return `401` without an authenticated owner session.
- The structured records API also returns `401` without the authenticated
  owner session.
- Google OAuth sign-in completed successfully with the approved account.
- Production deployments expose `VERCEL_GIT_COMMIT_SHA` in Studio so the live
  project checkpoint stays accurate after every merge.
- `npm audit --omit=dev` reports zero vulnerabilities.
