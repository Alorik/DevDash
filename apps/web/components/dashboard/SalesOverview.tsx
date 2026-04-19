"use client";

const categories = [
  { label: "Electronic", value: "$55,640", color: "#4ade80" },
  { label: "Furniture", value: "$11,420", color: "#166534" },
  { label: "Clothes", value: "$1,840", color: "#14532d" },
  { label: "Shoes", value: "$2,120", color: "#21262d" },
];

const miniStats = [
  { label: "New customers", value: "862", sub: "-8% last week", up: false },
  {
    label: "Total profit",
    value: "$25.6k",
    sub: "+42% weekly profit",
    up: true,
  },
];

export default function SalesOverview() {
  return (
    <div className="grid grid-cols-[1fr_180px] gap-3 mb-4">
      {/* Main chart card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-[14px] font-semibold text-[#e6edf3] mb-4">
          Sales overview
        </p>

        <div className="flex items-center gap-6">
          {/* Donut */}
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            className="shrink-0"
          >
            <circle
              cx="55"
              cy="55"
              r="40"
              fill="none"
              stroke="#21262d"
              strokeWidth="18"
            />
            <circle
              cx="55"
              cy="55"
              r="40"
              fill="none"
              stroke="#4ade80"
              strokeWidth="18"
              strokeDasharray="150 102"
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
            />
            <circle
              cx="55"
              cy="55"
              r="40"
              fill="none"
              stroke="#166534"
              strokeWidth="18"
              strokeDasharray="60 192"
              strokeDashoffset="-150"
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
            />
            <circle
              cx="55"
              cy="55"
              r="40"
              fill="none"
              stroke="#14532d"
              strokeWidth="18"
              strokeDasharray="30 222"
              strokeDashoffset="-210"
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
            />
            <text
              x="55"
              y="51"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#e6edf3"
            >
              102k
            </text>
            <text x="55" y="64" textAnchor="middle" fontSize="9" fill="#8b949e">
              weekly visits
            </text>
          </svg>

          {/* Labels */}
          <div className="flex-1">
            <p className="text-[12px] text-[#8b949e] mb-3">
              Number of sales:{" "}
              <span className="text-[#e6edf3] font-semibold">$71,020</span>
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {categories.map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[11px] text-[#8b949e]"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <span>{label}</span>
                  <span className="ml-auto text-[#e6edf3] font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profit sparkline */}
        <div className="mt-4 pt-4 border-t border-[#21262d]">
          <p className="text-[11px] text-[#8b949e] mb-2">
            Total profit:{" "}
            <span className="text-[#e6edf3] font-semibold">$136,755.77</span>
            <span className="text-[#484f58] ml-1">· Feb 2024</span>
          </p>
          <svg
            width="100%"
            height="56"
            viewBox="0 0 400 56"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 50 C40 46 70 38 100 32 S160 18 200 14 S260 8 300 6 S360 3 400 2"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0 50 C40 46 70 38 100 32 S160 18 200 14 S260 8 300 6 S360 3 400 2 V56 H0Z"
              fill="url(#sparkGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Mini stat cards */}
      <div className="flex flex-col gap-3">
        {miniStats.map(({ label, value, sub, up }) => (
          <div
            key={label}
            className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex-1"
          >
            <p className="text-[10px] text-[#8b949e] mb-1">{label}</p>
            <p className="text-xl font-bold text-[#e6edf3]">{value}</p>
            <p
              className={`text-[10px] mt-1 ${up ? "text-emerald-400" : "text-red-400"}`}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
