import downloadData from "./downloadData.js";
import unpack from "./unpack.js";
import listeChanson from "./listeChanson.js";
import { graphmap, getdate } from "./map.js";
import getTrack from "./api/getTrack.js";

import { maxence } from "./maxence.js";

import { graphOnTime, getUniqueSongs, barChart } from "./simon.js";

const selection = document.getElementById("choixdate");

async function main() {
  let startTime = new Date();
  const data = await downloadData("data/spotify_data.csv");

  //MAXENce
  const uniqueSongs = listeChanson(data);
  const selector = document.getElementById("choixChanson");
  uniqueSongs.forEach((song) => {
    selector.innerHTML += `<option value="${song}">${song}</option>`;
  });

  selector.addEventListener("change", (event) => {
    const selectedSong = event.target.value;
    const filteredData = data.filter(
      (row) => row.name === selectedSong && row.artists.includes("Bruno Mars")
    );
    filteredData.forEach((row) => {
      row.date = new Date(row.snapshot_date);
    });
    filteredData.sort((a, b) => a.date - b.date);
    maxence(filteredData);
  });

  maxence(data.filter((row) => row.artists.includes("Bruno Mars")));

  //THIBAULT
  graphmap(data, "2024-11-03");
  selection.addEventListener("change", () => {
    graphmap(data, selection.value);
  });

  graphmap(data, "2024-10-18");

  // SIMON
  graphOnTime(data.filter((row) => row.artists.includes("Bruno Mars")));

  const songs = getUniqueSongs(
    data.filter((row) => row.artists.includes("Bruno Mars"))
  );

  songs.forEach((song) => {
    setTimeout(
      async () => {
        const track = await getTrack(song.spotify_id);
        document.getElementById(
          "songsList"
        ).innerHTML += `<div id="${song.spotify_id}" class="song"><img src="${track?.album.images[2].url}" ><div><p>${song.name}</p><p>${song.artists}</p></div></div>`;

        document.querySelectorAll(".song").forEach((songDiv) => {
          songDiv.addEventListener("click", async () => {
            if (songDiv.id) {
              graphOnTime(data.filter((row) => row.spotify_id === songDiv.id));
            } else {
              graphOnTime(
                data.filter((row) => row.artists.includes("Bruno Mars"))
              );
            }
          });
        });
      },
      window.localStorage.getItem(song.spotify_id) ? 0 : k * 1100
    );
  });

  const datas = await downloadData("data/spotify_data.csv");
  const uniqueDate = getdate(data);
  uniqueDate.forEach((date) => {
    selection.innerHTML += `<option value="${date}">${date}</option>`;
  });

  getdate(data.filter((row) => row.artists.includes("Bruno Mars")));
  barChart(
    getUniqueSongs(
      data.filter((row) => row.artists.includes("Bruno Mars")),
      true
    )
  );
}

main();
