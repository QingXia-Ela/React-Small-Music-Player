import React, { createRef, RefObject } from 'react';

interface MainAudioProps {}

interface MainAudioState {
  isPlay: boolean;
  isMuted: boolean;
  volume: number;
  totalTime: number;
  currentTime: number;
  playQueue: string[];
  /**
   * 0 持续播放
   * 1 单曲循环
   * 2 全部循环
   * 3 随机播放
   */
  playMode: number;
  url: string;
}

class MainAudio extends React.Component<MainAudioProps, MainAudioState> {
  state: MainAudioState = {
    isPlay: false,
    isMuted: false,
    volume: 100,
    totalTime: 0,
    currentTime: 0,
    playQueue: [],
    playMode: 0,
    url: '',
  };
  audioEle: RefObject<HTMLAudioElement> = createRef();
  render() {
    const test = new Audio();
    return (
      <div>
        <audio ref={this.audioEle} id="mainAudio"></audio>
        <button
          onClick={() => {
            this.setState({ url: require('@/assets/audio/1.mp3') });
          }}
        >
          1
        </button>
      </div>
    );
  }

  componentDidMount() {
    let audio = this.audioEle.current;
    audio!.src = this.state.url;
  }
}

export default MainAudio;
