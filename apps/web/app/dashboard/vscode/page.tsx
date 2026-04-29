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
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.1), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1px 1px rgba(0,0,0,0.05)",
  border: "1px solid rgba(255,255,255,0.45)",
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
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative overflow-hidden rounded-[1.75rem] ${className}`}
      style={glassStyle}
    >
      {/* Top specular highlight */}
      <div className="absolute top-0 left-[6%] right-[6%] h-px bg-linear-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
      {/* Bottom shadow line */}
      <div className="absolute bottom-0 left-[6%] right-[6%] h-px bg-linear-to-r from-transparent via-black/8 to-transparent pointer-events-none z-10" />
      {/* Light sweep */}
      <motion.div
        animate={{ x: ["-200%", "350%"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3 + delay * 4,
        }}
        className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />
      <div className="p-5 relative z-20">{children}</div>
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-mono uppercase tracking-[0.16em] mb-1.5 font-semibold"
      style={{ color: "rgba(30,20,20,0.38)" }}
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
      value: stats ? `${stats.todayHours.toFixed(2)}` : "—",
      unit: "hrs",
    },
    {
      label: "This Week",
      value: stats ? `${stats.weekHours.toFixed(2)}` : "—",
      unit: "hrs",
    },
    {
      label: "This Month",
      value: stats ? `${stats.monthHours.toFixed(2)}` : "—",
      unit: "hrs",
    },
    {
      label: "Streak",
      value: stats ? `${stats.streak}` : "—",
      unit: "days ",
    },
  ];

  const projectEntries = stats?.projectUsage
    ? Object.entries(stats.projectUsage).sort((a, b) => b[1] - a[1])
    : [];

  const maxHours = projectEntries[0]?.[1] ?? 1;
  const sortedSessions = [...sessions].sort(
    (a, b) => b.startTime - a.startTime,
  );

  return (
    <div className="p-8 space-y-5 min-h-screen">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <GlassCard key={card.label} delay={i * 0.07}>
            <Label>{card.label}</Label>
            <div className="flex items-end gap-1.5 leading-none mt-2">
              <span
                className="text-[2rem] font-black tracking-tighter leading-none"
                style={{ color: "rgba(249,115,22,0.85)" }}
              >
                {card.value}
              </span>
              {card.value !== "—" && (
                <span
                  className="text-[12px] font-mono font-semibold mb-1"
                  style={{ color: "rgba(30,20,20,0.38)" }}
                >
                  {card.unit}
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ── Project Usage ── */}
        <GlassCard delay={0.3}>
          <Label>Project Usage</Label>
          {projectEntries.length === 0 ? (
            <p
              className="text-sm font-mono mt-3 animate-pulse"
              style={{ color: "rgba(30,20,20,0.28)" }}
            >
              No data yet...
            </p>
          ) : (
            <div className="space-y-3.5 mt-3">
              {projectEntries.map(([project, hours], i) => {
                const pct = (hours / maxHours) * 100;
                return (
                  <motion.div
                    key={project}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.055, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[12px] font-mono font-semibold truncate max-w-[65%]"
                        style={{ color: "rgba(30,20,20,0.7)" }}
                      >
                        {project}
                      </span>
                      <span
                        className="text-[11px] font-mono font-bold"
                        style={{ color: "rgba(249,115,22,0.85)" }}
                      >
                        {hours.toFixed(2)}h
                      </span>
                    </div>
                    {/* Bar track */}
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(0,0,0,0.07)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          delay: 0.4 + i * 0.055,
                          duration: 0.65,
                          ease: "easeOut",
                        }}
                        style={{
                          background: "rgba(249,115,22,0.55)",
                          boxShadow: "0 0 6px rgba(249,115,22,0.3)",
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
        <GlassCard delay={0.36}>
          <Label>Recent Sessions</Label>
          {sortedSessions.length === 0 ? (
            <p
              className="text-sm font-mono mt-3 animate-pulse"
              style={{ color: "rgba(30,20,20,0.28)" }}
            >
              No sessions yet...
            </p>
          ) : (
            <div className="space-y-0 mt-2 max-h-65 overflow-y-auto pr-0.5">
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
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.38 + i * 0.035, duration: 0.32 }}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-[12px] font-mono font-bold truncate"
                        style={{ color: "rgba(30,20,20,0.75)" }}
                      >
                        {s.project || "unknown"}
                      </span>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "rgba(30,20,20,0.36)" }}
                      >
                        {s.language || "—"} · {date} · {time}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-mono font-black ml-3 shrink-0 px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.1)",
                        color: "rgba(249,115,22,0.85)",
                        border: "1px solid rgba(249,115,22,0.2)",
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
