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

Set in Vercel → Project Settings → Environment Variables.

## Deployment

Push to `master` → Vercel auto-deploys. Primary domain: `mahmoud.jp`.

DNS records required for email (iCloud + Resend):
- MX records (Apple iCloud)
- SPF: `v=spf1 include:icloud.com include:amazonses.com ~all`
- DKIM: `sig1._domainkey` (iCloud) + Resend DKIM records
- DMARC: `v=DMARC1; p=none; rua=mailto:m@mahmoud.jp`
