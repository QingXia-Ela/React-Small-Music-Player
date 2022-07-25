import WhiteSlider from '@/components/Slider';
import * as React from 'react';
import './index.scss';

import { connect } from 'react-redux';
import { changeVolume } from '@/redux/modules/musicPlayer/actions';
import { throttle } from 'lodash';

interface RightMusicVolumeControlerProps {
  changeVolume: Function;
}

interface RightMusicVolumeControlerState {}

class RightMusicVolumeControler extends React.Component<
  RightMusicVolumeControlerProps,
  RightMusicVolumeControlerState
> {
  state = {
    vol: 0.3,
  };

  render() {
    return (
      <div className="right_music_volume_controler">
        <WhiteSlider
          min={0}
          max={1}
          step={0.01}
          value={this.state.vol}
          onChange={this.onChange}
          vertical={true}
          tipFormatter={null}
        />
      </div>
    );
  }

  onChange = throttle((n: number) => {
    this.setState({ vol: n });
    this.props.changeVolume(n);
  }, 20);
}

export default connect(
  (state: { [propName: string]: any }) => ({
    volume: state.MusicPlayer.volume,
  }),
  { changeVolume },
)(RightMusicVolumeControler);
