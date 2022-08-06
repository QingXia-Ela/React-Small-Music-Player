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
  SETLYRIC,
} from '@/redux/constant';
import { ThunkActionDispatch } from 'redux-thunk';

import { getLyricByLink, getSongByID, getSongFileUrl } from '@/api/music';
import { handleSongInfo } from '@/utils/handleSongInfo';

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
 * @param id 歌曲id，先向服务器发请求，成功后调用 Play action
 * @returns
 */
export const changeSong = (id: number | null) => {
  return (dispatch: ThunkActionDispatch<any>) => {
    if (typeof id === 'number') {
      let SongDetailsInfo: any = null,
        SongFileInfo: any = null;
      getSongByID(id)
        // 获取详细信息
        .then((res) => {
          if (res && 1) {
            SongDetailsInfo = { ...res };
            return Promise.resolve();
          }
        })
        // 获取歌曲文件
        .then(() =>
          getSongFileUrl(id).then(({ data }) => {
            SongFileInfo = data[0];
            return Promise.resolve();
          }),
        )
        // 处理并送到播放器
        .then(() => {
          const res = handleSongInfo(SongFileInfo, SongDetailsInfo);
          dispatch({ type: PLAY, data: res });
          return Promise.resolve();
        })
        // 获取歌词
        .then(() => {
          getLyric(id)(dispatch);
        })
        .catch((err) => {
          console.log(err);
        });
      //   .then((res: any) => {
      //     // 成功后获取歌词
      //     if (res && typeof res.lyric == 'number')
      //       dispatch({ type: SETLYRIC, data: { lyric: res.lyric, id } });
      //     else if (res) getLyric({ lyric: res.lyric, id })(dispatch);
      //   });
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
 * @param data 随机播放 flag
 */
export const nextSong = (data: boolean) => ({ type: NEXTSONG, data });

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
 * @param newList 是否是新的播放列表标记，用于控制播放器是否在替换后从头开始播放歌曲，默认关闭
 * @returns
 */
export const changeAllQueue = (data: object[], newList: boolean = false) => ({
  type: CHANGEALLQUEUE,
  data,
  newList,
});
/**
 * 设置播放位置
 * @param data 时间戳
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

/**
 * 单独获取歌词
 */
export const getLyric = (id: number) => {
  return async (dispatch: ThunkActionDispatch<any>) => {
    dispatch({ type: SETLYRIC, data: { lyric: -1, id } });
    getLyricByLink(id).then(
      (res: any) => {
        dispatch({
          type: SETLYRIC,
          data: { lyric: res.lrc.lyric, id },
        });
      },
      (err) => {
        console.log(err);
        dispatch({ type: SETLYRIC, data: { lyric: 0, id } });
      },
    );
  };
};
