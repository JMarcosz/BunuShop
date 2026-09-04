# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Accesorios Bunu Shop — a single-tenant Astro storefront + self-service admin CMS for a handmade-accessories business. There is no database: all content lives in one JSON document (`src/data/portafolio.json`) that is read/written through `src/lib/storage.ts`, edited via a client-side admin panel at `/admin`.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`) even though `package.json` scripts are plain.

```
pnpm install          # install deps
pnpm dev              # dev server at localhost:4321 (use `astro dev --background` per below)
pnpm build            # production build to ./dist/ (runs the @astrojs/vercel adapter)
pnpm preview           # preview the production build locally
pnpm astro check       # type-check .astro files (no dedicated lint/test scripts exist)
```

There are no test or lint scripts configured — don't invent `pnpm test`/`pnpm lint` commands.

### Dev server (per repo convention)

Start the dev server in background mode: `astro dev --background`. Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

## Architecture

### Content model: one JSON blob, no database

`src/data/portafolio.json` is the canonical shape of `PortfolioData` (`siteInfo`, `metrics`, `featuredProduct`, `services`, `workflowPhases`, `projects`, `blogPosts`, plus `faqs`/`testimonials` read ad hoc). Every public page and the admin panel read/write this single object — there's no per-entity API or schema validation beyond `JSON.parse`.

`src/lib/storage.ts` is the only place that touches persistence, with a three-tier fallback used by both `getPortfolioData()`/`savePortfolioData()`:
1. **Vercel Blob** (`@vercel/blob`) at `datos/portafolio.json` — used whenever `BLOB_READ_WRITE_TOKEN` is set (production). Reads add a cache-busting query param; a missing blob is auto-initialized from the bundled JSON.
2. **Local disk** (`src/data/portafolio.json`) — used in local dev without a blob token, and as a best-effort mirror even when Blob is active.
3. **In-memory bundled default** — final fallback for serverless environments where the filesystem is read-only/ephemeral.

`uploadImage()` follows the same pattern for images: Vercel Blob (`imagenes/...`) in production, `public/uploads/` on local disk, or a base64 data URL as a last resort. Keep this fallback chain in mind before assuming `fs` writes will work — production is `output: 'server'` on Vercel (see `astro.config.mjs`), where local disk is not persistent.

When changing the data shape, update in this order: `PortfolioData` interface in `storage.ts` → `src/data/portafolio.json` (the seed/fallback data) → the admin UI section that edits it (`src/pages/admin/index.astro`) → the public page(s) that render it (`src/pages/index.astro`).

### Auth: custom HMAC session, not a library

`src/lib/auth.ts` implements a hand-rolled session scheme — no auth library, no DB-backed users. A single admin identity comes from env vars (`ADMIN_EMAIL`/`ADMIN_PASSWORD`/`AUTH_SECRET`, with insecure defaults baked in for local dev — see `.env.example`). Sessions are `base64url(payload).base64url(HMAC-SHA256 signature)` tokens stored in a cookie (`COOKIE_NAME = 'bunu_admin_session'`), valid 8 hours. Credential and signature comparisons are SHA-256-hashed then compared with `crypto.timingSafeEqual` to avoid timing attacks. In-memory (non-persistent) rate limiting guards `/api/auth/login` at 5 attempts/60s per IP.

`src/middleware.ts` is the enforcement point, applied globally:
- `/admin/*` (except `/admin/login`) requires a valid session cookie, else redirects to `/admin/login`; an authenticated visit to `/admin/login` redirects to `/admin`.
- Any mutating request (`POST`/`PUT`/`DELETE`/`PATCH`) to `/api/*` other than `/api/auth/*` requires a valid session, else `401`.
- All responses get security headers injected (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), plus no-store cache headers for admin/API responses.

Because auth state and data mutation both funnel through `middleware.ts` + `lib/auth.ts` + `lib/storage.ts`, changes to session handling or storage semantics affect the whole app — check all three when touching either.

### Pages

- `src/pages/index.astro` — the public storefront (single long page: hero, about, featured product, services, projects/gallery, blog, FAQs, testimonials, contact). Reads `getPortfolioData()` at request time (`export const prerender = false` everywhere that reads live data — this is a server-rendered app, not static). Filters out `status === 'draft'` projects/posts before rendering. Also emits JSON-LD structured data (JewelryStore schema) for SEO/GEO/AEO.
- `src/pages/portafolio.astro` — legacy redirect to `/#galeria`.
- `src/pages/admin/index.astro` — the admin CMS. A large (~1400-line) server-rendered shell that injects `initialData` (the current `PortfolioData`) into a `<script type="application/json">` tag and drives a client-side single-page UI (tabbed sections: Catálogo General / Productos / Servicios / Blog / Config) purely with vanilla JS + `fetch`, no framework. Saves go to `POST /api/portafolio` with the full JSON document; images go to `POST /api/upload`.
- `src/pages/admin/login.astro` — login form posting to `/api/auth/login`.

### API routes (`src/pages/api/`)

All are server endpoints (`export const prerender = false`) and speak JSON:
- `GET/POST /api/portafolio` — read/replace the entire `PortfolioData` document (no partial updates).
- `POST /api/upload` — multipart image upload, image-MIME-type validated.
- `POST /api/auth/login`, `POST /api/auth/logout` — session issuance/teardown (see Auth above).

### Styling

Tailwind CSS v3 (`tailwindcss` + `@tailwindcss/forms`), configured in `tailwind.config.mjs` with `applyBaseStyles: false` in the Astro integration (`astro.config.mjs`) — base styles come from `src/styles/global.css`. Two overlapping color systems live in the Tailwind theme: `brand.*` (the storefront's pink/lavender/gold palette) and a Material-Design-3-style token set (`primary`, `on-surface`, `surface-container-*`, etc.) used mainly by the admin Studio UI. Icons come from `lucide-astro`.

### Deployment

Deployed on Vercel via `@astrojs/vercel` (`output: 'server'`, `security.checkOrigin: false` in `astro.config.mjs`). Production persistence requires `BLOB_READ_WRITE_TOKEN` to be set in the Vercel project — without it, writes silently fall back to non-persistent behavior in a serverless environment (see storage fallback chain above).

### Not part of the app

`stitch_portfolio_personal_interactivo/` at the repo root holds unreferenced static design-reference mockups (not imported by any source file) — useful for visual/UX reference, not live code.
