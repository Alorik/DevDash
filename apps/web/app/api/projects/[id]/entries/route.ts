import { connectDb } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Entry from "@/models/ProjectEntry";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id: projectId } = await params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { text } = body;
    if (!text) {
      return NextResponse.json(
        { error: "Text and date are required" },
        { status: 400 },
      );
    }

    const entry = await Entry.create({
      projectId,
      text,
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
