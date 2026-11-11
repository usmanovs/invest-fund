-- Лист ожидания и опрос для лендинга (стадия проверки спроса).
-- Доступ к таблицам закрыт RLS без политик; запись идёт только через
-- функции ниже, чтение — только из панели Supabase / service role.

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 5 and 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source text check (source is null or char_length(source) <= 64),
  created_at timestamptz not null default now()
);
create unique index waitlist_email_key on public.waitlist (lower(email));

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  current_investments text[] not null check (
    cardinality(current_investments) between 1 and 8
    and current_investments <@ array['real_estate','deposit','cash_usd','gold','crypto','stocks','business','none']
  ),
  interest text not null check (interest in ('very','somewhat','unsure','no')),
  starting_amount text not null check (starting_amount in ('lt100','100_500','500_2000','2000_10000','gt10000')),
  fee_willingness text not null check (fee_willingness in ('none','pct_0_5','pct_1','pct_2','subscription','unsure')),
  concerns text[] not null check (
    cardinality(concerns) between 1 and 8
    and concerns <@ array['losing_money','trust','legality','withdrawal','complexity','fees','transfers','sharia']
  ),
  comment text check (comment is null or char_length(comment) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;
alter table public.survey_responses enable row level security;
revoke all on public.waitlist, public.survey_responses from anon, authenticated;

create function public.join_waitlist(p_email text, p_source text default null)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.waitlist (email, source)
  values (lower(trim(p_email)), p_source)
  on conflict (lower(email)) do nothing;
$$;

create function public.submit_survey(
  p_current_investments text[],
  p_interest text,
  p_starting_amount text,
  p_fee_willingness text,
  p_concerns text[],
  p_comment text default null
)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.survey_responses
    (current_investments, interest, starting_amount, fee_willingness, concerns, comment)
  values
    (p_current_investments, p_interest, p_starting_amount, p_fee_willingness, p_concerns, nullif(trim(p_comment), ''));
$$;

revoke all on function public.join_waitlist(text, text) from public;
revoke all on function public.submit_survey(text[], text, text, text, text[], text) from public;
grant execute on function public.join_waitlist(text, text) to anon;
grant execute on function public.submit_survey(text[], text, text, text, text[], text) to anon;
