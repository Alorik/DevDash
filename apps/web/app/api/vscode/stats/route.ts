import { connectDb } from "@/lib/db/mongodb";
import CodingSession from "@/models/CodingSession";

type Stats = {
  todayCodingTime: Number;
  weekCodingTime: Number;
  monthCodingTime: Number;
};

export async function GET() {
  await connectDb();
  const sessions = await CodingSession.find().lean();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startTimestamp = startOfToday.getTime();

  const todaySessions = sessions.filter(
    (session: any) => session.startTime >= startTimestamp,
  );

  const totalMilliseconds = todaySessions.reduce(
    (sum: number, session: any) => sum + session.duration,
    0,
  );console.log("")
  const todayHours = totalMilliseconds / (1000 * 60 * 60);
  return Response.json(todayHours);
}
