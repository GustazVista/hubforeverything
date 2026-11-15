-- Knowledge Hub schema (run once in Supabase → SQL Editor). Every row belongs to one user; RLS enforces it.
create table my_university (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade default auth.uid(),
  name text not null, platform text, platform_url text, portal_url text, major text, year text, gpa text, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null, platform text, instructor text, url text, start_date date,
  status text not null default 'want to learn', progress int not null default 0 check (progress between 0 and 100), notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null, tech text, url text, repo text, due_date date,
  status text not null default 'idea', progress int not null default 0 check (progress between 0 and 100), notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table websites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null, url text not null, category text, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null, body text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null, author text, status text not null default 'want to read', notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

do $$ declare t text; begin
  foreach t in array array['my_university','courses','projects','websites','notes','books'] loop
    execute format('create trigger trg_updated before update on %I for each row execute function set_updated_at()', t);
    execute format('create index on %I (user_id, created_at desc)', t);
    execute format('alter table %I enable row level security', t);
    execute format('create policy "owner only" on %I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))', t);
  end loop;
end $$;
