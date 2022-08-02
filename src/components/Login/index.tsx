import * as React from 'react';
import './index.scss';
import { Modal, message, Button } from 'antd';
import { connect } from 'react-redux';

import BlackInput from '@/components/Input';
import { showLoginModal, changeLoginState } from '@/redux/modules/Login/action';
import { getCaptchaCode, loginByCaptcha } from '@/api/login';
import { getInfo } from '@/api/music';

interface NeteaseLoginProps {
  showLoginModal: Function;
  changeLoginState: Function;
  showModal: boolean;
  isLogin: boolean;
}

interface NeteaseLoginState {}

class NeteaseLogin extends React.Component<
  NeteaseLoginProps,
  NeteaseLoginState
> {
  state = {
    phone: null,
    cCode: '',
    confirmloading: false,
    cCodeLoading: false,
  };
  sendMsgButton = () => (
    <Button
      className="yellow_button"
      onClick={this.getVerifyCode}
      loading={this.state.cCodeLoading}
    >
      获取验证码
    </Button>
  );
  render() {
    return (
      <div className="netease_login">
        <Modal
          title="登陆网易云"
          visible={this.props.showModal}
          onCancel={() => this.props.showLoginModal(false)}
          onOk={this.verifyLogin}
          className="black_modal"
          okButtonProps={{
            className: 'yellow_button',
            type: 'text',
          }}
          cancelButtonProps={{
            className: 'yellow_button negative',
            type: 'text',
          }}
          okText="登陆"
          cancelText="取消"
          confirmLoading={this.state.confirmloading}
          destroyOnClose={true}
        >
          <BlackInput
            value={this.state.phone}
            onChange={this.changePhoneText}
            placeholder="手机号"
            maxLength={11}
          />
          <BlackInput
            className="black_input_son"
            value={this.state.cCode}
            onChange={this.changeCaptchaCode}
            placeholder="验证码"
            type="password"
            addonAfter={this.sendMsgButton()}
          />
        </Modal>
      </div>
    );
  }

  changePhoneText = (e: any) => {
    if (e) {
      this.setState({
        phone: e.target.value.replace(/[^\d]/g, ''),
      });
    }
  };

  changeCaptchaCode = (e: any) => {
    if (e) {
      this.setState({
        cCode: e.target.value,
      });
    }
  };

  getVerifyCode = () => {
    if (this.state.phone) {
      this.setState({ cCodeLoading: true });
      getCaptchaCode(this.state.phone)
        .then(
          (res: any) => {
            if (res.data) message.success('验证码已发送！，请注意查收');
            else message.error('错误：' + res.message);
          },
          (err) => {},
        )
        .finally(() => {
          this.setState({ cCodeLoading: false });
        });
    } else {
      message.error('请输入完整信息');
    }
  };

  verifyLogin = () => {
    if (!(this.state.phone + '').length || !this.state.cCode) {
      message.error('请输入完整信息');
      return;
    }
    this.setState({
      confirmloading: true,
    });

    loginByCaptcha({ phone: this.state.phone, captcha: this.state.cCode })
      .then(
        (res) => {
          message.success('登陆成功！');
          this.props.changeLoginState(true);
          this.props.showLoginModal(false);
          localStorage.setItem('isLogin', 'true');
          getInfo().then((res) => {
            console.log(res);
          });
        },
        (err) => {},
      )
      .finally(() => {
        this.setState({
          confirmloading: false,
        });
      });
  };
}

export default connect(
  (state: { [propName: string]: any }) => ({
    showModal: state.Login.showLoginModal,
    isLogin: state.Login.isLogin,
  }),
  {
    showLoginModal,
    changeLoginState,
  },
)(NeteaseLogin);
