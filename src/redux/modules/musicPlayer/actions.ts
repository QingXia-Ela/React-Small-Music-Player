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

import store from '@/redux';

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

let changeSongDebounceFlag = false;
/**
 * 改变正在播放的歌曲
 * @param id 歌曲id，先向服务器发请求，成功后调用 Play action
 * @returns
 */
export const changeSong = (id: number | null) => {
  return () => {
    if (typeof id === 'number' && !changeSongDebounceFlag) {
      changeSongDebounceFlag = true;
      setTimeout(() => {
        changeSongDebounceFlag = false;
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
            const res = {
              SongDetailsInfo: SongDetailsInfo.songs[0],
              handleInfo: handleSongInfo(SongFileInfo, SongDetailsInfo),
            };
            store.dispatch(play(res));
            return Promise.resolve();
          })
          // 获取歌词
          .then(() => {
            getLyric(id)();
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
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

let nextSongDebounceFlag = false;
/**
 * 下一首
 * @param data 随机播放 flag
 */
export const nextSong = (data: boolean) => {
  return (dispatch: any) => {
    if (!nextSongDebounceFlag) {
      nextSongDebounceFlag = true;
      setTimeout(() => {
        dispatch({ type: NEXTSONG, data });
        nextSongDebounceFlag = false;
      }, 1000);
    }
  };
};

/**
 * 上一首
 */
export const prevSong = () => {
  return (dispatch: any) => {
    if (!nextSongDebounceFlag) {
      nextSongDebounceFlag = true;
      setTimeout(() => {
        dispatch({ type: PREVSONG });
        nextSongDebounceFlag = false;
      }, 1000);
    }
  };
};

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
export const changeAllQueue = (data: any[], newList: boolean = false) => {
  if (newList) changeSong(data[0].id)();
  return {
    type: CHANGEALLQUEUE,
    data,
    newList,
  };
};
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
  return async () => {
    store.dispatch({ type: SETLYRIC, data: { lyric: -1, id } });
    getLyricByLink(id).then(
      (res: any) => {
        store.dispatch({
          type: SETLYRIC,
          data: { lyric: res.lrc.lyric, id },
        });
      },
      (err) => {
        console.log(err);
        store.dispatch({ type: SETLYRIC, data: { lyric: 0, id } });
      },
    );
  };
};
