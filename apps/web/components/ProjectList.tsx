"use client";

interface Project {
  _id: string;
  title: string;
  description?: string;
}

export default function ProjectsList({
  projects = [],
}: {
  projects?: Project[];
}) {
  if (projects.length === 0) {
    return <p className="text-gray-500">No projects found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project._id}
          className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold mb-2">{project.title}</h2>

          <p className="text-sm text-gray-500">
            {project.description || "No description"}
          </p>
        </div>
      ))}
    </div>
  );
}
