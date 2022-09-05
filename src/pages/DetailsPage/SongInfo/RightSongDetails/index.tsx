import * as React from 'react';
import './index.scss';

import RightMusicLyric from '@/components/MusicPlayer/lyrics';

interface RightSongDetailsProps {
  currentSong: any;
}

interface RightSongDetailsState { }

class RightSongDetails extends React.Component<
  RightSongDetailsProps,
  RightSongDetailsState
> {
  state = {};
  render() {
    return (
      <div className="right_song_details">
        <div className="info_container">
          <div className="title">{this.props.currentSong?.name}</div>
          <div className="author">
            {this.props.currentSong?.ar.map((val: any) => `${val.name} `)}
          </div>
        </div>
        <div className="lyric_container">
          <RightMusicLyric keepShow />
        </div>
      </div>
    );
  }
}

export default RightSongDetails;
