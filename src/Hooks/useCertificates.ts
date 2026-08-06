import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Certificate, CertificateInput } from '../types/content';
import { fallbackCertificates } from '../data/fallbacks';

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>(fallbackCertificates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('certificates')
      .select('*')
      .order('sort_order', { ascending: true });

    if (fetchError || !data || data.length === 0) {
      setCertificates(fallbackCertificates);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setCertificates(data as Certificate[]);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createCertificate = async (input: CertificateInput) => {
    const sort_order = input.sort_order ?? certificates.length + 1;
    const { error: insertError } = await supabase.from('certificates').insert({ ...input, sort_order });
    if (insertError) throw insertError;
    await refresh();
  };

  const updateCertificate = async (id: string, input: Partial<CertificateInput>) => {
    const { error: updateError } = await supabase.from('certificates').update(input).eq('id', id);
    if (updateError) throw updateError;
    await refresh();
  };

  const deleteCertificate = async (id: string) => {
    const { error: deleteError } = await supabase.from('certificates').delete().eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
  };

  return {
    certificates,
    loading,
    error,
    usingFallback,
    refresh,
    createCertificate,
    updateCertificate,
    deleteCertificate,
  };
}
