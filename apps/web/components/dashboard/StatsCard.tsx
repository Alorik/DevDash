"use client";

import { TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Net revenue",
    value: "$3,131,021",
    change: "+0.4% vs last month",
    up: true,
  },
  {
    label: "ARR",
    value: "$1,511,121",
    change: "+32% vs last quarter",
    up: true,
  },
  {
    label: "Quarterly revenue goal",
    value: "71%",
    change: "Goal: $1.1M",
    up: null,
  },
  {
    label: "New orders",
    value: "18,221",
    change: "+11% vs last quarter",
    up: true,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {stats.map(({ label, value, change, up }) => (
        <div
          key={label}
          className="bg-[#161b22] border border-[#21262d] rounded-xl p-4"
        >
          <p className="text-[11px] text-[#8b949e] mb-2">{label}</p>
          <p className="text-2xl font-bold text-[#e6edf3] mb-1.5 tracking-tight">
            {value}
          </p>
          <div
            className={`flex items-center gap-1 text-[11px] ${
              up === true
                ? "text-emerald-400"
                : up === false
                  ? "text-red-400"
                  : "text-[#8b949e]"
            }`}
          >
            {up === true && <TrendingUp size={11} />}
            {change}
          </div>
        </div>
      ))}
    </div>
  );
}
