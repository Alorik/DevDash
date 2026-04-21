import { NextResponse, NextRequest } from "next/server";

import { getAccessToken } from "@/lib/spotify";
import { getLastPlayedSong } from "@/lib/spotify";

export async function GET() {
  try {
    const song = await getLastPlayedSong();

    if (!song) {
      return NextResponse.json({
        message: "No recent song found",
      });
    }

    return NextResponse.json(song);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { uri } = await req.json();
  if (!uri) return NextResponse.json({ error: "No URI" }, { status: 400 });

  const { access_token } = await getAccessToken();

  // 1. Get available devices
  const devicesRes = await fetch(
    "https://api.spotify.com/v1/me/player/devices",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  const devicesData = await devicesRes.json();
  console.log("DEVICES:", JSON.stringify(devicesData)); // 👈 check what's returned

  const devices: any[] = devicesData.devices ?? [];

  if (devices.length === 0) {
    return NextResponse.json({ error: "No devices found" }, { status: 404 });
  }

  // 2. Prefer active device, fall back to first available
  const device = devices.find((d) => d.is_active) ?? devices[0];

  // 3. Play on that device explicitly
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${device.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uri] }),
    },
  );

  if (res.status === 204) return new NextResponse(null, { status: 204 });

  const error = await res.json().catch(() => ({}));
  console.error("PLAY ERROR:", error);
  return NextResponse.json(error, { status: res.status });
}