"use client";

import { useEffect, useState } from "react";

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function getDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function TimeCard() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [timePart, meridiem] = time.split(" ");

  return (
    <div className="w-72 bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
      <div className="h-[3px] bg-gradient-to-r from-lime-400 via-emerald-400 to-transparent" />
      <div className="p-5">
        <p className="font-mono text-[10px] text-[#484f58] uppercase tracking-[0.18em] mb-3">
          {getGreeting()}
        </p>
        <div className="flex items-end gap-2 leading-none mb-1">
          <span className="font-mono text-[52px] font-bold text-[#e6edf3] tracking-tighter leading-none">
            {timePart}
          </span>
          <span className="font-mono text-[18px] font-medium text-lime-400 mb-2 tracking-widest uppercase">
            {meridiem}
          </span>
        </div>
        <p className="font-mono text-[11px] text-[#8b949e] mt-2">{getDate()}</p>
      </div>
    </div>
  );
}
