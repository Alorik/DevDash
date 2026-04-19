"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  MessageSquare,
  Star,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Analytics", icon: BarChart2 },
  { label: "Customers", icon: Users },
];

const settingsItems = [
  { label: "Messages", icon: MessageSquare },
  { label: "Customer Reviews", icon: Star },
  { label: "Settings", icon: Settings },
  { label: "Help Centre", icon: HelpCircle },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="w-52 min-w-52 bg-[#161b22] border-r border-[#21262d] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#21262d]">
        <span className="font-mono text-lg font-normal text-[#e6edf3] tracking-tight">
          Dev<span className="font-bold text-emerald-400">Dash</span>
        </span>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-[#21262d]">
        <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 cursor-pointer">
          <svg
            className="w-3 h-3 text-[#484f58]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="6" cy="6" r="4" />
            <path d="M10 10l4 4" />
          </svg>
          <span className="text-[11px] text-[#484f58] flex-1">Search...</span>
          <span className="text-[10px] text-[#484f58] bg-[#21262d] px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>
      </div>

      {/* Dashboards */}
      <div className="py-2">
        <p className="px-4 py-1.5 text-[10px] text-[#484f58] uppercase tracking-widest font-medium">
          Dashboards
        </p>
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all duration-150 ${
              active === label
                ? "bg-emerald-400 text-[#0d1117] font-semibold"
                : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
            }`}
          >
            <Icon size={14} />
            {label}
            {label !== "Overview" && (
              <ChevronRight size={12} className="ml-auto opacity-50" />
            )}
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="py-2">
        <p className="px-4 py-1.5 text-[10px] text-[#484f58] uppercase tracking-widest font-medium">
          Settings
        </p>
        {settingsItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all duration-150 ${
              active === label
                ? "bg-emerald-400 text-[#0d1117] font-semibold"
                : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* User */}
      <div className="mt-auto border-t border-[#21262d] px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#1a2e1a] flex items-center justify-center text-[10px] font-bold text-emerald-400">
            GH
          </div>
          <div>
            <p className="text-[12px] text-[#e6edf3] font-medium leading-none">
              Guy Hawkins
            </p>
            <p className="text-[10px] text-[#484f58] mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
