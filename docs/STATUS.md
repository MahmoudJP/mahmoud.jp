# Project Status

Last reviewed: 2026-08-19

## State

- Repository visibility: Public
- Production site: `mahmoud.jp`
- Production branch: `master`
- Framework: Next.js 16 with React 19
- Next.js and eslint-config-next are on 16.3.0.
- The private Mahmoud Studio workspace is live directly at `/studio` and is
  restricted to the approved owner Google account.
- The former `/studio/dashboard` URL redirects to `/studio` for compatibility.
- The mind map is integrated at `/studio/mind-map/index.html` behind the same
  authentication boundary.
- Private Studio notes and mind-map data use the existing Vercel Upstash Redis
  environment.
- The Studio navigation keeps related concepts together: Projects includes
  release state, while Inbox & Work combines capture and execution.
- Knowledge / Docs stores structured Markdown with project links, summaries,
  tags, and portable AI context exports.
- The Knowledge store includes a Studio operating guide and an AI handoff
  protocol by default.
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
- Important repository files and their purpose are listed per project and are
  included in the AI Project Starter export.
- The public Snake source is embedded as an owner-only Studio web preview. The
  preview route is covered by the Studio authentication boundary.
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
