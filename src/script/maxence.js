import unpack from "./unpack.js";

export function maxence(rows) {
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

    monthlyData[monthKey].sum += parseInt(row.daily_rank);
    monthlyData[monthKey].count += 1;
  });

  const months = Object.keys(monthlyData);
  const averages = months.map(
    (month) => monthlyData[month].sum / monthlyData[month].count
  );

  var frames = [];
  var x = months;
  var y = averages;

  var n = x.length;
  for (var i = 0; i < n; i++) {
    frames[i] = { data: [{ x: [], y: [] }] };
    frames[i].data[0].x = x.slice(0, i + 1);
    frames[i].data[0].y = y.slice(0, i + 1);
  }

  var trace1 = {
    type: "scatter",
    mode: "lines+markers",
    name: "Selected Song",
    x: x,
    y: y,
    line: { color: "1DB9" },
    marker: { color: "#1DB9" },
  };

  var data = [trace1];

  var layout = {
    template: "plotly_dark",
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    width: 700,
    height: 500,
    font: {
      color: "white",
    },
    hovermode: "closest",
    title: {
      text: "",
    },
    xaxis: {
      range: [x[0], x[n - 1]],
      showgrid: false,
      fixedrange: true,
    },
    yaxis: {
      range: [50, 1],
      dtick: 10,
      showgrid: true,
      fixedrange: true,
      tickformat: ",.0f",
    },
    legend: {
      orientation: "h",
      x: 0.5,
      y: 1.2,
      xanchor: "center",
    },
  };

  var config = {
    displayModeBar: false,
  };

  function startAnimation() {
    Plotly.animate("myDiv", frames, {
      frame: {
        duration: 50,
        redraw: false,
      },
      transition: {
        duration: 50,
      },
      mode: "immediate",
    });
  }

  Plotly.newPlot("myDiv", data, layout, config).then(function () {
    Plotly.addFrames("myDiv", frames);
    // Démarrer l'animation initiale
    setTimeout(startAnimation, 100);
  });
}
