import ProjectsList from "@/components/ProjectList";
import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db/mongodb";
import Project from "@/models/Project";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Projects() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signup");
  }
    const userId = session.user.id;
    await connectDb();

    const projects = await Project.find({ userId }).lean();
    const formattedProjects = projects.map((p: any) => ({
      ...p,
      _id: p._id.toString(),
    }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>

      {/* Projects List */}

      <ProjectsList projects={formattedProjects} />
    </div>
  );
}
