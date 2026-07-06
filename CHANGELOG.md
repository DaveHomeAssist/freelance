# Changelog

All notable changes to the Rapid Sites site, by date.

## 2026-07-06
- Added explicit all-rights-reserved LICENSE.

## 2026-04-18
- Restricted the `/api/contact` CORS allowlist to known origins instead of `*`.
- Added Subresource Integrity (SRI) hashes to the React/ReactDOM CDN `<script>` tags.

## 2026-04-17
- Added `.vercel` deploy artifacts to `.gitignore`.

## 2026-04-12
- Replaced the Formspree-based contact form with a Notion-backed submission flow via a Vercel serverless function (`api/contact.js`), writing leads directly into a Notion database.
- (Same day, superseded above) Initial wiring of the contact form to Formspree with client-side validation, a honeypot field, and error states.
- Migrated project documentation from `AGENTS.md` to `CLAUDE.md` and added a feature analysis document auditing the site's functionality (flagging the contact form as non-functional at the time).

## 2026-03-24
- Fixed `app.js` to load via a relative path so the site works correctly on GitHub Pages.

## 2026-03-21
- Cross-project agent sweep: added Open Graph meta tags, accessibility fixes, and performance improvements.
- Added meta descriptions, `prefers-reduced-motion` support, and favicon fixes.

## 2026-03-20
- Added a robust `<noscript>` fallback for when the React CDN fails to load.
- Added SPA fallback landmarks and a skip-to-content link for accessibility.
- Replaced inline event handlers with CSS `:hover` classes.

## 2026-03-19
- Added `archives/` to `.gitignore`.
- Synced local changes.

## 2026-03-18
- Populated the issue tracker from a site audit (flagged the non-functional contact form as issue 001).

## 2026-03-17
- Added keyboard focus styling to the landing page.

## 2026-03-16
- Added a backlink to the portfolio hub.

## 2026-03-15
- Added the favicon pack and wired up page icons.

## 2026-03-12
- Initial project snapshot.
