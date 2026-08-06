import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Experience, ExperienceInput } from '../types/content';
import { fallbackExperiences } from '../data/fallbacks';

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperiences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError || !data || data.length === 0) {
      setExperiences(fallbackExperiences);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setExperiences(data as Experience[]);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createExperience = async (input: ExperienceInput) => {
    // New experience = latest → put at top (sort_order 1)
    const { data: existing } = await supabase
      .from('experiences')
      .select('id, sort_order')
      .order('sort_order', { ascending: true });

    if (existing && existing.length > 0) {
      await Promise.all(
        existing.map((row, index) =>
          supabase
            .from('experiences')
            .update({ sort_order: index + 2 })
            .eq('id', row.id)
        )
      );
    }

    const { error: insertError } = await supabase
      .from('experiences')
      .insert({ ...input, sort_order: 1 });
    if (insertError) throw insertError;
    await refresh();
  };

  const updateExperience = async (id: string, input: Partial<ExperienceInput>) => {
    const { error: updateError } = await supabase.from('experiences').update(input).eq('id', id);
    if (updateError) throw updateError;
    await refresh();
  };

  const deleteExperience = async (id: string) => {
    const { error: deleteError } = await supabase.from('experiences').delete().eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
  };

  /** Top of list = latest (sort_order 1). Bottom = oldest. */
  const reorderExperiences = async (reordered: Experience[]) => {
    const withOrder = reordered.map((exp, index) => ({
      ...exp,
      sort_order: index + 1,
    }));

    setExperiences(withOrder);

    if (usingFallback) {
      throw new Error('Cannot save order while using fallback data. Run schema.sql + seed.sql first.');
    }

    const results = await Promise.all(
      withOrder.map((exp) =>
        supabase.from('experiences').update({ sort_order: exp.sort_order }).eq('id', exp.id)
      )
    );

    const firstError = results.find((r) => r.error)?.error;
    if (firstError) {
      await refresh();
      throw firstError;
    }
  };

  return {
    experiences,
    loading,
    error,
    usingFallback,
    refresh,
    createExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
  };
}
