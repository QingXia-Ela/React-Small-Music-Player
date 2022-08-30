import request from '@/utils/request';
import { getWeatherUrl } from '@/constant/api/weather';

export function getWeatherInfo() {
  return request({
    method: 'GET',
    url:
      process.env.NODE_ENV == 'production'
        ? getWeatherUrl
        : 'http://localhost:8000/weather',
  });
}
