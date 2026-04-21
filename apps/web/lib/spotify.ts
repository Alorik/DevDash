const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENT_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

export async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await res.json();

  console.log("TOKEN RESPONSE:", data); // 👈 ADD THIS

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  return data;
}

export async function getLastPlayedSong() {
  const { access_token } = await getAccessToken();

  const res = await fetch(RECENT_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  const text = await res.text(); // 👈 IMPORTANT
  console.log("SPOTIFY RESPONSE:", res.status, text);

  if (!res.ok) {
    throw new Error(`Spotify API Error: ${res.status}`);
  }

  const data = JSON.parse(text);

  if (!data.items || data.items.length === 0) {
    return null; // 👈 handle empty safely
  }

  const track = data.items[0].track;

  return {
    song: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    album: track.album.name,
    image: track.album.images[0]?.url,
    url: track.external_urls.spotify,
    playedAt: data.items[0].played_at,
  };
}
