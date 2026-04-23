import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TasksList from "@/components/TaskList";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signup");
  }
  const userId = session.user.id; 

  const res = await fetch(`http://localhost:3000/api/tasks?userId=${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("API ERROR");
    return <p>Failed to load tasks</p>;
  }

  const data = await res.json();

  console.log("TASK API RESPONSE:", data); 

  const tasks = Array.isArray(data) ? data : []; 

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <TasksList tasks={tasks} />
    </div>
  );
}
