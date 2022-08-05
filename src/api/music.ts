import request from '@/utils/request';

export function getSongByID(ids: number) {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: { ids },
  });
}

export function getSongFileUrl(id: number) {
  return request({
    method: 'GET',
    url: '/song/url',
    params: { id },
  });
}

export function getLyricByLink(id: number) {
  return request({
    method: 'GET',
    url: '/lyric',
    params: { id },
  });
}

export function addPlayList(data: object) {
  return request({
    method: 'POST',
    url: '/api/addPlayList',
    data,
  });
}

export function getInfo() {
  return request({
    method: 'GET',
    url: '/user/subcount',
  });
}
