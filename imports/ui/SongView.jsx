import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import { Songs } from '../api/songs.js';
import SongEditor from './SongEditor.jsx';

export default class SongView extends Component {
  updateTitle(newTitle) {
    Songs.update(this.props.song._id, { $set: { title: newTitle }})
  }

  updateContents(newContents) {
    Songs.update(this.props.song._id, { $set: { contents: newContents }})
  }

  getSongTitle() {
    if (this.props.song === undefined) {
      return "Hetkinen..."
    } else {
      return this.props.song.title
    }
  }

  getSongContents() {
    if (this.props.song === undefined) {
      return ""
    } else {
      return this.props.song.contents
    }
  }

  getTitle() {
    if (this.props.isEditing && this.props.song !== undefined) {
      return <input className="editTitle" value={this.getSongTitle()} onChange={(a) => { this.updateTitle(a.target.value) }} />
    } else {
      return <h1>{this.getSongTitle()}</h1>
    }
  }

  getContents() {
    if (this.props.isEditing) {
      return <SongEditor contents={this.getSongContents()} onChange={(contents) => this.updateContents(contents)} />
    } else {
      return <div className="songContents"><ReactMarkdown softBreak="br" source={this.getSongContents()} /></div>
    }
  }

  getToggleEditButtonString() {
    if (this.props.isEditing) {
      return "Poistu";
    } else {
      return "Muokkaa";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="topBar">
          { this.getTitle() }
          <button onClick={this.props.onToggleEdit}>{ this.getToggleEditButtonString() }</button>
          <button onClick={this.props.onGoToSongSelector}>Biisit</button>
        </div>
        { this.getContents() }
      </div>
    )
  }
}
