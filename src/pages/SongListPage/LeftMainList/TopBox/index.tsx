import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import './index.scss';

import {
  UnorderedListOutlined,
  CaretRightOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import BlackListItem from '@/components/BlackListItem';
import { changeSongListId } from '@/redux/modules/SongList/action';

interface TopBoxProps {
  userInfo?: { [propName: string]: any };
  currentListId: string | number;
  changeSongListId: Function;
}

interface TopBoxState {}

class TopBox extends React.Component<TopBoxProps, TopBoxState> {
  state = {};

  judgeActive = (id: string): string => {
    const cId = this.props.currentListId;
    if (typeof cId === 'string' && cId === id) return 'active';
    return '';
  };

  render() {
    return (
      <div className="top_box">
        <Input className="black_input" placeholder="搜索..."></Input>
        <BlackListItem
          iconBefore={<UnorderedListOutlined />}
          className={this.judgeActive('current')}
          onClick={() => this.props.changeSongListId('current')}
        >
          <span>当前播放列表</span>
        </BlackListItem>
        <BlackListItem
          iconBefore={<HeartOutlined />}
          className={this.judgeActive('myfavorite')}
          onClick={() => this.props.changeSongListId('myfavorite')}
        >
          <span>我喜爱的音乐</span>
        </BlackListItem>
        <BlackListItem iconBefore={<CaretRightOutlined />}>
          <span>正在播放</span>
        </BlackListItem>
      </div>
    );
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentListId: state.SongList.currentListId,
  }),
  {
    changeSongListId,
  },
)(TopBox);
