"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, Folder, Activity } from "lucide-react";

const navItems = [
  {
    name: "Tasks",
    href: "/tasks",
    icon: ListTodo,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Folder,
  },
  {
    name: "Activity",
    href: "/activity",
    icon: Activity,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className=" w-64 bg-[#0f0f11] border-r border-white/10 p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-xl font-black text-white tracking-tight mb-10">
        DevsDash
      </h1>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
