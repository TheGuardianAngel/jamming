import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    // let track1 = {
    //   id: 1,
    //   name: 'Mambo',
    //   artist: 'Nz brut',
    //   album: 'N/A',
    // };
    // let track2 = {
    //   id: 2,
    //   name: 'KYS',
    //   artist: 'I az taka',
    //   album: 'N/A',
    // };
    // let tracks = Array(3).fill(track1);
    // let plTracks = Array(3).fill(track2);

    this.state = {
      searchResults: [
        { id: 1, name: 'Mambo', artist: 'Nz brut', album: 'N/A' },
        { id: 2, name: 'Genata', artist: 'Nz brut', album: 'N/A' },
        { id: 3, name: '6sa', artist: 'Nz brut', album: 'N/A' },
      ],
      playlistName: 'Cringe',
      playlistTracks: [
        { id: 4, name: 'KYS', artist: 'SAME', album: 'SD' },
        { id: 5, name: 'Asd', artist: 'SAME', album: 'FASF' },
        { id: 6, name: 'Fgh', artist: 'SAME', album: 'NASFA' },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.splice(
      tracks.findIndex((currTr) => currTr.id === track.id),
      1
    );
    this.setState({ playlistTracks: tracks });
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
            <SearchResults tracklist={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              tracklist={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
