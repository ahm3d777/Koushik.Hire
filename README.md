# Koushik Ahmed — Personal Portfolio (`Obsidian Telemetry 2.0`)

Product-minded Full-Stack Web, Mobile & Edge Systems portfolio engineered from **Blueprint v2.0**.

---

## Key v2.0 Architecture & Highlights

1. **Zero-CLS Dual-Lens Switcher + URL Routing (`?lens=client` / `?lens=engineer`)** — Stacks both variants in a single grid cell (`CLS = 0`), persists to `localStorage`, and supports shareable pitch links like `/?lens=client` or `/work/fitness-factory?lens=client`.
2. **X-Ray Architecture Mode (Single-Key `X` · HUD Switch · `⌘K`)** — Never hijacks OS `Cmd/Ctrl + X` (Cut). Sweeps a 350ms cyan scanline, reveals section/module wireframes, switches the 3D stage to CAD wireframe, and displays live FPS, viewport, scroll %, and honest `cf.colo` Edge RTT.
3. **Capability-Gated 3D Spatial Device Forge (`Three.js`)** — Lazy-loaded in its own async chunk; serves a `17 KB` `4:5` WebP poster by default on mobile `<768px` and Save-Data connections (with an optional `Load 3D Stage` tap), caps cursor tilt to `8°`, and pauses off-screen.
4. **WCAG AA Contrast-Verified Tokens & Responsive System** — `#8B8B94` muted metadata (`5.9:1`), `#F43F5E` inline crimson text (`5.4:1`), machined `1px` top chamfers, `Clash Display` + `Inter` + `JetBrains Mono` + `Instrument Serif` + `Noto Sans Bengali` (`lang="bn"` for `শক্তি`), height-aware Work pinning (`≥1280px` & `≥720px` height), mobile Matrix accordion, `<480px` Before/After segmented toggle, and mobile stepped Estimator wizard.
5. **Command Palette (`⌘K` / `Ctrl K` / `/`) + Touch-Friendly Terminal** — Centered spotlight on desktop, `85dvh` bottom sheet on phones, includes a manual **Reduce motion** toggle and tappable CLI command chips.

---

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

### Verification & Production Build
```bash
npm run lint      # ESLint (0 errors, 0 warnings)
npm test          # Vitest v2 verification suite
npm run build     # Code-split production bundle -> dist/
npm run preview   # Preview production build
```

---

## Personalization Checklist (`60 Seconds`)

1. **[src/config/siteConfig.js](./src/config/siteConfig.js)** — Set `whatsappNumber` (digits only, e.g. `'88017XXXXXXXX'`), `linkedinUrl`, `resumeUrl` (`/resume.html` included; drop a PDF at `public/resume.pdf` anytime), and optional `turnstileSiteKey`.
2. **[src/data/portfolioData.js](./src/data/portfolioData.js)** — Update `liveUrl` and `repoUrl` on each entry in `PROJECTS` (and flip Fitness Factory's `badge` from `'CONCEPT PROTOTYPE · PITCHED'` to `'CLIENT PROJECT · LIVE'` if signed).
3. **`public/images/`** — Replace `portrait.webp` / `portrait.jpg` and project `.webp` / `.jpg` captures with your own assets whenever ready.

---

## Deploying to Cloudflare Pages

Includes native Cloudflare Pages Functions in `functions/api/edge.js`, `functions/api/telemetry.js`, and `functions/api/contact.js`, plus SPA deep-link routing in `public/_redirects` and `wrangler.toml`.

- **GitHub Auto-Deploy:** Connect repo in Cloudflare Pages → Build command: `npm run build` → Output directory: `dist`.
- **CLI Deploy:** `npm run build && npx wrangler pages deploy dist --project-name koushik-ahmed-portfolio`
- **Optional Contact Alerts:** Add `DISCORD_WEBHOOK_URL` or `RESEND_API_KEY` in Cloudflare Pages Environment Variables.
