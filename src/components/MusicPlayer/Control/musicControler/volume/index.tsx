import WhiteSlider from '@/components/Slider';
import * as React from 'react';
import './index.scss';

import { connect } from 'react-redux';
import { changeVolume } from '@/redux/modules/musicPlayer/actions';
import { throttle } from 'lodash';

interface RightMusicVolumeControlerProps {
  changeVolume: Function;
  volume: number;
}

interface RightMusicVolumeControlerState {
  vol: number;
}

class RightMusicVolumeControler extends React.Component<
  RightMusicVolumeControlerProps,
  RightMusicVolumeControlerState
> {
  state = {
    vol: 0.3,
  };

  static getDerivedStateFromProps(
    props: RightMusicVolumeControlerProps,
    state: RightMusicVolumeControlerState,
  ) {
    return state.vol != props.volume
      ? {
          vol: props.volume,
        }
      : null;
  }

  render() {
    return (
      <div className="right_music_volume_controler">
        <WhiteSlider
          min={0}
          max={1}
          step={0.01}
          value={this.state.vol}
          onChange={(n: number) => this.onChange(n)(n)}
          vertical={true}
         tooltip={{formatter: null}}
        />
      </div>
    );
  }

  onChange = (n: number) => {
    this.setState({ vol: n });

    return this.throttleVol;
  };

  throttleVol = throttle((n: number) => {
    this.props.changeVolume(n);
  }, 50);
}

export default connect(
  (state: { [propName: string]: any }) => ({
    volume: state.MusicPlayer.volume,
  }),
  { changeVolume },
)(RightMusicVolumeControler);
