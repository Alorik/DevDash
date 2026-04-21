import { NextResponse, NextRequest } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function POST(req: NextRequest) {
  const { uri } = await req.json();
  if (!uri) return NextResponse.json({ error: "No URI" }, { status: 400 });

  const { access_token } = await getAccessToken();
    console.log("GOT TOKEN, fetching devices...");

const devicesRes = await fetch("https://api.spotify.com/v1/me/player/devices", {
  headers: { Authorization: `Bearer ${access_token}` },
});

console.log("DEVICES STATUS:", devicesRes.status);
const devicesText = await devicesRes.text();
console.log("DEVICES BODY:", devicesText);

const devicesData = JSON.parse(devicesText);
  const devices: any[] = devicesData.devices ?? [];
  
  if (devices.length === 0) {
    return NextResponse.json({ error: "No devices found" }, { status: 404 });
  }

  const device = devices.find((d) => d.is_active) ?? devices[0];

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
