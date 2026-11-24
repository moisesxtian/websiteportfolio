import { useEffect, useState } from 'react';
import { Headphones, Play } from 'lucide-react';
import { formatPlayedAt, useLastFmTrack } from '../Hooks/useLastFm';

type NowPlayingProps = {
  /** pill: floating hero badge. inline: one quiet row for the About section. */
  variant?: 'pill' | 'inline';
};

function EqBars() {
  return (
    <span className="eq" aria-hidden="true">
      <span className="eq-bar eq-1" />
      <span className="eq-bar eq-2" />
      <span className="eq-bar eq-3" />
    </span>
  );
}

function Cover({ src, size }: { src: string; size: string }) {
  return (
    <span
      className={`${size} flex flex-shrink-0 items-center justify-center overflow-hidden bg-gray-100 text-main-color dark:bg-neutral-800`}
    >
      {src ? (
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <Headphones size={14} />
      )}
    </span>
  );
}

export default function NowPlaying({ variant = 'pill' }: NowPlayingProps) {
  const { track, loading, error } = useLastFmTrack();
  const [, setTick] = useState(0);
  const isInline = variant === 'inline';

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60000);
    return () => window.clearInterval(id);
  }, []);

  if (loading) {
    if (isInline) {
      return <span className="block h-4 w-48 rounded bg-gray-100 dark:bg-neutral-800" />;
    }

    return (
      <div className="w-full rounded-full border border-black/5 bg-page-bg px-2.5 py-2 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-neutral-800" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-24 rounded bg-gray-100 dark:bg-neutral-800" />
            <div className="h-2.5 w-36 rounded bg-gray-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return isInline ? (
      <span className="text-gray-500 dark:text-gray-400">Nothing on right now.</span>
    ) : null;
  }

  const whenLabel = formatPlayedAt(track.playedAt, track.nowPlaying);
  const ariaLabel = `Listen with me: ${track.name} by ${track.artist}, ${whenLabel}`;

  if (isInline) {
    return (
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-w-0 max-w-full items-center gap-3"
        aria-label={ariaLabel}
      >
        <Cover src={track.image} size="h-9 w-9 rounded" />
        <span className="min-w-0">
          <span className="block truncate font-medium text-secondary-color transition-colors duration-200 group-hover:text-main-color">
            {track.name}
          </span>
          <span className="flex items-center gap-1.5 truncate text-xs text-gray-500 dark:text-gray-400">
            {track.nowPlaying ? <EqBars /> : null}
            {track.artist} · {whenLabel}
          </span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-2.5 rounded-full border border-black/5 bg-page-bg px-2.5 py-2 transition-colors duration-200 hover:border-main-color/40 dark:border-white/10"
      aria-label={ariaLabel}
    >
      <span className="relative flex-shrink-0">
        <Cover src={track.image} size="h-9 w-9 rounded-full" />
        {track.nowPlaying ? (
          <span className="absolute inset-x-0 bottom-1 flex justify-center">
            <EqBars />
          </span>
        ) : null}
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className="mb-0.5 text-[10px] leading-none text-gray-400 dark:text-gray-500">
          Play to listen with me
        </p>
        <p className="truncate text-xs font-semibold text-secondary-color transition-colors duration-200 group-hover:text-main-color">
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
