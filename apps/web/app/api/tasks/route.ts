import { connectDb } from "@/lib/db/mongodb";
import { Task } from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { title, userId, description } = body;
    if (!title || !userId) {
      return NextResponse.json({ error: "Missing Fiels" }, { status: 400 });
    }
    const task = await Task.create({
      title,
      userId,
      description,
    });

    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const tasks = await Task.find({
      userId,
      $or: [{ deleted: false }, { deleted: { $exists: false } }],
    });

    return NextResponse.json(tasks);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "No tasks found" }, { status: 500 });
  }
}
