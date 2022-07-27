import request from '@/utils/request';

export function getSongByID(id: number) {
  return request({
    method: 'GET',
    url: '/api/getMusic',
    params: { id },
  });
}

export function getLyricByLink(url: string) {
  return request({
    method: 'GET',
    url,
  });
}
