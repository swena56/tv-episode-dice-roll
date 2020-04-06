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
        
        { this.state.season.name ? <h6> {this.state.season.name}</h6> : <br/> }
        { this.state.season.overview ? <p> Overview: {this.state.season.overview}</p> : <br/> }
        { this.state.season.air_date ? <p> Air Date: {this.state.season.air_date}</p> : <br/> }
        
        { 
        this.state.season.poster_path ? 
          <img className="img-thumbnail" 
            src={['https://image.tmdb.org/t/p/w500',this.state.season.poster_path ].join('')}
          /> : <br/> 
        }

        { this.state.episode.name ? <p>Title: {this.state.episode.name}</p> : <br/> }
        { this.state.episode.overview ? <p>Overview: {this.state.episode.overview}</p> : <br/> }

        { 
        this.state.episode.still_path ? 
          <img className="img-thumbnail" 
            src={['https://image.tmdb.org/t/p/w500',this.state.episode.still_path ].join('')}
          /> : <br/> 
        }

        <form onSubmit={this.customCow}>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form> 
      </div>
    )
  }
}

export default App
