"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, Folder, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Activity", href: "/activity", icon: Activity },
];

const glassStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.1), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1px 1px rgba(0,0,0,0.05)",
  border: "1px solid rgba(255,255,255,0.45)",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      className="w-64 p-5 flex flex-col  relative overflow-hidden rounded-[1.75rem]"
      style={glassStyle}
    >
      <div className="absolute top-0 left-[6%] right-[6%] h-px bg-linear-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-[6%] right-[6%] h-px bg-linear-to-r from-transparent via-black/6 to-transparent pointer-events-none z-10" />
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
      {/* Nav */}
      <nav className="flex flex-col relative z-20">
        <p
          className="text-[10px] font-mono uppercase tracking-[0.16em] mb-3 font-semibold px-1"
          style={{ color: "rgba(30,20,20,0.38)" }}
        >
          Navigation
        </p>

        <ol className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isDimmed = hoveredIndex !== null && index > hoveredIndex;

            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  filter: isDimmed ? "blur(1px)" : "blur(0px)",
                  x: 0,
                }}
                transition={{ delay: index * 0.08, duration: 0.25 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl relative overflow-hidden"
                  style={
                    isActive
                      ? {
                          background: "rgba(249,115,22,0.12)",
                          border: "1px solid rgba(249,115,22,0.25)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5)",
                        }
                      : { border: "1px solid transparent" }
                  }
                >
                  <Icon
                    size={16}
                    style={{
                      color: isActive
                        ? "rgba(249,115,22,0.85)"
                        : hoveredIndex === index
                          ? "rgba(249,115,22,0.7)"
                          : "rgba(30,20,20,0.4)",
                      transition: "color 0.2s",
                    }}
                  />

                  <span
                    className="font-mono text-[12px] font-bold tracking-wide transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "rgba(249,115,22,0.9)"
                        : hoveredIndex === index
                          ? "rgba(249,115,22,0.75)"
                          : "rgba(30,20,20,0.55)",
                    }}
                  >
                    {item.name}
                  </span>

                  {/* "go to →" hint text that appears on hover */}
                  <AnimatePresence>
                    {!isActive && hoveredIndex === index && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.18 }}
                        className="ml-auto font-mono text-[10px] font-semibold tracking-wide"
                        style={{ color: "rgba(249,115,22,0.6)" }}
                      >
                        go to →
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(249,115,22,0.7)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </motion.div>
  );
}
