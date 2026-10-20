# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.7] - 20-10-2026

### Changed

- Project-wide typography: **Saira** for all headings and **Mulish** for body text (replacing Bricolage Grotesque + Sora and the scaffold's Arial/Geist). Fonts load once in the root layout as `--font-display`/`--font-body`; `globals.css` sets the base body + `h1–h6` families, and the antd `ConfigProvider` token makes antd components follow Mulish too.
- Removed the `(marketing)` layout (it only loaded fonts) and Bricolage-specific `font-variation-settings`.

## [0.0.6] - 20-10-2026

### Feat

- Testimonials section ("Stories"): three glass cards with gradient quote marks, avatar initials, roles, and received/given dot-stat pills; anchored at `#stories` and added to the landing nav.
- Onboarding CTA rework: "Bring your company into the open." with free-messaging badge, "Onboard your company" primary action, and a no-credit-card hint.

## [0.0.5] - 20-10-2026

### Fix

- Large empty space below the landing footer: the decorative mesh blobs extended past `.page` (e.g. `bottom: -170px`), and `overflow-x: clip` only clipped horizontally, so they grew the document's scrollable area. `.page` now uses `overflow: clip` on both axes (still no scroll container, so the sticky nav keeps working).

## [0.0.4] - 20-10-2026

### Fix

- Double scrollbar: removed `max-width: 100vw` + `overflow-x: hidden` from `html`/`body` in `globals.css` — setting `overflow-x: hidden` on both made each a scroll container. Horizontal overflow is already handled per-page (`.page` uses `overflow-x: clip`).

## [0.0.3] - 20-10-2026

### Feat

- Landing page at `/` ((marketing) route group): Glass & Light design — frosted-glass hero with a live product preview card, feature grid, closing CTA, and footer; brand dot-molecule motif, green/orange/blue gradient mesh, grain overlay, and CSS-only staggered load/float animations with reduced-motion support. Fonts: Bricolage Grotesque (display) + Sora (body), loaded in the marketing layout.
- Login moved from `/` to `/login`; `(auth)` layout now scopes the login route.

### Changed

- `Logo`/`LogoSVG`: cleaned dead styles, added `size` prop, `aria-hidden` on the mark.

## [0.0.2] - 20-10-2026

### Feat

- Route skeleton mirroring the TeamPulse feature set: placeholder pages for login (`/`), `/reset-password`, `/dashboard`, `/about-me` (summary, dots received/given), `/about-others` (+ `[id]` views), `/my-profile`, `/manage-members` (+ add/edit), `/manage-dots`, and standalone `/give-dot` and `/edit-dot/[id]` flows.
- App shells: `(auth)` centered layout and `(main)` antd `Layout` shell with placeholder sidebar nav; root `error.tsx`, `loading.tsx`, and `not-found.tsx`.
- `proxy.ts` (Next.js 16 proxy convention) wired to Supabase `updateSession` for session refresh — route protection deferred.
- Redirects `/about-me → /about-me/summary` and `/about-others/:id → /about-others/:id/summary`.

## [0.0.1] - 20-10-2026

### Feat

- Project setup: Next.js 16 (App Router), React 19, TypeScript, Ant Design 6 with `AntdRegistry`, Supabase via `@supabase/ssr` (browser/server/middleware clients), Zustand.
- Global tooling: Prettier (no semicolons, double quotes, LF), Husky pre-commit (typecheck; audit + build on main/staging) and commit-msg (Signed-off-by trailer + commitlint), commitlint with conventional config.
- Project conventions documented in `AGENTS.md` (component naming/organization, functional code style, Supabase backend rules, Zustand + antd usage).
- `.env.example` for Supabase env vars; `.gitignore` exemption so it stays tracked.
- README with stack, setup steps, and scripts.
