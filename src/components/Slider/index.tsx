import * as React from 'react';
import { Slider } from 'antd';
import {SliderSingleProps,SliderTooltipProps} from 'antd/lib/slider'
import './index.scss';

interface WhiteSliderProps extends SliderSingleProps {
  tooltip?: SliderTooltipProps;
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
          tooltip={this.props.tooltip}
          min={this.props.min}
          max={this.props.max}
          value={this.state.timeMark}
          vertical={this.props.vertical}
          onChange={this.onChange}
          onAfterChange={this.onAfterChange}
          step={this.props.step}
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
