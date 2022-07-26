import {
  PLAY,
  SWITCHPLAYSTATE,
  PAUSE,
  CHANGEVOLUME,
  SWITCHPLAYMODE,
  NEXTSONG,
  PREVSONG,
  REMOVEFROMQUEUE,
  CLEARQUEUE,
  CHANGEALLQUEUE,
  SETCURRENTTIME,
  SHOWLYRICS,
  MUTEPLAYER,
} from '@/redux/constant';
import { ThunkActionDispatch } from 'redux-thunk';

import { getSongByID } from '@/api/music';

/**
 * 开始播放音频，播放的是 currentSong 中的歌曲，如果传入歌曲信息则播放指定的歌曲，不请求服务器
 * @param data
 */
export const play = (data: undefined | { [propName: string]: any }) => ({
  type: PLAY,
  data,
});
/**
 * 停止播放音频
 */
export const pause = (data: undefined) => ({ type: PAUSE, data });
/**
 * 切换播放状态，如果传参指定状态则根据参数选择是否播放
 */
export const switchPlayState = (data: boolean | undefined) => ({
  type: SWITCHPLAYSTATE,
  data,
});
/**
 * 改变音量，需要指定数字大小
 * @param data 音量大小
 */
export const changeVolume = (data: number) => ({ type: CHANGEVOLUME, data });
/**
 * 改变正在播放的歌曲
 * @param id 歌曲id，先向服务器发请求，成功后调用 Play action
 * @returns
 */
export const changeSong = (id: number | null) => {
  return (dispatch: ThunkActionDispatch<any>) => {
    if (typeof id === 'number') {
      getSongByID(id).then((res) => {
        if (res && 1) {
          dispatch(play(res));
        }
      });
    }
  };
};

/**
 * 0 持续播放
 * 1 单曲循环
 * 2 全部循环
 * 3 随机播放
 * @param data 播放模式
 * @returns
 */
export const switchPlayMode = (data: number) => ({
  type: SWITCHPLAYMODE,
  data,
});

/**
 * 下一首
 */
export const nextSong = () => ({ type: NEXTSONG });

/**
 * 上一首
 */
export const prevSong = () => ({ type: PREVSONG });

/**
 * 从队列中移除指定歌曲
 * @param data 要移除歌曲的 id
 */
export const removeFromQueue = (data: number) => ({
  type: REMOVEFROMQUEUE,
  data,
});

/**
 * 移除所有歌曲
 */
export const clearQueue = () => ({ type: CLEARQUEUE });

/**
 * 替换播放列表
 * @param data 新的播放列表，传入空数组为清空播放列表，替换后从第一首歌开始播放
 * @returns
 */
export const changeAllQueue = (data: object[]) => ({
  type: CHANGEALLQUEUE,
  data,
});
/**
 * 设置播放位置
 */
export const setCurrentTime = (data: number) => ({
  type: SETCURRENTTIME,
  data,
});

/**
 * 展示歌词
 */
export const showLyrics = (data: boolean) => ({ type: SHOWLYRICS, data });

/**
 * 直接静音
 */
export const mutePlayer = (data: boolean) => ({ type: MUTEPLAYER, data });
