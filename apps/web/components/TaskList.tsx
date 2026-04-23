"use client";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function TasksList({ tasks = [] }: { tasks?: Task[] }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found</p>;
  }

  return (
    <div className="space-y-4 bg-transparent">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 border rounded-lg flex justify-between"
        >
          <span>{task.title}</span>
          <span>{task.completed ? "✅" : "⏳"}</span>
        </div>
      ))}
    </div>
  );
}
