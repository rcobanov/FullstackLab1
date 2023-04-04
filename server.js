const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find({});
    res.send(albums);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/albums/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const albums = await Album.find({ title: title });
    if (albums.length === 1) {
      const album = albums.shift();
      console.log("Triggered")
      res.send(album);
    } else if(albums.length > 1){
      res.send(albums)
    } else {
      res.status(404).send(`404 : No album found with title ${title}`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));


const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number
}, { collection: 'Album' })
 
const Album = mongoose.model("Album", albumSchema);
