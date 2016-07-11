import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Songs } from '../api/songs.js';
import SongSelector from './SongSelector.jsx';
import SongView from './SongView.jsx'

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
      return <SongSelector
        songs={this.props.songs}
        onNewSong={() => this.createNewSong()}
        onSongSelect={(selectedSong) => this.setState({ selectedSong: selectedSong, showSongSelector: false, isEditing: false })} />
    } else {
      return <SongView
        isEditing={this.state.isEditing}
        song={this.getSelectedSong()}
        onToggleEdit={() => this.toggleEdit()}
        onGoToSongSelector={() => this.goToSongSelector()} />
    }
  }
}

export default createContainer(() => {
  return {
    songs: Songs.find({}).fetch()
  }
}, App)
