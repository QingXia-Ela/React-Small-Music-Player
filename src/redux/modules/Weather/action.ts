import { ThunkActionDispatch } from 'redux-thunk';

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
        airQuailty: dewPt,
        currentTemp: temp,
        feelTemp: feels,
        humidity: rh,
        baro,
        weatherDescription: cap,
      };
      dispatch({ type: GETWEATHER, data: info });
    } catch (err) {
      console.log('获取天气出错');
    }
  };
};
