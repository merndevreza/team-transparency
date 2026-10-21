-- ============================================================================
-- Repair: create companies + profiles + default taxonomy for auth users that
-- have no profile (created before the signup trigger existed).
-- Run once in the Dashboard SQL Editor. Idempotent — skips users that
-- already have a profile.
-- ============================================================================

do $$
declare
  u record;
  v_company_id uuid;
begin
  for u in
    select
      us.id,
      us.email,
      coalesce(
        nullif(us.raw_user_meta_data ->> 'company_name', ''),
        split_part(us.email, '@', 1) || ' Workspace'
      ) as company_name,
      coalesce(
        nullif(us.raw_user_meta_data ->> 'full_name', ''),
        split_part(us.email, '@', 1)
      ) as full_name
    from auth.users us
    where not exists (
      select 1 from public.profiles p where p.id = us.id
    )
  loop
    insert into public.companies (name)
    values (u.company_name)
    returning id into v_company_id;

    insert into public.profiles (id, company_id, full_name, email, role, status, last_login_at)
    values (u.id, v_company_id, u.full_name, u.email, 'admin', 'active', now());

    insert into public.dot_categories (company_id, name)
    select v_company_id, c.category_name
    from (values
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
  end loop;
end $$;
