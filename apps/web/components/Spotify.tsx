"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Song {
  song: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  playedAt: string;
  uri?: string; // spotify:track:xxxx  — add this to your API response
}

const glassStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.18)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,0.1), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1px 1px rgba(0,0,0,0.05)",
  border: "1px solid rgba(255,255,255,0.45)",
};


type PlayState = "idle" | "loading" | "playing" | "error" | "no_device";

function PlayButton({ uri }: { uri: string }) {
  const [state, setState] = useState<PlayState>("idle");

  const handlePlay = async () => {
    if (state === "loading") return;
    setState("loading");

    try {
      const res = await fetch("/api/spotify/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uri }),
      });

      if (res.status === 204) {
        setState("playing");
        setTimeout(() => setState("idle"), 3000);
      } else if (res.status === 404) {
        setState("no_device");
        setTimeout(() => setState("idle"), 3000);
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  const label = {
    idle: "▶ Play again",
    loading: "...",
    playing: "✓ Playing",
    error: "✕ Failed",
    no_device: "No active device",
  }[state];

  const bg = {
    idle: "rgba(249,115,22,0.1)",
    loading: "rgba(249,115,22,0.07)",
    playing: "rgba(74,222,128,0.12)",
    error: "rgba(239,68,68,0.1)",
    no_device: "rgba(0,0,0,0.06)",
  }[state];

  const color = {
    idle: "rgba(249,115,22,0.85)",
    loading: "rgba(249,115,22,0.5)",
    playing: "rgba(22,163,74,0.85)",
    error: "rgba(220,38,38,0.8)",
    no_device: "rgba(30,20,20,0.38)",
  }[state];

  const border = {
    idle: "rgba(249,115,22,0.22)",
    loading: "rgba(249,115,22,0.12)",
    playing: "rgba(74,222,128,0.25)",
    error: "rgba(239,68,68,0.2)",
    no_device: "rgba(0,0,0,0.08)",
  }[state];

  return (
    <motion.button
      onClick={handlePlay}
      disabled={state === "loading"}
      whileTap={{ scale: 0.95 }}
      className="mt-4 w-full py-2 rounded-xl text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-300"
      style={{
        background: bg,
        color,
        border: `1px solid ${border}`,
        cursor: state === "loading" ? "wait" : "pointer",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="block"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function Card() {
  const [data, setData] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/spotify/recent")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative overflow-hidden rounded-[1.75rem] w-full max-w-sm"
      style={glassStyle}
    >
      <div className="absolute top-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent pointer-events-none z-10" />
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
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="p-5 relative z-20">
        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-4 animate-pulse">
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0"
              style={{ background: "rgba(0,0,0,0.08)" }}
            />
            <div className="flex flex-col gap-2 flex-1">
              <div
                className="h-3.5 rounded-full w-3/4"
                style={{ background: "rgba(0,0,0,0.08)" }}
              />
              <div
                className="h-3 rounded-full w-1/2"
                style={{ background: "rgba(0,0,0,0.05)" }}
              />
              <div
                className="h-2.5 rounded-full w-2/3"
                style={{ background: "rgba(0,0,0,0.04)" }}
              />
            </div>
          </div>
        )}

        {!loading && !data && (
          <p
            className="text-sm font-mono"
            style={{ color: "rgba(30,20,20,0.35)" }}
          >
            No recent song found 🎧
          </p>
        )}

        {!loading && data && (
          <>
            <motion.a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4 group"
            >
              {/* Album art */}
              <div className="relative flex-shrink-0">
                <img
                  src={data.image}
                  alt={data.song}
                  className="w-16 h-16 rounded-xl object-cover"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                />
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.25)" }}
                />
              </div>

              {/* Track info */}
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span
                  className="text-[14px] font-black tracking-tight truncate group-hover:underline underline-offset-2"
                  style={{ color: "rgba(30,20,20,0.82)" }}
                >
                  {data.song}
                </span>
                <span
                  className="text-[12px] font-mono font-semibold truncate"
                  style={{ color: "rgba(249,115,22,0.85)" }}
                >
                  {data.artist}
                </span>
                <span
                  className="text-[10px] font-mono truncate"
                  style={{ color: "rgba(30,20,20,0.38)" }}
                >
                  {data.album}
                  {data.playedAt && (
                    <>
                      {" "}
                      ·{" "}
                      {new Date(data.playedAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  )}
                </span>
              </div>

              <span
                className="text-[18px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "rgba(249,115,22,0.7)" }}
              >
                ↗
              </span>
            </motion.a>

            {/* Play again button — only if uri exists */}
            {data.uri && <PlayButton uri={data.uri} />}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function SpotifyPage() {
  return (
    <div className=" flex items-center justify-center ">
      <Card />
    </div>
  );
}
