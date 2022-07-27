import React, { Fragment } from 'react';
import './index.scss';
import { Lrc } from 'react-lrc';

import { connect } from 'react-redux';

const str = `
[00:01.49]缺氧到似有幻象
[00:04.44]乏力地躺于地上
[00:08.15]合上双眼 用皮肤感应无常
[00:14.33]这里有过你 未及步离场
[00:20.14]被你的气味 筑起了围墙
[00:26.48]从头再呼吸 残存那种美
[00:38.41]现在尝到的苦
[00:44.49]从前是最动人甜味
[00:50.75]旧事物充斥空气内
[00:54.56]一呼一吸都有害
[00:57.90]床边有你 厅有你 进出于脑海
[01:03.57]寂寞充斥空气内 抑郁吸入来
[01:10.15]宁愿闭气 吸进你会沾湿眼袋
[01:21.39]勉强再试试站立
[01:24.40]自愿地展开学习
[01:28.00]尽快适应着 残忍的低气压
[01:34.25]似欠缺勇气 不敢失去你
[01:40.31]亦欠骨气让 身心也逃离
[01:46.46]从头再呼吸 沉沉那死气
[01:58.39]渗满氧化浪漫
[02:04.68]沉迷在这耐人寻味
[02:10.79]旧事物充斥空气内
[02:14.67]一呼一吸都有害
[02:17.95]床边有你 厅有你 进出于脑海
[02:23.51]寂寞充斥空气内 抑郁吸入来
[02:30.25]宁愿闭气 吸进你会沾湿眼袋
[02:36.19]窒息都不意外 不呼不吸不盼待
[02:42.67]不要你 不要你 要清空脑袋
[02:47.96]尽量振作也应该
[02:51.72]每一扇窗也打开
[02:54.99]不怕你 不怕你 怕呼吸有害
`;

interface RightMusicLyricProps {
  currentTime?: number;
  lyric: string | number | undefined;
}

interface RightMusicLyricState {}

class RightMusicLyric extends React.Component<
  RightMusicLyricProps,
  RightMusicLyricState
> {
  state = {};
  render() {
    // return (
    //     {
    //       str ? (
    //         <Lrc
    //           lrc={str}
    //           lineRenderer={({ index, active, line }) => (<div className={`lyric_item ${active ? 'current' : ''}`}>{line.content}</div>)}
    //           currentMillisecond={this.props.currentTime ? parseInt((this.props.currentTime! * 1000) + '') : 0}
    //           topBlank={true}
    //           bottomBlank={true}
    //           className='lrc'
    //         />
    //       ) : (
    //         <div className='empty_lyric'>无相关歌词</div>
    //       )
    //     }

    //     {/* {this.props.currentTime ? this.props.currentTime : 'empty'} */}
    // );
    return <div className="right_music_lyric">{this.showLyric()}</div>;
  }

  showLyric = () => {
    const content = this.props.lyric;
    if (typeof content == 'number') {
      switch (content) {
        case -1:
          return <div className="empty_lyric">获取中...</div>;
        case 0:
          return <div className="empty_lyric">无歌词信息</div>;
        case 1:
          return <div className="empty_lyric">纯音乐，请欣赏</div>;
        default:
          return <div className="empty_lyric">无歌词信息</div>;
      }
    } else if (typeof content == 'string') {
      return (
        <Lrc
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
    }
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentTime: state.MusicPlayer.audioEle?.currentTime,
    lyric: state.MusicPlayer.lyricContent,
  }),
  {},
)(RightMusicLyric);
