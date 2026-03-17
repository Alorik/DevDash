"use client";

import { useEffect, useState } from "react";

export default function VsCodeE() {
  const [sessions, setSessions] = useState<any[]>([]);

  async function fetchSessions() {
    const res = await fetch("/api/vscode/track");
    const data = await res.json();
    setSessions([...data].reverse());
  }

  useEffect(() => {
    if (sessions.length > 0) console.log("Session sample:", sessions[0]);
  }, [sessions]);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">DevsDash</h1>

      <div className="space-y-4">
        {sessions.map((s, i) => (
          <div key={i} className="border p-4 rounded-lg shadow">
            <p className="font-medium">
              Duration: {(s.duration / 60000).toFixed(1)} min
            </p>
            <p className="text-sm text-gray-400 capitalize">
              language: {s.language}
            </p>
            <p className="text-sm text-gray-500">
              Workspace: {s.workspace || "Unknown workspace"}
            </p>
            <p className="text-xs text-gray-600">
              time: {new Date(s.startTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
