import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { fallbackChatProfile } from '../data/profile';
import type { ChatProfileData } from '../types/content';

const SETTINGS_KEY = 'about_chan';

function readText(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback;
  return value;
}

function parseProfile(raw: string | null | undefined): ChatProfileData | null {
  if (!raw) return null;

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== 'object') return null;

    return {
      name: readText(data.name, fallbackChatProfile.name),
      nickname: readText(data.nickname, fallbackChatProfile.nickname),
      relationship: readText(data.relationship, fallbackChatProfile.relationship),
      age: readText(data.age, fallbackChatProfile.age),
      work: readText(data.work, fallbackChatProfile.work),
      location: readText(data.location, fallbackChatProfile.location),
      languages: readText(data.languages, fallbackChatProfile.languages),
      interests: readText(data.interests, fallbackChatProfile.interests),
      hobbies: readText(data.hobbies, fallbackChatProfile.hobbies),
      about: readText(data.about, fallbackChatProfile.about),
    };
  } catch {
    return null;
  }
}

export function useChatProfile() {
  const [profile, setProfile] = useState<ChatProfileData>(fallbackChatProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .maybeSingle();

    const parsed = parseProfile(data?.value);

    if (fetchError || !parsed) {
      setProfile(fallbackChatProfile);
      setUsingFallback(true);
      if (fetchError) setError(fetchError.message);
      setLoading(false);
      return;
    }

    setProfile(parsed);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveProfile = async (next: ChatProfileData) => {
    const { error: upsertError } = await supabase.from('site_settings').upsert({
      key: SETTINGS_KEY,
      value: JSON.stringify(next),
      updated_at: new Date().toISOString(),
    });

    if (upsertError) throw upsertError;
    await refresh();
  };

  return {
    profile,
    loading,
    error,
    usingFallback,
    refresh,
    saveProfile,
  };
}
