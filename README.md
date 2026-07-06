# Rapid Sites

The marketing/lead-gen site for **Rapid Sites**, a freelance web-design offer pitching fixed-price, fast-turnaround websites (48-hour to 7-day delivery) to local businesses — restaurants, contractors, law firms, salons, and similar small businesses.

This is a single-page React app (no build step, no framework tooling) served as a static site, with one small serverless function handling contact-form submissions.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Page shell: meta/OG tags, loading spinner, `<noscript>` fallback content, and the React CDN `<script>` tags |
| `app.js` | The entire site — hero, pricing tiers, portfolio, social proof, FAQ, process timeline, and the contact form — written as `React.createElement()` calls (no JSX/build step) |
| `api/contact.js` | Vercel serverless function (`POST /api/contact`) that validates the contact form and writes submissions into a Notion database as new pages |
| `assets/icons/` | Favicon set |
| `netlify.toml` | SPA redirect config (site is served from Netlify) |
| `vercel.json` | CORS headers for the `/api/*` serverless functions (contact form API is hosted separately on Vercel) |
| `CLAUDE.md` | Project notes, stack decisions, and issue tracker used during development |

The site content — business name, pricing, portfolio items, testimonials — lives in plain JS objects/arrays at the top of `app.js` (`ME`, `PACKAGES`, `PORTFOLIO`, `SOCIAL_PROOF`, `FAQS`, `PROCESS`), so it's meant to be reused as a template: swap those values to relaunch the same site for a different name/brand.

## Running it

There's no `package.json` and no build step — it's plain HTML/CSS/JS loading React from a CDN.

- **View the site:** open `index.html` directly, or serve the folder with any static file server (e.g. `npx serve .`).
- **Contact form backend:** the form posts to a hardcoded Vercel URL (`CONTACT_API_URL` in `app.js`) that runs `api/contact.js`. To run that piece yourself you'd need a Vercel deployment with a `NOTION_API_KEY` environment variable set (a Notion internal integration token with access to the target database).
- **Hosting:** the static site is deployed via Netlify (`netlify.toml` handles the SPA fallback redirect); the `/api` function is deployed separately via Vercel.

## Conventions

- No build tooling on purpose — `app.js` is authored directly as `React.createElement()` calls rather than JSX, so it can be dropped onto any static host with zero compilation.
- `CONTACT_API_URL` in `app.js` and `ALLOWED_ORIGINS` in `api/contact.js` are hardcoded to specific deployment URLs — update both together if either the frontend or the API moves.
