import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    cow: '',
    text: '',
    season: {},
    episode: {},
  }

  componentDidMount() {
    this.fetchCow()
  }

  fetchCow = async () => {
    const response = await fetch(`/api/cow`)
    const initialCow = await response.json()
    const cow = initialCow.moo
    this.setState({ cow })
  }

  customCow = async evt => {
    evt.preventDefault()
    const text = this.state.text
    const response = await fetch(`/api/random/${text}`)
    const custom = await response.json();
    const cow = custom.moo;
    const state = { 
      cow, 
      text: '', 
      episode: custom.episode,
      season: custom.season,
    };
    console.log(state);
    this.setState(state);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    return (
      <div className="App">
        
        <code>{this.state.cow}</code>
        <form onSubmit={this.customCow}>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary btn-lg" type="submit">Roll Dice for Random Episode</button>
        </form> 

        { this.state.season.name ? <h3> {this.state.season.name}</h3> :<span></span> }
        { this.state.episode.name ? <h4> Title: {this.state.episode.name}</h4>  :<span></span> }
        { this.state.season.air_date ? <h4>  Air Date: {this.state.season.air_date}</h4>  :<span></span> }

        <div className="container">
            <div className="row">
                <div className="col-sm-3 col-md-6 col-lg-4">
                    { 
                    this.state.season.poster_path ? 
                    <img className="img-thumbnail" alt="season"
                      src={['https://image.tmdb.org/t/p/w500',this.state.season.poster_path ].join('')}
                    /> : <br/> 
                  }
                  { this.state.season.overview ? <p>  Overview: {this.state.season.overview}</p>  : <br/> }
                </div>
                <div className="col-sm-9 col-md-6 col-lg-8">
                  { 
                  this.state.episode.still_path ? 
                    <img className="img-thumbnail" alt="episode"
                      src={['https://image.tmdb.org/t/p/w500',this.state.episode.still_path ].join('')}
                    /> : <br/> 
                  }
                  { this.state.episode.overview ? <p> Overview: {this.state.episode.overview}</p>  : <br/> }
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

export default App
