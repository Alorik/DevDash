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
