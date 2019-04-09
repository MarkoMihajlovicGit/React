import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
//import ImageList from './ImageList';

class App extends React.Component {
  onSearchSubmit(term) {
    axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term },
      headers: {
        Authorization:
          'Client-ID e6a7ffb3eefe026719627db5b55387ef2b2808534608d2b26654aab289237dc4'
      }
    });
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '15px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
