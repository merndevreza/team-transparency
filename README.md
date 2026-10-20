# Team Transparency

> A platform for transparent team management and collaboration.

Team Transparency is a web platform for managing teams where visibility and openness are the defaults — built like a real product, not a demo.

## Stack

| Layer     | Technology                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript                              |
| UI        | [Ant Design 6](https://ant.design) with `@ant-design/nextjs-registry` for SSR styles               |
| State     | [Zustand](https://zustand.docs.pmnd.rs)                                                            |
| Backend   | [Supabase](https://supabase.com) — Postgres with row level security, Auth, `@supabase/ssr` clients |
| Tooling   | ESLint · Prettier · Husky · commitlint                                                             |

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create your env file and fill in your Supabase project values:

   ```sh
   cp .env.example .env.local
   ```

   | Variable                               | Where to find it                                              |
   | -------------------------------------- | ------------------------------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`             | Supabase Dashboard → Project Settings → API → Project URL     |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Dashboard → Project Settings → API → Publishable key |

3. Start the development server:

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the development server                |
| `npm run build`     | Production build                            |
| `npm run start`     | Serve the production build                  |
| `npm run lint`      | Run ESLint                                  |
| `npm run format`    | Format TS/TSX files with Prettier           |
| `npm run typecheck` | Type-check with TypeScript (`tsc --noEmit`) |

## Project conventions

Coding conventions — component naming and organization, code style, Supabase backend rules, Zustand and antd usage — live in [AGENTS.md](AGENTS.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
