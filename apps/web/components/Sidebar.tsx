"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListTodo, Folder, Activity, Home } from "lucide-react";
import { motion } from "framer-motion";
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
      className="w-64 p-5 flex flex-col h-full relative overflow-hidden rounded-[1.75rem]"
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
          repeatDelay: 6,
        }}
        className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      {/* Logo */}
      <div className="relative z-20 mb-10">
        <p
          className="text-[10px] font-mono uppercase tracking-[0.16em] mb-1 font-semibold"
          style={{ color: "rgba(30,20,20,0.38)" }}
        >
          Dashboard
        </p>
        <h1
          className="text-xl font-black tracking-tight"
          style={{ color: "rgba(30,20,20,0.85)" }}
        >
          DevsDash
        </h1>
      </div>

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
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors relative overflow-hidden group"
                  style={
                    isActive
                      ? {
                          background: "rgba(249,115,22,0.12)",
                          border: "1px solid rgba(249,115,22,0.25)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5)",
                        }
                      : {
                          border: "1px solid transparent",
                        }
                  }
                >
                  {/* Hover fill */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(0,0,0,0.04)" }}
                    />
                  )}

                  <Icon
                    size={16}
                    style={{
                      color: isActive
                        ? "rgba(249,115,22,0.85)"
                        : "rgba(30,20,20,0.4)",
                    }}
                  />
                  <span
                    className="font-mono text-[12px] font-bold tracking-wide"
                    style={{
                      color: isActive
                        ? "rgba(249,115,22,0.9)"
                        : "rgba(30,20,20,0.55)",
                    }}
                  >
                    {item.name}
                  </span>

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

                {/* Breadcrumb-style underline on hover (non-active items) */}
                {!isActive && hoveredIndex === index && (
                  <motion.div
                    layoutId="hover-underline"
                    className="absolute left-4 right-4 rounded-full"
                    style={{
                      bottom: "2px",
                      height: "1.5px",
                      background: "rgba(249,115,22,0.5)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </motion.div>
  );
}
