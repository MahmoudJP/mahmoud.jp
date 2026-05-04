# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal portfolio site for Mahmoud Adel Ibrahim — trilingual (Arabic / Japanese / English) DTP specialist and interpreter based in Tokyo. Deployed at **mahmoud.jp**.

Single-page scrolling layout with dark theme, gradient accents, framer-motion animations, and a contact form.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- framer-motion for animations
- lucide-react for icons
- Deployed on Vercel, DNS via Onamae

## Project Layout

```
src/
├── app/
│   ├── layout.tsx           # Root layout + site metadata
│   ├── page.tsx             # Composes sections in order
│   └── globals.css          # Tailwind + custom CSS
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── BackToTop.tsx
│   ├── Particles.tsx        # Hero background particles
│   ├── SectionReveal.tsx    # Scroll-in wrapper
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Education.tsx
│       ├── Languages.tsx
│       ├── Certifications.tsx
│       ├── Freelance.tsx
│       └── Contact.tsx
└── lib/
    ├── animations.ts        # fadeInUp, staggerContainer
    └── duration.ts          # calcDuration helper
public/
├── mahmoud-cropped.jpg      # Hero avatar
├── mahmoud.jpg              # Full portrait
└── mahmoud-cv.pdf           # CV download
```

Path alias: `@/*` → `./src/*`.

## Commands

```bash
npm run dev      # Next dev server on :3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

## Editing Sections

Each section is a self-contained component under `src/components/sections/`. Data (experiences, skills, certs, etc.) lives at the top of each file as a typed array — edit there to add/remove entries.

Section order is controlled from `src/app/page.tsx`.

## Responsive Rules

- Mobile-first Tailwind. Default classes = mobile; `sm:`, `md:` scale up.
- Primary breakpoints: **375px** (mobile), **768px** (md = tablet/desktop).
- The Experience timeline uses a single vertical spine on mobile, and left/right alternation on `md:` and up.
- `BackToTop` button sits at `bottom-4 right-4` on mobile, `bottom-8 right-8` on desktop.

## Contact

Primary contact email in code: **m@mahmoud.jp** (iCloud+ Custom Email Domain, when DNS is live).

## Git Workflow

Small personal project — direct pushes to `master` are fine. For larger changes, branch as `feat/...` or `fix/...` and open a PR.
