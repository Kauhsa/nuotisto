import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactMarkdown from 'react-markdown';

import { Songs } from '../api/songs.js';
import SongEditor from './SongEditor.jsx';
import SongSelector from './SongSelector.jsx';

class App extends Component {
  constructor() {
    super()

    this.state = {
      selectedSong: undefined,
      showSongSelector: true,
      isEditing: false
    }
  }

  getSelectedSong() {
    return this.props.songs.find((song) => song._id === this.state.selectedSong)
  }

  createNewSong() {
    var newSongId = Songs.insert({ title: "(untitled)", contents: "" })
    this.setState({ selectedSong: newSongId, showSongSelector: false, isEditing: true })
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  goToSongSelector() {
    this.setState({ showSongSelector: true })
  }

  render() {
    if (this.state.showSongSelector) {
      return <SongSelector songs={this.props.songs} onNewSong={() => this.createNewSong()} onSongSelect={(selectedSong) => this.setState({ selectedSong: selectedSong, showSongSelector: false, isEditing: false })} />
    } else {
      return <SongView isEditing={this.state.isEditing} song={this.getSelectedSong()} onToggleEdit={() => this.toggleEdit()} onGoToSongSelector={() => this.goToSongSelector()}/>
    }
  }
}

class SongView extends Component {
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

export default createContainer(() => {
  return {
    songs: Songs.find({}).fetch()
  }
}, App)
