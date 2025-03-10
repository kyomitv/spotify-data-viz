import unpack from "./unpack.js";

export function graphOnTime(rows) {
  // Grouper les données par mois et calculer la moyenne
  const monthlyData = {};

  rows.forEach((row) => {
    const date = new Date(row.snapshot_date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        sum: 0,
        count: 0,
      };
    }

    monthlyData[monthKey].sum += parseInt(row.popularity);
    monthlyData[monthKey].count += 1;
  });

  // Convertir les données en format pour le graphique
  const months = Object.keys(monthlyData);
  const averages = months.map(
    (month) => monthlyData[month].sum / monthlyData[month].count
  );

  var trace1 = {
    x: months,
    y: averages,
    mode: "lines+markers",
    name: "Average Popularity",
  };

  var data = [trace1];

  var layout = {
    title: { text: "Average Monthly Popularity" },
    xaxis: { title: "Month" },
    yaxis: { title: "Average Popularity" },
    width: 700,
    height: 400,
    template: "plotly_dark", // Utilise le thème sombre
  };

  Plotly.newPlot(document.getElementById("onTimePlot"), data, layout);
}

export function getUniqueSongs(rows) {
  const songs = [];
  rows.forEach((row) => {
    if (!songs.find((song) => song.spotify_id === row.spotify_id)) {
      songs.push(row);
    }
  });
  return songs;
}
