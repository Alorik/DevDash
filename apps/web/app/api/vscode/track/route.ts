let sessions: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  sessions.push(body);

  console.log("📡 VSCode data received:", body);

  return Response.json({ success: true });
}

export async function GET() {
  return Response.json(sessions);
}
