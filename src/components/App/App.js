import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.clearPlaylist = this.clearPlaylist.bind(this);
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

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((playlistTrack) => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistTracks: [],
      playlistName: 'New Playlist',
    });
    console.info(trackUris);
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  clearPlaylist() {
    console.log('cleared?');
    this.setState({ playlistTracks: [], playlistName: 'New Playlist' });
  }

  render() {
    return (
      <>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults tracklist={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              tracklist={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onClear={this.clearPlaylist}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
