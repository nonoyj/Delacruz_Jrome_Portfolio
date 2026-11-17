# J'rome A. De la Cruz — Portfolio

A modern, dark, purple-accented portfolio website with code-flavored details.
Built with **React 19 + TypeScript + Vite**, animated with **Framer Motion**.

## ✨ Features

- **Hero** — giant name treatment, typewriter roles, profile photo with rotating ring and floating interest chips, count-up stats
- **About** — bio, currently-learning tags, fun facts
- **Tech Stack** — devicon logo tiles grouped by category
- **Experience** — animated timeline
- **Projects** — real GitHub repos (Mindful Minute, M-Gear Iloilo, MyWarehouse Inventory, Emergen w/ live link, StageFlow) with **downloadable APKs** for Mindful Minute and StageFlow
- **Education & Certifications** — incl. Cisco Networking Academy certificate (view the PDF right from the site)
- **Contact** — click-to-copy email, social links, mailto contact form
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
- skills & tech stack (devicon `icon` slugs from https://devicon.dev)
- certifications, experiences, education
- projects — each project supports:
  - `github` — repo link
  - `live` — deployed site link (optional)
  - `apk` — direct download link for an installable APK (optional), e.g. a
    GitHub raw link (`https://github.com/<user>/<repo>/raw/main/app.apk`)
    or a Google Drive link (`https://drive.google.com/uc?export=download&id=<file-id>`)

Your **photo**: currently the GitHub profile picture. To use another image,
drop it in `public/` (e.g. `public/me.jpg`) and set `photo: "/me.jpg"`.

**Certificates**: the Cisco Packet Tracer PDF lives at
`public/certs/cisco-packet-tracer.pdf` — add more PDFs there and reference
them as `/certs/<file>.pdf` in the `certifications` array.

## 📁 Project structure

```
public/
  certs/                   # downloadable certificate PDFs
src/
  App.tsx                  # page assembly, scroll-spy, effects
  index.css                # full theme (purple dark, sections, responsive)
  components/
    Nav.tsx                # fixed nav w/ scroll-spy + mobile menu
    sections.tsx           # Hero, About, Stack, Experience, Projects,
                           # Education, Contact, Footer
    icons.tsx              # GitHub / LinkedIn / Facebook SVG brand icons
  data/portfolio.ts        # ← EDIT THIS for all content
```

## 🌐 Deploying

`npm run build` outputs static files to `dist/` — deploy to Vercel,
Netlify, or GitHub Pages:

- **Vercel / Netlify**: import the repo, framework auto-detected (Vite), done.
- **GitHub Pages**: set `base` in `vite.config.ts` to `'/<repo-name>/'` before building.
