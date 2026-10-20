# Supabase

## Applying the schema

1. Open your project → SQL Editor, paste all of `migrations/0001_init.sql`, run it.
   (Fresh projects only — the file is not idempotent.)
2. Settings → Data API → make sure `public` is in the exposed schemas.
3. Authentication → Sign In / Providers → Email: turn **Confirm email** off.
4. Authentication → URL Configuration → Redirect URLs: add `http://localhost:3000/**`.

Alternative: `supabase link --project-ref <ref>` then `supabase db push`.

## Notes

- Signing up through `/register` creates the company, the admin profile, and
  the default 41-label taxonomy via the `private.handle_new_user` trigger.
- Demo content is intentionally not seeded — profiles reference `auth.users`.
