-- Run this in Supabase Dashboard → SQL Editor
-- Adds logo + skills support to existing experiences tables.

alter table public.experiences
  add column if not exists skills text[] not null default '{}';

alter table public.experiences
  add column if not exists image_url text not null default '';

update public.experiences
set
  skills = array['Python', 'YOLOv8', 'FastAPI', 'Computer Vision', 'PaddleOCR', 'Roboflow'],
  image_url = '/assets/Experience/sp-madrid.webp'
where company = 'SP Madrid & Associates'
  and coalesce(image_url, '') = '';

update public.experiences
set
  skills = array['Canva', 'Content Design', 'Data Analysis', 'Facebook', 'Scheduling'],
  image_url = '/assets/Experience/tails-of-manila.webp'
where company = 'Tails of Manila'
  and coalesce(image_url, '') = '';

update public.experiences
set
  skills = array['Adobe Illustrator', 'Photoshop', 'Graphic Design', 'Vector Art'],
  image_url = '/assets/Experience/fiverr.webp'
where company = 'Fiverr'
  and coalesce(image_url, '') = '';
