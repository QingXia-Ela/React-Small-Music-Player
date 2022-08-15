import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import {
  LoadingOutlined,
  SwapOutlined,
  PlaySquareOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { getUserMusicList } from '@/api/SongList';

import { showLoginModal, showLogoutModal } from '@/redux/modules/Login/action';
import {
  updateUserSongSheet,
  changeSongListId,
  changeShowSubscribeList,
} from '@/redux/modules/SongList/action';

import WhiteScrollBar from '@/components/WhiteScrollBar';
import BlackListItem from '@/components/BlackListItem';

interface BottomBoxProps {
  isLogin: boolean;
  showSubscribeList: boolean;
  currentListId: string | number;
  showLoginModal: Function;
  showLogoutModal: Function;
  updateUserSongSheet: Function;
  changeSongListId: Function;
  changeShowSubscribeList: Function;
  userInfo: { [propName: string]: any };
  selfCreateList: { [propName: string]: any }[];
  subscribeList: { [propName: string]: any }[];
}

interface BottomBoxState {
  showSubscribeList: boolean;
  spinning: boolean;
}

class BottomBox extends React.Component<BottomBoxProps, BottomBoxState> {
  state = {
    showSubscribeList: false,
    spinning: false,
  };
  changeShowListMode = () => {
    this.props.changeShowSubscribeList();
  };
  judgeShowList = () => {
    const list = this.props.showSubscribeList
      ? this.props.subscribeList
      : this.props.selfCreateList;
    return list.map((val) => (
      <BlackListItem
        key={val.id}
        iconBefore={<PlaySquareOutlined />}
        onClick={() => this.props.changeSongListId(val.id)}
        className={this.props.currentListId === val.id ? 'active' : undefined}
      >
        <span>{val.name}</span>
      </BlackListItem>
    ));
  };
  getSongList = () => {
    this.setState({
      spinning: true,
    });
    if (this.props.userInfo && this.props.userInfo.profile) {
      const uid = this.props.userInfo.profile.userId;
      getUserMusicList(uid)
        .then((res: any) => {
          if (res.playlist) {
            this.props.updateUserSongSheet(res.playlist);
          }
        })
        .finally(() => {
          this.setState({
            spinning: false,
          });
        });
    }
  };
  render() {
    return (
      <div className="bottom_box">
        <Spin
          spinning={this.state.spinning}
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} />
          }
        >
          <div className="title">我的网易云播放列表</div>
          <div className="mode_switch">
            <div className="mode_text">
              {this.props.showSubscribeList ? '我订阅的歌单' : '我创建的歌单'}
            </div>
            <div className="switch">
              <ReloadOutlined onClick={() => this.getSongList()} />
              <SwapOutlined onClick={this.changeShowListMode} />
            </div>
          </div>
          <div className="bottom_box_list_container">
            {this.props.isLogin ? (
              <WhiteScrollBar>{this.judgeShowList()}</WhiteScrollBar>
            ) : (
              <div className="login_tip">
                <span className="underline_button" onClick={this.judgeModal}>
                  登陆
                </span>
                &nbsp;获取更多信息
              </div>
            )}
          </div>
        </Spin>
      </div>
    );
  }
  componentDidMount() {
    this.getSongList();
  }
  judgeModal = () => {
    this.props.isLogin
      ? this.props.showLogoutModal(true)
      : this.props.showLoginModal(true);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isLogin: state.Login.isLogin,
    userInfo: state.Login.userInfo,
    selfCreateList: state.SongList.selfCreateList,
    subscribeList: state.SongList.subscribeList,
    currentListId: state.SongList.currentListId,
    showSubscribeList: state.SongList.showSubscribeList,
  }),
  {
    showLoginModal,
    showLogoutModal,
    updateUserSongSheet,
    changeSongListId,
    changeShowSubscribeList,
  },
)(BottomBox);
