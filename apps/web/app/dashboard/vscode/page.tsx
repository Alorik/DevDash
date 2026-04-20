"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stats = {
  todayHours: number;
  weekHours: number;
  monthHours: number;
  streak: number;
  projectUsage: Record<string, number>;
};

type Session = {
  _id: string;
  project: string;
  language: string;
  duration: number;
  startTime: number;
};

const glassStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.22)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(0,0,0,0.04)",
};


function GlassCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/40 ${className}`}
      style={glassStyle}
    >

      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />
      <motion.div
        animate={{ x: ["-200%", "350%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2 + delay * 5,
        }}
        className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />
      <div className="p-5 relative z-20">{children}</div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-mono uppercase tracking-widest mb-4 font-semibold"
      style={{ color: "rgba(30,20,20,0.4)" }}
    >
      {children}
    </p>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch("/api/vscode/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);

    fetch("/api/vscode/track")
      .then((r) => r.json())
      .then(setSessions)
      .catch(console.error);
  }, []);

  const statCards = [
    {
      label: "Today",
      value: stats ? `${stats.todayHours.toFixed(2)} hrs` : "—",
    },
    {
      label: "This Week",
      value: stats ? `${stats.weekHours.toFixed(2)} hrs` : "—",
    },
    {
      label: "This Month",
      value: stats ? `${stats.monthHours.toFixed(2)} hrs` : "—",
    },
    { label: "Streak ", value: stats ? `${stats.streak} days` : "—" },
  ];

  const projectEntries = stats?.projectUsage
    ? Object.entries(stats.projectUsage).sort((a, b) => b[1] - a[1])
    : [];

  const maxHours = projectEntries[0]?.[1] ?? 1;

  const sortedSessions = [...sessions].sort(
    (a, b) => b.startTime - a.startTime,
  );

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <GlassCard
            key={card.label}
            delay={i * 0.08}
          >
            <p
              className="text-[11px] font-mono uppercase tracking-widest mb-2 font-semibold"
              style={{ color: "rgba(30,20,20,0.4)" }}
            >
              {card.label}
            </p>
            <p
              className="text-2xl font-black tracking-tight"
              style={{ color: "rgba(30,20,20,0.82)" }}
            >
              {card.value}
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ── Project Usage ── */}
        <GlassCard
          delay={0.35}
        >
          <SectionLabel>Project Usage</SectionLabel>
          {projectEntries.length === 0 ? (
            <p
              className="text-sm font-mono animate-pulse"
              style={{ color: "rgba(30,20,20,0.3)" }}
            >
              No data yet...
            </p>
          ) : (
            <div className="space-y-3">
              {projectEntries.map(([project, hours], i) => {
                const pct = (hours / maxHours) * 100;
                return (
                  <motion.div
                    key={project}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[12px] font-mono font-semibold truncate max-w-[60%]"
                        style={{ color: "rgba(30,20,20,0.72)" }}
                      >
                        {project}
                      </span>
                      <span
                        className="text-[11px] font-mono"
                        style={{ color: "rgba(30,20,20,0.45)" }}
                      >
                        {hours.toFixed(2)} hrs
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{ background: "rgba(0,0,0,0.07)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          delay: 0.45 + i * 0.06,
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        style={{
                          background: `linear-gradient(to right, `,
                          boxShadow: `0 0 8px `,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* ── Recent Sessions ── */}
        <GlassCard
          delay={0.4}
        >
          <SectionLabel>Recent Sessions</SectionLabel>
          {sortedSessions.length === 0 ? (
            <p
              className="text-sm font-mono animate-pulse"
              style={{ color: "rgba(30,20,20,0.3)" }}
            >
              No sessions yet...
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {sortedSessions.slice(0, 20).map((s, i) => {
                const mins = Math.round(s.duration / (1000 * 60));
                const date = new Date(s.startTime).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                const time = new Date(s.startTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                return (
                  <motion.div
                    key={s._id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.42 + i * 0.04, duration: 0.35 }}
                    className="flex items-center justify-between py-2 border-b border-black/[0.05] last:border-0"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-[12px] font-mono font-semibold truncate"
                        style={{ color: "rgba(30,20,20,0.75)" }}
                      >
                        {s.project || "unknown"}
                      </span>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "rgba(30,20,20,0.38)" }}
                      >
                        {s.language || "—"} · {date} {time}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-mono font-bold ml-3 flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.12)",
                        color: "rgba(180,70,0,0.85)",
                      }}
                    >
                      {mins}m
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
