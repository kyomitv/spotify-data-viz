import downloadData from "./downloadData.js";
import unpack from "./unpack.js";

export function graphmap(rows) {
  console.log(unpack(rows, "daily_rank"));
  const data = [
    {
      type: "choropleth",
      locationmode: "ISO-3",
      locations: unpack(rows, "country_iso3"),
      z: unpack(rows, "daily_rank").map(Number),
      reversescale: true,
    },
  ];
  var layout = {};

  Plotly.newPlot(document.getElementById("map"), data, layout, {
    showLink: false,
  });
}

export async function getdate(rows) {
  let dates = [];
  rows.forEach((row) => {
    if (dates.length == 0 || !dates.includes(row.snapshot)) {
      dates.push(row.snapshot);
    }
  });
}

// getdate(document.getElementById("choixdate"));
