import * as React from 'react';
import { Slider } from 'antd';
import './index.scss';

interface WhiteSliderProps {
  tipFormatter?: any;
  min: number;
  max: number;
  value: number;
  onChange?: Function;
  onAfterChange?: Function;
  mount?: Function;
}

interface WhiteSliderState {
  timeMark: number;
}

class WhiteSlider extends React.Component<WhiteSliderProps, WhiteSliderState> {
  state = {
    timeMark: 0,
  };

  render() {
    return (
      <div className="white_slider">
        <Slider
          tipFormatter={this.props.tipFormatter}
          min={this.props.min}
          max={this.props.max}
          value={this.state.timeMark}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
        ></Slider>
      </div>
    );
  }

  static getDerivedStateFromProps(
    props: WhiteSliderProps,
    state: WhiteSliderState,
  ) {
    return {
      timeMark: props.value ? props.value : 0,
    };
  }

  componentDidMount() {
    if (this.props.value) this.setState({ timeMark: this.props.value });
    this.props.mount && this.props.mount(this);
  }

  onChange = (e: number) => {
    this.props.onChange && this.props.onChange(e);
  };
  onAfterChange = (e: number) => {
    this.props.onAfterChange && this.props.onAfterChange(e);
  };
}

export default WhiteSlider;
