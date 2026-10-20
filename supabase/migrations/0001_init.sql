-- ============================================================================
-- Team Transparency — initial schema
-- companies, profiles, dot taxonomy, dots, dot_details, notifications
-- + private helpers, triggers, RLS, Data API grants.
-- Apply via Dashboard SQL Editor. Fresh project only (not idempotent).
-- ============================================================================

create extension if not exists pgcrypto; -- gen_random_uuid() (already present on Supabase)

-- ----------------------------------------------------------------------------
-- Private schema: internal helpers. Never exposed via the Data API.
-- ----------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------
create table public.companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  created_at  timestamptz not null default now()
);

create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  company_id    uuid not null references public.companies (id) on delete cascade,
  full_name     text not null default '' check (char_length(full_name) <= 120),
  email         text not null default '',            -- denormalized from auth, trigger-synced
  role          text not null default 'member' check (role in ('admin', 'member')),
  status        text not null default 'active' check (status in ('active', 'inactive')),
  last_login_at timestamptz,                          -- denormalized (auth last_sign_in_at not queryable via Data API)
  created_at    timestamptz not null default now()
);
create index profiles_company_id_idx       on public.profiles (company_id);
create index profiles_company_status_idx   on public.profiles (company_id, status);

create table public.dot_categories (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references public.companies (id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 80),
  created_at  timestamptz not null default now(),
  unique (company_id, name)
);

create table public.dot_labels (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.dot_categories (id) on delete cascade,
  company_id  uuid not null references public.companies (id) on delete cascade, -- denormalized for simple RLS
  name        text not null check (char_length(name) between 1 and 120),
  created_at  timestamptz not null default now(),
  unique (category_id, name)
);
create index dot_labels_company_id_idx on public.dot_labels (company_id);

create table public.dots (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references public.companies (id) on delete cascade,
  giver_id    uuid not null references public.profiles (id) on delete cascade,
  receiver_id uuid not null references public.profiles (id) on delete cascade,
  comment     text not null check (char_length(comment) between 1 and 600),
  quality     text check (quality in ('good', 'bad')), -- null until reviewed
  created_at  timestamptz not null default now(),
  check (giver_id <> receiver_id)
);
create index dots_company_created_at_idx on public.dots (company_id, created_at desc);
create index dots_receiver_id_idx        on public.dots (receiver_id);
create index dots_giver_id_idx           on public.dots (giver_id);

create table public.dot_details (
  id        uuid primary key default gen_random_uuid(),
  dot_id    uuid not null references public.dots (id) on delete cascade,
  label_id  uuid not null references public.dot_labels (id) on delete cascade,
  sentiment text not null check (sentiment in ('thumbs_up', 'ok', 'loop')),
  unique (dot_id, label_id)
);
create index dot_details_dot_id_idx   on public.dot_details (dot_id);
create index dot_details_label_id_idx on public.dot_details (label_id);

create table public.notifications (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id    uuid not null references public.profiles (id) on delete cascade,  -- recipient
  actor_id   uuid not null references public.profiles (id) on delete cascade,
  dot_id     uuid references public.dots (id) on delete cascade,
  kind       text not null check (kind in ('dot_received', 'member_joined', 'admin_change')),
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);
create index notifications_user_created_at_idx on public.notifications (user_id, created_at desc);

-- ----------------------------------------------------------------------------
-- Helper functions (SECURITY DEFINER, pinned empty search_path)
-- ----------------------------------------------------------------------------
create or replace function private.current_company_id()
returns uuid language sql stable security definer set search_path = ''
as $$
  select company_id from public.profiles where id = (select auth.uid());
$$;

create or replace function private.is_company_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- authenticated needs EXECUTE for policy evaluation; both helpers only ever
-- return the caller's own data, so direct calls leak nothing.
revoke execute on function private.current_company_id() from public, anon;
revoke execute on function private.is_company_admin()   from public, anon;
grant  execute on function private.current_company_id() to authenticated, service_role;
grant  execute on function private.is_company_admin()   to authenticated, service_role;

-- ----------------------------------------------------------------------------
-- Triggers
-- ----------------------------------------------------------------------------

-- 1. New auth user -> company + admin profile + default taxonomy seed.
create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_company_id uuid;
begin
  insert into public.companies (name)
  values (coalesce(nullif(new.raw_user_meta_data->>'company_name', ''), 'My Workspace'))
  returning id into v_company_id;

  insert into public.profiles (id, company_id, full_name, email, role, status, last_login_at)
  values (
    new.id, v_company_id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), ''),
    new.email, 'admin', 'active', now()
  );

  -- Default taxonomy: identical content to the deleted lib/demo-data/dot-taxonomy.ts
  insert into public.dot_categories (company_id, name)
  select v_company_id, c.category_name from (values
    ('Collaboration'), ('Communication'), ('Ownership'), ('Problem solving'),
    ('Leadership'), ('Craft'), ('Reliability'), ('Growth'), ('Positivity'),
    ('Customer focus')
  ) as c(category_name);

  insert into public.dot_labels (category_id, company_id, name)
  select cat.id, v_company_id, l.label_name
  from (values
    ('Collaboration',   'Collaborated effectively'),
    ('Collaboration',   'Supported the team'),
    ('Collaboration',   'Shared knowledge generously'),
    ('Collaboration',   'Broke down silos'),
    ('Collaboration',   'Was a great review partner'),
    ('Communication',   'Communicated clearly'),
    ('Communication',   'Listened actively'),
    ('Communication',   'Kept everyone informed'),
    ('Communication',   'Gave constructive feedback'),
    ('Communication',   'Wrote documentation people actually use'),
    ('Ownership',       'Took ownership'),
    ('Ownership',       'Delivered on promises'),
    ('Ownership',       'Held themselves accountable'),
    ('Ownership',       'Followed through on details'),
    ('Problem solving', 'Diagnosed the real problem'),
    ('Problem solving', 'Found a creative solution'),
    ('Problem solving', 'Stayed calm under pressure'),
    ('Problem solving', 'Made complex things simple'),
    ('Leadership',      'Led with clarity'),
    ('Leadership',      'Empowered others'),
    ('Leadership',      'Made space for every voice'),
    ('Leadership',      'Set the direction'),
    ('Craft',           'Raised the quality bar'),
    ('Craft',           'Sweated the details'),
    ('Craft',           'Created clarity'),
    ('Craft',           'Shipped with care'),
    ('Reliability',     'Dependable under deadlines'),
    ('Reliability',     'Consistent every single week'),
    ('Reliability',     'Flagged risks early'),
    ('Reliability',     'Was there when it counted'),
    ('Growth',          'Learned fast'),
    ('Growth',          'Acted on feedback'),
    ('Growth',          'Coached a teammate'),
    ('Growth',          'Stepped out of the comfort zone'),
    ('Positivity',      'Brought energy'),
    ('Positivity',      'Lifted team morale'),
    ('Positivity',      'Celebrated others'),
    ('Positivity',      'Stayed optimistic in a hard sprint'),
    ('Customer focus',  'Championed the user'),
    ('Customer focus',  'Turned feedback into action'),
    ('Customer focus',  'Cared about details users feel')
  ) as l(category_name, label_name)
  join public.dot_categories cat
    on cat.company_id = v_company_id and cat.name = l.category_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- 2. Keep profiles.email in sync with auth email changes.
create or replace function private.handle_email_updated()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_email_updated on auth.users;
create trigger on_auth_email_updated
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function private.handle_email_updated();

-- 3. New dot -> notification for the receiver.
create or replace function private.handle_new_dot()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.notifications (company_id, user_id, actor_id, dot_id, kind)
  values (new.company_id, new.receiver_id, new.giver_id, new.id, 'dot_received');
  return new;
end;
$$;

drop trigger if exists on_dot_created on public.dots;
create trigger on_dot_created
  after insert on public.dots
  for each row execute function private.handle_new_dot();

-- 4. Profile update guard (column-level intent that RLS cannot express on a
--    shared table): self may change full_name/last_login_at only; admins may
--    change others' full_name/role/status; nobody changes id/company/email.
create or replace function private.enforce_profile_update_guard()
returns trigger language plpgsql security invoker set search_path = ''
as $$
declare
  caller uuid := (select auth.uid());
begin
  if caller is null then
    return new; -- service-role / definer contexts (e.g. email sync)
  end if;

  if caller = old.id then
    if new.role       is distinct from old.role
    or new.status     is distinct from old.status
    or new.company_id is distinct from old.company_id
    or new.email      is distinct from old.email
    or new.id         is distinct from old.id then
      raise exception 'You cannot change your own role, status, company or email';
    end if;
  else
    if not (select private.is_company_admin()) then
      raise exception 'Only admins can update other members';
    end if;
    if new.company_id is distinct from old.company_id
    or new.id         is distinct from old.id
    or new.email      is distinct from old.email then
      raise exception 'Cannot change a member''s id, company or email';
    end if;
  end if;
  return new;
end;
$$;

create trigger enforce_profile_update_guard
  before update on public.profiles
  for each row execute function private.enforce_profile_update_guard();

-- 5. Atomic replace of a dot's details (used by editDot; no partial states).
create or replace function private.replace_dot_details(p_dot_id uuid, p_details jsonb)
returns void language sql security invoker set search_path = ''
as $$
  delete from public.dot_details where dot_id = p_dot_id;
  insert into public.dot_details (dot_id, label_id, sentiment)
  select p_dot_id, d.label_id, d.sentiment
  from jsonb_to_recordset(p_details) as d(label_id uuid, sentiment text);
$$;

revoke execute on function private.handle_new_user()           from public;
revoke execute on function private.handle_email_updated()      from public;
revoke execute on function private.handle_new_dot()            from public;
revoke execute on function private.enforce_profile_update_guard() from public;
revoke execute on function private.replace_dot_details(uuid, jsonb) from public, anon;
grant  execute on function private.replace_dot_details(uuid, jsonb) to authenticated;

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
alter table public.companies      enable row level security;
alter table public.profiles       enable row level security;
alter table public.dot_categories enable row level security;
alter table public.dot_labels     enable row level security;
alter table public.dots           enable row level security;
alter table public.dot_details    enable row level security;
alter table public.notifications  enable row level security;

-- companies: read own company; no API writes (trigger-managed).
create policy "companies_select_own" on public.companies
  for select to authenticated
  using (id = (select private.current_company_id()));

-- profiles: company-wide read; self-update; admin update/delete of others only.
create policy "profiles_select_company" on public.profiles
  for select to authenticated
  using (company_id = (select private.current_company_id()));

create policy "profiles_update_self" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "profiles_update_admin_others" on public.profiles
  for update to authenticated
  using (company_id = (select private.current_company_id())
         and id <> (select auth.uid())
         and (select private.is_company_admin()))
  with check (company_id = (select private.current_company_id()));

create policy "profiles_delete_admin_others" on public.profiles
  for delete to authenticated
  using (company_id = (select private.current_company_id())
         and id <> (select auth.uid())
         and (select private.is_company_admin()));

-- dot_categories: company-wide read; admin-only writes.
create policy "dot_categories_select_company" on public.dot_categories
  for select to authenticated
  using (company_id = (select private.current_company_id()));
create policy "dot_categories_insert_admin" on public.dot_categories
  for insert to authenticated
  with check (company_id = (select private.current_company_id())
              and (select private.is_company_admin()));
create policy "dot_categories_update_admin" on public.dot_categories
  for update to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()))
  with check (company_id = (select private.current_company_id()));
create policy "dot_categories_delete_admin" on public.dot_categories
  for delete to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()));

-- dot_labels: company-wide read; admin-only writes; label stays in its category's company.
create policy "dot_labels_select_company" on public.dot_labels
  for select to authenticated
  using (company_id = (select private.current_company_id()));
create policy "dot_labels_insert_admin" on public.dot_labels
  for insert to authenticated
  with check (company_id = (select private.current_company_id())
              and (select private.is_company_admin())
              and exists (select 1 from public.dot_categories c
                          where c.id = category_id and c.company_id = company_id));
create policy "dot_labels_update_admin" on public.dot_labels
  for update to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()))
  with check (company_id = (select private.current_company_id())
              and exists (select 1 from public.dot_categories c
                          where c.id = category_id and c.company_id = company_id));
create policy "dot_labels_delete_admin" on public.dot_labels
  for delete to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()));

-- dots: company-wide read (transparency); give as yourself to a same-company
-- receiver; only the giver edits; no API deletes.
create policy "dots_select_company" on public.dots
  for select to authenticated
  using (company_id = (select private.current_company_id()));

create policy "dots_insert_self_as_giver" on public.dots
  for insert to authenticated
  with check (
    giver_id = (select auth.uid())
    and company_id = (select private.current_company_id())
    and receiver_id <> giver_id
    and exists (select 1 from public.profiles r
                where r.id = receiver_id and r.company_id = company_id)
  );

create policy "dots_update_giver" on public.dots
  for update to authenticated
  using (giver_id = (select auth.uid()))
  with check (
    giver_id = (select auth.uid())
    and company_id = (select private.current_company_id())
    and receiver_id <> giver_id
    and exists (select 1 from public.profiles r
                where r.id = receiver_id and r.company_id = company_id)
  );

-- dot_details: readable with the parent dot; writable only on your own dots;
-- label must belong to the parent dot's company.
create policy "dot_details_select_with_dot" on public.dot_details
  for select to authenticated
  using (exists (select 1 from public.dots d
                 where d.id = dot_id
                   and d.company_id = (select private.current_company_id())));

create policy "dot_details_insert_own_dot" on public.dot_details
  for insert to authenticated
  with check (
    exists (select 1 from public.dots d
            where d.id = dot_id and d.giver_id = (select auth.uid()))
    and exists (select 1 from public.dots d
                join public.dot_labels l on l.id = label_id
                where d.id = dot_id and l.company_id = d.company_id)
  );

create policy "dot_details_delete_own_dot" on public.dot_details
  for delete to authenticated
  using (exists (select 1 from public.dots d
                 where d.id = dot_id and d.giver_id = (select auth.uid())));

-- notifications: recipient-only.
create policy "notifications_select_own" on public.notifications
  for select to authenticated
  using (user_id = (select auth.uid()));
create policy "notifications_update_own" on public.notifications
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "notifications_delete_own" on public.notifications
  for delete to authenticated
  using (user_id = (select auth.uid()));

-- ----------------------------------------------------------------------------
-- Privileges (Data API). Explicit because Supabase stopped auto-exposing new
-- tables (2026-04-28; enforced on all projects 2026-10-30). RLS is the
-- authorization layer; these grants only make tables reachable.
-- ----------------------------------------------------------------------------
grant usage on schema public to authenticated;

grant select on public.companies to authenticated;

grant select, update on public.profiles to authenticated;  -- guard trigger limits columns per caller

grant select, insert, update, delete on public.dot_categories to authenticated;
grant select, insert, update, delete on public.dot_labels     to authenticated;

grant select, insert, update on public.dots to authenticated;

grant select, insert, delete on public.dot_details to authenticated;

grant select on public.notifications to authenticated;
grant update (is_read) on public.notifications to authenticated;  -- column-scoped: only the flag flips
grant delete on public.notifications to authenticated;
