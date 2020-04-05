import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    cow: '',
    text: ''
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
    console.log(response);
    const cow = custom.moo
    this.setState({ cow, text: '' })
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
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default App
