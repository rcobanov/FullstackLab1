const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number
}, { collection: 'Album' })
 
const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
