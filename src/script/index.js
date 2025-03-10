import downloadData from "./downloadData.js";
import unpack from "./unpack.js";
import graphmap from "./map.js";

async function main() {
  let startTime = new Date();
  const data = await downloadData("data/spotify_data.csv");

  console.log(data, `Data downloaded in ${new Date() - startTime} ms`);

  graphmap(
    data.filter(
      (row) =>
        row.artists.includes("Bruno Mars") &&
        row.name.includes("Die With A Smile") &&
        row.snapshot_date.includes("2024-11-03")
    )
  );
}

main();
