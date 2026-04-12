# Freelance (Rapid Sites) -- Feature Analysis

**Date:** 2026-03-25
**Files analyzed:** `index.html`, `app.js`
**Stack:** Static HTML + React 18 (CDN) + vanilla JS, Netlify hosting

---

## Summary Table

| Feature | Status | Data Source / Persistence | Critical Gap |
|---|---|---|---|
| Single-page scroll navigation | Working | Smooth scroll via `scrollTo()` | No hash-based routing (unlike contractor) |
| Pricing cards (3 tiers) | Working | Hardcoded PACKAGES array | Static; no dynamic pricing or Stripe integration |
| Portfolio showcase (4 projects) | Working | Hardcoded PORTFOLIO array | 2 of 4 are "Coming Soon" placeholders |
| Social proof / testimonials | Working | Hardcoded SOCIAL_PROOF array | Generic attributions ("Local Business Owner") |
| Contact form | **Broken** | Local state only | **P1: Form data never submitted anywhere** |
| FAQ accordion (7 items) | Working | Hardcoded FAQS array | None |
| Process timeline (4 steps) | Working | Hardcoded PROCESS array | None |
| Sticky nav with blur | Working | CSS position:sticky + backdrop-filter | Mobile: only CTA link visible (links hidden at 640px) |
| Satisfaction guarantee box | Working | Static content | None |
| Hero stats (48hr, $750, 100%) | Working | Static content | None |
| Loading spinner | Working | Inline script in index.html | 3s timeout fallback |
| Noscript fallback | Working | Static HTML | Good SEO content |
| OG/Twitter meta tags | Working | Static in `<head>` | No og:image defined |
| Reduced-motion support | Working | `prefers-reduced-motion` media query | None |

---

## Detailed Feature Analysis

### 1. Contact Form (CRITICAL: Non-Functional)
**Problem it should solve:** Lead capture for prospective web design clients.
**Implementation:** `ContactForm` component renders name, email, phone, business type, and project description fields. On submit, it calls `setSent(true)` which shows a "Message Sent" confirmation.
**Critical gap:** The form has **no submission logic**. No `fetch()`, no Netlify form wiring, no `mailto:` -- clicking "Send Message" sets local React state and shows a fake success message. The hidden Netlify form markup present in the contractor project is absent here. This is documented as issue 001 in CLAUDE.md.

### 2. Pricing Cards
**Problem it solves:** Transparent fixed pricing to convert price-sensitive small business owners.
**Implementation:** Three-tier grid (Starter $750, Professional $1,500, Premium $2,500). The Professional card is flagged `best: true` and gets a `featured` CSS class with "MOST POPULAR" ribbon via `::before` pseudo-element. Each card lists features and turnaround time.
**Tradeoffs:** Clean presentation with feature comparison. No payment integration -- all CTAs scroll to the (broken) contact form.

### 3. Portfolio Showcase
**Problem it solves:** Demonstrates capability and range to prospective clients.
**Implementation:** 2-column grid of `folio-card` components with header (type, name, description, tags) and stats footer (pages, delivery days, highlight feature). Each project has a custom color/accent theme.
**Tradeoffs:** 2 of 4 portfolio items are "Coming Soon" which weakens credibility. No click-through to live sites or detailed case studies.

### 4. Design System
**Problem it solves:** Dark, modern SaaS aesthetic targeting design-conscious SMB owners.
**Implementation:** CSS custom properties with dark palette (`--bg: #0A0A0B`, accent `--accent: #E8C872`). Fonts: Instrument Serif (display), Geist (body). fadeUp animations with staggered delays. All CSS in a template literal string.
**Tradeoffs:** Visually polished. The dark theme may not resonate with some target demographics (contractors, dentists). No light mode option.

### 5. Sticky Navigation
**Problem it solves:** Persistent access to key sections and CTA.
**Implementation:** `position: sticky` with `backdrop-filter: blur(16px)` for glass effect. Five section links plus a gold CTA button. On mobile (<640px), all links except CTA are hidden.
**Tradeoffs:** Good mobile behavior -- the CTA stays visible. But users lose the ability to jump to specific sections on mobile.

---

## Top 3 Priorities

1. **Fix the contact form (P1).** This is the sole conversion mechanism for the entire site and it does nothing. Wire it to Netlify Forms (matching the contractor pattern) or add a serverless function endpoint.

2. **Replace "Coming Soon" portfolio items.** Having 50% placeholder content undermines the "I build sites fast" positioning. Either fill them with real work or remove them and show only the 2 live projects.

3. **Add og:image for social sharing.** Like the contractor site, social previews have no image.
