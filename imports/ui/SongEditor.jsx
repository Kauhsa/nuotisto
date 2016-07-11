import React, { Component, PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/solarized_dark';

export default class SongEditor extends Component {
  render() {
    return (
      <AceEditor
        mode="markdown"
        theme="solarized_dark"
        name="songEditor"
        editorProps={{$blockScrolling: true}}
        value={this.props.contents}
        onChange={this.props.onChange}
      />
    );
  }
}

SongEditor.propTypes = {
  contents: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
