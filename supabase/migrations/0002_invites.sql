-- ============================================================================
-- Team Transparency — member invites
-- Invited users register with a token and JOIN the inviting company (with the
-- invited role) instead of creating their own company.
-- Apply via Dashboard SQL Editor after 0001_init.sql.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Refactor: default taxonomy seeding becomes reusable.
-- ----------------------------------------------------------------------------
create or replace function private.seed_default_taxonomy(p_company_id uuid)
returns void language sql security definer set search_path = ''
as $$
  insert into public.dot_categories (company_id, name)
  select p_company_id, c.category_name
  from (values
    ('Collaboration'), ('Communication'), ('Ownership'), ('Problem solving'),
    ('Leadership'), ('Craft'), ('Reliability'), ('Growth'), ('Positivity'),
    ('Customer focus')
  ) as c(category_name);

  insert into public.dot_labels (category_id, company_id, name)
  select cat.id, p_company_id, l.label_name
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
    on cat.company_id = p_company_id and cat.name = l.category_name;
$$;

-- ----------------------------------------------------------------------------
-- Invites
-- ----------------------------------------------------------------------------
create table public.invites (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references public.companies (id) on delete cascade,
  email       text not null,
  role        text not null default 'member' check (role in ('admin', 'member')),
  token       uuid not null default gen_random_uuid(),
  consumed_at timestamptz,
  created_at  timestamptz not null default now(),
  unique (company_id, email)
);
create index invites_token_idx on public.invites (token);

alter table public.invites enable row level security;

-- Admins manage invites for their own company; rows are otherwise only
-- touched by the definer trigger during signup.
create policy "invites_select_admin" on public.invites
  for select to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()));
create policy "invites_insert_admin" on public.invites
  for insert to authenticated
  with check (company_id = (select private.current_company_id())
              and (select private.is_company_admin()));
create policy "invites_delete_admin" on public.invites
  for delete to authenticated
  using (company_id = (select private.current_company_id())
         and (select private.is_company_admin()));

grant select, insert, delete on public.invites to authenticated;

-- Signup-page preview: the token acts as the capability, so anon may read
-- just the company name for the banner. Expired/consumed tokens return nothing.
create or replace function private.preview_invite(p_token uuid)
returns table (company_name text, role text)
language sql stable security definer set search_path = ''
as $$
  select c.name, i.role
  from public.invites i
  join public.companies c on c.id = i.company_id
  where i.token = p_token
    and i.consumed_at is null
    and i.created_at > now() - interval '14 days';
$$;

revoke execute on function private.preview_invite(uuid) from public;
grant execute on function private.preview_invite(uuid) to anon, authenticated;

-- Only the definer trigger calls the seeder; keep it unreachable via the API.
revoke execute on function private.seed_default_taxonomy(uuid) from public, anon;

-- ----------------------------------------------------------------------------
-- Signup trigger: join via invite, or create a new company.
-- ----------------------------------------------------------------------------
create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_company_id uuid;
  v_role text;
  v_invite_id uuid;
  v_invite_token uuid;
begin
  v_invite_token := nullif(new.raw_user_meta_data->>'invite_token', '')::uuid;

  if v_invite_token is not null then
    select i.id, i.company_id, i.role
      into v_invite_id, v_company_id, v_role
    from public.invites i
    where i.token = v_invite_token
      and i.consumed_at is null
      and lower(i.email) = lower(new.email)
      and i.created_at > now() - interval '14 days';

    if v_invite_id is not null then
      insert into public.profiles (id, company_id, full_name, email, role, status, last_login_at)
      values (
        new.id, v_company_id,
        coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), ''),
        new.email, v_role, 'active', now()
      );

      update public.invites
      set consumed_at = now()
      where id = v_invite_id;

      return new;
    end if;
    -- Invalid/expired/mismatched token: fall through to a fresh company so
    -- signup never hard-fails; the UI surfaces a note afterwards.
  end if;

  insert into public.companies (name)
  values (coalesce(nullif(new.raw_user_meta_data->>'company_name', ''), 'My Workspace'))
  returning id into v_company_id;

  insert into public.profiles (id, company_id, full_name, email, role, status, last_login_at)
  values (
    new.id, v_company_id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), ''),
    new.email, 'admin', 'active', now()
  );

  perform private.seed_default_taxonomy(v_company_id);

  return new;
end;
$$;

-- Notify existing members when someone joins via invite.
create or replace function private.handle_member_joined()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_caller_is_new boolean;
begin
  -- Fire only when the profile was just created by an invite (member role)
  v_caller_is_new := new.role = 'member';
  if not v_caller_is_new then
    return new;
  end if;

  insert into public.notifications (company_id, user_id, actor_id, kind)
  select p.company_id, p.id, new.id, 'member_joined'
  from public.profiles p
  where p.company_id = new.company_id
    and p.role = 'admin';
  return new;
end;
$$;

drop trigger if exists on_member_joined on public.profiles;
create trigger on_member_joined
  after insert on public.profiles
  for each row execute function private.handle_member_joined();
