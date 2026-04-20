import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db/mongodb";
import Project from "@/models/Project";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    console.log("SESSION DEBUG:", JSON.stringify(session, null, 2));

       if (!session?.user?.id) {
         return NextResponse.json(
           { error: "Unauthorized" },

           { status: 401 },
         );
       }
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title and userId required" },
        { status: 400 },
      );
    }

    const project = await Project.create({
      title,
      description,
      userId: session.user.id,
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
