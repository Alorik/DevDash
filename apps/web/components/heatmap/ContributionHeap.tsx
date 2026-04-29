"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StreakCard from "./streakCalculator";
import { groupIntoWeeks } from "../../lib/analytics/daysToWeeks";
import { getMonthsLabels } from "../../lib/analytics/getMonthsLabels";

type Day = {
  date: string;
  contributionCount: number;
};

function getColorClass(count: number) {
  if (count === 0) return "bg-black/[0.06]";
  if (count < 3) return "bg-rose-200";
  if (count < 6) return "bg-rose-400";
  if (count < 10) return "bg-orange-500";
  return "bg-rose-600";
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const glassStyle = {
  background: "rgba(255, 255, 255, 0.22)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(0,0,0,0.04)",
};

export default function ContributionHeatmap() {
  const [days, setDays] = useState<Day[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    fetch("/api/analytics/overview")
      .then((res) => res.json())
      .then((data) => {
        setDays(data.days);
        setTotalContributions(data.totalContributions);
      });
  }, []);

  if (!days.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-48 w-full rounded-4xl border border-white/40"
        style={glassStyle}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest animate-pulse font-mono"
          style={{ color: "rgba(30,20,20,0.35)" }}
        >
          Fetching Activity...
        </p>
      </motion.div>
    );
  }

  const weeks = groupIntoWeeks(days) as Day[][];
  const months = getMonthsLabels(weeks);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
      className="relative rounded-4xl border border-white/40 overflow-hidden inline-block font-sans"
      style={glassStyle}
    >
      {/* Top specular edge */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

      {/* Bottom shadow line */}
      <div className="absolute bottom-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-black/10 to-transparent pointer-events-none z-10" />


      {/* Light sweep */}
      <motion.div
        animate={{ x: ["-200%", "350%"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 4,
        }}
        className="absolute inset-0 pointer-events-none -skew-x-12 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
        }}
      />

      <div className="p-6 relative z-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-6 flex-wrap">
          <h3
            className="text-sm font-black tracking-tight"
            style={{ color: "rgba(30,20,20,0.8)" }}
          >
            Activity Heatmap
          </h3>

          <p
            className="text-[10px] font-bold uppercase tracking-widest font-mono"
            style={{ color: "rgba(30,20,20,0.38)" }}
          >
            <span style={{ color: "rgba(249,115,22,0.9)", fontWeight: 800 }}>
              {totalContributions}
            </span>{" "}
            contributions this year
          </p>

          {/* Legend + Streak */}
          <div
            className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-widest font-mono"
            style={{ color: "rgba(30,20,20,0.38)" }}
          >
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 2, 5, 9, 11].map((lvl) => (
                <div
                  key={lvl}
                  className={`w-2.5 h-2.5 rounded-xs ${getColorClass(lvl)}`}
                />
              ))}
              <span>More</span>
            </div>
            <StreakCard />
          </div>
        </div>

        {/* Grid */}
        <div className="flex flex-col">
          {/* Month labels */}
          <div className="flex ml-9 mb-2">
            {months.map((month, i) => (
              <div
                key={i}
                className="text-[10px] font-bold font-mono min-w-3.5"
                style={{
                  width: "calc(100% / 12)",
                  color: "rgba(30,20,20,0.35)",
                }}
              >
                {i === 0 || months[i] !== months[i - 1] ? month : ""}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day labels */}
            <div
              className="flex flex-col justify-between py-0.5 text-[10px] font-bold font-mono"
              style={{ color: "rgba(30,20,20,0.35)" }}
            >
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="h-3 flex items-center leading-none">
                  {label}
                </span>
              ))}
            </div>

            {/* Heatmap cells */}
            <div className="flex gap-0.75">
              {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-0.75">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.contributionCount} contributions on ${new Date(
                        day.date,
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}`}
                      className={`
                        w-3.5 h-3.5 rounded-xs
                        transition-all duration-150 ease-out
                        hover:scale-125 cursor-pointer
                        hover:relative hover:z-10
                        ${getColorClass(day.contributionCount)}
                      `}
                      style={{
                        boxShadow:
                          day.contributionCount > 0
                            ? "inset 0 1px 1px rgba(255,255,255,0.3)"
                            : "inset 0 1px 1px rgba(255,255,255,0.5)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
