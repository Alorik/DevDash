export async function fetchAllRepos(token: string) {
  let page = 1;
  let repos: any[] = [];

  while (true) {
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) break;

    repos.push(...data);
    page++;
  }

  return repos;
}
