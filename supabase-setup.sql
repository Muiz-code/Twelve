-- ============================================================
-- Twelve Blog — Supabase setup script
-- Run this in the Supabase SQL editor
-- ============================================================

-- 1. Posts table
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  excerpt      text,
  content      text,
  cover_image  text,
  author       text,
  category     text,
  tags         text[],
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 2. Row Level Security
alter table public.posts enable row level security;

-- Public can read published posts
create policy "Public read published posts"
  on public.posts for select
  using (published = true);

-- Authenticated users have full access
create policy "Auth users full access"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- 3. updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- 4. Storage bucket (run once)
-- In Supabase dashboard: Storage → New bucket → Name: blog-images → Public: ON
-- Or via SQL:
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Auth users upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "Auth users delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');
