<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js App Router project. Here is a summary of all changes made:

- **`instrumentation-client.ts`** — Updated PostHog init to use the reverse proxy (`/ingest`) as `api_host`, added `ui_host` pointing to the actual PostHog host, enabled `capture_exceptions: true` for automatic error tracking, and added `debug` mode in development.
- **`next.config.ts`** — Added PostHog reverse proxy rewrites (`/ingest/static/*` and `/ingest/*`) and set `skipTrailingSlashRedirect: true` to support PostHog trailing-slash API requests.
- **`components/ExploreBtn.tsx`** — Added `posthog.capture("explore_events_clicked")` in the click handler for the "Explore Events" CTA button.
- **`components/EventCard.tsx`** — Converted to a client component (`'use client'`) and added `posthog.capture("event_card_clicked", {...})` with rich properties (`event_title`, `event_slug`, `event_location`, `event_date`) when a user clicks an event card.
- **`.env.local`** — Created with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables (covered by `.gitignore`).

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the homepage | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details (captures title, slug, location, date) | `components/EventCard.tsx` |
| `purchase_completed` | User completes a purchase (pre-existing) | `app/checkout/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/345734/dashboard/1368696
- **Event Engagement Overview** (daily trend of all key events): https://us.posthog.com/project/345734/insights/U9X5Bf2v
- **Conversion Funnel: Explore → Click → Purchase**: https://us.posthog.com/project/345734/insights/mc7G7Rz5
- **Most Clicked Events by Title** (bar chart by `event_title`): https://us.posthog.com/project/345734/insights/gPWTvriE
- **Weekly Purchases** (revenue conversion trend): https://us.posthog.com/project/345734/insights/wVGn7NPk

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
