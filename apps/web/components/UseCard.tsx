"use client";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

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
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserCard() {
  const { data: session, status } = useSession();

  // Glass base styles
  const glassBase = `
    relative overflow-hidden
    bg-white/[0.03] backdrop-blur-[40px] saturate-[180%]
    border border-white/[0.12] 
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.1)]
  `;

  if (status === "loading") {
    return (
      <div className={`w-72 rounded-[2.5rem] p-8 animate-pulse ${glassBase}`}>
        <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-white/10" />
        <div className="h-4 rounded-full w-1/2 mx-auto mb-3 bg-white/10" />
        <div className="h-3 rounded-full w-2/3 mx-auto bg-white/5" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className={`w-72 rounded-[2.5rem] p-8 ${glassBase}`}>
        <p className="text-[11px] text-rose-400 font-mono tracking-tighter uppercase font-black">
          // Session Terminated
        </p>
      </div>
    );
  }

  const { name, image } = session.user;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-72 rounded-[2.5rem] ${glassBase}`}
    >
      {/* Refractive Light Sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12"
      />

      <div className="p-8 flex flex-col items-center text-center relative z-10">
        {/* Avatar with Floating Ring */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-rose-500/20 blur-xl animate-pulse" />
          {image ? (
            <img
              src={image}
              alt={name ?? "user"}
              className="w-24 h-24 rounded-full object-cover relative z-10 p-1 bg-white/[0.08] border border-white/20 shadow-2xl"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-2xl text-white relative z-10 bg-white/[0.08] border border-white/20 shadow-2xl">
              {name ? initials(name) : "?"}
            </div>
          )}

          {/* Status Glow */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-4 border-[#1e1e20] shadow-[0_0_12px_rgba(52,211,153,0.8)] z-20" />
        </div>

        {/* Identity Section */}
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-black text-white tracking-tighter leading-none">
            {name ?? "Anonymous"}
          </h2>
          <div className="flex flex-col gap-1 pt-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              {getGreeting()}
            </span>
            <span className="font-mono text-[10px] text-white/50 font-bold">
              {getDate()}
            </span>
          </div>
        </div>

        {/* Dynamic Glass Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* System Badge */}
        <div className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.08] transition-all hover:bg-white/[0.1] hover:border-white/20">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]"
          />
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
            Secure Session
          </span>
        </div>
      </div>
    </motion.div>
  );
}
