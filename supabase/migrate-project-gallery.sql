-- Run this in Supabase Dashboard → SQL Editor
-- Adds extra project images (beyond cover + hover).

alter table public.projects
  add column if not exists gallery_urls text[] not null default '{}';
