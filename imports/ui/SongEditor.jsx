import React, { Component, PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/kr_theme';

export default class SongEditor extends Component {
  render() {
    return (
      <AceEditor
        mode="markdown"
        theme="kr_theme"
        name="songEditor"
        editorProps={{
          $blockScrolling: true
        }}
        wrapEnabled={true}
        height="100%"
        width="100%"
        showPrintMargin={false}
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
