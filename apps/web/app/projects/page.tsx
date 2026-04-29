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

  const glassStyle: React.CSSProperties = {
    background: "rgba(255,225,225,0.52)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.72)",
    boxShadow:
      "0 4px 24px rgba(160,140,180,0.08), inset 0 1.5px 1px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.03)",
  };

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
      className="p-6 space-y-6 min-h-screen"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold   text-[#fb923c]">Projects</h1>
      </div>

      {/* 🔥 Create Project Form */}
      <CreateProjectForm />

      {/* Projects List */}
      <ProjectsList projects={formattedProjects} />
    </div>
  );
}
