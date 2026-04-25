"use client";

import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description?: string;
}

const glassStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.1), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1px 1px rgba(0,0,0,0.05)",
  border: "1px solid rgba(255,255,255,0.45)",
};

export default function ProjectsList({
  projects = [],
}: {
  projects?: Project[];
}) {
  if (projects.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-[11px] uppercase tracking-[0.16em] font-semibold animate-pulse"
        style={{ color: "rgba(30,20,20,0.28)" }}
      >
        No projects yet...
      </motion.p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, i) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.55,
            delay: i * 0.06,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-[1.75rem] cursor-pointer"
          style={glassStyle}
        >
          {/* Top shine line */}
          <div className="absolute top-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
          {/* Bottom line */}
          <div className="absolute bottom-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent pointer-events-none z-10" />
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ["-200%", "350%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3 + i * 1.5,
            }}
            className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />

          <div className="p-5 relative z-20 flex flex-col gap-3">
            {/* Label */}
            <span
              className="text-[10px] font-mono uppercase tracking-[0.16em] font-semibold"
              style={{ color: "rgba(249,115,22,0.85)" }}
            >
              Project
            </span>

            {/* Title */}
            <h2
              className="text-[13px] font-mono font-bold tracking-tight leading-snug"
              style={{ color: "rgba(30,20,20,0.85)" }}
            >
              {project.title}
            </h2>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(0,0,0,0.05)" }} />

            {/* Description */}
            <p
              className="text-[11px] font-mono leading-relaxed"
              style={{ color: "rgba(30,20,20,0.5)" }}
            >
              {project.description || "No description provided."}
            </p>

            {/* Footer pill */}
            <div className="flex items-center justify-end mt-1">
              <span
                className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  color: "rgba(249,115,22,0.85)",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                view →
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
