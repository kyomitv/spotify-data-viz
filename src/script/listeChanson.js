import unpack from "./unpack.js";
function listeChanson(rows) {
  let songs = unpack(rows, "name");
  songs = Array.from(new Set(songs));
  return songs;
}

export default listeChanson;
