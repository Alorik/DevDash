"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.22)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(0,0,0,0.04)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-72 rounded-[2rem] border border-white/40 overflow-hidden relative"
      style={glassStyle}
    >
      {/* Top specular edge */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

      {/* Bottom shadow line */}
      <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-10" />

      {/* Light sweep */}
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

      <div className="p-5 relative z-20">
        {/* Time */}
        <div className="flex items-end gap-2 leading-none mb-1">
          <motion.span
            key={timePart}
            initial={{ opacity: 0.6, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[52px] font-bold tracking-tighter leading-none"
            style={{ color: "rgba(30,20,20,0.85)" }}
          >
            {timePart}
          </motion.span>
          <span
            className="font-mono text-[18px] font-semibold mb-2 tracking-widest uppercase"
            style={{ color: "rgba(249,115,22,0.85)" }}
          >
            {meridiem}
          </span>
        </div>

        {/* Date */}
        <p
          className="font-mono text-[11px] mt-2 font-medium"
          style={{ color: "rgba(30,20,20,0.5)" }}
        >
          {getDate()}
        </p>
      </div>
    </motion.div>
  );
}
