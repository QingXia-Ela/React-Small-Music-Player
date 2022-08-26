import './index.scss';
import { connect } from 'react-redux';
import pubsub from 'pubsub-js';
import { history } from 'umi';

import TransparentBox1 from '@/components/pages/transparentBox1';
import TransparentButton from '@/components/transparentButton';

import { nextSong } from '@/redux/modules/musicPlayer/actions';
import { OPENERIGHTDRAWER } from '@/constant/PubSub';

function RightFunctionList(props: { [propName: string]: any }) {
  const openRightDrawerToken = (data: boolean) => {
    pubsub.publish(OPENERIGHTDRAWER, data);
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
        <TransparentButton>切换背景图</TransparentButton>
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
  },
)(RightFunctionList);
