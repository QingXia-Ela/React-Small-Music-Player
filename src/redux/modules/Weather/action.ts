import { ThunkActionDispatch } from 'redux-thunk';
import { message } from 'antd';

import { getWeatherInfo } from '@/api/weather';
import { GETWEATHER } from '@/redux/constant';

export interface weatherStruct {
  airQuailty: number;
  currentTemp: number;
  feelTemp: number;
  humidity: number;
  baro: number;
  weatherDescription: string;
}

/**
 * 获取天气并更新到全局状态
 */
export const getWeather = () => {
  return async (dispatch: ThunkActionDispatch<any>) => {
    try {
      let res: any = await getWeatherInfo();

      const { dewPt, temp, feels, rh, baro, cap } =
        res.value[0].responses[0].weather[0].current;
      const info = {
        // 空气质量
        airQuailty: dewPt,
        // 当前气温
        currentTemp: temp,
        // 体感气温
        feelTemp: feels,
        // 湿度
        humidity: rh,
        // 气压
        baro,
        // 天气描述，如晴或多云
        weatherDescription: cap,
      }
      dispatch({ type: GETWEATHER, data: info });
    } catch (err) {
      message.error('获取天气出错');
    }
  };
};
