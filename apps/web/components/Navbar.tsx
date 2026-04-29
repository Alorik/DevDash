"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full text-white px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold">
          <Logo />
        </Link>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="3"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
              fill="rgba(255,255,255,0.18)"
            />
            <line
              x1="8"
              y1="1"
              x2="8"
              y2="23"
              stroke="rgba(249,115,22,0.85)"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.15)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Sidebar panel sliding from right */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
                mass: 0.8,
              }}
              className="fixed top-0 right-0 h-full z-50 p-4"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
