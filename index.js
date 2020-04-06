const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')
const fetch = require('node-fetch');

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
    const moo = cowsay.say({ text: 'What tv series are you looking for?' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

if( process.env.API_KEY ){
  const base = `api_key=${process.env.API_KEY}&language=en-US&include_adult=false`;

  app.get('/api/random/:show', cors(), async (req, res, next) => {
    try {
      
      console.log(req.params);
      if( req.params && req.params.show && req.params.show.length < 50 ){
        const query  = encodeURI(req.params.show);
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?${base}&page=1&query=${query}`)
        const data = await response.json();
        const first = data.results[0].name || '';
        const showId = data.results[0].id || 0;
        let match = '';
        let season = {};
        let episode = {};
        if( first && showId ){
          const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}?${base}`);
          const showData = await response.json();
          const seasons = showData.seasons;
          if( seasons.length > 0 ){
            const randomSeason = await seasons[Math.floor(Math.random() * seasons.length)];
            season = randomSeason;
            const randomEpisode = await Math.floor(Math.random() * (randomSeason.episode_count - 1));
            if( randomSeason.name && typeof randomEpisode === 'number' ){
              const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}/season/${randomSeason.season_number}/episode/${randomEpisode}?${base}`);
              const episodeData = await response.json();
              episode = episodeData;
              match = await `${randomSeason.name} episode ${randomEpisode} - ${episodeData.name}`;
              console.log(match,randomSeason,episodeData);
            }
          }
        }
       
        res.json({ 
          moo: cowsay.say({ 
            text: [ 
              `Found ${data.results.length} matching '${req.params.show}', using first one`,
              ...data.results.map( o => o.name ), '', first, match
            ].join("\n")
          }),
          episode,
          season,
        });
      } else {
        res.json({ 
            moo: cowsay.say({ text: `soup for you: ${req.params.show}`}) 
        });
      }
      
    } catch (err) {
      next(err)
    }
  });

  app.get('/api/search', cors(), async (req, res, next) => {
    try {
      const query = encodeURI('law and order');
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?${base}&page=1&query=${query}`)
      const text = req.params.say
      const moo = cowsay.say({ text })
      res.json({ moo })
    } catch (err) {
      next(err)
    }
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
