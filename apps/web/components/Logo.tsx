"use client";

import { useEffect, useState } from "react";

export default function Logo() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex items-center gap-0 leading-none transition-all duration-700 ${
        started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
    >
      <span className="font-mono text-3xl font-normal text-[#e6edf3] tracking-[-1px]">
        Dev
      </span>
      <span className="font-mono text-3xl font-bold text-lime-400 tracking-[-1px]">
        Dash
      </span>
      <span className="inline-block w-[2px] h-[22px] bg-lime-400 ml-1.5 rounded-sm align-middle animate-[blink_1.1s_step-end_infinite]" />
    </div>
  );
}
