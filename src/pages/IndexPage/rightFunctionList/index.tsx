import './index.scss';
import { connect } from 'react-redux';

import TransparentBox1 from '@/components/pages/transparentBox1';
import TransparentButton from '@/components/transparentButton';

import { nextSong } from '@/redux/modules/musicPlayer/actions';

function RightFunctionList(props: { [propName: string]: any }) {
  return (
    <TransparentBox1 title="功能列表">
      <div className="right_function_list">
        <TransparentButton onClick={() => props.nextSong(true)}>
          随机播放一曲
        </TransparentButton>
        <TransparentButton>浏览当前播放列表</TransparentButton>
        <TransparentButton>查看所有歌曲</TransparentButton>
        <TransparentButton>当前播放歌曲详情</TransparentButton>
        <TransparentButton>切换背景图</TransparentButton>
      </div>
    </TransparentBox1>
  );
}

export default connect((state: { [propName: string]: any }) => ({}), {
  nextSong,
})(RightFunctionList);
