const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

// Serve our base route that returns a Hellow World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

if( process.env.API_KEY ){
  const base = `api_key=${process.env.API_KEY}&language=en-US&include_adult=false`;
  app.get('/api/search', (req, res) => {
    const query = encodeURI('law and order');
    fetch(`https://api.themoviedb.org/3/search/tv?${base}&page=1&query=${query}`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  });

  app.get('/api/random', (req, res) => {
    const showId = 549;
    fetch(`https://api.themoviedb.org/3/tv/${showId}?${base}`)
      .then(response => response.json())
      .then(data => res.send(JSON.stringify(data)) )
  });
}

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
