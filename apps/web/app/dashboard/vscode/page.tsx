"use client"
import { useEffect, useState } from "react";

type Stats = {
  todayHours: number;
  weekHours: number;
  monthHours: number;
  streak: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  async function fetchStats() {
    try {
      const res = await fetch("/api/vscode/stats");
      const data = await res.json();
      console.log(data);
      setStats(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchStats();
  },[])

  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8">DevsDash</h1>
{/*  */}
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 border rounded-xl shadow">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-semibold">
              {stats?.todayHours.toFixed(2)} hrs
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-2xl font-semibold">
              {stats?.weekHours.toFixed(2)} hrs
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-semibold">
              {stats?.monthHours.toFixed(2)} hrs
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow">
            <p className="text-sm text-gray-500">Streak 🔥</p>
            <p className="text-2xl font-semibold">{stats?.streak} days</p>
          </div>
        </div>
      </div>
    </>
  );
}
