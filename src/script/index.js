import downloadData from "./downloadData.js";
import unpack from "./unpack.js";
import listeChanson from "./listeChanson.js";
import { graphmap, getdate } from "./map.js";
import getTrack from "./api/getTrack.js";
import { graphOnTime, getUniqueSongs } from "./simon.js";
import {maxence} from "./maxence.js";



async function main() {
    let startTime = new Date();
    const data = await downloadData("data/spotify_data.csv");
    const uniqueSongs = listeChanson(data);
    console.log(uniqueSongs);
    const selector = document.getElementById("choixChanson");
    uniqueSongs.forEach((song) => {
        selector.innerHTML += `<option value="${song}">${song}</option>`;
    });

    // Ajouter un gestionnaire d'événements pour la sélection de chanson
    selector.addEventListener("change", (event) => {
        const selectedSong = event.target.value;
        const filteredData = data.filter((row) => row.name === selectedSong && row.artists.includes("Bruno Mars"));
        filteredData.forEach((row) => {
            row.date = new Date(row.snapshot_date);
        });
        filteredData.sort((a, b) => a.date - b.date);
        maxence(filteredData);
    });

    maxence(data.filter((row) => row.artists.includes("Bruno Mars")));

    console.log(data, `Data downloaded in ${new Date() - startTime} ms`);

    graphmap(
        data.filter(
            (row) =>
                row.artists.includes("Bruno Mars") &&
                row.name.includes("Die With A Smile") &&
                row.snapshot_date.includes("2024-11-03")
        )
    );

    const track = await getTrack(data[0].spotify_id);
    console.log(track);

    graphOnTime(data.filter((row) => row.artists.includes("Bruno Mars")));

    const songs = getUniqueSongs(
        data.filter((row) => row.artists.includes("Bruno Mars"))
    );
    console.log(songs);

    // SIMON
    songs.forEach(async (song) => {
        const track = await getTrack(song.spotify_id);
        document.getElementById(
            "songsList"
        ).innerHTML += `<div id="${song.spotify_id}" class="song"><img src="${track?.album.images[2].url}" ><div><p>${song.name}</p><p>${song.artists}</p></div></div>`;

        document.querySelectorAll(".song").forEach((songDiv) => {
            songDiv.addEventListener("click", async () => {
                if (songDiv.id) {
                    graphOnTime(data.filter((row) => row.spotify_id === songDiv.id));
                } else {
                    graphOnTime(data.filter((row) => row.artists.includes("Bruno Mars")));
                }
            });
        });
    });

    getdate(data.filter((row) => row.artists.includes("Bruno Mars")));
}

main();