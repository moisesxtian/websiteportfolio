-- Assign each skill the icon that matches its name.
-- Run in Supabase Dashboard → SQL Editor (optional; the site also maps icons by name).

update public.skills
set icon_key = case
  when lower(name) like '%javascript%' then 'javascript'
  when lower(name) like '%typescript%' then 'typescript'
  when lower(name) like '%docker compose%' then 'dockercompose'
  when lower(name) like '%google app%' or lower(name) like '%apps script%' then 'googleappscript'
  when lower(name) like '%illustrator%' then 'illustrator'
  when lower(name) like '%photoshop%' then 'photoshop'
  when lower(name) like '%playwright%' then 'playwright'
  when lower(name) like '%postgres%' then 'postgresql'
  when lower(name) like '%gitkraken%' then 'gitkraken'
  when lower(name) like '%scikit%' then 'scikitlearn'
  when lower(name) like '%tailwind%' then 'tailwind'
  when lower(name) like '%jupyter%' then 'jupyter'
  when lower(name) like '%fastapi%' then 'fastapi'
  when lower(name) like '%flutter%' then 'flutter'
  when lower(name) like '%supabase%' then 'supabase'
  when lower(name) like '%kotlin%' then 'kotlin'
  when lower(name) like '%python%' then 'python'
  when lower(name) like '%node%' then 'nodejs'
  when lower(name) like '%mysql%' then 'mysql'
  when lower(name) like '%docker%' then 'docker'
  when lower(name) like '%cursor%' then 'cursor'
  when lower(name) like '%automa%' then 'automa'
  when lower(name) like '%react%' then 'react'
  when lower(name) like '%java%' then 'java'
  when lower(name) like '%html%' then 'html'
  when lower(name) like '%css%' then 'css'
  when lower(name) like '%php%' then 'php'
  when lower(name) like '%n8n%' then 'n8n'
  when lower(name) like '%c#%' or lower(name) like '%csharp%' then 'csharp'
  when lower(name) like '%vs code%' or lower(name) like '%vscode%' then 'vscode'
  when lower(name) like '%git%' then 'git'
  else icon_key
end
where name is not null;
