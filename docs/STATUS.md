# Project Status

Last reviewed: 2026-08-09

## State

- Repository visibility: Public
- Production site: `mahmoud.jp`
- Production branch: `master`
- Framework: Next.js 16 with React 19
- Next.js and eslint-config-next are on 16.3.0.
- Mahmoud Studio is live at `/studio`.
- The private workspace is available at `/studio/dashboard` and restricted to
  the approved owner Google account.
- The mind map is integrated at `/studio/mind-map/index.html` behind the same
  authentication boundary.
- Private Studio notes and mind-map data use the existing Vercel Upstash Redis
  environment.

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

- `/studio` returns `200` without authentication.
- Private dashboard and mind-map routes redirect anonymous visitors to the
  Studio login page.
- Private Studio APIs return `401` without an authenticated owner session.
- Google OAuth sign-in completed successfully with the approved account.
- Production deployment for commit `5827f19` completed successfully on Vercel.
- `npm audit --omit=dev` reports zero vulnerabilities.
