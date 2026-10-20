# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 20-10-2026

### Feat

- Project setup: Next.js 16 (App Router), React 19, TypeScript, Ant Design 6 with `AntdRegistry`, Supabase via `@supabase/ssr` (browser/server/middleware clients), Zustand.
- Global tooling: Prettier (no semicolons, double quotes, LF), Husky pre-commit (typecheck; audit + build on main/staging) and commit-msg (Signed-off-by trailer + commitlint), commitlint with conventional config.
- Project conventions documented in `AGENTS.md` (component naming/organization, functional code style, Supabase backend rules, Zustand + antd usage).
- `.env.example` for Supabase env vars; `.gitignore` exemption so it stays tracked.
- README with stack, setup steps, and scripts.
