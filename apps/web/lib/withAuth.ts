import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth";

export function withAuth(
  handler: (req: Request, session: Session) => Promise<Response>,
) {
  return async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, session);
  };
}
