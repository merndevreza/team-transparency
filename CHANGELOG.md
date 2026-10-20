# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 21-10-2026

### Feat

- Dot actions: `giveDots` writes one dot per recipient with their attribute details in batched inserts (the database trigger notifies each receiver); `editDot` updates the comment and atomically replaces details via the `replace_dot_details` RPC. The composer submits through them with pending states and error surfacing.
- Profile actions: `updateName` and `updatePassword` (current password verified server-side before the change).
- The typed demo-data layer is deleted — every page, action, and component now runs on live Supabase data. This completes the dynamic integration end to end.

## [0.2.1] - 21-10-2026

### Feat

- Live auth: server actions for company sign-up (creates company + admin via the signup trigger), sign-in (with `next` redirect support and `last_login_at` stamping), password-reset request/confirm, and sign-out. `/register` onboards a company in one glass-card step (`?email=` prefill for invites).
- Route protection in the proxy: public paths are `/`, `/login`, `/register`, `/reset-password`, `/auth/*`; everything else bounces to `/login?next=…` and signed-in users are redirected away from the auth pages (refreshed cookies carried across redirects).
- App shell runs on the real session: the main layout loads the profile (redirecting when signed out) and notifications; user menu signs out for real; the bell lists live notifications with mark-all-read; `/auth/confirm` exchanges email-link tokens.
- Landing CTAs ("Get started", "Onboard your company", hero primary) now lead to `/register`; login gained a register link and lost its demo hint.

## [0.2.0] - 21-10-2026

### Feat

- Initial database schema (`supabase/migrations/0001_init.sql`): companies, profiles on `auth.users`, dot categories/labels, dots with details, and notifications; indexes on every access path. Signup trigger creates the company, admin profile, and the default 41-label taxonomy; dot inserts raise receiver notifications; a guard trigger constrains profile updates (self vs admin, immutable id/company/email); an atomic `replace_dot_details` RPC backs dot editing.
- Row-level security on every table with company isolation: dots readable company-wide (transparency) but writable only by their giver; taxonomy admin-only; profiles self-update + admin-others; notifications recipient-only. Explicit Data API grants included (Supabase no longer auto-exposes new tables).
- `supabase/README.md` with dashboard application steps (SQL editor, Data API exposure, confirm-email off, redirect URLs).

## [0.1.8] - 20-10-2026

### Feat

- Manage dots: searchable expandable category cards over a new `useTaxonomyStore` with full demo CRUD — create/rename/delete categories and labels via modal forms.
- Login screen: glass card with logo, demo sign-in, and a forgot-password panel; reset-password screen with new/confirm fields and the shared password checklist.
- Brand polish: antd `colorLink` tokens pinned to the brand blue in both themes.

With this release every page of the app has a designed, responsive, light/dark-capable UI running on typed demo data.

## [0.1.7] - 20-10-2026

### Feat

- Manage members: Active/Inactive segmented tabs with search over a glass antd table (avatar, role tag, relative last login) and demo actions — make/revoke admin, activate/deactivate, delete with confirm — all mutating a new `useMembersStore`. Add-member and edit-member (now `/manage-members/edit-member/[id]`, replacing the static route) forms create and update members for real in the demo store.

## [0.1.6] - 20-10-2026

### Feat

- Admin dashboard with Dots Given/Dots Received tabs: stat tiles, "gone quiet the longest" cards with day badges, most-recent-activity list, a dependency-free 12-month CSS bar chart (current month highlighted, antd tooltips), and top givers/receivers with sentiment trios and thumbs-up share rings. All aggregates derive from the demo dots.

## [0.1.5] - 20-10-2026

### Feat

- About Others directory: live search (name/email) over a responsive grid of glass person cards with received/given counts and dimmed inactive members.
- My profile: profile card (role tag, member-since), display-name form, and change-password form with a live shared `PasswordChecklist` (≥8 chars, cases, digit, special).

## [0.1.4] - 20-10-2026

### Feat

- Dot composer for `/give-dot` and `/edit-dot/[id]` (shell-less routes): searchable recipients panel, category accordion with per-label green/blue/orange sentiment toggles and selected-count badges, a sticky composer bar with removable selection chips and a word-counted comment, and a success screen. State lives in `useGiveDotStore`; edit mode prefills from the dot and locks the recipient.

## [0.1.3] - 20-10-2026

### Feat

- Paginated dot feeds (10/page) for received/given across About Me and About Others: glass dot cards with counterpart avatar, relative time, sentiment-colored attribute chips, comment, sentiment counts, an admin-visible quality tag, and Edit links on my given dots. Reuses the summary header/tabs; `.tt-stack` page rhythm utility added.

## [0.1.2] - 20-10-2026

### Feat

- Summary pages for About Me and About Others (`[id]`, 404 on unknown ids): header with role tag, four glass stat tiles (Caudex numbers, hydration-safe relative dates), pill tab switcher, and connector/attribute cards with the green-blue-orange sentiment trios. Shared `components/summary/*` and `components/dots/*` primitives, including a reusable glass `SectionCard`.

### Fixed

- Components importing `@ant-design/icons` directly (no `"use client"` directive in that package) must be client components — `SentimentDots` marked; this had crashed server rendering of the summary page.

## [0.1.1] - 20-10-2026

### Feat

- App shell: glass sidebar (logo, prominent Give Dot action, pill nav with active state from the pathname, theme toggle + sign out) and a sticky glass topbar (page title, notifications popover with unread badge, user menu). Collapses to a hamburger + Drawer below 1000px; replaces the placeholder antd Menu layout.
- Shared primitives: deterministic initials `UserAvatar` and hydration-safe `RelativeTime` (`useSyncExternalStore`, absolute on the server, relative after hydration).

### Changed

- antd 6 Drawer: custom width now passed via `size` (width is deprecated).

## [0.1.0] - 20-10-2026

### Feat

- Typed demo data layer in `lib/demo-data/` (the single swap surface for Supabase later): 12 users (incl. an admin current user and inactive members), 10 recognition categories with 42 labels, 28 dot entries spread over six months with comments/sentiments/quality, and per-user summaries, dashboard aggregates (activity, monthly series, sentiment leaders), and notifications derived deterministically from the fixtures.

## [0.0.9] - 20-10-2026

### Feat

- Theme foundation: full `--tt-*` design-token system in `globals.css` (brand green primary `#4cae66`, blue/orange accents, glass utilities `.tt-glass`/`.tt-page`, sentiment accents) with a complete dark palette (`[data-theme="dark"]`, green-black surfaces).
- Theme switching: pre-paint inline script + `ThemeProvider` (antd light/dark algorithms with per-theme token sets, pill buttons) + `useThemeStore` + `ThemeToggle`; choice persists in localStorage without hydration mismatches. Scaffold `prefers-color-scheme` overrides removed; the marketing landing stays light-locked.

### Changed

- Added `@ant-design/icons` as a direct dependency.

## [0.0.8] - 20-10-2026

### Changed

- Typography: headings switched to **Caudex** (user's choice — old-style serif), body to **Source Sans 3** (humanist sans that harmonizes with Caudex's serifs). Landing title weights normalized to 700 since Caudex ships only 400/700.

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
