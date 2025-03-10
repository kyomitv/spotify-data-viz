import downloadData from "./downloadData.js";
import unpack from "./unpack.js";
import getTrack from "./api/getTrack.js";

import { graphOnTime, getUniqueSongs } from "./simon.js";

async function main() {
  let startTime = new Date();
  const data = await downloadData("data/spotify_data.csv");

  console.log(data, `Data downloaded in ${new Date() - startTime} ms`);

  const track = await getTrack(data[0].spotify_id);
  console.log(track);

  graphOnTime(data.filter((row) => row.artists.includes("Bruno Mars")));

  const songs = getUniqueSongs(
    data.filter((row) => row.artists.includes("Bruno Mars"))
  );
  console.log(songs);
  songs.forEach(async (song) => {
    const track = await getTrack(song.spotify_id);
    document.getElementById(
      "songsList"
    ).innerHTML += `<div id="${song.spotify_id}" class="song"><img src="${track.album.images[2].url}" alt="${song.name}"><div><p>${song.name}</p><p>${song.artists}</p></div></div>`;

    document.getElementById().addEventListener("click", () => {
      graphOnTime(data.filter((row) => row.spotify_id === song.spotify_id));
    });
  });
}

main();
