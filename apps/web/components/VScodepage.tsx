"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      <div className="absolute top-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent pointer-events-none z-10" />
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

export default function VSCodePage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vscode/track")
      .then((r) => r.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const sortedSessions = [...sessions].sort(
    (a, b) => b.startTime - a.startTime,
  );

  // Aggregate some quick stats from sessions
  const totalSessions = sessions.length;
  const totalMins = Math.round(
    sessions.reduce((sum, s) => sum + s.duration, 0) / (1000 * 60),
  );
  const uniqueProjects = new Set(sessions.map((s) => s.project).filter(Boolean))
    .size;
  const uniqueLangs = new Set(sessions.map((s) => s.language).filter(Boolean))
    .size;

  const quickStats = [
    {
      label: "Total Sessions",
      value: loading ? "—" : `${totalSessions}`,
      unit: "sessions",
    },
    {
      label: "Total Time",
      value: loading ? "—" : `${(totalMins / 60).toFixed(1)}`,
      unit: "hrs",
    },
    {
      label: "Projects",
      value: loading ? "—" : `${uniqueProjects}`,
      unit: "active",
    },
    {
      label: "Languages",
      value: loading ? "—" : `${uniqueLangs}`,
      unit: "used",
    },
  ];

  return (
    <div className="space-y-6 px-4">
      {/* ── Recent Sessions (full table) ── */}
      <GlassCard delay={0.38}>
        <div className="flex items-center justify-between mb-4">
          <Label>Recent Sessions</Label>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 animate-pulse"
              >
                <div className="flex flex-col gap-1.5">
                  <div
                    className="h-3 w-32 rounded-full"
                    style={{ background: "rgba(0,0,0,0.08)" }}
                  />
                  <div
                    className="h-2.5 w-48 rounded-full"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                  />
                </div>
                <div
                  className="h-5 w-10 rounded-full"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                />
              </div>
            ))}
          </div>
        ) : sortedSessions.length === 0 ? (
          <p
            className="text-sm font-mono mt-3 animate-pulse"
            style={{ color: "rgba(30,20,20,0.28)" }}
          >
            No sessions yet...
          </p>
        ) : (
          <>
            {/* Table header */}
            <div
              className="grid pb-2 mb-1"
              style={{
                gridTemplateColumns: "2fr 1.5fr 2fr 1fr",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {["Project", "Language", "Date & Time", "Duration"].map((h) => (
                <span
                  key={h}
                  className="text-[9px] font-mono uppercase tracking-widest font-bold px-3 first:pl-0"
                  style={{ color: "rgba(30,20,20,0.3)" }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="max-h-[420px] overflow-y-auto space-y-0 pr-0.5">
              {sortedSessions.map((s, i) => {
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
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.02, duration: 0.28 }}
                    className="grid py-2.5 items-center"
                    style={{
                      gridTemplateColumns: "2fr 1.5fr 2fr 1fr",
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <span
                      className="text-[12px] font-mono font-bold truncate px-3 first:pl-0 pl-0"
                      style={{ color: "rgba(30,20,20,0.75)" }}
                    >
                      {s.project || "unknown"}
                    </span>
                    <span
                      className="text-[11px] font-mono truncate px-3"
                      style={{ color: "rgba(30,20,20,0.5)" }}
                    >
                      {s.language || "—"}
                    </span>
                    <span
                      className="text-[10px] font-mono px-3"
                      style={{ color: "rgba(30,20,20,0.38)" }}
                    >
                      {date} · {time}
                    </span>
                    <span
                      className="text-[11px] font-mono font-black w-fit px-2.5 py-0.5 rounded-full"
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
          </>
        )}
      </GlassCard>
    </div>
  );
}
