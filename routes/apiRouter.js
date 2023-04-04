
const express = require('express');
const router = express.Router();
const Album = require('../models/albumModel')


router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find({});
    res.send(albums);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/albums/:title', async (req, res) => {
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

router.put('/albums/:id', async (req, res) => {
  try {
    const paramId = req.params.id;
    const { title, artist, year } = req.body;
    const album = await Album.findByIdAndUpdate(paramId, { title: title, artist: artist, year: year }, { new: true });
    if (!album) {
      res.status(404).send(`404 : No album found with title ${title}`);
    } else {
      res.send(album);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/albums/:id', async (req, res) => {
  try {
    const paramId = req.params.id;
    const album = await Album.findByIdAndDelete(paramId);
    if (!album) {
      res.status(404).send(`404 : No album found with id ${paramId}`);
    } else {
      res.send(`Album with id ${paramId} deleted`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/albums/', async (req, res) => {
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

module.exports = router;
