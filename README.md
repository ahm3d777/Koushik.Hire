# Koushik Ahmed — Personal Portfolio (`Obsidian Telemetry`)

Product-minded Full-Stack Web, Mobile & Edge Systems portfolio engineered from the **End-to-End Personal Portfolio Website Design Blueprint**.

---

## Signature Architecture & Features Included

1. **Dual-Lens Visitor Switcher (`Engineer` / `Client`)** — Instant kinetic text-scramble (`useScrambleText`) reframing headlines, project summaries, and CTAs for technical recruiters vs. freelance business clients.
2. **Live X-Ray Architecture Mode (`Cmd/Ctrl + X` or `X-RAY` HUD Switch)** — Cyan laser scanline sweep, wireframe module inspection callouts, live Three.js CAD wireframe toggle, and bottom-left real-time FPS / Viewport / Scroll / Edge PoP HUD.
3. **3D Spatial Device Forge (`Three.js` WebGL Stage)** — Interactive Obsidian Monolith in the Hero (drag-to-orbit + cursor tilt) that morphs across project mediums (*Desktop*, *Mobile*, *Split Workspace*, *Commerce*) as you scroll through Selected Work, with automatic off-screen/hidden-tab pause guardrails.
4. **Global Command Palette & Interactive Terminal (`Cmd/Ctrl + K`)** — Linear/Raycast-inspired spotlight launcher + `>_ Terminal` shell supporting `help`, `whoami`, `projects`, `stack`, `dhaka`, `setup`, `hire`, `xray`, `theme`, `gym`, `shokti`, and `clear`.
5. **Live Dhaka Pulse Edge Telemetry Capsule** — Real-time `Asia/Dhaka` (`GMT+6`) clock + Cloudflare Pages Edge Function (`/functions/api/telemetry.js`) measuring live visitor PoP & round-trip latency.
6. **Interactive Before / After Prototype Lab + 60-Second Scope Estimator** — Drag-handle modernization diff slider + 4-step configurator outputting a tailored project roadmap with 1-click **WhatsApp** and **Email** brief handoff.
7. **Opt-In Tactile Micro-Audio & Daylight Paper Theme** — Procedural Web Audio synthesizer (muted by default) + warm-stone **Daylight Paper** light theme toggle.

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js 20+** (Node 22 LTS recommended) and **npm**

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. Vite includes a built-in local simulator for `/api/telemetry` and `/api/contact`.

### 3. Run Automated Tests & Linter
```bash
npm run lint
npm test
```

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## Where to Customize Your Links & Assets (60-Second Checklist)

1. **Contact, WhatsApp, Social & Resume Links (`src/config/siteConfig.js`)**:
   - Update `whatsappNumber` (digits only, e.g. `'88017XXXXXXXX'`).
   - Update `linkedinUrl` with your LinkedIn profile URL.
   - Drop your PDF résumé at `public/resume.pdf` and set `resumeUrl: '/resume.pdf'` (a print-ready HTML résumé is pre-bundled at `/resume.html` so nothing ever 404s).
2. **Project Live Demo & Repo URLs (`src/data/portfolioData.js`)**:
   - Update `liveUrl` and `repoUrl` inside `PROJECTS` for *Fitness Factory*, *Chikara*, *ElevateCV*, and *Bangladesh Premium Jersey Store*.
3. **Screenshots & Editorial Portrait (`public/images/`)**:
   - Replace `public/images/portrait.jpg` with your studio portrait photo.
   - Replace `fitness-factory.jpg`, `chikara.jpg`, `elevatecv.jpg`, and `jersey-store.jpg` with your own high-resolution screen captures whenever ready.

---

## Deploying to Cloudflare Pages (Recommended)

This repository includes native **Cloudflare Pages Functions** in `functions/api/telemetry.js` and `functions/api/contact.js` plus `wrangler.toml`.

### Option A: GitHub Auto-Deploy (Zero-Config)
1. Push this folder to a new GitHub repository (`github.com/ahm3d777/portfolio`).
2. In **Cloudflare Dashboard → Compute (Workers & Pages) → Create → Pages → Connect to Git**, select the repository.
3. Set Build Configuration:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. *(Optional)* To forward async contact form briefs straight to your email or Discord, add `RESEND_API_KEY` or `DISCORD_WEBHOOK_URL` under **Settings → Environment Variables**.

### Option B: Direct CLI Deploy via Wrangler
```bash
npm run build
npx wrangler pages deploy dist --project-name koushik-ahmed-portfolio
```
