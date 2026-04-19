"use client";

import { useSession } from "next-auth/react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserCard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-72 bg-[#161b22] border border-[#21262d] rounded-2xl p-5 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#21262d]" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 bg-[#21262d] rounded w-3/4" />
            <div className="h-2.5 bg-[#21262d] rounded w-1/2" />
          </div>
        </div>
        <div className="h-2.5 bg-[#21262d] rounded w-full mb-2" />
        <div className="h-2.5 bg-[#21262d] rounded w-2/3" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="w-72 bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
        <p className="text-[13px] text-red-400 font-mono">
          // not authenticated
        </p>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="w-72 bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
      {/* Top accent bar */}

      <div className="p-5">
        {/* Greeting + date */}
        <div className="mb-4">
          <p className="font-mono text-[10px] text-[#484f58] uppercase tracking-[0.18em] mb-1">
            {getGreeting()}
          </p>
          <p className="font-mono text-[11px] text-[#8b949e]">{getDate()}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#21262d] mb-4" />

        {/* User info */}
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <div className="relative shrink-0">
            {image ? (
              <img
                src={image}
                alt={name ?? "user"}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#21262d]"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#1a2e1a] ring-2 ring-[#21262d] flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                {name ? initials(name) : "?"}
              </div>
            )}
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#161b22]" />
          </div>

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-[#e6edf3] leading-tight truncate tracking-tight">
              {name ?? "Unknown"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
