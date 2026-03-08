import { connectDb } from "@/lib/db/mongodb";
import CodingSession from "@/models/CodingSession";

export async function GET() {
  await connectDb();

  const sessions = await CodingSession.find().lean();

  const now = new Date();



  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const todaySessions = sessions.filter(
    (s: any) => s.startTime >= startOfToday.getTime()
  );

  const todayMs = todaySessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0
  );

  const todayHours = todayMs / (1000 * 60 * 60);


  const startOfWeek = new Date(now);
  const day = now.getDay();

  startOfWeek.setDate(now.getDate() - day);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekSessions = sessions.filter(
    (s: any) => s.startTime >= startOfWeek.getTime()
  );

  const weekMs = weekSessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0
  );

  const weekHours = weekMs / (1000 * 60 * 60);


  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthSessions = sessions.filter(
    (s: any) => s.startTime >= startOfMonth.getTime()
  );

  const monthMs = monthSessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0
  );

  const monthHours = monthMs / (1000 * 60 * 60);


  const languageDistribution: Record<string, number> = {};

  sessions.forEach((s: any) => {
    const lang = s.language || "unknown";

    languageDistribution[lang] =
      (languageDistribution[lang] || 0) + s.duration;
  });

  Object.keys(languageDistribution).forEach((lang) => {
    languageDistribution[lang] =
      languageDistribution[lang] / (1000 * 60 * 60);
  });


  const projectUsage: Record<string, number> = {};

  sessions.forEach((s: any) => {
    const project = s.project || "unknown";

    projectUsage[project] =
      (projectUsage[project] || 0) + s.duration;
  });

  Object.keys(projectUsage).forEach((p) => {
    projectUsage[p] = projectUsage[p] / (1000 * 60 * 60);
  });


  const peakCodingHours: Record<number, number> = {};

  sessions.forEach((s: any) => {
    const date = new Date(s.startTime);
    const hour = date.getHours();

    peakCodingHours[hour] =
      (peakCodingHours[hour] || 0) + s.duration;
  });

  Object.keys(peakCodingHours).forEach((h) => {
    peakCodingHours[Number(h)] =
      peakCodingHours[Number(h)] / (1000 * 60 * 60);
  });


  const days = new Set<string>();

  sessions.forEach((s: any) => {
    const d = new Date(s.startTime);
    const day = d.toISOString().slice(0, 10);
    days.add(day);
  });

  const sortedDays = Array.from(days).sort().reverse();

  let streak = 0;
  let current = new Date();

  current.setHours(0, 0, 0, 0);

  for (let day of sortedDays) {
    const date = new Date(day);
    const diff =
      (current.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 0 || diff === 1) {
      streak++;
      current = date;
    } else {
      break;
    }
  }


  return Response.json({
    todayHours,
    weekHours,
    monthHours,
    languageDistribution,
    projectUsage,
    peakCodingHours,
    streak,
  });
}
