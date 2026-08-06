import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill, SkillInput } from '../types/content';
import { fallbackSkills } from '../data/fallbacks';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError || !data || data.length === 0) {
      setSkills(fallbackSkills);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setSkills(data as Skill[]);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createSkill = async (input: SkillInput) => {
    const sort_order = input.sort_order ?? skills.length + 1;
    const { error: insertError } = await supabase.from('skills').insert({ ...input, sort_order });
    if (insertError) throw insertError;
    await refresh();
  };

  const updateSkill = async (id: string, input: Partial<SkillInput>) => {
    const { error: updateError } = await supabase.from('skills').update(input).eq('id', id);
    if (updateError) throw updateError;
    await refresh();
  };

  const deleteSkill = async (id: string) => {
    const { error: deleteError } = await supabase.from('skills').delete().eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
  };

  return {
    skills,
    loading,
    error,
    usingFallback,
    refresh,
    createSkill,
    updateSkill,
    deleteSkill,
  };
}
