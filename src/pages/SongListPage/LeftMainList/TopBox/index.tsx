import * as React from 'react';
import { connect } from 'react-redux';
import { Input, InputRef, message } from 'antd';
import { history } from 'umi';
import './index.scss';

import {
  CaretRightOutlined,
  HeartOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import BlackListItem from '@/components/BlackListItem';
import {
  changeSongListId,
  syncSearchWord,
} from '@/redux/modules/SongList/action';

interface TopBoxProps {
  userInfo?: { [propName: string]: any };
  currentListId: string | number | { id: number; type: string };
  changeSongListId: Function;
  syncSearchWord: Function;
  currentSong: Function;
  favoriteMusic: { [propName: string]: any } | null;
}

interface TopBoxState {}

class TopBox extends React.Component<TopBoxProps, TopBoxState> {
  state = {};

  InputRef: React.RefObject<InputRef> | null = React.createRef<InputRef>();

  judgeActive = (id: string): string => {
    let cId: string | number | { id: number; type: string };
    if (typeof this.props.currentListId === 'object')
      cId = this.props.currentListId.type;
    else cId = this.props.currentListId;

    if (typeof cId === 'string' && cId === id) return 'active';
    else if (
      this.props.favoriteMusic &&
      cId === this.props.favoriteMusic.id &&
      id == 'myfavorite'
    )
      return 'active';
    return '';
  };

  goSearch = () => {
    if (this.InputRef?.current!.input!.value.length) {
      this.props.syncSearchWord({
        keywords: this.InputRef?.current!.input!.value,
        type: 1,
      });
    } else {
      message.warning('搜索关键词不能为空');
    }
  };

  render() {
    return (
      <div className="top_box">
        <Input
          className="black_input_addon"
          placeholder="搜索..."
          ref={this.InputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.goSearch();
          }}
          addonAfter={<SearchOutlined onClick={() => this.goSearch()} />}
        ></Input>
        <BlackListItem
          iconBefore={<SearchOutlined />}
          className={this.judgeActive('search')}
          onClick={() => this.props.changeSongListId('search')}
        >
          <span>搜索歌曲</span>
        </BlackListItem>
        <BlackListItem
          iconBefore={<HeartOutlined />}
          className={this.judgeActive('myfavorite')}
          onClick={() =>
            this.props.changeSongListId({
              id: this.props.favoriteMusic
                ? this.props.favoriteMusic.id
                : undefined,
              type: 'myfavorite',
            })
          }
        >
          <span>我喜爱的音乐</span>
        </BlackListItem>
        <BlackListItem
          iconBefore={<CaretRightOutlined />}
          onClick={() => {
            if (this.props.currentSong) history.push('/music');
          }}
        >
          <span>正在播放</span>
        </BlackListItem>
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentListId: state.SongList.currentListId,
    favoriteMusic: state.SongList.favoriteMusic,
    currentSong: state.MusicPlayer.currentSong,
  }),
  {
    changeSongListId,
    syncSearchWord,
  },
)(TopBox);
