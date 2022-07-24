import * as React from 'react';
import './index.scss';
import MusicList from './musicList';
import MusicState from './musicState';

class RightMusicState extends React.Component {
  state = {};
  render() {
    this.props;
    return (
      <div className="right_music_state">
        <div className="hover_light">1</div>
        <div className="list_box active">
          <MusicState />
          <MusicList />
        </div>
      </div>
    );
  }
}

export default RightMusicState;
