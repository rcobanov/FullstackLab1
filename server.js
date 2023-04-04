const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter')
require('dotenv').config();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter)


mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to mongodb");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => console.log(err));

  