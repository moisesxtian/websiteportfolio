import { useEffect, useState } from 'react';

export type GitHubContributionDay = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionsResponse = {
  total?: {
    lastYear?: number;
  };
  contributions?: GitHubContributionDay[];
};

export function buildContributionWeeks(
  contributions: GitHubContributionDay[]
): (GitHubContributionDay | null)[][] {
  if (contributions.length === 0) return [];

  const weeks: (GitHubContributionDay | null)[][] = [];
  let week: (GitHubContributionDay | null)[] = [];

  const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay();
  for (let index = 0; index < firstDay; index += 1) {
    week.push(null);
  }

  for (const day of contributions) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return weeks;
}

export function getWeekMonthLabels(
  weeks: (GitHubContributionDay | null)[][]
): (string | null)[] {
  const labels: (string | null)[] = [];
  let lastMonth = -1;

  weeks.forEach((week) => {
    const day = week.find((entry) => entry !== null);
    if (!day) {
      labels.push(null);
      return;
    }

    const month = new Date(`${day.date}T00:00:00`).getMonth();
    if (month === lastMonth) {
      labels.push(null);
      return;
    }

    lastMonth = month;
    labels.push(
      new Date(`${day.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short' })
    );
  });

  return labels;
}

export function useGitHubContributions(username: string) {
  const [contributions, setContributions] = useState<GitHubContributionDay[]>([]);
  const [totalLastYear, setTotalLastYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
        );

        if (!response.ok) {
          throw new Error('Failed to load GitHub contributions');
        }

        const data = (await response.json()) as GitHubContributionsResponse;
        if (cancelled) return;

        setContributions(Array.isArray(data.contributions) ? data.contributions : []);
        setTotalLastYear(
          typeof data.total?.lastYear === 'number' ? data.total.lastYear : null
        );
      } catch {
        if (!cancelled) {
          setContributions([]);
          setTotalLastYear(null);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return {
    contributions,
    weeks: buildContributionWeeks(contributions),
    totalLastYear,
    loading,
    error,
  };
}
