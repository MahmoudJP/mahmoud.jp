# mahmoud.jp

Personal portfolio for **Mahmoud Adel Ibrahim** — trilingual (Arabic / Japanese / English) DTP specialist and interpreter based in Tokyo. Live at [mahmoud.jp](https://mahmoud.jp).

## Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS v4**
- **framer-motion** — scroll animations
- **lucide-react** — icons
- **Resend** — contact form email
- **@vercel/analytics** — page view tracking
- Deployed on **Vercel**, DNS via **Onamae**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, Analytics
│   ├── page.tsx                # Home page (section composition)
│   ├── opengraph-image.tsx     # Dynamic OG image (1200×630)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── api/contact/route.ts    # Resend email handler
│   ├── projects/               # Projects index + DTP Master
│   ├── writing/                # Writing / blog
│   └── uses/                   # Tools & setup page
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── BackToTop.tsx
│   ├── Particles.tsx
│   ├── SectionReveal.tsx
│   └── sections/               # One file per homepage section
└── lib/
    ├── i18n.ts                 # Locale context (en / ja / ar)
    ├── animations.ts           # Shared framer-motion variants
    └── duration.ts             # calcDuration helper
public/
├── mahmoud-cropped.jpg
├── mahmoud.jpg
└── mahmoud-cv.pdf
```

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form |
| `STUDIO_ALLOWED_EMAIL` | Only Google account allowed into private Studio |
| `STUDIO_GITHUB_TOKEN` | Fine-grained token with Contents: read and Actions: read; maps private commits and streams their previews/downloads after Studio authentication |
| `STUDIO_LAUNCH_SECRET` | Shared secret that signs 30-second CloudOps launch tickets and private 12-hour browser sessions; stored only as a sensitive Vercel variable |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Private Studio and encrypted CloudOps Sync storage |
| `CLOUDOPS_SYNC_ALLOWED_ORIGINS` | Optional comma-separated hosted CloudOps Coach origins |

Set in Vercel → Project Settings → Environment Variables.

### Private commit previews

Projects can publish a `Studio-Web-<project-slug>-<full-sha>` GitHub Actions
artifact. Studio shows **Open online** beside that exact commit and serves the
files through `/studio/run/<project-slug>/<full-sha>/`. Both the page and every
asset are owner-authenticated; private build output stays in its private source
repository instead of being committed to this public website repository. The
preview response is not stored by the browser, and preview builds must disable
offline service workers so a Studio logout remains an effective access boundary.

CloudOps Coach also has a Git-connected Vercel deployment for the newest `main`
commit. `/studio/launch/cloudops-associate` checks the Google-protected Studio
session, creates a short-lived signed ticket, and hands it to the CloudOps
middleware. Direct visits are rejected, while every future GitHub push deploys
automatically without a GitHub personal access token in Studio.

## Deployment

Push to `master` → Vercel auto-deploys. Primary domain: `mahmoud.jp`.

DNS records required for email (iCloud + Resend):
- MX records (Apple iCloud)
- SPF: `v=spf1 include:icloud.com include:amazonses.com ~all`
- DKIM: `sig1._domainkey` (iCloud) + Resend DKIM records
- DMARC: `v=DMARC1; p=none; rua=mailto:m@mahmoud.jp`
