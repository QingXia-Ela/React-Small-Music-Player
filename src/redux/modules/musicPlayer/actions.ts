import {
  PLAY,
  SWITCHPLAYSTATE,
  PAUSE,
  CHANGEVOLUME,
  CHANGESONG,
  SWITCHPLAYMODE,
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
 * @param id 歌曲id
 * @returns
 */
export const changeSong = (
  id: number | null,
  playImmediately: boolean = false,
) => {
  return (dispatch: ThunkActionDispatch<any>) => {
    setTimeout(() => {
      console.log('async');

      if (playImmediately) {
        dispatch(
          play({
            id: 1,
            isNull: false,
            name: 'flame',
            url: 'https://res01.hycdn.cn/d167f1ef4a154ee90b74b67fe01deada/62D7E7D5/siren/audio/20220314/bb3fa6f24efaf63aaad76d0f6bafc0c2.mp3',
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
 * @param data 播放模式
 * @returns
 */
export const switchPlayMode = (mode: number) => ({
  type: SWITCHPLAYMODE,
  mode,
});
