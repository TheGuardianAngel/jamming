import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render() {
    // TODO: when the API is integrated remove the index param and as key put track.id
    let tracks = this.props.searchResults.map((track, index) => {
      return <Track key={index} name={track.name} artist={track.artist} album={track.album} />;
    });
    return <div className="TrackList">{tracks}</div>;
  }
}
