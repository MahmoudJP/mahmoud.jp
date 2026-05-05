# Analytics Setup Notes

This project now has a private, automatic analytics pipeline in addition to Vercel Web Analytics.

## What was added

- A client-side tracker component:
  - `src/components/AnalyticsTracker.tsx`
- A page-view tracking API:
  - `src/app/api/analytics/track/route.ts`
- A private dashboard summary API:
  - `src/app/api/analytics/summary/route.ts`
- A Redis-backed analytics store:
  - `src/lib/analytics-store.ts`
- A local private dashboard file:
  - `analytics-dashboard.html`
- Dependency:
  - `@upstash/redis`

## Deployment status

The code was deployed to Production and aliased to:

```text
https://mahmoud.jp
```

The private summary endpoint was tested:

- Without a key: returns `401 Unauthorized`
- With `ANALYTICS_DASHBOARD_KEY`: returns a valid JSON summary

Until Redis is connected, the summary returns zero counts.

## How it works

When someone opens a page on `mahmoud.jp`, the site sends a small anonymous page-view event to:

```text
/api/analytics/track
```

The server stores aggregate counts in Redis:

- visitors
- page views
- top pages
- referrers
- countries
- devices

The local dashboard reads the private summary from:

```text
https://mahmoud.jp/api/analytics/summary
```

The summary endpoint is protected by `ANALYTICS_DASHBOARD_KEY`.

## Vercel environment variables

These were added to Vercel for Production and Development:

- `ANALYTICS_DASHBOARD_KEY`
- `ANALYTICS_SALT`

The local copy is in `.env.local`, which is ignored by Git. Use the value of `ANALYTICS_DASHBOARD_KEY` from `.env.local` in the local dashboard password field.

## Pending Vercel Marketplace step

Redis could not be fully provisioned automatically because Vercel requires accepting the Upstash Marketplace terms for the account first.

Vercel opened/provided this terms URL:

```text
https://vercel.com/anamahmoudbbc-6174s-projects/~/integrations/accept-terms/upstash?source=cli
```

After accepting the terms, run:

```bash
vercel install upstash/upstash-kv --plan free --name mahmoud-analytics --environment production --environment preview --environment development -m primaryRegion=hnd1 -m eviction=true -m prodPack=false -m autoUpgrade=false
```

Then redeploy the site:

```bash
vercel --prod
```

## Dashboard Usage

Open:

```text
analytics-dashboard.html
```

Use:

```text
https://mahmoud.jp/api/analytics/summary
```

For the key, copy `ANALYTICS_DASHBOARD_KEY` from `.env.local`.

Click `تحديث تلقائي`.

## Important notes

- The dashboard starts counting only after this custom tracker is deployed.
- Old Vercel Web Analytics history cannot be imported automatically through an official public Web Analytics API.
- `/` means the home page: `https://mahmoud.jp/`.
