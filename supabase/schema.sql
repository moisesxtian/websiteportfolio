-- ============================================================
-- Portfolio CMS Schema
-- Run this once in Supabase Dashboard → SQL Editor
-- Then: Auth → Users → Add user (your admin email/password)
-- Then run seed.sql (optional)
-- ============================================================

-- Skills
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_key text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Projects (cover + hover images, optional video)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  skills text[] not null default '{}',
  github_link text not null default '',
  live_demo_link text not null default '',
  image_url text not null default '',
  hover_image_url text not null default '',
  video_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Certificates
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  organization text not null default '',
  image_url text not null default '',
  certificate_link text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Experiences
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  period text not null default '',
  role text not null default '',
  duties text[] not null default '{}',
  skills text[] not null default '{}',
  image_url text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Existing databases created before skills / company logos existed
alter table public.experiences add column if not exists skills text[] not null default '{}';
alter table public.experiences add column if not exists image_url text not null default '';

-- Site settings (resume URL, etc.)
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.certificates enable row level security;
alter table public.experiences enable row level security;
alter table public.site_settings enable row level security;

-- Drop policies if re-running
drop policy if exists "skills_public_read" on public.skills;
drop policy if exists "projects_public_read" on public.projects;
drop policy if exists "certificates_public_read" on public.certificates;
drop policy if exists "experiences_public_read" on public.experiences;
drop policy if exists "site_settings_public_read" on public.site_settings;

drop policy if exists "skills_auth_insert" on public.skills;
drop policy if exists "skills_auth_update" on public.skills;
drop policy if exists "skills_auth_delete" on public.skills;
drop policy if exists "projects_auth_insert" on public.projects;
drop policy if exists "projects_auth_update" on public.projects;
drop policy if exists "projects_auth_delete" on public.projects;
drop policy if exists "certificates_auth_insert" on public.certificates;
drop policy if exists "certificates_auth_update" on public.certificates;
drop policy if exists "certificates_auth_delete" on public.certificates;
drop policy if exists "experiences_auth_insert" on public.experiences;
drop policy if exists "experiences_auth_update" on public.experiences;
drop policy if exists "experiences_auth_delete" on public.experiences;
drop policy if exists "site_settings_auth_insert" on public.site_settings;
drop policy if exists "site_settings_auth_update" on public.site_settings;
drop policy if exists "site_settings_auth_delete" on public.site_settings;

-- Public read
create policy "skills_public_read" on public.skills for select using (true);
create policy "projects_public_read" on public.projects for select using (true);
create policy "certificates_public_read" on public.certificates for select using (true);
create policy "experiences_public_read" on public.experiences for select using (true);
create policy "site_settings_public_read" on public.site_settings for select using (true);

-- Authenticated write
create policy "skills_auth_insert" on public.skills for insert to authenticated with check (true);
create policy "skills_auth_update" on public.skills for update to authenticated using (true) with check (true);
create policy "skills_auth_delete" on public.skills for delete to authenticated using (true);

create policy "projects_auth_insert" on public.projects for insert to authenticated with check (true);
create policy "projects_auth_update" on public.projects for update to authenticated using (true) with check (true);
create policy "projects_auth_delete" on public.projects for delete to authenticated using (true);

create policy "certificates_auth_insert" on public.certificates for insert to authenticated with check (true);
create policy "certificates_auth_update" on public.certificates for update to authenticated using (true) with check (true);
create policy "certificates_auth_delete" on public.certificates for delete to authenticated using (true);

create policy "experiences_auth_insert" on public.experiences for insert to authenticated with check (true);
create policy "experiences_auth_update" on public.experiences for update to authenticated using (true) with check (true);
create policy "experiences_auth_delete" on public.experiences for delete to authenticated using (true);

create policy "site_settings_auth_insert" on public.site_settings for insert to authenticated with check (true);
create policy "site_settings_auth_update" on public.site_settings for update to authenticated using (true) with check (true);
create policy "site_settings_auth_delete" on public.site_settings for delete to authenticated using (true);

-- Storage buckets (public read)
insert into storage.buckets (id, name, public)
values
  ('project-media', 'project-media', true),
  ('certificates', 'certificates', true),
  ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "project_media_public_read" on storage.objects;
drop policy if exists "project_media_auth_write" on storage.objects;
drop policy if exists "project_media_auth_update" on storage.objects;
drop policy if exists "project_media_auth_delete" on storage.objects;
drop policy if exists "certificates_media_public_read" on storage.objects;
drop policy if exists "certificates_media_auth_write" on storage.objects;
drop policy if exists "certificates_media_auth_update" on storage.objects;
drop policy if exists "certificates_media_auth_delete" on storage.objects;
drop policy if exists "resumes_public_read" on storage.objects;
drop policy if exists "resumes_auth_write" on storage.objects;
drop policy if exists "resumes_auth_update" on storage.objects;
drop policy if exists "resumes_auth_delete" on storage.objects;

create policy "project_media_public_read"
  on storage.objects for select
  using (bucket_id = 'project-media');

create policy "project_media_auth_write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-media');

create policy "project_media_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-media');

create policy "project_media_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-media');

create policy "certificates_media_public_read"
  on storage.objects for select
  using (bucket_id = 'certificates');

create policy "certificates_media_auth_write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'certificates');

create policy "certificates_media_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'certificates');

create policy "certificates_media_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'certificates');

create policy "resumes_public_read"
  on storage.objects for select
  using (bucket_id = 'resumes');

create policy "resumes_auth_write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'resumes');

create policy "resumes_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'resumes');

create policy "resumes_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'resumes');
