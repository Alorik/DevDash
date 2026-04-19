const notifications = [
  {
    text: "56 New users registered.",
    time: "Just now",
    color: "#4ade80",
    bg: "#1a2e1a",
  },
  {
    text: "132 Orders placed.",
    time: "59 Minutes ago",
    color: "#818cf8",
    bg: "#1a1a2e",
  },
  {
    text: "Funds have been withdrawn.",
    time: "12 Hours ago",
    color: "#f87171",
    bg: "#2e1a1a",
  },
  {
    text: "5 Unread messages.",
    time: "Today, 11:59 PM",
    color: "#facc15",
    bg: "#2e2a1a",
  },
];

const activities = [
  { text: "Changed the style.", time: "Just now" },
  { text: "177 New products added.", time: "47 Minutes ago" },
  { text: "11 Products have been archived.", time: "1 Days ago" },
  { text: 'Page "Toys" has been removed.', time: "Feb 2, 2024" },
];

const contacts = [
  { name: "Daniel Craig", color: "#818cf8", bg: "#1a1a2e" },
  { name: "Kate Morrison", color: "#f87171", bg: "#2e1a1a" },
  { name: "Nataniel Donowan", color: "#4ade80", bg: "#1a2e1a", active: true },
  { name: "Elisabeth Wayne", color: "#facc15", bg: "#2e2a1a" },
  { name: "Felicia Raspet", color: "#f97316", bg: "#2e1e1a" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function RightPanel() {
  return (
    <aside className="w-56 min-w-56 bg-[#161b22] border-l border-[#21262d] flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Notifications */}
      <div className="p-4 border-b border-[#21262d]">
        <p className="text-[13px] font-semibold text-[#e6edf3] mb-3">
          Notifications
        </p>
        <div className="flex flex-col gap-3">
          {notifications.map(({ text, time, color, bg }) => (
            <div key={text} className="flex items-start gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold"
                style={{ background: bg, color }}
              >
                {text[0]}
              </div>
              <div>
                <p className="text-[11px] text-[#e6edf3] leading-snug">
                  {text}
                </p>
                <p className="text-[10px] text-[#484f58] mt-0.5">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="p-4 border-b border-[#21262d]">
        <p className="text-[13px] font-semibold text-[#e6edf3] mb-3">
          Activities
        </p>
        <div className="flex flex-col gap-3">
          {activities.map(({ text, time }) => (
            <div key={text} className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#21262d] flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#484f58]" />
              </div>
              <div>
                <p className="text-[11px] text-[#8b949e] leading-snug">
                  {text}
                </p>
                <p className="text-[10px] text-[#484f58] mt-0.5">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="p-4">
        <p className="text-[13px] font-semibold text-[#e6edf3] mb-3">
          Contacts of your managers
        </p>
        <div className="flex flex-col gap-2">
          {contacts.map(({ name, color, bg, active }) => (
            <div
              key={name}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                active
                  ? "bg-emerald-400/10 border border-emerald-400/20"
                  : "hover:bg-[#21262d]"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{ background: bg, color }}
              >
                {initials(name)}
              </div>
              <span
                className={`text-[11px] flex-1 ${active ? "text-emerald-400 font-medium" : "text-[#8b949e]"}`}
              >
                {name}
              </span>
              {active && (
                <div className="flex gap-1">
                  <div className="w-5 h-5 rounded bg-emerald-400/20 flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-emerald-400"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="1" y="3" width="10" height="7" rx="1" />
                      <path d="M4 3V2a2 2 0 014 0v1" />
                    </svg>
                  </div>
                  <div className="w-5 h-5 rounded bg-emerald-400/20 flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-emerald-400"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M1 3.5A1.5 1.5 0 012.5 2h7A1.5 1.5 0 0111 3.5v4A1.5 1.5 0 019.5 9H7l-2 2-1-2H2.5A1.5 1.5 0 011 7.5v-4z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
