import downloadData from "./downloadData.js";
import unpack from "./unpack.js";

async function main() {
  let startTime = new Date();
  const data = await downloadData(
    "data/universal_top_spotify_songs_by_country.csv"
  );

  console.log(data, `Data downloaded in ${new Date() - startTime} ms`);
}

main();
