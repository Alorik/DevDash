import { withAuth } from "../../../../lib/withAuth";

export const GET = withAuth(async (req, session) => {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = await res.json();

  return Response.json(data);
});
