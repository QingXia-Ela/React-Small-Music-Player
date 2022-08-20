import { getSongByID } from '@/api/music';
import { getDetailList } from '@/api/SongList';
import {
  CHANGEDETAILSONGLIST,
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  CHANGESONGLISTLOADINGSTATE,
  PLAYSONGLIST,
  UPDATEUSERSONGSHEET,
} from '@/redux/constant';
import { message } from 'antd';
import { changeAllQueue } from '../musicPlayer/actions';

import store from '@/redux';

/**
 * 设置详细歌单加载状态
 * @param data 要设置的状态，不传入则对当前状态取反
 */
export const changeSongListLoadingState = (data?: boolean) => ({
  type: CHANGESONGLISTLOADINGSTATE,
  data,
});

/**
 * 替换当前详情列表，仅改变 Song List 页面 右下模块的列表，不进行播放
 * @param data 某个歌单的歌曲信息
 */
export const changeSongDetailList = (data: any[]) => ({
  type: CHANGEDETAILSONGLIST,
  data,
});

/**
 * 播放当前选中的播放列表，也可以传入指定播放列表进行播放
 * @param data 指定播放的列表，不传入则播放状态中 current Detail List 内的歌曲
 */
export const playSongList = (data?: any[]) => {
  return () => {
    if (data) store.dispatch(changeAllQueue(data, true));
    else {
      let SongListData = store.getState().SongList.currentDetailList;
      if (SongListData && SongListData.length) {
        store.dispatch(changeAllQueue(SongListData, true));
      }
    }
  };
};

/**
 * 改变右侧播放列表简略信息
 * @param data 传入标识，如果为数字 id 代表网易云歌单，如果是字符串就是上方的俩列表
 *
 * 字符串 `current` 代表当前播放列表，`myfavorite` 代表我喜爱的音乐，`search` 代表搜索列表
 */
export const changeSongListId = (
  data: string | number | { id: number; type: string },
  offset?: number,
) => {
  let target = null;
  if (typeof data === 'number') {
    target = data;
  } else if (typeof data == 'object') {
    if (data.id) {
      switch (data.type) {
        case 'myfavorite':
          target = data.id;
          break;
        default:
          break;
      }
    }
  }

  if (typeof target === 'number') {
    store.dispatch(changeSongListLoadingState(true));
    getDetailList(target!, offset ? offset : 0)
      .then((res: any) => {
        store.dispatch(changeSongDetailList(res.songs));
      })
      .catch(() => {
        message.error('获取歌单详情失败');
      })
      .finally(() => {
        store.dispatch(changeSongListLoadingState(false));
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

/**
 * @param data `boolean` 改变正在展示的播放列表
 */
export const changeShowSubscribeList = (data: boolean) => ({
  type: CHANGESHOWSUBSCRIBELIST,
  data,
});
