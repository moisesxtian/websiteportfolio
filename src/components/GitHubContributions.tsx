import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GITHUB_URL, GITHUB_USERNAME } from '../data/profile';
import {
  getWeekMonthLabels,
  useGitHubContributions,
  type GitHubContributionDay,
} from '../Hooks/useGitHubContributions';

type FlatDay = {
  day: GitHubContributionDay;
  weekIndex: number;
  dayIndex: number;
};

function formatContributionLabel(count: number, date: string): string {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (count === 0) {
    return `No contributions on ${formattedDate}`;
  }

  if (count === 1) {
    return `1 contribution on ${formattedDate}`;
  }

  return `${count} contributions on ${formattedDate}`;
}

type GitHubContributionsProps = {
  embedded?: boolean;
};

export default function GitHubContributions({ embedded = false }: GitHubContributionsProps) {
  const { weeks, totalLastYear, loading, error } = useGitHubContributions(GITHUB_USERNAME);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(0);
  const [hasInspected, setHasInspected] = useState(false);

  const monthLabels = useMemo(() => getWeekMonthLabels(weeks), [weeks]);

  const flatDays = useMemo(() => {
    const days: FlatDay[] = [];
    weeks.forEach((week, weekIndex) => {
      week.forEach((day, dayIndex) => {
        if (day) {
          days.push({ day, weekIndex, dayIndex });
        }
      });
    });
    return days;
  }, [weeks]);

  const dayIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    flatDays.forEach((entry, index) => {
      map.set(`${entry.weekIndex}-${entry.dayIndex}`, index);
    });
    return map;
  }, [flatDays]);

  const activeDay = flatDays[cursor]?.day ?? null;
  const weekCount = loading ? 53 : Math.max(weeks.length, 1);

  useEffect(() => {
    const node = bodyRef.current;
    if (!node || loading) return;
    node.scrollLeft = node.scrollWidth;
  }, [loading, weeks.length]);

  function moveCursor(nextIndex: number) {
    if (flatDays.length === 0) return;
    const clamped = Math.max(0, Math.min(flatDays.length - 1, nextIndex));
    setCursor(clamped);
    setHasInspected(true);
  }

  function handleHeatmapKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (flatDays.length === 0) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveCursor(cursor + 1);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveCursor(cursor - 1);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveCursor(cursor + 7);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveCursor(cursor - 7);
    }
  }

  const caption = loading
    ? 'Loading activity…'
    : error
      ? 'Activity unavailable'
      : weeks.length === 0
        ? 'No contributions in the last year'
        : hasInspected && activeDay
          ? formatContributionLabel(activeDay.count, activeDay.date)
          : 'Last year · hover or focus a day';

  const heatmap = loading ? (
    <div
      className="about-github-skeleton"
      style={{ ['--weeks' as string]: 53 }}
      aria-hidden="true"
    >
      {Array.from({ length: 53 }).map((_, columnIndex) => (
        <div key={columnIndex} className="about-github-week">
          {Array.from({ length: 7 }).map((__, rowIndex) => (
            <span key={rowIndex} className="about-github-cell is-loading" />
          ))}
        </div>
      ))}
    </div>
  ) : error ? (
    <p className="about-github-fallback">
      Could not load the contribution graph.{' '}
      <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="about-github-inline-link">
        View on GitHub
      </a>
    </p>
  ) : weeks.length === 0 ? (
    <p className="about-github-fallback">No public contributions to show for the last year.</p>
  ) : (
    <div className="about-github-chart">
      <div className="about-github-months" style={{ ['--weeks' as string]: weekCount }}>
        {monthLabels.map((label, index) => (
          <span key={index} className="about-github-month">
            {label ?? ''}
          </span>
        ))}
      </div>
      <div
        className="about-github-heatmap"
        style={{ ['--weeks' as string]: weekCount }}
        role="grid"
        tabIndex={0}
        aria-label="GitHub contribution calendar for the last year. Use arrow keys to move between days."
        onKeyDown={handleHeatmapKeyDown}
        onFocus={() => {
          if (!hasInspected && flatDays.length > 0) {
            setHasInspected(true);
          }
        }}
      >
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="about-github-week" role="row">
            {week.map((day, dayIndex) => {
              if (!day) {
                return (
                  <span
                    key={`${weekIndex}-${dayIndex}`}
                    className="about-github-cell is-pad"
                    aria-hidden="true"
                  />
                );
              }

              const flatIndex = dayIndexMap.get(`${weekIndex}-${dayIndex}`) ?? 0;
              const isActive = flatIndex === cursor;

              return (
                <span
                  key={`${weekIndex}-${dayIndex}`}
                  role="gridcell"
                  className={`about-github-cell ${isActive ? 'is-active' : ''}`}
                  data-level={day.level}
                  aria-label={formatContributionLabel(day.count, day.date)}
                  onMouseEnter={() => moveCursor(flatIndex)}
                  onClick={() => moveCursor(flatIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const body = (
    <>
      <div className="about-github-head">
        <div className="about-github-stat">
          <p className="about-github-total">
            {loading || error ? '—' : (totalLastYear ?? 0).toLocaleString()}
          </p>
          <p className="about-github-total-label">contributions</p>
        </div>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="about-github-link">
          @{GITHUB_USERNAME}
          <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden="true" />
        </a>
      </div>
      <p className="about-github-caption" aria-live="polite">
        {caption}
      </p>
      <div className="about-github-body" ref={bodyRef}>
        {heatmap}
      </div>
      {!error ? (
        <div className="about-github-legend" aria-hidden={loading}>
          <span>Less</span>
          <span className="about-github-cell" data-level="0" />
          <span className="about-github-cell" data-level="1" />
          <span className="about-github-cell" data-level="2" />
          <span className="about-github-cell" data-level="3" />
          <span className="about-github-cell" data-level="4" />
          <span>More</span>
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <section className="about-personal-tile about-personal-github about-stagger" aria-label="GitHub">
        {body}
      </section>
    );
  }

  return <section className="about-bento-card about-github-card about-stagger">{body}</section>;
}
