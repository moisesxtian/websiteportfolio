import { useEffect, useState } from 'react';
import { Headphones, Play } from 'lucide-react';
import { SiSpotify } from 'react-icons/si';
import { formatPlayedAt, useLastFmTrack } from '../Hooks/useLastFm';

type NowPlayingProps = {
  variant?: 'pill' | 'card';
};

function SpotifyBrand() {
  return (
    <div className="spotify-brand">
      <SiSpotify size={14} />
      <span className="spotify-brand-name">Spotify</span>
      <span className="spotify-brand-divider" aria-hidden="true" />
    </div>
  );
}

export default function NowPlaying({ variant = 'pill' }: NowPlayingProps) {
  const { track, loading, error } = useLastFmTrack();
  const [, setTick] = useState(0);
  const isCard = variant === 'card';

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60000);
    return () => window.clearInterval(id);
  }, []);

  if (loading) {
    if (isCard) {
      return (
        <div className="about-nowplaying-card is-spotify">
          <SpotifyBrand />
          <div className="spotify-cover animate-pulse bg-white/5" />
          <div className="spotify-meta animate-pulse space-y-2">
            <div className="h-2 w-20 rounded bg-white/10" />
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="h-2.5 w-24 rounded bg-white/10" />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full rounded-full border border-black/5 bg-white/85 px-2.5 py-2 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/85">
        <div className="flex items-center gap-2.5 animate-pulse">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-neutral-700" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-24 rounded bg-gray-200 dark:bg-neutral-700" />
            <div className="h-2.5 w-36 rounded bg-gray-200 dark:bg-neutral-700" />
          </div>
          <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-200 dark:bg-neutral-700" />
        </div>
      </div>
    );
  }

  if (error || !track) {
    if (isCard) {
      return (
        <div className="about-nowplaying-card is-spotify">
          <SpotifyBrand />
          <div className="spotify-cover spotify-cover-empty">
            <Headphones size={36} />
          </div>
          <div className="spotify-meta">
            <p className="spotify-kicker">Recently played</p>
            <p className="spotify-title">Nothing playing right now</p>
            <p className="spotify-artist">A track shows up here when one is on.</p>
          </div>
        </div>
      );
    }

    return null;
  }

  const whenLabel = formatPlayedAt(track.playedAt, track.nowPlaying);

  if (isCard) {
    return (
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="about-nowplaying-card is-spotify group"
        aria-label={`Play to listen with me: ${track.name} by ${track.artist}, ${whenLabel}`}
      >
        <SpotifyBrand />

        <div className="spotify-cover">
          {track.image ? (
            <img src={track.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="spotify-cover-empty">
              <Headphones size={36} />
            </div>
          )}
          <span className="spotify-play" aria-hidden="true">
            <Play size={22} fill="currentColor" className="translate-x-[1px]" />
          </span>
        </div>

        <div className="spotify-meta">
          <p className={`spotify-kicker ${track.nowPlaying ? 'is-live' : ''}`}>
            {track.nowPlaying ? (
              <span className="spotify-eq" aria-hidden="true">
                <span className="eq-bar eq-1" />
                <span className="eq-bar eq-2" />
                <span className="eq-bar eq-3" />
              </span>
            ) : null}
            {track.nowPlaying ? 'Listen with me' : 'Recently played'}
          </p>
          <p className="spotify-title">{track.name}</p>
          <p className="spotify-artist">
            {track.artist}
            {track.album ? ` · ${track.album}` : ''}
          </p>
          {track.nowPlaying ? null : <p className="spotify-when">{whenLabel}</p>}
        </div>
      </a>
    );
  }

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-2.5 rounded-full border border-black/5 bg-white/85 px-2.5 py-2 backdrop-blur-md transition-colors duration-200 hover:bg-white dark:border-white/10 dark:bg-neutral-900/85 dark:hover:bg-neutral-900"
      aria-label={`Play to listen with me: ${track.name} by ${track.artist}, ${whenLabel}`}
    >
      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
        {track.image ? (
          <img src={track.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-main-color">
            <Headphones size={14} />
          </div>
        )}
        {track.nowPlaying ? (
          <span className="absolute inset-x-1.5 bottom-1 flex h-1.5 items-end justify-center gap-0.5">
            <span className="eq-bar eq-1" />
            <span className="eq-bar eq-2" />
            <span className="eq-bar eq-3" />
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1 text-left">
        <p className="text-[10px] text-gray-400 leading-none mb-0.5 dark:text-gray-500">
          Play to listen with me
        </p>
        <p className="truncate text-xs font-semibold text-secondary-color group-hover:text-main-color transition-colors">
          {track.name}
        </p>
        <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
          {track.artist} · {whenLabel}
        </p>
      </div>

      <span
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-main-color/10 text-main-color transition-colors duration-200 group-hover:bg-main-color group-hover:text-white"
        aria-hidden="true"
      >
        <Play size={12} fill="currentColor" className="translate-x-[1px]" />
      </span>
    </a>
  );
}
