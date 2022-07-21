import * as React from 'react';

import {
  play,
  switchPlayState,
  changeSong,
  nextSong,
  prevSong,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

interface BottomMusicStateProps {
  play: Function;
  switchPlayState: Function;
  changeSong: Function;
  nextSong: Function;
  prevSong: Function;
  audioEle: HTMLAudioElement;
  isPlay: boolean;
}

interface BottomMusicStateState {}

class BottomMusicState extends React.Component<
  BottomMusicStateProps,
  BottomMusicStateState
> {
  state = {};
  playId: any = React.createRef();
  render() {
    return (
      <div className="bottom_music_state">
        <button onClick={this.play}>play</button>
        <button onClick={this.switchPlayState}>
          {this.props.isPlay ? 'pause' : 'play'}
        </button>
        <button onClick={this.changeSong}>change</button>
        <input ref={this.playId} type="text" placeholder="test" />
        <button onClick={this.prevSong}>prev</button>
        <button onClick={this.nextSong}>next</button>
      </div>
    );
  }
  play = (e: React.MouseEvent) => {
    this.props.play();
  };
  switchPlayState = () => {
    this.props.switchPlayState();
  };
  componentDidMount() {}
  changeSong = () => {
    this.props.changeSong(
      this.playId.current.value.length
        ? parseInt(this.playId.current.value)
        : undefined,
    );
  };
  nextSong = () => {
    this.props.nextSong();
  };
  prevSong = () => {
    this.props.prevSong();
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isPlay: state.MusicPlayer.isPlay,
  }),
  { play, switchPlayState, changeSong, prevSong, nextSong },
)(BottomMusicState);
