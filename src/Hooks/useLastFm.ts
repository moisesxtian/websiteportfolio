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

function pickImage(images: LastFmImage[] | undefined): string {
  if (!images || images.length === 0) return '';
  const large = images.find((img) => img.size === 'large' || img.size === 'extralarge');
  return (large?.['#text'] || images[images.length - 1]?.['#text'] || '').trim();
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
        `&format=json&limit=1`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Last.fm error ${res.status}`);

      const data = await res.json();
      const raw = data?.recenttracks?.track;
      const item = Array.isArray(raw) ? raw[0] : raw;

      if (!item) {
        setTrack(null);
        setError(null);
        setLoading(false);
        return;
      }

      const nowPlaying = item['@attr']?.nowplaying === 'true';
      const uts = item.date?.uts ? Number(item.date.uts) : null;

      setTrack({
        name: item.name || 'Unknown track',
        artist: item.artist?.['#text'] || item.artist?.name || 'Unknown artist',
        album: item.album?.['#text'] || '',
        url: item.url || `https://www.last.fm/user/${user}`,
        image: pickImage(item.image),
        nowPlaying,
        playedAt: nowPlaying ? null : Number.isFinite(uts) ? uts : null,
      });
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
