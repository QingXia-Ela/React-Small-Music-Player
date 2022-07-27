import './index.scss';

import { connect } from 'react-redux';

function SongImg(props: { [propName: string]: any }) {
  return (
    <div className="song_img">
      <img
        src={props.avatar ? props.avatar : require('@/assets/images/ico.png')}
        alt=""
      />
    </div>
  );
}

export default connect(
  (state: { [propName: string]: any }) => ({
    avatar: state.MusicPlayer.currentSong?.avatar,
  }),
  {},
)(SongImg);
