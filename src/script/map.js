import downloadData from "./downloadData.js";
import unpack from "./unpack.js";

const inp = document.getElementById("choixdate");
export function graphmap(rows, date) {
  rows = rows.filter(
    (row) =>
      row.artists.includes("Bruno Mars") &&
      row.name.includes("Die With A Smile") &&
      row.snapshot_date.includes(date)
  );

  console.log(unpack(rows, "daily_rank"));
  const data = [
    {
      type: "choropleth",
      locationmode: "ISO-3",
      locations: unpack(rows, "country_iso3"),
      z: unpack(rows, "daily_rank").map(Number),
      colorscale: [
        [0, "#1db959ff"], // Couleur verte foncée
        [0.5, "#1db959f0"], // Couleur verte medium
        [1, "#1db95902"], // Couleur verte claire
      ],
      showscale: true, // Afficher la légende des couleurs,
    },
  ];
  var config = {
    displayModeBar: false, // Masquer la barre d'outils
  };
  var layout = {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    geo: {
      bgcolor: "rgba(0,0,0,0)",
      bordercolor: "rgba(100,100,100,0)",
      showland: true,
      landcolor: "rgba(256,256,256,0.1)",
      font: {
        color: "white", // Couleur du texte
      },
      dragmode: false, // Désactive le drag (glissement)
      scrollzoom: false, // Désactive le zoom avec la molette de la souris
    },
  };
  Plotly.newPlot(document.getElementById("map"), data, layout, config);
}

export function getdate(rows) {
  let dates = unpack(rows, "snapshot_date");
  dates = Array.from(new Set(dates));
  return dates;
}
