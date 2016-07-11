import React, { Component, PropTypes } from 'react';
import { Songs } from '../api/songs.js';

export default class SongSelector extends Component {
  removeSong(song) {
    if(confirm("Haluutko nyt varmasti poistaa biisin " + song.title)) {
      Songs.remove(song._id)
    }
  }

  getSortedSongs() {
    if (this.props.songs === undefined) {
      return []
    }

    var array = this.props.songs.slice(0)
    array.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    return array;
  }

  render() {
    var songItem = (song) => (
        <div className="song" key={song._id}>
          <div onClick={ () => this.props.onSongSelect(song._id) } className="title">{ song.title }</div>
          <div onClick={ () => this.removeSong(song) } className="remove">Poista</div>
        </div>
    )

    return (
      <div className="container">
        <div className="topBar">
          <h1>Biisilista</h1>
          <button onClick={this.props.onNewSong}>Uusi</button>
        </div>
        <div className="songList">
          { this.getSortedSongs().map(songItem) }
        </div>
      </div>
    )
  }
}
