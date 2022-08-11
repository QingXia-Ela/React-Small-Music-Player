import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Modal, message } from 'antd';
import { Link, NavLink } from 'umi';

import TransparentButton from '@/components/transparentButton';
import Logout from '@/components/Logout';

import {
  showLoginModal,
  changeLoginState,
  showLogoutModal,
} from '@/redux/modules/Login/action';
import { logout } from '@/api/login';
import { ISLOGIN } from '@/constant/LocalStorage';

interface RightNavProps {
  showLoginModal: Function;
  showLogoutModal: Function;
  changeLoginState: Function;
  isLogin: boolean;
}

interface RightNavState {}

class RightNav extends React.Component<RightNavProps, RightNavState> {
  render() {
    return (
      <div className="right_nav">
        <Link to="/" className="transparent_button">
          主页
        </Link>
        <NavLink
          to="/SongList"
          activeClassName="transparent_button active"
          className="transparent_button"
        >
          音乐
        </NavLink>
        <TransparentButton>
          <span className="content">设置</span>
        </TransparentButton>
        <TransparentButton>
          <span onClick={this.judgeLoginMode} className="content">
            {this.props.isLogin ? '退出登录' : '登陆'}
          </span>
        </TransparentButton>
        <Logout />
      </div>
    );
  }

  judgeLoginMode = () => {
    if (!window.navigator.onLine) {
      message.error('网络错误，请检查网络是否正常！');
      return;
    }
    if (this.props.isLogin) this.props.showLogoutModal(true);
    else this.props.showLoginModal(true);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isLogin: state.Login.isLogin,
  }),
  {
    showLogoutModal,
    showLoginModal,
    changeLoginState,
  },
)(RightNav);
