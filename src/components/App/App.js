import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    let track1 = {
      name: 'Mambo',
      artist: 'Nz brut',
      album: 'N/A',
    };
    let track2 = {
      name: 'Mambo',
      artist: 'Nz brut',
      album: 'N/A',
    };
    let tracks = Array(3).fill(track1);
    let plTracks = Array(3).fill(track2);

    this.state = {
      searchResults: tracks,
      playlistName: 'Cringe',
      playlistTracks: plTracks,
    };
  }
  render() {
    return (
      <>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </>
    );
  }
}

export default App;
