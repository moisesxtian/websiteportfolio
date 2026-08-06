import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project, ProjectInput } from '../types/content';
import { fallbackProjects } from '../data/fallbacks';

export function useProjects() {
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

    setProjects(data as Project[]);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createProject = async (input: ProjectInput) => {
    const sort_order = input.sort_order ?? (projects.length + 1);
    const { error: insertError } = await supabase.from('projects').insert({ ...input, sort_order });
    if (insertError) throw insertError;
    await refresh();
  };

  const updateProject = async (id: string, input: Partial<ProjectInput>) => {
    const { error: updateError } = await supabase.from('projects').update(input).eq('id', id);
    if (updateError) throw updateError;
    await refresh();
  };

  const deleteProject = async (id: string) => {
    const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
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
  };
}
