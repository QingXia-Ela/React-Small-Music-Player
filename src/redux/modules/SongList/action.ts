import { getSongByID } from '@/api/music';
import { getDetailList } from '@/api/SongList';
import {
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  UPDATEUSERSONGSHEET,
} from '@/redux/constant';
import { message } from 'antd';
import { changeAllQueue } from '../musicPlayer/actions';

import store from '@/redux';

/**
 * 改变右侧播放列表
 * @param data 传入标识，如果为数字 id 代表网易云歌单，如果是字符串就是上方的俩列表
 *
 * 字符串 `current` 代表当前播放列表，`myfavorite` 代表我喜爱的音乐，`search` 代表搜索列表
 */
export const changeSongListId = (data: string | number) => {
  if (typeof data === 'number') {
    getDetailList(data)
      .then((res: any) => {
        store.dispatch(changeAllQueue(res.songs, true));
      })
      .catch(() => {
        message.error('获取歌单详情失败');
      });
  }
  return {
    type: CHANGESONGLISTID,
    data,
  };
};

/**
 * 更新用户歌单
 * @param data 一个符合网易云歌单格式的数组
 */
export const updateUserSongSheet = (data: object[]) => ({
  type: UPDATEUSERSONGSHEET,
  data,
});

export const changeShowSubscribeList = (data: boolean) => ({
  type: CHANGESHOWSUBSCRIBELIST,
  data,
});
