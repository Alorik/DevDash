import { connectDb } from "@/lib/db/mongodb";
import CodingSession from "@/models/CodingSession";

let sessions: any[] = [];

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  const sessions = body.sessions;

  await CodingSession.insertMany(sessions);

  return Response.json({ success: true });
}

export async function GET() {
  return Response.json(sessions);
}
