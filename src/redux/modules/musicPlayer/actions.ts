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
} from '@/redux/constant';
import { ThunkActionDispatch } from 'redux-thunk';

/**
 * 开始播放音频，播放的是 currentSong 中的歌曲，如果传入歌曲信息则播放指定的歌曲
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
 * @param id 歌曲id，不传默认播放队列最后一首歌
 * @returns
 */
export const changeSong = (
  id: number | null,
  playImmediately: boolean = true,
) => {
  return (dispatch: ThunkActionDispatch<any>) => {
    setTimeout(() => {
      if (playImmediately) {
        dispatch(
          play({
            id: id ? id : 1,
            isNull: false,
            name: 'light',
            url: 'https://res01.hycdn.cn/3dd573c01f661760145c9aa8d4915ef9/62D840AD/siren/audio/20220503/ae991b9f7fab14be9a7b1043512bb1d4.mp3',
          }),
        );
      }
    }, 1000);
  };
};

/**
 * 0 持续播放
 * 1 单曲循环
 * 2 全部循环
 * 3 随机播放
 * @param mode 播放模式
 * @returns
 */
export const switchPlayMode = (mode: number) => ({
  type: SWITCHPLAYMODE,
  mode,
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
 * @param id 要移除歌曲的 id
 */
export const removeFromQueue = (id: number) => ({ type: REMOVEFROMQUEUE, id });

/**
 * 移除所有歌曲
 */
export const clearQueue = () => ({ type: CLEARQUEUE });
