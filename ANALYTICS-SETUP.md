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

Redis is now connected through Upstash for Redis.

After the Redis connection and redeploy, a test page-view event was recorded successfully. The private summary endpoint returned non-zero counts for:

- visitors
- page views
- pages
- referrers
- countries
- devices

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

## Redis integration

Upstash for Redis was provisioned through Vercel Marketplace:

- Resource name: `mahmoud-analytics`
- Plan: Free
- Primary region: `hnd1`
- Connected environments: Production, Preview, Development

Vercel added these Redis variables:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`
- `REDIS_URL`

The site was redeployed to Production after Redis was connected.

## Dashboard Usage

Open:

```text
analytics-dashboard.local.html
```

This private local file contains the dashboard key from `.env.local`, auto-refreshes on open, and is ignored by Git.

The local dashboard is read-only:

- no CSV import
- no manual save/reset buttons
- no JSON editor
- page paths are shown as readable page names, for example `/` appears as `الرئيسية`
- extra calculated cards show pages per visitor and the number of pages with visits

The safe shareable template is:

```text
analytics-dashboard.html
```

It does not contain the private key and requires entering the key manually.

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
