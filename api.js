const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const base = `api_key${process.env.API_KEY}=&language=en-US`;

express()
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(cors())
  .get('/search', (req, res) => {
    const query = encodeURI('law and order');
    fetch(`https://api.themoviedb.org/3/search/tv?${base}&page=1&query=${query}`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  })
  .get('/about', (req, res) => {
    const showId = 549;
    fetch(`https://api.themoviedb.org/3/tv/${showId}?${base}`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  })
  .listen(PORT, () => console.log(`http://localhost:${ PORT }`))