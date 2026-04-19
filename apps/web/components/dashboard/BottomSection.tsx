const customers = [
  {
    name: "Danny Liu",
    email: "danny@gmail.com",
    deals: "1,023",
    value: "$37,431",
    color: "#818cf8",
    bg: "#1a1a2e",
  },
  {
    name: "Bella Deviant",
    email: "bella@gmail.com",
    deals: "963",
    value: "$30,423",
    color: "#f87171",
    bg: "#2e1a1a",
  },
  {
    name: "Darrell Steward",
    email: "darrel@gmail.com",
    deals: "843",
    value: "$28,549",
    color: "#4ade80",
    bg: "#1a2e1a",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function BottomSection() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Customer list */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
        <p className="text-[14px] font-semibold text-[#e6edf3] mb-4">
          Customer list
        </p>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] text-[#484f58] font-medium pb-2 border-b border-[#21262d]">
                Name
              </th>
              <th className="text-left text-[10px] text-[#484f58] font-medium pb-2 border-b border-[#21262d]">
                Deals
              </th>
              <th className="text-right text-[10px] text-[#484f58] font-medium pb-2 border-b border-[#21262d]">
                Total deal value
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map(({ name, email, deals, value, color, bg }) => (
              <tr
                key={name}
                className="border-b border-[#0d1117] last:border-0"
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: bg, color }}
                    >
                      {initials(name)}
                    </div>
                    <div>
                      <p className="text-[12px] text-[#e6edf3] font-medium leading-none">
                        {name}
                      </p>
                      <p className="text-[10px] text-[#484f58] mt-0.5">
                        {email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 text-[12px] text-[#8b949e]">{deals}</td>
                <td className="py-2.5 text-[12px] text-[#e6edf3] font-medium text-right">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Promo card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#14291a] border border-emerald-400/20 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full mb-4">
            <svg
              className="w-2.5 h-2.5"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path d="M5 1l1.2 2.5L9 4l-2 1.9.5 2.7L5 7.4 2.5 8.6 3 5.9 1 4l2.8-.5z" />
            </svg>
            Premium plan
          </div>
          <div className="text-[38px] font-extrabold text-[#e6edf3] leading-none tracking-tight">
            $30
          </div>
          <p className="text-[12px] text-[#8b949e] mt-1 mb-3">
            Per month · Per user
          </p>
          <p className="text-[12px] text-[#8b949e] leading-relaxed">
            Improve your workplace, view and analyze your profits and losses
            with advanced tools.
          </p>
        </div>
        <button className="mt-5 w-full bg-emerald-400 hover:bg-emerald-300 text-[#0d1117] font-semibold text-[13px] py-2.5 rounded-lg transition-colors duration-150">
          Get started
        </button>
      </div>
    </div>
  );
}
