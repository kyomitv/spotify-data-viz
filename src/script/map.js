import downloadData from "./downloadData.js";
import unpack from "./unpack.js";

export default function graphmap(rows) {
  const data = [
    {
      // x: unpack(rows, "country"),
      // y: unpack(rows, "daily_rank"),
      type: "choropleth",
      locationmode: "iso-3",
      locations: unpack(rows, "country"),
      z: unpack(rows, "daily_rank"),
      text: unpack(rows, "daily_rank"),
      autocolorscale: true,
    },
  ];
  const layout = {
    width: 1000,
    height: 600,
    title: "streams per country",
  };

  Plotly.newPlot(document.getElementById("map"), data, layout);
}
