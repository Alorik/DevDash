"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<"title" | "desc" | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      setTitle("");
      setDescription("");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !!title.trim() && !loading;


  const fieldStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
    border: `1px solid ${active ? "rgba(251,146,60,0.4)" : "rgba(180,170,200,0.2)"}`,
    boxShadow: active
      ? "0 0 0 3px rgba(251,146,60,0.08), inset 0 1px 2px rgba(255,255,255,0.9)"
      : "inset 0 1px 2px rgba(255,255,255,0.7)",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
    outline: "none",
    borderRadius: "10px",
  });

const glassStyle = {
  background: "rgba(255, 255, 255, 0.22)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  borderRadius: "1.3rem",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(0,0,0,0.04)",
};

  // Border perimeter animation
  // Card is ~320px wide, ~~380px tall → perimeter ≈ 1400px
  // We draw an SVG rect that traces the border
  const R = 20; // border-radius matches rounded-[20px]

  return (
    <div className="relative w-[320px]" style={glassStyle}>
      {/* ── Animated corner-tracing line ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ borderRadius: R }}
        overflow="visible"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={R - 1}
          ry={R - 1}
          fill="none"
          stroke="rgba(251,146,60,0.18)"
          strokeWidth="1"
        />
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={R - 1}
          ry={R - 1}
          fill="none"
          stroke="rgb(251,146,60)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="60 9999"
          strokeDashoffset="0"
        >
          <animateTransform attributeName="" type="" />
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-1400"
            dur="3s"
            repeatCount="indefinite"
            calcMode="linear"
          />
          <animate
            attributeName="stroke-opacity"
            values="0;1;1;0"
            keyTimes="0;0.05;0.85;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* ── Card ── */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
        }}
        className="relative overflow-hidden w-full"
      >
        {/* Top specular */}
        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        <div className="p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[10px] uppercase tracking-[0.18em] font-medium"
              style={{
                color: "#fb923c",
                fontFamily: "'DM Mono', 'Fira Mono', monospace",
              }}
            >
              New Project
            </span>
            <h2
              className="text-[1rem] font-bold tracking-tight"
              style={{
                color: "rgba(40,30,30,0.85)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Create a project
            </h2>
            <p
              className="text-[11px] leading-relaxed mt-0.5"
              style={{
                color: "rgba(80,70,80,0.42)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Name it and optionally describe its scope.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-black/5 to-transparent" />

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] uppercase tracking-[0.13em] font-medium"
                style={{
                  color: "rgba(80,70,80,0.42)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Title <span style={{ color: "rgba(251,146,60,0.7)" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Q4 Revenue Analysis"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
                className="w-full px-3 py-2 text-sm"
                style={{
                  ...fieldStyle(focused === "title"),
                  color: "rgba(40,30,30,0.82)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              />
              <style>{`input::placeholder,textarea::placeholder{color:rgba(120,110,130,0.32);}`}</style>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] uppercase tracking-[0.13em] font-medium"
                style={{
                  color: "rgba(80,70,80,0.42)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Description{" "}
                <span
                  style={{
                    color: "rgba(80,70,80,0.26)",
                    fontSize: "10px",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  optional
                </span>
              </label>
              <textarea
                placeholder="Briefly describe the project's purpose..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setFocused("desc")}
                onBlur={() => setFocused(null)}
                rows={2}
                className="w-full px-3 py-2 text-sm resize-none"
                style={{
                  ...fieldStyle(focused === "desc"),
                  color: "rgba(40,30,30,0.72)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  lineHeight: "1.55",
                }}
              />
              <AnimatePresence>
                {description.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-right"
                    style={{
                      color: "rgba(80,70,80,0.28)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                    }}
                  >
                    {description.length} chars
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            className="relative w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase overflow-hidden"
            style={{
              borderRadius: "10px",
              background: canSubmit
                ? "rgba(251,146,60,0.1)"
                : "rgba(0,0,0,0.03)",
              border: canSubmit
                ? "1px solid rgba(251,146,60,0.28)"
                : "1px solid rgba(0,0,0,0.06)",
              color: canSubmit ? "#fb923c" : "rgba(80,70,80,0.22)",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontFamily: "'DM Mono', monospace",
              boxShadow: canSubmit
                ? "inset 0 1px 0 rgba(255,255,255,0.6)"
                : "none",
              transition: "all 0.2s ease",
            }}
          >
            {canSubmit && (
              <motion.span
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
              />
            )}

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full block"
                      style={{ background: "#fb923c" }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.18,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.span>
              ) : (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 relative z-10"
                >
                  ▶ Create Project
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Bottom specular */}
        <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-black/4 to-transparent pointer-events-none" />
      </motion.form>
    </div>
  );
}
