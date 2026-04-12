# CLAUDE.md

Inherits root rules from `/Users/daverobertson/Desktop/Code/AGENTS.md`.

## Project Overview

Freelance services site. Single page app with a separate JS module for interactivity. Deployed via Netlify.

## Stack

- Static HTML + CSS + JS (index.html + app.js)
- Netlify hosting (netlify.toml config present)
- No build step, no framework

## Key Decisions

- Mirror the contractor site architecture for consistency
- Netlify static hosting with minimal config
- Separate app.js for behavior

## Documentation Maintenance

- **Issues**: Track in the issue tracker table below
- **Session log**: Append to `/Users/daverobertson/Desktop/Code/95-docs-personal/today.csv` after each meaningful change

## Issue Tracker

| ID | Severity | Status | Title | Notes |
|----|----------|--------|-------|-------|
| 001 | P1 | open | Contact form is non-functional — data never submitted | app.js sets local state only; no POST request or Netlify form wiring |

## Session Log

[2026-03-18] [Freelance] [docs] Add AGENTS baseline
