# Sachin M — Portfolio

Two sides of the same coin: a clean **Designer** side (default) and a loud **Builder** side, joined by a coin flip.
React + Vite, plain CSS with light/dark themes, and a Vercel serverless function for the contact form.

## Run it on your laptop (Windows)

1. Install **Node.js LTS** from nodejs.org (tick "Add to PATH").
2. Unzip this folder, open it in VS Code, then open the terminal (Ctrl + `).
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open the link it prints (usually http://localhost:5173).

The contact form only sends real emails once it's deployed on Vercel (step below). Everything else works locally.

## Put it online for free (Vercel)

1. Create a new repository on GitHub (for example `portfolio`) and upload this folder:
   ```
   git init
   git add .
   git commit -m "First version of my portfolio"
   git branch -M main
   git remote add origin https://github.com/sachindreamdesigns-tech/portfolio.git
   git push -u origin main
   ```
2. Go to vercel.com → sign in with GitHub → **Add New → Project** → pick the repo → **Deploy**.
   Vercel detects Vite automatically. You get a free address like `sachin-m.vercel.app`
   (rename it in Project → Settings → Domains).
3. Every time you `git push`, the site updates on its own.

### Turn on the contact form
1. Sign up at resend.com (free) with **sachindreamdesigns@gmail.com** and create an API key.
2. In Vercel → your project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend key
   - `CONTACT_TO` = sachindreamdesigns@gmail.com
3. Redeploy (Deployments → ⋯ → Redeploy). Messages now land in your inbox, and "Reply" goes straight to the sender.

## Where to edit things

| What | File |
|---|---|
| All text, projects, links, skills | `src/data.js` (search for `TODO`) |
| Colours, fonts, spacing (light + dark) | `src/styles.css` → top `:root` and `[data-theme="dark"]` |
| Your doodles | `public/doodles/sachin-designer.webp` (designer side) and `sachin.webp` (builder side) — see "Your doodle" below |
| Lab page (live UX demo) | `src/pages/Lab.jsx` — the `FACTORS` list and the `SignupDemo` preview |
| Resume download | `public/Sachin_Resume.pdf` |
| Project images | `images` list for each project in `src/data.js` |
| Pages (Home, About, Projects, Experience, Education, Contact) | `src/pages/` |
| Builder side text, dev projects, stack, journey | `src/builderData.js` |
| Builder side pages | `src/builder/pages/` |
| Lab demos (token playground, audit trail, GitHub feed) | `src/builder/lab/` |
| Which page each flip lands on | `src/flipMap.js` |
| Coin flip animation | `src/components/CoinFlip.jsx` + `.coinflip` styles |

## How it works
- Designer side: `/`, `/about`, `/projects`, `/projects/<slug>` (same project URLs as your Framer site), `/experience`, `/education`, `/lab`, `/contact`. Builder side: `/builder`, `/builder/about`, `/builder/projects`, `/builder/projects/<slug>`, `/builder/stack`, `/builder/lab`, `/builder/contact`. Flipping takes you to the matching page on the other side. Send `/builder` links straight to frontend recruiters.
- The Builder side is only downloaded when someone flips, so the first page stays fast.
- Light/dark follows the visitor's system setting and remembers their choice.
- People with "reduce motion" turned on skip the flip animation.
- `api/contact.js` is the backend: validates input, blocks bots with a hidden field, and emails you via Resend.

## Before you cancel Framer: move your images
Project images and your photo currently load from your old Framer site (`framerusercontent.com` links in `src/data.js`).
They'll stop working if that site is deleted. To keep them:
1. Open each link from `src/data.js` in your browser and save the image.
2. Put them in `public/work/` (e.g. `public/work/finance-1.png`).
3. In `src/data.js`, replace `F("...")` with the path, e.g. `"/work/finance-1.png"`.
If an image ever fails to load, the site shows a blue-and-amber placeholder instead of a broken image.

## The talking hero
- **What the doodle says:** edit `introScript` in `src/data.js`. It's read aloud with the browser's built-in voice and shown as captions. The speaker button switches to captions only.
- **Developer skills on the clean side:** `heroDevSkills` in `src/data.js`.
- **Hero tool tiles (builder side):** the `TOOLS` list at the top of `src/components/HeroStage.jsx`.

## Your doodle
- There are two doodle images: `public/doodles/sachin-designer.webp` (the casual, laptop-in-hand pose) for the designer side, and `public/doodles/sachin.webp` (the suited pose) for the builder side — both with the background removed. `scribbles-designer.webp` is the pencil-scribble + desk backdrop behind the designer doodle, and `avatar-*.webp` are the round face crops (nav and flip button).
- The talking effect is in `src/components/Doodle.jsx`: a dark mouth sits behind the lips and the chin area drops slightly while speaking. Each image has its own `MOUTH`/`JAW` numbers (percent positions on the image) in the `VARIANTS` object — if you swap in a new doodle, adjust that variant's numbers so they line up with the new face.

## The Lab page (designer side)
- `/lab` is a live, interactive demo: flipping the switches in `src/pages/Lab.jsx` changes a sample sign-up form in real time (contrast, feedback, inline validation, loading state, tap targets, motion) and a UX score updates to match. It's meant to make the value of good UX visible rather than just described.
- Edit the `FACTORS` list to change what's being demonstrated, or the scoring weights.

## Builder side (cinematic)
- Home is a set of numbered chapters in `src/builder/pages/BHome.jsx`: loader → 01 Opening (posters) → 02 Showreel (you in the sun, with a draggable arc of work above your head) → 03 Universe (fly through your dev projects) → 04 Genesis (your story, as a horizontal timeline) → 05 Camera (live demo) → 06 Capabilities (stack shards) → 07 Studio (contact).
- Items in the showreel ring: `reelRing` in `src/builderData.js`.
- Styles for the whole builder side: `src/builder.css`.
- Flipping from the designer home plays the transition and lands you on the Showreel; the loader only plays on a direct visit.
