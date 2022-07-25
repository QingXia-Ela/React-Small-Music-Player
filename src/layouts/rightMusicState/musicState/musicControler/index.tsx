import './index.scss';
import TransparentButton from '@/components/transparentButton';

import {
  switchPlayState,
  prevSong,
  nextSong,
  changeVolume,
} from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';

function MusicControler(props: any) {
  return (
    <div className="music_controler">
      <TransparentButton>
        <i className="iconfont icon-24gl-volumeMiddle"></i>
      </TransparentButton>
      <TransparentButton>
        <i
          className="iconfont icon-24gl-previous"
          onClick={() => props.prevSong()}
        ></i>
      </TransparentButton>
      <TransparentButton>
        <div onClick={() => props.switchPlayState()}>
          {props.isPlay ? (
            <i className="iconfont icon-24gl-pause"></i>
          ) : (
            <i className="iconfont icon-24gl-play"></i>
          )}
        </div>
      </TransparentButton>
      <TransparentButton>
        <i
          className="iconfont icon-24gl-next"
          onClick={() => props.nextSong()}
        ></i>
      </TransparentButton>
      <TransparentButton>词</TransparentButton>
    </div>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    isPlay: state.MusicPlayer.isPlay,
  }),
  {
    switchPlayState,
    prevSong,
    nextSong,
    changeVolume,
  },
)(MusicControler);
