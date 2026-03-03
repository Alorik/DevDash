import { flattenContributions } from "../../../../lib/analytics/flattenContributions";
import { calculateStreaks } from "../../../../lib/analytics/streakCalculator";
import { fetchContributions } from "../../../../lib/github/fetchContribution";
import { withAuth } from "../../../../lib/withAuth";

export const GET = withAuth(async (_, session) => {
  const calendar = await fetchContributions(session.accessToken!);

  const days = flattenContributions(calendar.weeks);

  const streaks = calculateStreaks(days);

  return Response.json({
    totalContributions: calendar.totalContributions,
    ...streaks,
    days,
  });
});
