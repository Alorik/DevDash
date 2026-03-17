import { connectDb } from "@/lib/db/mongodb";
import CodingSession from "@/models/CodingSession";

export async function GET() {
  await connectDb();

  const sessions = await CodingSession.find().lean();

  const now = new Date();

  /* ––––– TODAY ––––– */

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const todaySessions = sessions.filter(
    (s: any) => s.startTime >= startOfToday.getTime(),
  );

  const todayMs = todaySessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0,
  );

  const todayHours = todayMs / (1000 * 60 * 60);

  /* ––––– WEEK ––––– */

  const startOfWeek = new Date(now);
  const day = now.getDay();

  startOfWeek.setDate(now.getDate() - day);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekSessions = sessions.filter(
    (s: any) => s.startTime >= startOfWeek.getTime(),
  );

  const weekMs = weekSessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0,
  );

  const weekHours = weekMs / (1000 * 60 * 60);

  /* ––––– MONTH ––––– */

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthSessions = sessions.filter(
    (s: any) => s.startTime >= startOfMonth.getTime(),
  );

  const monthMs = monthSessions.reduce(
    (sum: number, s: any) => sum + s.duration,
    0,
  );

  const monthHours = monthMs / (1000 * 60 * 60);

  /* ––––– LANGUAGE DISTRIBUTION ––––– */

  const languageDistribution: Record<string, number> = {};

  sessions.forEach((s: any) => {
    const lang = s.language || "unknown";
    languageDistribution[lang] = (languageDistribution[lang] || 0) + s.duration;
  });

  Object.keys(languageDistribution).forEach((lang) => {
    languageDistribution[lang] = languageDistribution[lang] / (1000 * 60 * 60);
  });

  /* ––––– PROJECT USAGE ––––– */

  const projectUsage: Record<string, number> = {};

  sessions.forEach((s: any) => {
    const project = s.project || "unknown";
    projectUsage[project] = (projectUsage[project] || 0) + s.duration;
  });

  Object.keys(projectUsage).forEach((p) => {
    projectUsage[p] = projectUsage[p] / (1000 * 60 * 60);
  });

  /* ––––– PEAK CODING HOURS ––––– */

  const peakCodingHours: Record<number, number> = {};

  sessions.forEach((s: any) => {
    const date = new Date(s.startTime);
    const hour = date.getHours();
    peakCodingHours[hour] = (peakCodingHours[hour] || 0) + s.duration;
  });

  Object.keys(peakCodingHours).forEach((h) => {
    peakCodingHours[Number(h)] = peakCodingHours[Number(h)] / (1000 * 60 * 60);
  });

  /* ––––– STREAK CALCULATION ––––– */

  const days = new Set();

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
    const date = new Date(day as string);
    const diff = (current.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 0 || diff === 1) {
      streak++;
      current = date;
    } else {
      break;
    }
  }

  try {
    return Response.json({
      todayHours: Number(todayHours.toFixed(2)),
      weekHours: Number(weekHours.toFixed(2)),
      monthHours: Number(monthHours.toFixed(2)),
      languageDistribution,
      projectUsage,
      peakCodingHours,
      streak,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
