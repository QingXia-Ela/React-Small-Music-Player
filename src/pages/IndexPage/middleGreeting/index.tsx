import { connect } from 'react-redux';
import './index.scss';

import TransparentBox1 from '@/components/pages/transparentBox1';
import MusicControler from '@/components/MusicPlayer/Control/musicControler';
import TimeSlider from '@/components/MusicPlayer/Control/timeSlider';

import { showLoginModal, showLogoutModal } from '@/redux/modules/Login/action';
import { Fragment } from 'react';

function MiddleGreeting(props: { [propName: string]: any }) {
  const greeting = () => {
    const h = new Date().getHours();
    if (h >= 4 && h < 11) return '上午好';
    else if (h >= 11 && h < 14) return '中午好';
    else if (h >= 14 && h < 18) return '下午好';
    else return '晚上好';
  };

  return (
    <TransparentBox1>
      <div className="middle_greeting">
        <div className="greeting">
          {greeting()}，
          {props.isLogin ? (
            props.name
          ) : (
            <span
              className="underline_button"
              onClick={() => props.showLoginModal(true)}
            >
              登陆
            </span>
          )}
        </div>
        <div className="random_song">
          {props.isLogin ? (
            <Fragment>
              <span className="underline_button">获取每日推荐歌单</span>
              <span
                className="underline_button"
                onClick={() => props.showLogoutModal(true)}
              >
                退出当前登陆账号
              </span>
            </Fragment>
          ) : (
            <span>登陆解锁更多功能</span>
          )}
        </div>
        <div className="control_box">
          <span>当前正播放</span>
          <MusicControler />
          <TimeSlider />
        </div>
      </div>
    </TransparentBox1>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isLogin: state.Login.isLogin,
    name:
      state.Login.userInfo && state.Login.userInfo.profile
        ? state.Login.userInfo.profile.nickname
        : null,
  }),
  {
    showLoginModal,
    showLogoutModal,
  },
)(MiddleGreeting);
