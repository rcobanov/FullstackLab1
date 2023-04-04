const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.put('api/albums/:title', async (req, res) => {
  
})

app.post('/api/albums/', async (req, res) => {
  try {
    const { title, artist, year } = req.body;
    console.log(title)
    const newAlbum = await Album.create({ title: title, artist: artist, year: year });
    res.send(newAlbum);
  } catch (err) {
    console.log(err)
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
