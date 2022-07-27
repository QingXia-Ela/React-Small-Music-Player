import React, { Fragment } from 'react';
import './index.scss';
import { Lrc } from 'react-lrc';

import { connect } from 'react-redux';

interface RightMusicLyricProps {
  currentTime?: number;
  lyric: string | number | undefined;
  songID: number;
}

interface RightMusicLyricState {}

class RightMusicLyric extends React.Component<
  RightMusicLyricProps,
  RightMusicLyricState
> {
  state = {};
  render() {
    return <div className="right_music_lyric">{this.showLyric()}</div>;
  }

  showLyric = () => {
    const content = this.props.lyric;
    if (typeof content == 'number') {
      switch (content) {
        case -1:
          return <div className="empty_lyric">获取中...</div>;
        case 0 || undefined:
          return <div className="empty_lyric">无歌词信息</div>;
        case 1:
          return <div className="empty_lyric">纯音乐，请欣赏</div>;
        default:
          return <div className="empty_lyric">无歌词信息</div>;
      }
    } else if (typeof content == 'string') {
      return (
        <Lrc
          key={this.props.songID}
          lrc={content}
          lineRenderer={({ index, active, line }) => (
            <div className={`lyric_item ${active ? 'current' : ''}`}>
              {line.content}
            </div>
          )}
          currentMillisecond={
            this.props.currentTime
              ? parseInt(this.props.currentTime! * 1000 + '')
              : 0
          }
          topBlank={true}
          bottomBlank={true}
          intervalOfRecoveringAutoScrollAfterUserScroll={3000}
          className="lrc"
        />
      );
    } else {
      return <div className="empty_lyric">无歌词信息</div>;
    }
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentTime: state.MusicPlayer.audioEle?.currentTime,
    lyric:
      state.MusicPlayer.playQueue[state.MusicPlayer.currentSongIndex]
        ?.lyricContent,
    songID: state.MusicPlayer.currentSongIndex,
  }),
  {},
)(RightMusicLyric);
