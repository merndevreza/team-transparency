-- ============================================================================
-- Team Transparency — admin-created members
-- Lets a service-role user creation (admin "Create member" flow) place the
-- new account directly into an existing company with a chosen role, instead
-- of the default "every signup founds a new company" behavior.
-- Apply via Dashboard SQL Editor after 0002_invites.sql.
-- ============================================================================

create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_company_id uuid;
  v_role text;
  v_invite_id uuid;
  v_invite_token uuid;
  v_join_company_id uuid;
  v_caller_role text;
begin
  -- Service-role creations (admin "Create member") may target an existing
  -- company. The caller must carry the service_role JWT claim — regular
  -- signups can never set this path because their claims say "authenticated".
  v_join_company_id := nullif(new.raw_user_meta_data->>'join_company_id', '')::uuid;
  v_caller_role := current_setting('request.jwt.claims', true)::json->>'role';

  if v_join_company_id is not null and v_caller_role = 'service_role' then
    insert into public.profiles (id, company_id, full_name, email, role, status, last_login_at)
    values (
      new.id,
      v_join_company_id,
      coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), ''),
      new.email,
      coalesce(nullif(new.raw_user_meta_data->>'join_role', ''), 'member'),
      'active',
      now()
    );
    return new;
  end if;

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
