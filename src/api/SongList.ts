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

/**
 * 搜索api
 * @param keyword 搜索关键字
 * @param type 搜索类型
 */
export function searchSong(
  keywords: string,
  type:
    | 1
    | 10
    | 100
    | 1000
    | 1002
    | 1004
    | 1006
    | 1099
    | 1014
    | 1018
    | 2000 = 1,
  offset?: number,
  limit: number = 20,
) {
  return request({
    method: 'GET',
    url: '/search',
    params: { keywords, type, offset, limit },
  });
}
