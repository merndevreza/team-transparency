-- ============================================================================
-- Team Transparency — admin-created members
-- No schema change: admin "Create member" creates the auth user via the
-- service-role client and then MOVES the account into the admin's company
-- app-side (the signup trigger always founds a workspace first, and GoTrue
-- inserts carry no JWT claims that would let the trigger distinguish admin
-- creations from self-signups).
-- This file restores the 0002 trigger verbatim — re-run it if you applied an
-- earlier draft of 0003 that added the JWT-claims branch.
-- ============================================================================

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
