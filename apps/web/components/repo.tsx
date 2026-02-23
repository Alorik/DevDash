"use client";

import { useEffect, useState } from "react";
type Repo={
  id: number;
  name: string;
}

export default function Reposit() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("api/github/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <div>
      <h1>your repos</h1>
      {repos.map((repo: Repo) => (
        <p key={repo.id}>{repo.name}</p>
      ))}
    </div>
  );
}
