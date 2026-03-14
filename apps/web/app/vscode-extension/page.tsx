"use client";

import { useEffect, useState } from "react";

export default function VsCodeE() {
  const [sessions, setSessions] = useState<any[]>([]);

  async function fetchSessions() {
    const res = await fetch("/api/vscode/track");
    const data = await res.json();
    setSessions(data.reverse());
  }

  useEffect(() => {
    if (sessions.length > 0) console.log("Session sample:", sessions[0]);
  }, [sessions]);
  
  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 3000);
    return () => clearInterval(interval);
    console.log("sd");
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">DevsDash</h1>

      <div className="space-y-4">
        {sessions.map((s, i) => (
          <div key={i} className="border p-4 rounded-lg shadow">
            <p>Duration: {(s.duration / 1000).toFixed(1)} sec</p>
            <p>Language: {s.language}</p>
            <p>Workspace: {s.workspace}</p>
            <p>
              {s.timestamp
                ? new Date(s.timestamp).toLocaleString()
                : "No timestamp"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
