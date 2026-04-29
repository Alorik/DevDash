"use client";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserCard() {
  const { data: session, status } = useSession();

  const glassCard = `
    relative overflow-hidden
    rounded-[2rem]
    border border-white/40
  `;

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.22)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(0,0,0,0.04)",
  };

  if (status === "loading") {
    return (
      <div className={`w-72 p-6 animate-pulse ${glassCard}`} style={glassStyle}>
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-full shrink-0 bg-white/40" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 rounded-full w-3/4 bg-white/30" />
            <div className="h-3 rounded-full w-1/2 bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className={`w-72 p-6 ${glassCard}`} style={glassStyle}>
        <p className="text-[11px] text-rose-500 font-mono tracking-tighter uppercase font-black">
          // Session Terminated
        </p>
      </div>
    );
  }

  const { name, image } = session.user;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`w-72 ${glassCard} flex items-center`}
      style={glassStyle}
    >
      {/* Top specular edge */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

      {/* Bottom subtle shadow line */}
      <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-black/10 to-transparent pointer-events-none z-10" />

      {/* Refractive light sweep */}
      <motion.div
        animate={{ x: ["-200%", "350%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
        className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div className="p-6 flex items-center gap-4 relative z-20">
        {/* Avatar */}
        <div className="relative shrink-0">
          {/* Rotating conic ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-0.75 rounded-full z-0"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(251,113,133,0.9), rgba(251,191,36,0.8), rgba(249,115,22,0.7), rgba(244,63,94,0.85), rgba(251,113,133,0.9))",
            }}
          />

          {/* Soft glow */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1.5 rounded-full z-0 opacity-40"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(251,113,133,0.5), rgba(251,191,36,0.4), rgba(249,115,22,0.4), rgba(251,113,133,0.5))",
              filter: "blur(6px)",
            }}
          />

          {/* Avatar image or initials */}
          {image ? (
            <img
              src={image}
              alt={name ?? "user"}
              className="w-18 h-18 rounded-full object-cover relative z-10 border-2 border-white/50 shadow-lg"
            />
          ) : (
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center font-black text-lg relative z-10 border-2 border-white/50 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,113,133,0.25), rgba(251,191,36,0.15))",
                backdropFilter: "blur(10px)",
                color: "rgba(80,35,35,0.85)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.5), 0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              {name ? initials(name) : "?"}
            </div>
          )}

          {/* Status dot */}
          <span
            className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full z-20"
            style={{
              background: "#4ade80",
              border: "2px solid rgba(255,255,255,0.9)",
              boxShadow: "0 0 6px rgba(74,222,128,0.6)",
            }}
          />
          {/* Pulse halo */}
          <motion.span
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full z-10"
            style={{ background: "rgba(74,222,128,0.35)" }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <h2
            className="text-[1.05rem] font-black tracking-tight truncate"
            style={{ color: "rgba(30,20,20,0.85)" }}
          >
            {name ?? "Anonymous"}
          </h2>
          <p
            className="text-[11px] font-mono font-medium"
            style={{ color: "rgba(30,20,20,0.4)" }}
          >
            Online
          </p>
        </div>
      </div>
    </motion.div>
  );
}
