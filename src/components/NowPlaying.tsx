import { useEffect, useState } from 'react';
import { Headphones, Play } from 'lucide-react';
import { formatPlayedAt, useLastFmTrack } from '../Hooks/useLastFm';

export default function NowPlaying() {
  const { track, loading, error } = useLastFmTrack();
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60000);
    return () => window.clearInterval(id);
  }, []);

  if (loading) {
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
    return null;
  }

  const whenLabel = formatPlayedAt(track.playedAt, track.nowPlaying);

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
