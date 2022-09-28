import * as React from 'react';
import WhiteSlider from '@/components/Slider';
import './index.scss';

import { setCurrentTime } from '@/redux/modules/musicPlayer/actions';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

interface TimeSliderProps {
  currentTime: number;
  totalTime: number;
  setCurrentTime: Function;
  audioEle: HTMLAudioElement;
}

class TimeSlider extends React.Component<TimeSliderProps> {
  state = {
    tempTimeMark: 0,
  };
  private changingTime = false;
  render() {
    return (
      <div className="time_slider">
        <span className="time_text">
          {this.currentTimeDisplay()} /{' '}
          {this.props.totalTime
            ? this.formatTime(this.props.totalTime)
            : '--:--'}
        </span>
        <WhiteSlider
         tooltip={{formatter: null}}
          min={0}
          max={this.props.totalTime}
          value={this.state.tempTimeMark}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        />
      </div>
    );
  }

  changeTimeMark = (n: number) => {
    this.setState({
      tempTimeMark: n,
    });
  };
  onChange = (n: number) => {
    this.changingTime = true;
    this.setState({
      tempTimeMark: n,
    });
  };
  onAfterChange = (n: number) => {
    this.changingTime = false;
    this.changeTimeMark(n);
    this.props.setCurrentTime(n);
  };

  currentTimeDisplay = () => {
    if (this.changingTime) return this.formatTime(this.state.tempTimeMark);
    return this.props.currentTime
      ? this.formatTime(this.props.currentTime)
      : '--:--';
  };

  componentDidMount() {
    const ele = this.props.audioEle;
    ele.addEventListener(
      'timeupdate',
      throttle(() => {
        if (!this.changingTime) this.changeTimeMark(this.props.currentTime);
      }, 500),
    );
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }

  formatTime = (n: number) => {
    let min: string | number = Math.floor(n / 60) + '';
    let sec: string | number = Math.floor(n % 60);
    if (parseInt(min) < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    return min + ':' + sec;
  };
}

export default connect(
  (state: any) => ({
    currentTime: state.MusicPlayer.currentTime,
    totalTime: state.MusicPlayer.totalTime,
    audioEle: state.MusicPlayer.audioEle,
  }),
  {
    setCurrentTime,
  },
)(TimeSlider);
