"use client";

import { useEffect, useState } from "react";

type StreakData = {
  currentStreak: number;
  longestStreak: number;
};

export default function StreakCard() {
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    fetch("/api/analytics/overview")
      .then((res) => res.json())
      .then((data) =>
        setStreak({
          currentStreak: data.currentStreak,
          longestStreak: data.longestStreak,
        }),
      );
  }, []);

  if (!streak) return <p>Loading streak...</p>;

  return (
    <div className="bg-transparent p-3 rounded-lg">
      <p>Current Streak: {streak.currentStreak} days</p>
      <p>Longest Streak: {streak.longestStreak} days</p>
    </div>
  );
}
