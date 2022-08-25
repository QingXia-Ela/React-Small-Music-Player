import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';

import LeftCoverImg from './LeftCoverImg';
import RightSongDetails from './RightSongDetails';
import { history } from 'umi';
import { changeSong } from '@/redux/modules/musicPlayer/actions';

interface SongInfoProps {
  currentSong: any;
  changeSong: Function;
  match: match<{
    id: string;
  }>;
}

interface SongInfoState {}

class SongInfo extends React.Component<SongInfoProps, SongInfoState> {
  state = {};

  judgeId = () => {
    let id = parseInt(this.props.match.params.id);

    let needRequest = false;
    // 路径有 id 且合法
    if (typeof id === 'number' && !isNaN(id)) {
      if (this.props.currentSong?.id == id) return;
      // 俩 id 不匹配就去请求传入 id 的歌曲
      else needRequest = true;
    }
    // 路径没有传入 id
    else {
      if (this.props.currentSong) {
        id = this.props.currentSong.id;
        history.replace('/music/' + id);
        return;
      }
    }

    if (needRequest) {
      this.props.changeSong(id);
    }
  };

  render() {
    return (
      <div className="song_info">
        <LeftCoverImg link={this.props.currentSong?.avatar} />
        <RightSongDetails currentSong={this.props.currentSong} />
      </div>
    );
  }
  componentDidMount() {
    this.judgeId();
  }

  componentDidUpdate() {
    this.judgeId();
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentSong: state.MusicPlayer.currentSong,
  }),
  {
    changeSong,
  },
)(SongInfo);
