import request from '@/utils/request';

export function getUserMusicList(uid: number) {
  return request({
    method: 'GET',
    url: '/user/playlist',
    params: { uid, limit: 100 },
  });
}

export function getDetailList(id: number, offset?: number, limit: number = 20) {
  return request({
    method: 'GET',
    url: '/playlist/track/all',
    params: { id, offset, limit },
  });
}
