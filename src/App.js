import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {

    fetch(`/search`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }) )
  }

  render() {

    if( this.state.data && this.state.data.results ){
      return (
        <div>
          {this.state.data.results.length} Matches for 'Law and Order'
          <ul>
            {
            this.state.data.results.map(el => (
              <li>
                {el.name}
              </li>
            ))
            }
          </ul>
        </div>
      );
    }

    return (
      <div>
        No Data
      </div>
    );
  }
}

export default App;