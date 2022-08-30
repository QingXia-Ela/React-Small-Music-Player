import { useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import './index.scss';

import { showLyrics, clearQueue } from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

import TransparentButton from '@/components/transparentButton';

function RightMusicStateBar(props: { [propName: string]: any }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    if (props.playQueue?.length) setVisible(true);
  };

  const handleOk = async () => {
    props.clearQueue();
    setVisible(false);
  };

  return (
    <div className="right_music_state_bar">
      <span className="left_title">{props.lyrics ? 'LYRICS' : 'PLAYLIST'}</span>
      <div className="right_switch">
        <TransparentButton>
          <i className="iconfont icon-24gl-trash2" onClick={showModal}></i>
        </TransparentButton>
        <div className="h100" onClick={() => props.showLyrics(!props.lyrics)}>
          <TransparentButton>
            {!props.lyrics ? (
              <span className="iconfont">词</span>
            ) : (
              <i className="iconfont icon-24gl-playlist2"></i>
            )}
          </TransparentButton>
        </div>
      </div>
      <Modal
        title="清空播放列表"
        visible={visible}
        centered
        className="black_modal"
        okText="确认"
        cancelText="取消"
        confirmLoading={confirmLoading}
        okButtonProps={{
          className: 'yellow_button',
          type: 'text',
        }}
        cancelButtonProps={{
          className: 'yellow_button negative',
          type: 'text',
        }}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <span style={{ color: '#fff', fontSize: '1.6rem' }}>
          确认清空当前播放列表吗
        </span>
      </Modal>
    </div>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    lyrics: state.MusicPlayer.showLyrics,
    playQueue: state.MusicPlayer.playQueue,
  }),
  {
    showLyrics,
    clearQueue,
  },
)(RightMusicStateBar);
