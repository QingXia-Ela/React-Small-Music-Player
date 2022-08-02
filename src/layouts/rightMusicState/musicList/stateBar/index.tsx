import { useRef, useState } from 'react';
import { Modal, message } from 'antd';

import './index.scss';

import { showLyrics } from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

import TransparentButton from '@/components/transparentButton';
import BlackInput from '@/components/Input';
import { addPlayList } from '@/api/music';

function RightMusicStateBar(props: { [propName: string]: any }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const name = useRef();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    const ele: HTMLInputElement | undefined = name.current;
    const val = ele!.value;

    if (!props.playQueue.length) message.error('歌单不能为空');
    else if (!val.length) message.error('请输入歌单名字');
    else {
      setConfirmLoading(true);

      await addPlayList({
        name: val,
        list: JSON.stringify(props.playQueue),
      }).then((res) => {
        message.success('添加成功');
      });

      ele!.value = '';
      setConfirmLoading(false);
      setVisible(false);
    }
  };

  return (
    <div className="right_music_state_bar">
      <span className="left_title">{props.lyrics ? 'LYRICS' : 'PLAYLIST'}</span>
      <div className="right_switch">
        <TransparentButton>
          <i onClick={showModal} className="iconfont icon-24gl-floppyDisk"></i>
        </TransparentButton>
        <div onClick={() => props.showLyrics(!props.lyrics)}>
          <TransparentButton>
            {!props.lyrics ? (
              <span>词</span>
            ) : (
              <i className="iconfont icon-24gl-playlist2"></i>
            )}
          </TransparentButton>
        </div>
      </div>
      <Modal
        title="设置歌单名称"
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
        <BlackInput ref={name} />
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
  },
)(RightMusicStateBar);
