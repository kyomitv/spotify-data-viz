import unpack from "./unpack.js";
function listeChanson(rows) {
  let songs = unpack(rows.filter((row) => row.artists.includes("Bruno Mars")), "name");
  songs = Array.from(new Set(songs));
  return songs;
}

export default listeChanson;
