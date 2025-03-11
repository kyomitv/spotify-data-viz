import downloadData from "./downloadData.js";
import unpack from "./unpack.js";
import listeChanson from "./listeChanson.js";

import { graphmap, getdate } from "./map.js";

import getTrack from "./api/getTrack.js";
import { graphOnTime, getUniqueSongs, barChart } from "./simon.js";

function maxence(rows) {
  var frames = [];
  var x = unpack(rows, "snapshot_date");
  var y = unpack(rows, "daily_rank");

  var n = x.length; // Utilisez la longueur réelle des données
  for (var i = 0; i < n; i++) {
    frames[i] = { data: [{ x: [], y: [] }] };
    frames[i].data[0].x = x.slice(0, i + 1);
    frames[i].data[0].y = y.slice(0, i + 1);
  }

  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: "Locked out of Heaven",
    x: x,
    y: y,
    line: { color: "lightgrey" },
  };

  var data = [trace1];

  var layout = {
    title: {
      text: "Weekly Movement Animation",
    },
    xaxis: {
      range: [x[0], x[n - 1]],
      showgrid: false,
    },
    yaxis: {
      range: [50, 1], // Définir le range de 1 à 3
      dtick: 10, // Incrément de 1 entre les valeurs affichées
      showgrid: true,
      tickformat: ",.0f", // Supprimer les virgules
    },
    legend: {
      orientation: "h",
      x: 0.5,
      y: 1.2,
      xanchor: "center",
    },
    updatemenus: [
      {
        x: 0.5,
        y: 0,
        yanchor: "top",
        xanchor: "center",
        showactive: false,
        direction: "left",
        type: "buttons",
        pad: { t: 87, r: 10 },
        buttons: [
          {
            method: "animate",
            args: [
              null,
              {
                fromcurrent: true,
                transition: {
                  duration: 0,
                },
                frame: {
                  duration: 40,
                  redraw: false,
                },
              },
            ],
            label: "Play",
          },
          {
            method: "animate",
            args: [
              [null],
              {
                mode: "immediate",
                transition: {
                  duration: 0,
                },
                frame: {
                  duration: 0,
                  redraw: false,
                },
              },
            ],
            label: "Pause",
          },
        ],
      },
    ],
  };

  Plotly.newPlot("myDiv", data, layout).then(function () {
    Plotly.addFrames("myDiv", frames);
  });
}

async function main() {
  let startTime = new Date();
  const data = await downloadData("data/spotify_data.csv");
  const uniqueSongs = listeChanson(data);
  console.log(uniqueSongs);
  const selector = document.getElementById("choixChanson");
  uniqueSongs.forEach((song) => {
    selector.innerHTML += `<option value="${song}">${song}</option>`;
  });

  // Filtrer les données pour "APT."
  const filteredData = data.filter(
    (row) => row.name === "Locked out of Heaven" && row.country == ""
  );
  filteredData.forEach((row) => {
    row.date = new Date(row.snapshot_date);
  });
  filteredData.sort((a, b) => a.date - b.date);
  maxence(filteredData);

  console.log(data, `Data downloaded in ${new Date() - startTime} ms`);

  graphmap(
    data.filter(
      (row) =>
        row.artists.includes("Bruno Mars") &&
        row.name.includes("Die With A Smile") &&
        row.snapshot_date.includes("2024-11-03")
    )
  );

  //SIMON
  graphOnTime(data.filter((row) => row.artists.includes("Bruno Mars")));

  const songs = getUniqueSongs(
    data.filter((row) => row.artists.includes("Bruno Mars"))
  );
  songs.forEach(async (song, k) => {
    setTimeout(
      async () => {
        const track = await getTrack(song.spotify_id);

        // console.log(track);

        document.getElementById("songsList").innerHTML += `<div id="${
          song.spotify_id
        }" class="song"><img src="${
          track?.album.images[2].url || ""
        }" ><div><p>${song.name}</p><p>${song.artists}</p></div></div>`;

        document.querySelectorAll(".song").forEach((song) => {
          song.addEventListener("click", async () => {
            if (song.id) {
              graphOnTime(
                data.filter((row) => row.spotify_id === song.id),
                `${
                  data.filter((row) => row.spotify_id === song.id)[0].name
                } - Popularité moyenne par mois`
              );
            } else {
              graphOnTime(
                data.filter((row) => row.artists.includes("Bruno Mars")),
                `Bruno Mars - Popularité moyenne par mois`
              );
            }
          });
        });
      },
      window.localStorage.getItem(song.spotify_id) ? 0 : k * 1100
    );
  });
  getdate(data.filter((row) => row.artists.includes("Bruno Mars")));
  barChart(songs);
}
main();
