-- Run once in Supabase → SQL Editor. Each signed-in Google user can only see and change their own rows.
create table kh_docs (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  id text not null,
  j text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
alter table kh_docs enable row level security;
create policy "own rows only" on kh_docs for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
