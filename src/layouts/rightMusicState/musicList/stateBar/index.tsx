import './index.scss';

import { showLyrics } from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';
import TransparentButton from '@/components/transparentButton';

function RightMusicStateBar(props: { [propName: string]: any }) {
  return (
    <div className="right_music_state_bar">
      <span className="left_title">PLAYLIST</span>
      <div
        className="right_switch"
        onClick={() => props.showLyrics(!props.lyrics)}
      >
        <TransparentButton>
          {props.lyrics ? (
            <span>词</span>
          ) : (
            <i className="iconfont icon-24gl-playlist2"></i>
          )}
        </TransparentButton>
      </div>
    </div>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    lyrics: state.MusicPlayer.showLyrics,
  }),
  {
    showLyrics,
  },
)(RightMusicStateBar);
