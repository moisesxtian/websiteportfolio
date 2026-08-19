import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { fallbackChatProfile } from '../data/profile';
import type { ChatProfileData } from '../types/content';

const SETTINGS_KEY = 'about_chan';
const CACHE_KEY = 'about_chan_cache';

function readText(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === 'placeholder') return fallback;
  return trimmed;
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
      currentlyBuilding: readText(data.currentlyBuilding, fallbackChatProfile.currentlyBuilding),
      currentlyLearning: readText(data.currentlyLearning, fallbackChatProfile.currentlyLearning),
      funFact: readText(data.funFact, fallbackChatProfile.funFact),
    };
  } catch {
    return null;
  }
}

function readLocalCache(): ChatProfileData | null {
  try {
    return parseProfile(sessionStorage.getItem(CACHE_KEY));
  } catch {
    return null;
  }
}

function writeLocalCache(profile: ChatProfileData) {
  memoryCache = profile;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore quota / private mode
  }
}

let memoryCache: ChatProfileData | null = null;
let fetchPromise: Promise<{ profile: ChatProfileData; fromServer: boolean }> | null = null;

function getCachedProfile(): ChatProfileData {
  if (memoryCache) return memoryCache;
  const fromSession = readLocalCache();
  if (fromSession) {
    memoryCache = fromSession;
    return fromSession;
  }
  return fallbackChatProfile;
}

function fetchProfile() {
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    const { data, error: fetchError } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', SETTINGS_KEY)
      .maybeSingle();

    const parsed = parseProfile(data?.value);

    if (!fetchError && parsed) {
      writeLocalCache(parsed);
      return { profile: parsed, fromServer: true };
    }

    return { profile: memoryCache ?? fallbackChatProfile, fromServer: false };
  })().finally(() => {
    fetchPromise = null;
  });

  return fetchPromise;
}

export function useChatProfile() {
  const [profile, setProfile] = useState<ChatProfileData>(getCachedProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(() => {
    return memoryCache === null && readLocalCache() === null;
  });

  const refresh = useCallback(async () => {
    setError(null);

    try {
      const result = await fetchProfile();
      setProfile(result.profile);
      if (result.fromServer) setUsingFallback(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load About Chan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const saveProfile = async (next: ChatProfileData) => {
    const { error: upsertError } = await supabase.from('site_settings').upsert({
      key: SETTINGS_KEY,
      value: JSON.stringify(next),
      updated_at: new Date().toISOString(),
    });

    if (upsertError) throw upsertError;

    writeLocalCache(next);
    setProfile(next);
    setUsingFallback(false);
    setLoading(false);
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
