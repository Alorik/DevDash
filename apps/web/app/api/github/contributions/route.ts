import { fetchContributions } from "../../../../lib/github/fetchContribution";
import { withAuth } from "../../../../lib/withAuth";

export const GET = withAuth(async (_, session) => {
  const calendar = await fetchContributions(session.accessToken!);

  return Response.json({
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  });
});
