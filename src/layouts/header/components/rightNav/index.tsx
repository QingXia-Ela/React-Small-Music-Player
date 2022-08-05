import * as React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Modal, message } from 'antd';

import TransparentButton from '@/components/transparentButton';

import { showLoginModal, changeLoginState } from '@/redux/modules/Login/action';
import { logout } from '@/api/login';
import { ISLOGIN } from '@/constant/LocalStorage';

interface RightNavProps {
  showLoginModal: Function;
  changeLoginState: Function;
  isLogin: boolean;
}

interface RightNavState {}

class RightNav extends React.Component<RightNavProps, RightNavState> {
  state = {
    visible: false,
    confirmloading: false,
  };
  render() {
    return (
      <div className="right_nav">
        <TransparentButton>
          <span className="content">主页</span>
        </TransparentButton>
        <TransparentButton>
          <span className="content">音乐</span>
        </TransparentButton>
        <TransparentButton>
          <span className="content">设置</span>
        </TransparentButton>
        <TransparentButton>
          <span onClick={this.judgeLoginMode} className="content">
            {this.props.isLogin ? '退出登录' : '登陆'}
          </span>
        </TransparentButton>
        <Modal
          className="black_modal"
          visible={this.state.visible}
          title="确认操作"
          onCancel={() => this.setState({ visible: false })}
          onOk={this.logout}
          okButtonProps={{
            className: 'yellow_button',
            type: 'text',
          }}
          cancelButtonProps={{
            className: 'yellow_button negative',
            type: 'text',
          }}
          okText="确定"
          cancelText="取消"
          confirmLoading={this.state.confirmloading}
        >
          <span className="text_only">确认退出登录吗</span>
        </Modal>
      </div>
    );
  }

  logout = () => {
    this.setState({ confirmloading: true });
    logout()
      .then((res) => {
        message.success('退出成功！');
        this.props.changeLoginState(false);
        localStorage.setItem(ISLOGIN, '0');
      })
      .finally(() => {
        this.setState({ visible: false });
        this.setState({ confirmloading: false });
      });
  };

  judgeLoginMode = () => {
    if (!window.navigator.onLine) {
      message.error('网络错误，请检查网络是否正常！');
      return;
    }
    if (this.props.isLogin) this.setState({ visible: true });
    else this.props.showLoginModal(true);
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isLogin: state.Login.isLogin,
  }),
  {
    showLoginModal,
    changeLoginState,
  },
)(RightNav);
