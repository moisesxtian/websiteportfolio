import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { toLocalWebp } from '../lib/assets';
import { runWhenIdle } from '../lib/idle';
import type { Project, ProjectInput } from '../types/content';
import { fallbackProjects } from '../data/fallbacks';

function normalizeProject(project: Project): Project {
  const gallery = Array.isArray(project.gallery_urls)
    ? project.gallery_urls.map((url) => toLocalWebp(url)).filter(Boolean)
    : [];

  return {
    ...project,
    image_url: toLocalWebp(project.image_url),
    hover_image_url: project.hover_image_url ? toLocalWebp(project.hover_image_url) : '',
    gallery_urls: gallery,
  };
}

function schemaError(error: { code?: string; message?: string }) {
  if (error.code === 'PGRST204') {
    return new Error(
      'Your projects table is missing gallery_urls. In Supabase, open SQL Editor and run supabase/migrate-project-gallery.sql, then save again.'
    );
  }

  return error instanceof Error ? error : new Error(error.message || 'Failed to save project');
}

export function useProjects(defer = false) {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError || !data || data.length === 0) {
      setProjects(fallbackProjects);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setProjects((data as Project[]).map(normalizeProject));
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!defer) {
      void refresh();
      return;
    }

    return runWhenIdle(() => {
      void refresh();
    });
  }, [refresh, defer]);

  const createProject = async (input: ProjectInput) => {
    // New project = show first → put at top (sort_order 1)
    const { data: existing } = await supabase
      .from('projects')
      .select('id, sort_order')
      .order('sort_order', { ascending: true });

    if (existing && existing.length > 0) {
      await Promise.all(
        existing.map((row, index) =>
          supabase
            .from('projects')
            .update({ sort_order: index + 2 })
            .eq('id', row.id)
        )
      );
    }

    const { error: insertError } = await supabase
      .from('projects')
      .insert({ ...input, sort_order: 1 });
    if (insertError) throw schemaError(insertError);
    await refresh();
  };

  const updateProject = async (id: string, input: Partial<ProjectInput>) => {
    const { error: updateError } = await supabase.from('projects').update(input).eq('id', id);
    if (updateError) throw schemaError(updateError);
    await refresh();
  };

  const deleteProject = async (id: string) => {
    const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
  };

  /** Top of list = first shown (sort_order 1). */
  const reorderProjects = async (reordered: Project[]) => {
    const withOrder = reordered.map((project, index) => ({
      ...project,
      sort_order: index + 1,
    }));

    setProjects(withOrder);

    if (usingFallback) {
      throw new Error('Cannot save order while using fallback data. Run schema.sql + seed.sql first.');
    }

    const results = await Promise.all(
      withOrder.map((project) =>
        supabase.from('projects').update({ sort_order: project.sort_order }).eq('id', project.id)
      )
    );

    const firstError = results.find((r) => r.error)?.error;
    if (firstError) {
      await refresh();
      throw firstError;
    }
  };

  return {
    projects,
    loading,
    error,
    usingFallback,
    refresh,
    createProject,
    updateProject,
    deleteProject,
    reorderProjects,
  };
}
