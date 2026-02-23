

export async function fetchAllCommits(
  repo: any,
  token: string,
  sinceISO: string,
) {
  let page = 1;
  let allCommits: any[] = [];

  while (true) {
    const res = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${sinceISO}&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const commits = await res.json();

    if (!Array.isArray(commits) || commits.length === 0) break;

    allCommits.push(...commits);
    page++;
  }

  return allCommits;
}
