import * as React from 'react';
import './index.scss';
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

  render() {
    return (
      <div className="bottom_music_state">
        <div>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener"
            className="text_underline_decoration"
          >
            粤ICP备2022085367号
          </a>
          Copyright © Shiina - All Rights reserved. Website Powered by
          <a
            href="https://v3.umijs.org/zh-CN"
            target="_blank"
            rel="noopener"
            className="text_underline_decoration"
          >
            UmiJS
          </a>
          <a
            href="https://github.com/Binaryify/NeteaseCloudMusicApi"
            target="_blank"
            rel="noopener"
            className="text_underline_decoration"
          >
            NeteaseCloudMusicApi
          </a>
        </div>
        <div>
          本站为私人站点，仅提供歌曲试听服务，所有音频来源与解释权均归网易所有；为维护歌曲版权，本站已关闭所有歌曲下载服务；本站无法保证后台API的稳定性和安全性，如有需要稳定的服务请自行搭建
        </div>
      </div>
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
