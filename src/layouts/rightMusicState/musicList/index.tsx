import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';
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
      <div
        className={`right_music_list_lyric ${
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
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    showLyric: state.MusicPlayer.showLyrics,
  }),
  {},
)(RightMusicListLyric);
