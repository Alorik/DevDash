import mongoose from "mongoose";
import { connectDb } from "@/lib/db/mongodb";
import { Task } from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const body = await req.json();
    const { id: taskId } = await params;

    const { title, completed } = body;
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(
      new mongoose.Types.ObjectId(taskId),
      updateData,
      { returnDocument: "after" },
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id: taskId } = await params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json({ error: "Invalid TaskId" }, { status: 400 });
    }

    const deleteTask = await Task.findByIdAndDelete(taskId);

    if (!deleteTask) {
      return NextResponse.json({ error: "Task is not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
