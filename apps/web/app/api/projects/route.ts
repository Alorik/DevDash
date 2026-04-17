import { connectDb } from "@/lib/db/mongodb";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    const { title, description, userId } = body;

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Title and userId required" },
        { status: 400 },
      );
    }

    const project = await Project.create({
      title,
      description,
      userId,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to create the project" },
      { status: 500 },
    );
  }
}
