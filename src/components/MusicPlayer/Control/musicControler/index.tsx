import React, { createRef, Fragment, RefObject } from 'react';
import './index.scss';
import TransparentButton from '@/components/transparentButton';
import RightMusicVolumeControler from './volume';

import {
  switchPlayState,
  prevSong,
  nextSong,
  changeVolume,
  showLyrics,
  mutePlayer,
  switchPlayMode,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

interface MusicControlerProps {
  name: string;
  isPlay: boolean;
  lyricsState: boolean;
  isMuted: boolean;
  playMode: number;
  showLyrics: Function;
  prevSong: Function;
  nextSong: Function;
  switchPlayState: Function;
  mutePlayer: Function;
  switchPlayMode: Function;
  showSongName?: boolean;
}

interface MusicControlerState {}

class MusicControler extends React.Component<
  MusicControlerProps,
  MusicControlerState
> {
  static defaultProps = {
    showSongName: true,
  };

  volEle: RefObject<HTMLDivElement> = createRef();

  render() {
    return (
      <Fragment>
        <p className="song_name">
          {this.props.showSongName
            ? this.props.name
              ? this.props.name
              : '_(:з」∠)_'
            : undefined}
        </p>
        <div className="music_controler">
          <TransparentButton closeHoverPointer={true}>
            <div
              className="right_music_volume_container"
              ref={this.volEle}
              onMouseLeave={() => this.switchVolumeSlider(false)}
            >
              <RightMusicVolumeControler />
              <span onMouseEnter={() => this.switchVolumeSlider(true)}>
                {this.props.isMuted ? (
                  <i
                    className="iconfont icon-24gl-volumeZero"
                    onClick={() => this.props.mutePlayer()}
                  ></i>
                ) : (
                  <i
                    className="iconfont icon-24gl-volumeMiddle"
                    onClick={() => this.props.mutePlayer()}
                  ></i>
                )}
              </span>
            </div>
          </TransparentButton>
          <TransparentButton>
            <i
              className="iconfont icon-24gl-previous"
              onClick={() => this.props.prevSong()}
            ></i>
          </TransparentButton>
          <TransparentButton>
            <div onClick={() => this.props.switchPlayState()}>
              {this.props.isPlay ? (
                <i className="iconfont icon-24gl-pause"></i>
              ) : (
                <i className="iconfont icon-24gl-play"></i>
              )}
            </div>
          </TransparentButton>
          <TransparentButton>
            <i
              className="iconfont icon-24gl-next"
              onClick={() => this.props.nextSong()}
            ></i>
          </TransparentButton>
          <TransparentButton>
            <div onClick={this.switchPlayMode}>{this.judgePlayMode()}</div>
          </TransparentButton>
        </div>
      </Fragment>
    );
  }

  judgePlayMode = () => {
    switch (this.props.playMode) {
      case 0:
        return <i className="iconfont icon-24gl-arrowRight"></i>;
      case 1:
        return <i className="iconfont icon-24gl-repeatOnce2"></i>;
      case 2:
        return <i className="iconfont icon-24gl-repeat2"></i>;
      default:
        return <i className="iconfont icon-24gl-shuffle"></i>;
    }
  };

  switchPlayMode = () => {
    this.props.playMode == 3
      ? this.props.switchPlayMode(0)
      : this.props.switchPlayMode(this.props.playMode + 1);
  };

  switchVolumeSlider = (mark: boolean) => {
    const ele = this.volEle.current;
    mark
      ? ele?.setAttribute('class', 'right_music_volume_container active')
      : ele?.setAttribute('class', 'right_music_volume_container');
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isPlay: state.MusicPlayer.isPlay,
    name: state.MusicPlayer.currentSong?.name,
    lyricsState: state.MusicPlayer.showLyrics,
    isMuted: state.MusicPlayer.isMuted,
    playMode: state.MusicPlayer.playMode,
  }),
  {
    switchPlayState,
    prevSong,
    nextSong,
    changeVolume,
    showLyrics,
    mutePlayer,
    switchPlayMode,
  },
)(MusicControler);
