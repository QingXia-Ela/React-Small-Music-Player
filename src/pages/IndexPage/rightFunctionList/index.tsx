import { useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import pubsub from 'pubsub-js';
import { history } from 'umi';
import { Modal, Button, Popconfirm } from 'antd';

import TransparentBox1 from '@/components/pages/transparentBox1';
import TransparentButton from '@/components/transparentButton';
import BlackUpload from '@/components/Upload';

import { nextSong } from '@/redux/modules/musicPlayer/actions';
import { changeBG } from '@/redux/modules/layouts/bg/action';

import { OPENERIGHTDRAWER } from '@/constant/PubSub';
import { BACKGROUND } from '@/constant/LocalStorage';

function RightFunctionList(props: { [propName: string]: any }) {
  const [showModal, setShowModal] = useState(false);

  const openRightDrawerToken = (data: boolean) => {
    pubsub.publish(OPENERIGHTDRAWER, data);
  };

  const confirmClearBG = () => {
    localStorage.removeItem(BACKGROUND);
    props.changeBG();
  };

  return (
    <TransparentBox1 title="功能列表">
      <div className="right_function_list">
        <TransparentButton onClick={() => props.nextSong(true)}>
          随机播放一曲
        </TransparentButton>
        <TransparentButton onClick={() => openRightDrawerToken(true)}>
          浏览当前播放列表
        </TransparentButton>
        <TransparentButton
          onClick={() => {
            if (props.currentSong) history.push('/music');
          }}
        >
          当前播放歌曲详情
        </TransparentButton>
        <TransparentButton onClick={() => setShowModal(true)}>
          切换背景图
        </TransparentButton>
        <Modal
          visible={showModal}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          title="修改背景图"
          className="black_modal"
          okText="确定"
          cancelText="取消"
          okButtonProps={{
            className: 'yellow_button',
            type: 'text',
          }}
          cancelButtonProps={{
            className: 'yellow_button negative',
            type: 'text',
          }}
        >
          <BlackUpload />
          <span className="illustration">
            说明：图片存储在本地存储中，不建议上传过大的图片，推荐在 1MB
            以内，最大 1.5MB，可以通过下方按钮清除图片
          </span>
          <Popconfirm
            placement="left"
            title="确认恢复默认背景图吗？"
            onConfirm={() => confirmClearBG()}
            okText="YES"
            cancelText="NO"
            icon={<i className="iconfont icon-24gl-warningCircle" />}
          >
            <Button className={'yellow_button negative'}>恢复默认背景图</Button>
          </Popconfirm>
        </Modal>
      </div>
    </TransparentBox1>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    currentSong: state.MusicPlayer.currentSong,
  }),
  {
    nextSong,
    changeBG,
  },
)(RightFunctionList);
