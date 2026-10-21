# Supabase

## Applying migrations (in order, via Dashboard → SQL Editor)

| Order | File | What it does |
|---|---|---|
| 1 | `migrations/0001_init.sql` | Tables, triggers, RLS, Data API grants (fresh project only) |
| 2 | `migrations/0002_invites.sql` | `invites` table + `seed_default_taxonomy()` (required — signups fail without it) |
| 3 | `migrations/0003_create_member.sql` | Restores the clean signup trigger |

Alternative: `supabase link --project-ref <ref>` then `supabase db push`.

Repairs (run only if the situation applies):
- `repairs/0001_backfill_missing_workspaces.sql` — builds workspaces for auth
  users created before the signup trigger existed (the /dashboard redirect
  loop).

## Required dashboard settings

1. Settings → Data API → `public` in the exposed schemas.
2. Authentication → Sign In / Providers → Email → **Confirm email** off.
3. Authentication → URL Configuration → Redirect URLs: `http://localhost:3000/**`.
4. For the admin "Create member" flow: put the **secret key** (Settings → API
   Keys → Secret keys, `sb_secret_...`) into `.env.local` as
   `SUPABASE_SERVICE_ROLE_KEY`, then restart the dev server.

## Notes

- Registering through `/register` creates the company, the admin profile, and
  the default 41-label taxonomy via the `private.handle_new_user` trigger.
- "Create member" (service-role key required) places the account directly into
  the admin's company with a temporary password.
- Demo content is intentionally not seeded — profiles reference `auth.users`.
