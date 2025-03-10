import getToken from "./token.js";

export default async function getTrack(trackId) {
  const token = (await getToken()).access_token;
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}
