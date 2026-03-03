type ContributionDay = {
  date: string;
  contributionCount: number;
};

export function calculateStreaks(days: ContributionDay[]) {
  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let longestStreak = 0;
  let running = 0;

  for (const day of sorted) {
    if (day.contributionCount > 0) {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  }

  let currentStreak = 0;

  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    currentStreak,
    longestStreak,
  };
}
