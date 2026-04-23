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

  const fieldStyle = (active: boolean) => ({
    background: active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)",
    border: `0.5px solid ${active ? "rgba(99,102,241,0.35)" : "rgba(100,100,140,0.15)"}`,
    boxShadow: active
      ? "0 0 0 3px rgba(99,102,241,0.08), inset 0 1px 2px rgba(255,255,255,0.8)"
      : "inset 0 1px 2px rgba(255,255,255,0.6)",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 100%)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        border: "0.5px solid rgba(255,255,255,0.75)",
        boxShadow:
          "0 0 0 0.5px rgba(180,180,220,0.2), 0 16px 48px rgba(100,100,160,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* Top specular */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      <div className="p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)",
                border: "0.5px solid rgba(99,102,241,0.25)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1v8M1 5h8"
                  stroke="rgba(99,102,241,0.8)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="text-[11px] uppercase tracking-[0.18em] font-medium"
              style={{
                color: "rgba(99,102,241,0.6)",
                fontFamily: "'DM Mono', 'Fira Mono', monospace",
              }}
            >
              New Project
            </span>
          </div>
          <h2
            className="text-lg font-semibold tracking-tight mt-1"
            style={{ color: "rgba(30,28,50,0.85)" }}
          >
            Create a project
          </h2>
          <p
            className="text-[12px] leading-relaxed"
            style={{
              color: "rgba(60,58,90,0.45)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Name your project and optionally describe its scope.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[10px] uppercase tracking-[0.14em] font-medium"
              style={{
                color: "rgba(60,58,90,0.4)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Title <span style={{ color: "rgba(220,80,80,0.6)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Q4 Revenue Analysis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setFocused("title")}
              onBlur={() => setFocused(null)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{
                ...fieldStyle(focused === "title"),
                color: "rgba(30,28,50,0.85)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
              }}
            />
            <style>{`input::placeholder { color: rgba(80,78,110,0.3); }`}</style>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[10px] uppercase tracking-[0.14em] font-medium"
              style={{
                color: "rgba(60,58,90,0.4)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Description{" "}
              <span
                style={{
                  color: "rgba(60,58,90,0.25)",
                  fontFamily: "'DM Mono', monospace",
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
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{
                ...fieldStyle(focused === "desc"),
                color: "rgba(30,28,50,0.75)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            />
            <AnimatePresence>
              {description.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="text-right text-[10px]"
                  style={{
                    color: "rgba(60,58,90,0.3)",
                    fontFamily: "'DM Mono', monospace",
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
          className="relative w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium tracking-widest uppercase overflow-hidden"
          style={{
            background: canSubmit
              ? "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 100%)"
              : "rgba(0,0,0,0.04)",
            border: canSubmit
              ? "0.5px solid rgba(99,102,241,0.3)"
              : "0.5px solid rgba(0,0,0,0.07)",
            color: canSubmit ? "rgba(79,70,229,0.9)" : "rgba(60,58,90,0.25)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            fontFamily: "'DM Mono', monospace",
            boxShadow: canSubmit
              ? "inset 0 1px 0 rgba(255,255,255,0.5)"
              : "none",
            transition: "all 0.2s ease",
          }}
        >
          {canSubmit && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
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
                    style={{ background: "rgba(99,102,241,0.6)" }}
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
                className="flex items-center gap-2 relative z-10"
              >
                Create Project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h8M6 2l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent pointer-events-none" />
    </motion.form>
  );
}
