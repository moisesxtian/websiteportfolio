import { useEffect, useState } from 'react';
import { Headphones } from 'lucide-react';
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
      <div className="w-full rounded-full border border-gray-200/80 bg-white/60 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2.5 animate-pulse">
          <div className="h-9 w-9 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-24 rounded bg-gray-200" />
            <div className="h-2.5 w-36 rounded bg-gray-200" />
          </div>
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
      className="group flex w-full items-center gap-2.5 rounded-full border border-gray-200/90 bg-white/75 px-2.5 py-2 shadow-sm backdrop-blur transition hover:border-main-color/35 hover:bg-orange-50/70"
      aria-label={`${track.nowPlaying ? 'Now playing' : 'Last played'}: ${track.name} by ${track.artist}, ${whenLabel}`}
    >
      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-black/5">
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
        <p className="text-[10px] text-gray-400 leading-none mb-0.5">
          {track.nowPlaying ? 'In my headphones' : 'On repeat lately'} · {whenLabel}
        </p>
        <p className="truncate text-xs font-semibold text-secondary-color group-hover:text-main-color transition-colors">
          {track.name}
        </p>
        <p className="truncate text-[11px] text-gray-500">{track.artist}</p>
      </div>
    </a>
  );
}
