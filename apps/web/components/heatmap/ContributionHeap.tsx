"use client";

import { useEffect, useState } from "react";
import StreakCard from "./streakCalculator";
import { groupIntoWeeks } from "../../app/lib/analytics/daysToWeeks";
import { getMonthsLabels } from "../../app/lib/analytics/getMonthsLabels";
import { fetchContributions } from "../../app/lib/github/fetchContribution";

type Day = {
  date: string;
  contributionCount: number;
};

function getColorClass(count: number) {
  if (count === 0) return "bg-gray-200/70 dark:bg-white/10";
  if (count < 3) return "bg-emerald-200 dark:bg-emerald-900 text-emerald-900";
  if (count < 6) return "bg-emerald-400 dark:bg-emerald-600 text-white";
  if (count < 10) return "bg-emerald-600 dark:bg-emerald-400 text-white";
  return "bg-emerald-800 dark:bg-emerald-400 text-white";
}

export default function ContributionHeatmap() {
  const [days, setDays] = useState<Day[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);

  const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

useEffect(() => {
  fetch("/api/analytics/overview")
    .then((res) => res.json())
    .then((data) => {
      setDays(data.days);
      setTotalContributions(data.totalContributions); // add this
    });
}, []);

  if (!days.length) {
    return (
      <div className="flex items-center justify-center h-48 w-full bg-gray-50 dark:bg-gray-900/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-400 animate-pulse">
          FETCHING ACTIVITY...
        </p>
      </div>
    );
  }
  const weeks = groupIntoWeeks(days) as Day[][];
  const months = getMonthsLabels(weeks);

  return (
    <div className="p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm inline-block font-sans">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Activity Heatmap
        </h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <span className="text-emerald-500 font-semibold">
            {totalContributions}
          </span>{" "}
          contributions this year
        </p>

        {/* Legend */}
        <div className="flex flex-col items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <div className="flex gap-1.5">
            <span>Less</span>
            {[0, 2, 5, 9, 11].map((lvl) => (
              <div
                key={lvl}
                className={`w-2.5 h-2.5 rounded-[2px] ${getColorClass(lvl)}`}
              />
            ))}
            <span>More</span>
          </div>
          <StreakCard />
        </div>
      </div>

      <div className="flex flex-col">
        {/* Months Row */}
        <div className="flex ml-9 mb-2">
          {months.map((month, i) => (
            <div
              key={i}
              className="text-[10px] font-bold text-gray-400 dark:text-gray-600 min-w-[14px]"
              style={{ width: "calc(100% / 12)" }}
            >
              {i === 0 || months[i] !== months[i - 1] ? month : ""}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {/* Days Column */}
          <div className="flex flex-col justify-between py-0.5 text-[10px] font-bold text-gray-400 dark:text-gray-600">
            {DAY_LABELS.map((label, i) => (
              <span key={i} className="h-3 flex items-center leading-none">
                {label}
              </span>
            ))}
          </div>

          {/* Grid with CSS-only Hover Transitions */}
          <div className="flex gap-[3px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
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
                      w-3.5 h-3.5 rounded-[2px] 
                      transition-all duration-150 ease-out
                      hover:scale-125 hover:shadow-lg hover:shadow-emerald-500/20
                      hover:relative hover:z-10 cursor-pointer
                      ${getColorClass(day.contributionCount)}
                    `}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
