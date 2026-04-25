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
    border: `1px solid ${active ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.45)"}`,
    boxShadow: active
      ? "0 0 0 3px rgba(249,115,22,0.08), inset 0 1px 2px rgba(255,255,255,0.9)"
      : "inset 0 1px 2px rgba(255,255,255,0.7)",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
    outline: "none",
    borderRadius: "10px",
  });

  const glassStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(32px) saturate(200%)",
    WebkitBackdropFilter: "blur(32px) saturate(200%)",
    borderRadius: "1.75rem",
    boxShadow:
      "0 8px 40px rgba(0,0,0,0.1), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1px 1px rgba(0,0,0,0.05)",
    border: "1px solid rgba(255,255,255,0.45)",
  };

  const R = 20;

  return (
    <div className="relative w-[320px]" style={glassStyle}>
      {/* ── Animated border trace ── */}
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
          stroke="rgba(249,115,22,0.18)"
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
          stroke="rgba(249,115,22,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="60 9999"
          strokeDashoffset="0"
        >
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
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        }}
        className="relative overflow-hidden w-full"
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
            repeatDelay: 6,
          }}
          className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <div className="p-5 flex flex-col gap-4 relative z-20">
          {/* Header */}
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[10px] uppercase tracking-[0.18em] font-semibold"
              style={{
                color: "rgba(249,115,22,0.85)",
                fontFamily: "'DM Mono', 'Fira Mono', monospace",
              }}
            >
              New Project
            </span>
            <h2
              className="text-[1rem] font-bold tracking-tight"
              style={{
                color: "rgba(30,20,20,0.85)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Create a project
            </h2>
            <p
              className="text-[11px] leading-relaxed mt-0.5"
              style={{
                color: "rgba(30,20,20,0.38)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Name it and optionally describe its scope.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "rgba(0,0,0,0.05)" }} />

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] uppercase tracking-[0.13em] font-semibold"
                style={{
                  color: "rgba(30,20,20,0.38)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Title <span style={{ color: "rgba(249,115,22,0.7)" }}>*</span>
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
                  color: "rgba(30,20,20,0.82)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              />
              <style>{`input::placeholder, textarea::placeholder { color: rgba(30,20,20,0.25); }`}</style>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] uppercase tracking-[0.13em] font-semibold"
                style={{
                  color: "rgba(30,20,20,0.38)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Description{" "}
                <span
                  style={{
                    color: "rgba(30,20,20,0.25)",
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
                  color: "rgba(30,20,20,0.72)",
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
                      color: "rgba(30,20,20,0.28)",
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
            className="relative w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase overflow-hidden"
            style={{
              borderRadius: "10px",
              background: canSubmit
                ? "rgba(249,115,22,0.1)"
                : "rgba(0,0,0,0.03)",
              border: canSubmit
                ? "1px solid rgba(249,115,22,0.25)"
                : "1px solid rgba(255,255,255,0.45)",
              color: canSubmit ? "rgba(249,115,22,0.9)" : "rgba(30,20,20,0.22)",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontFamily: "'DM Mono', monospace",
              boxShadow: canSubmit
                ? "inset 0 1px 0 rgba(255,255,255,0.6)"
                : "none",
              transition: "all 0.2s ease",
            }}
          >
            {/* Button shimmer on hover */}
            {canSubmit && (
              <motion.span
                className="absolute inset-0 -skew-x-12 pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
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
                      style={{ background: "rgba(249,115,22,0.85)" }}
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
      </motion.form>
    </div>
  );
}
