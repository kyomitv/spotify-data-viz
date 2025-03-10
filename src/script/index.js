import downloadData from "./downloadData.js";
import unpack from "./unpack.js";

function maxence(rows) {
    var frames = [];
    var x = unpack(rows, 'snapshot_date');
    var y = unpack(rows, 'daily_rank');

    var n = x.length; // Utilisez la longueur réelle des données
    for (var i = 0; i < n; i++) {
        frames[i] = {data: [{x: [], y: []}]};
        frames[i].data[0].x = x.slice(0, i + 1);
        frames[i].data[0].y = y.slice(0, i + 1);
    }

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'APT.',
        x: x,
        y: y,
        line: {color: 'lightgrey'}
    };

    var data = [trace1];

    var layout = {
        title: {
            text: 'Weekly Movement Animation'
        },
        xaxis: {
            range: [x[0], x[n - 1]],
            showgrid: false
        },
        yaxis: {
            range: [50, 1], // Définir le range de 1 à 3
            dtick: 5, // Incrément de 1 entre les valeurs affichées
            showgrid: false,
            tickformat: ',.0f' // Supprimer les virgules
        },
        legend: {
            orientation: 'h',
            x: 0.5,
            y: 1.2,
            xanchor: 'center'
        },
        updatemenus: [{
            x: 0.5,
            y: 0,
            yanchor: "top",
            xanchor: "center",
            showactive: false,
            direction: "left",
            type: "buttons",
            pad: {"t": 87, "r": 10},
            buttons: [{
                method: "animate",
                args: [null, {
                    fromcurrent: true,
                    transition: {
                        duration: 0,
                    },
                    frame: {
                        duration: 40,
                        redraw: false
                    }
                }],
                label: "Play"
            }, {
                method: "animate",
                args: [
                    [null],
                    {
                        mode: "immediate",
                        transition: {
                            duration: 0
                        },
                        frame: {
                            duration: 0,
                            redraw: false
                        }
                    }
                ],
                label: "Pause"
            }]
        }]
    };

    Plotly.newPlot('myDiv', data, layout).then(function() {
        Plotly.addFrames('myDiv', frames);
    });
}

async function main() {
    let startTime = new Date();
    const data = await downloadData("data/spotify_data.csv");

    // Filtrer les données pour "APT."
    const filteredData = data.filter((row) => row.name === "APT." && row.country == '');
    filteredData.forEach(row => {
        row.date = new Date(row.snapshot_date);
    })
    filteredData.sort((a, b) => a.date - b.date);
    maxence(filteredData);
}

main();
