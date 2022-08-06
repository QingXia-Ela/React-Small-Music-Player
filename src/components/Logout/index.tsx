import * as React from 'react';
import { Fragment } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';

import {
  showLogoutModal,
  changeLoginState,
} from '@/redux/modules/Login/action';
import { logout } from '@/api/login';

import { ISLOGIN } from '@/constant/LocalStorage';

function Logout(props: { [propName: string]: any }) {
  let [loading, SetLoading] = React.useState<boolean>();

  const onCancel = () => {
    props.showLogoutModal(false);
  };

  const onOk = () => {
    SetLoading(true);
    logout()
      .then((res) => {
        message.success('退出成功！');
        props.changeLoginState(false);
        localStorage.setItem(ISLOGIN, '0');
      })
      .finally(() => {
        props.showLogoutModal(false);
        SetLoading(false);
      });
  };

  return (
    <Fragment>
      <Modal
        className="black_modal"
        visible={props.visible}
        title="确认操作"
        onCancel={onCancel}
        onOk={onOk}
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
        confirmLoading={loading}
      >
        <span className="text_only">确认退出登录吗</span>
      </Modal>
    </Fragment>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    visible: state.Login.showLogoutModal,
  }),
  {
    showLogoutModal,
    changeLoginState,
  },
)(Logout);
