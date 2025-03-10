import getToken from "./token.js";

export default async function getTrack(trackId) {
  if (window.localStorage.getItem(trackId))
    return JSON.parse(window.localStorage.getItem(trackId));

  const token = (await getToken()).access_token;
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 429) {
    console.log("Rate limit exceeded, waiting 1s");
    return;
  }

  window.localStorage.setItem(trackId, JSON.stringify(await res.json()));
  return await res.json();
}
