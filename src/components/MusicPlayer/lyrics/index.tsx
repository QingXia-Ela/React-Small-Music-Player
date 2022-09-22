import React, { Fragment } from 'react';
import './index.scss';
import { Lrc, MultipleLrc } from 'react-lrc';

import { connect } from 'react-redux';

interface RightMusicLyricProps {
  currentTime?: number;
  lyric: string | number | undefined;
  songID: number;
  keepShow?: boolean;
}

interface RightMusicLyricState {}

class RightMusicLyric extends React.Component<
  RightMusicLyricProps,
  RightMusicLyricState
> {
  state = {};
  render() {
    return (
      <div
        className={`right_music_lyric ${
          this.props.keepShow ? 'keep_show' : ''
        }`}
      >
        {this.showLyric()}
      </div>
    );
  }

  showLyric = () => {
    const content: any = this.props.lyric;
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
            <div className={`lyric_item_group`}>
              <div className={`lyric_item ${active ? 'current' : ''}`}>
                {line.content}
              </div>
            </div>
          )}
          currentMillisecond={
            this.props.currentTime
              ? parseInt(this.props.currentTime! * 1000 + '')
              : 0
          }
          verticalSpace={true}
          recoverAutoScrollInterval={5000}
          className="lrc"
        />
      );
    } else if (content instanceof Array<String>) {
      return (
        <MultipleLrc
          key={this.props.songID}
          lrcs={content}
          lineRenderer={({ index, active, line }) => (
            <div className="lyric_item_group">
              {line.children.map((val) => (
                <div className={`lyric_item ${active ? 'current' : ''}`}>
                  {val.content}
                </div>
              ))}
            </div>
          )}
          currentMillisecond={
            this.props.currentTime
              ? parseInt(this.props.currentTime! * 1000 + '')
              : 0
          }
          verticalSpace={true}
          recoverAutoScrollInterval={5000}
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
