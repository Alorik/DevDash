type GitHubCommit = {
  commit: {
    author: {
      date: string;
    };
  };
  repository?: {
    name: string;
  };
};

export function commitsPerDay(commits: GitHubCommit[]): Record<string, number> {
  const stats: Record<string, number> = {};

  commits.forEach((commit) => {
    const date = commit?.commit?.author?.date.slice(0, 10);

    stats[date] = (stats[date] || 0) + 1;
  });

  return stats;
}

export function totalCommits(commits: GitHubCommit[]) {
  return commits.length;
}

export function mostActiveRepo(commits: GitHubCommit[]) {
  const repoCount: Record<string, number> = {};

  commits.forEach((commit) => {
    const repo = commit.repository?.name || "unknown";
    repoCount[repo] = (repoCount[repo] || 0) + 1;
  });

  return Object.entries(repoCount).sort((a, b) => b[1] - a[1])[0];
}
