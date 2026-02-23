import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("VSCode Activity:", body);
  return Response.json({ success: true });
}
