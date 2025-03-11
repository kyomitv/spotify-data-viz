import unpack from "./unpack.js";

export function graphOnTime(rows, title) {
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
    name: "Popularité moyenne",
    line: {
      color: "white", // Couleur des lignes
    },
    marker: {
      color: "white", // Couleur des points
    },
    textfont: {
      color: "white", // Couleur du texte
    },
  };

  var data = [trace1];

  var layout = {
    title: { text: title || "Bruno Mars - Popularité moyenne par mois" },
    xaxis: { title: "Mois", showgrid: false, fixedrange: true },
    yaxis: { title: "Popularité moyenne", fixedrange: true },
    width: 700,
    height: 500,
    template: "plotly_dark", // Utilise le thème sombre
    plot_bgcolor: "rgba(0,0,0,0)", // Fond transparent du graphique
    paper_bgcolor: "rgba(0,0,0,0)", // Fond transparent de la zone autour du graphique
    font: {
      color: "white", // Couleur du texte pour les titres et les axes
    },
    hovermode: "closest",
  };

  var config = {
    displayModeBar: false, // Masquer la barre d'outils
  };

  Plotly.newPlot(document.getElementById("onTimePlot"), data, layout, config);
}

export function barChart(rows) {
  console.log(rows);
  var trace1 = {
    x: rows.map((row) => row.name),
    y: rows.map((row) => row.tempo),
    name: "Tempo",
    type: "bar",
  };

  var trace2 = {
    x: rows.map((row) => row.name),
    y: rows.map((row) => row.danceability * 100),
    name: "Danceability",
    type: "bar",
  };

  var trace3 = {
    x: rows.map((row) => row.name),
    y: rows.map((row) => row.valence * 100),
    name: "Valence",
    type: "bar",
  };

  var data = [trace1, trace2, trace3];

  var layout = { barmode: "group" };

  Plotly.newPlot(document.getElementById("barGraph"), data, layout);
}

export function getUniqueSongs(rows) {
  const songs = [];
  const songMonths = {};

  // First, collect all months for each song
  rows.forEach((row) => {
    const date = new Date(row.snapshot_date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!songMonths[row.spotify_id]) {
      songMonths[row.spotify_id] = new Set();
    }
    songMonths[row.spotify_id].add(monthKey);
  });

  // Then only add songs that have data from at least 2 different months
  rows.forEach((row) => {
    if (
      !songs.find((song) => song.spotify_id === row.spotify_id) &&
      songMonths[row.spotify_id].size >= 2
    ) {
      songs.push(row);
    }
  });
  return songs;
}
