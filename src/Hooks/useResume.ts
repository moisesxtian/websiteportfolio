import { useCallback, useEffect, useState } from 'react';
import { supabase, uploadFile } from '../lib/supabase';
import { fallbackResumeUrl } from '../data/fallbacks';

export function useResume() {
  const [resumeUrl, setResumeUrl] = useState(fallbackResumeUrl);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'resume_url')
      .maybeSingle();

    if (fetchError || !data?.value) {
      setResumeUrl(fallbackResumeUrl);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setResumeUrl(data.value);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const uploadResume = async (file: File) => {
    const url = await uploadFile('resumes', file, 'cv');
    const { error: upsertError } = await supabase.from('site_settings').upsert({
      key: 'resume_url',
      value: url,
      updated_at: new Date().toISOString(),
    });
    if (upsertError) throw upsertError;
    await refresh();
    return url;
  };

  return {
    resumeUrl,
    loading,
    error,
    usingFallback,
    refresh,
    uploadResume,
  };
}
