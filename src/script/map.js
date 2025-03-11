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
      reversescale: true,
    },
  ];
  var layout = {
    paper_bgcolor: "rgba(0,0,0,0)", // Fond noir pour la carte
    plot_bgcolor: "rgba(0,0,0,0)",
    geo: {
      bgcolor: "rgba(0,0,0,0)",
    },
  };

  Plotly.newPlot(document.getElementById("map"), data, layout, {
    showLink: false,
  });
}

export function getdate(rows) {
  let dates = unpack(rows, "snapshot_date");
  dates = Array.from(new Set(dates));
  return dates;
}
