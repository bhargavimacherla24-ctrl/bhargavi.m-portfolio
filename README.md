# Bhargavi Macharla — Portfolio (React)

React + Vite rebuild of the original single-file HTML portfolio.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Where to edit content

All text lives in `src/data/`, so no component changes are needed for content updates:

| File | Contains |
| --- | --- |
| `src/data/profile.js` | Name, contact details, about text, hero stats, toolkit, experience, education |
| `src/data/skills.js` | Skill explorer entries (description, points, worked example + chart data) |
| `src/data/projects.js` | The eight case studies, card headline question and metrics |
| `src/assets/` | Profile photo and dashboard images |


## Deploy to GitHub Pages

Live site: https://hemanth-k11.github.io/m.bhargavi-portfolio/

Every push to `main` builds the site and publishes `dist/` to the `gh-pages` branch via
`.github/workflows/deploy.yml`. One-time setup on GitHub: **Settings → Pages → Deploy from a branch → `gh-pages` / root**.

## Features

- Preloader that builds a bar chart and trend line with a workflow checklist and 0–100% counter, then lifts away in columns
- Hero: letter-by-letter name reveal, clip-path photo reveal with scroll parallax
- Spreadsheet-style skills grid with a formula bar describing the selected skill
- Scroll-scrubbed About statement (words light up as you read)
- Skill explorer with a sliding active pill, blur transitions and animated bar charts
- Experience timeline whose line draws as you scroll
- Desktop: pinned horizontal-scroll case studies; mobile: stacked cards
- Custom cursor (grows on links, shows “View” on case studies), magnetic buttons, film-grain overlay
- Case-study reader with prev/next, Esc / ← → keys and shareable links such as `#project-03`
- All motion respects the OS “reduce motion” setting

Animation helpers live in `src/components/motion.jsx`; colours and fonts are set at the top of `src/styles.css`.
