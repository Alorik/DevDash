
import Sidebar from "@/components/dashboard/Sidebar";
import { Moon, RefreshCw, Bell, Globe } from "lucide-react";

import SalesOverview from "@/components/dashboard/SalesOverview";
import RightPanel from "@/components/dashboard/RightPanel";
import BottomSection from "@/components/dashboard/BottomSection";
import StatCards from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0d1117] text-[#e6edf3] overflow-hidden">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-[#0d1117] border-b border-[#21262d] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[12px] text-[#484f58]">
            <span>Dashboards</span>
            <span>/</span>
            <span className="text-[#e6edf3]">Overview</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center hover:border-[#30363d] transition-colors">
              <Moon size={13} className="text-[#8b949e]" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center hover:border-[#30363d] transition-colors">
              <RefreshCw size={13} className="text-[#8b949e]" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center hover:border-[#30363d] transition-colors">
              <Bell size={13} className="text-[#8b949e]" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center hover:border-[#30363d] transition-colors">
              <Globe size={13} className="text-[#8b949e]" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold text-[#e6edf3]">Overview</h1>
            <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-1.5 text-[12px] text-[#8b949e] cursor-pointer hover:border-[#30363d] transition-colors">
              Today
              <svg
                className="w-3 h-3 ml-0.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </div>
          </div>

          <StatCards />
          <SalesOverview />
          <BottomSection />
        </div>
      </main>

      <RightPanel />
    </div>
  );
}
