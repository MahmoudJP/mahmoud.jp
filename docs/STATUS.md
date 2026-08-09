# Project Status

Last reviewed: 2026-08-09

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

## Studio production validation

- `/studio` and the mind-map routes redirect anonymous visitors to the Studio
  login page.
- Private Studio APIs return `401` without an authenticated owner session.
- The structured records API also returns `401` without the authenticated
  owner session.
- Google OAuth sign-in completed successfully with the approved account.
- Production deployment for commit `5827f19` completed successfully on Vercel.
- `npm audit --omit=dev` reports zero vulnerabilities.
