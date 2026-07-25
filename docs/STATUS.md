# Project Status

Last reviewed: 2026-07-26

## State

- Repository visibility: Public
- Production site: `mahmoud.jp`
- Working branch: `import/mac-backup`
- Framework: Next.js 16 with React 19
- Next.js and eslint-config-next were updated to 16.2.11.
- No deploy was performed during the Mac-backup import.

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

## Before merging to the deployment branch

- Review the Navbar change.
- Review new files under `src`, `public`, `demo`, and `_logo-concepts`.
- Review the final public diff.
- Keep the import branch separate until a production deploy is explicitly requested.
- Dependency audit still reports upstream Next.js/tooling advisories; do not use
  `npm audit fix --force`.
