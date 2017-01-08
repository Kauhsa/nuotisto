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
    if (this.props.song === undefined) {
        return <h1>??</h1>
      } else {
        return <input className="editTitle" value={this.getSongTitle()} onChange={(a) => { this.updateTitle(a.target.value) }} />
    }
  }

  getContents() {
    return <SongEditor contents={this.getSongContents()} onChange={(contents) => this.updateContents(contents)} />
  }

  render() {
    return (
      <div className="container">
        <div className="topBar">
          { this.getTitle() }
          <button onClick={this.props.onGoToSongSelector}>Biisit</button>
        </div>
        { this.getContents() }
      </div>
    )
  }
}
