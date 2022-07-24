import * as React from 'react';
import { Slider } from 'antd';
import {
  play,
  switchPlayState,
  changeSong,
  nextSong,
  prevSong,
  setCurrentTime,
  removeFromQueue,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

interface BottomMusicStateProps {
  play: Function;
  switchPlayState: Function;
  changeSong: Function;
  nextSong: Function;
  prevSong: Function;
  setCurrentTime: Function;
  removeFromQueue: Function;
  audioEle: HTMLAudioElement;
  isPlay: boolean;
  currentTime: number;
  totalTime: number;
}

interface BottomMusicStateState {}

class BottomMusicState extends React.Component<
  BottomMusicStateProps,
  BottomMusicStateState
> {
  state = {
    timeMark: 0,
  };
  private changingTime = false;
  playId: any = React.createRef();
  render() {
    return (
      <div className="bottom_music_state">
        <button onClick={this.switchPlayState}>
          {this.props.isPlay ? 'pause' : 'play'}
        </button>
        <button onClick={this.changeSong}>change</button>
        <button onClick={this.removeFromQueue}>remove</button>
        <input ref={this.playId} type="text" placeholder="test" />

        <button onClick={this.prevSong}>prev</button>
        <button onClick={this.nextSong}>next</button>
        <Slider
          tipFormatter={null}
          min={0}
          max={this.props.totalTime}
          value={this.state.timeMark}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        ></Slider>
      </div>
    );
  }

  switchPlayState = () => {
    this.props.switchPlayState();
  };
  changeSong = () => {
    this.props.changeSong(
      this.playId.current.value.length
        ? parseInt(this.playId.current.value)
        : 0,
    );
  };
  nextSong = () => {
    this.props.nextSong();
  };
  prevSong = () => {
    this.props.prevSong();
  };

  changeTimeMark = (n: number) => {
    this.setState({ timeMark: n });
  };

  removeFromQueue = () => {
    this.props.removeFromQueue(
      this.playId.current.value.length
        ? parseInt(this.playId.current.value)
        : 0,
    );
  };

  onChange = (n: number) => {
    this.changingTime = true;
    this.changeTimeMark(n);
  };
  onAfterChange = (n: number) => {
    this.changingTime = false;
    this.changeTimeMark(n);
    this.props.setCurrentTime(n);
  };

  componentDidMount() {
    const ele = this.props.audioEle;
    ele.addEventListener(
      'timeupdate',
      throttle(() => {
        if (!this.changingTime) this.changeTimeMark(this.props.currentTime);
      }, 1000),
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isPlay: state.MusicPlayer.isPlay,
    totalTime: state.MusicPlayer.totalTime,
    audioEle: state.MusicPlayer.audioEle,
    currentTime: state.MusicPlayer.currentTime,
  }),
  {
    play,
    switchPlayState,
    changeSong,
    prevSong,
    nextSong,
    setCurrentTime,
    removeFromQueue,
  },
)(BottomMusicState);
