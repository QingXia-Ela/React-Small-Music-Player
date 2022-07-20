import * as React from 'react';

import {
  play,
  pause,
  switchPlayState,
  changeSong,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

interface BottomMusicStateProps {
  play: Function;
  switchPlayState: Function;
  changeSong: Function;
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
      </div>
    );
  }
  play = (e: React.MouseEvent) => {
    this.props.play();
  };
  switchPlayState = () => {
    this.props.switchPlayState();
  };
  componentDidMount() {
    console.log(this.props.isPlay);
  }
  changeSong = () => {
    this.props.changeSong(
      this.playId.current.value.length
        ? parseInt(this.playId.current.value)
        : undefined,
    );
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isPlay: state.MusicPlayer.isPlay,
  }),
  { play, switchPlayState, changeSong },
)(BottomMusicState);
