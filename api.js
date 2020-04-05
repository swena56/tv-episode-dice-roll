const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
const cors = require("cors");

express()
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(cors())
  .get('/search', (req, res) => {
    const query = encodeURI('law and order');
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  })
  .get('/random', (req, res) => {
    const query = encodeURI('law and order');
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${query}&include_adult=false`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  })
  .listen(PORT, () => console.log(`http://localhost:${ PORT }`))