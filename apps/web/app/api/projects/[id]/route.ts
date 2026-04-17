import { connectDb } from "@/lib/db/mongodb";
import Entry from "@/models/ProjectEntry";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const body = await req.json();
    const { id } = body;

    const entry = await Entry.findById(id);

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    entry.completed = !entry.completed;
    entry.completedAt = entry.completed ? new Date() : null;

    await entry.save();

    return NextResponse.json(entry);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update entry" },

      { status: 500 },
    );
  }
}
