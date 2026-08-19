import { useCallback, useEffect, useState } from 'react';

export type LastFmTrack = {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  nowPlaying: boolean;
  /** Unix seconds when the track was scrobbled; null if currently playing */
  playedAt: number | null;
};

type LastFmImage = { size: string; '#text': string };

type LastFmRawTrack = {
  name?: string;
  url?: string;
  artist?: { '#text'?: string; name?: string } | string;
  album?: { '#text'?: string };
  image?: LastFmImage[];
  date?: { uts?: string };
  '@attr'?: { nowplaying?: string };
};

function pickImage(images: LastFmImage[] | undefined): string {
  if (!images || images.length === 0) return '';
  const extra = images.find((img) => img.size === 'extralarge');
  const large = images.find((img) => img.size === 'large');
  return (extra?.['#text'] || large?.['#text'] || images[images.length - 1]?.['#text'] || '').trim();
}

function artistName(artist: LastFmRawTrack['artist']): string {
  if (!artist) return 'Unknown artist';
  if (typeof artist === 'string') return artist;
  return artist['#text'] || artist.name || 'Unknown artist';
}

function toTrack(item: LastFmRawTrack, user: string, nowPlaying: boolean): LastFmTrack {
  const uts = item.date?.uts ? Number(item.date.uts) : null;
  return {
    name: item.name || 'Unknown track',
    artist: artistName(item.artist),
    album: item.album?.['#text'] || '',
    url: item.url || `https://www.last.fm/user/${user}`,
    image: pickImage(item.image),
    nowPlaying,
    playedAt: nowPlaying ? null : Number.isFinite(uts) ? uts : null,
  };
}

export function formatPlayedAt(playedAt: number | null, nowPlaying: boolean): string {
  if (nowPlaying) return 'Listening now';
  if (!playedAt) return 'Recently played';

  const nowSec = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, nowSec - playedAt);

  if (diff < 60) return 'Just now';
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins === 1 ? '' : 's'} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (diff < 86400 * 7) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  return new Date(playedAt * 1000).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function pickRecentTrack(raw: LastFmRawTrack | LastFmRawTrack[] | undefined): {
  item: LastFmRawTrack;
  nowPlaying: boolean;
} | null {
  const tracks = Array.isArray(raw) ? raw : raw ? [raw] : [];
  if (tracks.length === 0) return null;

  // Prefer a live now-playing entry when Last.fm reports one
  const living = tracks.find((t) => t?.['@attr']?.nowplaying === 'true');
  if (living) {
    return { item: living, nowPlaying: true };
  }

  // Otherwise use the newest completed scrobble (has a timestamp)
  const scrobbled = tracks
    .filter((t) => t?.date?.uts && Number.isFinite(Number(t.date.uts)))
    .sort((a, b) => Number(b.date!.uts) - Number(a.date!.uts));

  if (scrobbled[0]) {
    return { item: scrobbled[0], nowPlaying: false };
  }

  return { item: tracks[0], nowPlaying: false };
}

export function useLastFmTrack(pollMs = 45000) {
  const [track, setTrack] = useState<LastFmTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const user = import.meta.env.VITE_LASTFM_USER;

    if (!apiKey || !user) {
      setError('Missing Last.fm config');
      setLoading(false);
      return;
    }

    try {
      const url =
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
        `&user=${encodeURIComponent(user)}` +
        `&api_key=${encodeURIComponent(apiKey)}` +
        `&format=json&limit=10&extended=0`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Last.fm error ${res.status}`);

      const data = await res.json();
      const picked = pickRecentTrack(data?.recenttracks?.track);

      if (!picked) {
        setTrack(null);
        setError(null);
        setLoading(false);
        return;
      }

      setTrack(toTrack(picked.item, user, picked.nowPlaying));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Last.fm');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = window.setInterval(refresh, pollMs);
    return () => window.clearInterval(id);
  }, [refresh, pollMs]);

  return { track, loading, error, refresh };
}
