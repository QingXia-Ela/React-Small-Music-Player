import request from '@/utils/request';

export function getWeatherInfo() {
  return request({
    method: 'GET',
    url: 'http://localhost:8000/weather',
  });
}
