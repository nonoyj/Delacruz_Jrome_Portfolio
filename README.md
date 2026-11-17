# J'rome A. De la Cruz — Portfolio

A modern, dark, purple-accented portfolio website with code-flavored details.
Built with **React 19 + TypeScript + Vite**, animated with **Framer Motion**.

## ✨ Features

- **Hero** — giant name treatment, typewriter roles, profile photo with rotating ring and floating interest chips, count-up stats
- **About** — bio, currently-learning tags, fun facts
- **Tech Stack** — devicon logo tiles grouped by category
- **Experience** — animated timeline
- **Projects** — real GitHub repos (Mindful Minute, M-Gear Iloilo, MyWarehouse Inventory, Emergen w/ live link)
- **Education & Certifications** — timelines and credential cards
- **Contact** — click-to-copy email, social links, mailto contact form
- **Editor Mode 🔒** — passcode-gated panel (nav "Editor" button / footer "editor login") where only J'rome can edit skills, tech stack, certifications, experiences, and education. Edits save to that browser's localStorage; **Export JSON** to publish them into `src/data/portfolio.ts`.
- Purple cursor glow, scroll progress bar, scroll-spy nav, staggered reveal animations, fully responsive

## 🚀 Getting started (local)

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:5173
```

Build for production:

```bash
npm run build   # type-checks + bundles to dist/
npm run preview # serve the production build locally
```

## ✏️ Editing your content

Everything on the site reads from **one file**: `src/data/portfolio.ts`

- profile (name, photo, bio, email, socials, stats)
- skills, tech stack (devicon `icon` slugs from https://devicon.dev)
- certifications, experiences, education
- projects (name, description, tech, year, GitHub/live links)

Your **photo**: currently the GitHub profile picture. To use another image,
drop it in `public/` (e.g. `public/me.jpg`) and set `photo: "/me.jpg"`.

## 📁 Project structure

```
src/
  App.tsx                  # page assembly, scroll-spy, editor/gate state
  index.css                # full theme (purple dark, sections, responsive)
  components/
    Nav.tsx                # fixed nav w/ scroll-spy + mobile menu
    sections.tsx           # Hero, About, Stack, Experience, Projects,
                           # Education, Contact, Footer, Editor modal
    EditorView.tsx         # Editor Mode editing UI
    EditorGate.tsx         # passcode modal (SHA-256, first-run setup)
    icons.tsx              # GitHub / LinkedIn / Facebook SVG brand icons
  hooks/useContent.ts      # default content + localStorage overrides
  data/portfolio.ts        # ← EDIT THIS for all content
```

## 🌐 Deploying

`npm run build` outputs static files to `dist/` — deploy to Vercel,
Netlify, or GitHub Pages:

- **Vercel / Netlify**: import the repo, framework auto-detected (Vite), done.
- **GitHub Pages**: set `base` in `vite.config.ts` to `'/<repo-name>/'` before building.
