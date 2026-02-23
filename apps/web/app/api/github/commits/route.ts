import { commitsPerDay, totalCommits } from "../../../lib/utils/dataAgregators";
import { fetchAllCommits } from "../../../lib/utils/fetchAllCommits";
import { fetchAllRepos } from "../../../lib/utils/fetchAllRepos";
import { withAuth } from "../../../lib/withAuth";


export const GET = withAuth(async (res, session) => {
  const repos = await fetchAllRepos(session.accessToken!);

  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);

  const sinceISO = since.toISOString();

  const commitPromises = repos.map((repo) =>
    fetchAllCommits(repo, session.accessToken!, sinceISO),
  );

  const commitsByRepo = await Promise.all(commitPromises);
  const commits = commitsByRepo.flat();

  const stats = {
    totalCommits: totalCommits(commits),
    commitsPerDay: commitsPerDay(commits),
  };
  return Response.json(stats);
});
