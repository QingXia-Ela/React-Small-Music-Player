import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';
import RightMusicStateBar from './stateBar';
import RightPlayList from './playList';
import RightMusicLyric from './lyrics';

import { connect } from 'react-redux';

interface RightMusicListLyricProps {
  showLyric: boolean;
}

interface RightMusicListLyricState {}

class RightMusicListLyric extends React.Component<
  RightMusicListLyricProps,
  RightMusicListLyricState
> {
  state = {};
  render() {
    return (
      <div className="right_music_list_lyric">
        <RightMusicStateBar />
        <div
          className={`state_show_area ${
            this.props.showLyric ? 'show_lyric' : ''
          }`}
        >
          <RightPlayList />
          <CSSTransition
            in={this.props.showLyric}
            timeout={600}
            classNames="right_music_lyric_transition"
          >
            <RightMusicLyric />
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    showLyric: state.MusicPlayer.showLyrics,
  }),
  {},
)(RightMusicListLyric);
