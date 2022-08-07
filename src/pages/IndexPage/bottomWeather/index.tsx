import * as React from 'react';
import { connect } from 'react-redux';
import { Descriptions } from 'antd';

import './index.scss';
import TransparentBox1 from '@/components/pages/transparentBox1';
import { getWeather } from '@/redux/modules/Weather/action';

interface BottomWeatherProps {
  getWeather: Function;
  weather: { [propName: string]: any };
}

interface BottomWeatherState {}

class BottomWeather extends React.Component<
  BottomWeatherProps,
  BottomWeatherState
> {
  state = {};
  render() {
    const {
      baro,
      humidity,
      currentTemp,
      weatherDescription,
      feelTemp,
      airQuailty,
    } = this.props.weather;
    return (
      <TransparentBox1 title="当前天气">
        <Descriptions className="transparent_description">
          <Descriptions.Item label="当前气温">
            {currentTemp} ℃
          </Descriptions.Item>
          <Descriptions.Item label="体感温度">{feelTemp} ℃</Descriptions.Item>
          <Descriptions.Item label="天气情况">
            {weatherDescription}
          </Descriptions.Item>
          <Descriptions.Item label="空气质量指数">
            {airQuailty}
          </Descriptions.Item>
          <Descriptions.Item label="气压">{baro}百帕</Descriptions.Item>
          <Descriptions.Item label="湿度">{humidity} %</Descriptions.Item>
        </Descriptions>
      </TransparentBox1>
    );
  }

  componentDidMount() {
    this.props.getWeather();
  }
}

export default connect(
  (state: { [propName: string]: any }) => ({
    weather: state.Weather,
  }),
  {
    getWeather,
  },
)(BottomWeather);
