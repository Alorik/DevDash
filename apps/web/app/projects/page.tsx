import CreateProjectForm from "@/components/ProjectForm";
import ProjectsList from "@/components/ProjectList";
import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db/mongodb";
import Project from "@/models/Project";
import { getServerSession } from "next-auth/next";
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
    <div
      style={{
        background: `
          radial-gradient(ellipse at 15% 25%, rgba(200, 195, 215, 0.95) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 75%, rgba(175, 185, 205, 0.9) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 10%, rgba(225, 218, 230, 0.8) 0%, transparent 45%),
          radial-gradient(ellipse at 30% 80%, rgba(190, 200, 220, 0.7) 0%, transparent 40%),
          radial-gradient(ellipse at 90% 20%, rgba(210, 205, 225, 0.75) 0%, transparent 40%),
          #bfc5d3
        `,
      }}
      className="min-h-screen p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-black font-mono tracking-tight"
          style={{ color: "rgba(30,20,20,0.85)" }}
        >
          Projects
        </h1>
      </div>

      {/* Main layout: form left, list right */}
      <div className="flex gap-6 items-start">
        {/* Left — Create form (fixed width) */}
        <div className="flex-shrink-0">
          <CreateProjectForm />
        </div>

        {/* Right — Projects grid (2 per row) */}
        <div className="flex-1 min-w-0">
          <ProjectsList projects={formattedProjects} />
        </div>
      </div>
    </div>
  );
}
