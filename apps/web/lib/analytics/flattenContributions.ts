interface ContributionDay {
  date: string;
  count: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

export function flattenContributions(weeks: Week[]): ContributionDay[] {
  return weeks.flatMap((week) => week.contributionDays);
}

