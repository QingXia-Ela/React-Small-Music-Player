import { message } from 'antd';
interface songStructure {
  [propName: string]: any;
}

interface singleSongStructure {
  id: number;
  isNull: boolean;
  name: string;
  author: string;
  avatar: string;
  img: string;
  url: string;
  invalid: boolean;
  lyric: string;
}

let audioObj = new Audio();
audioObj.volume = 0.3;
let initAudio: songStructure = {
  isPlay: false,
  isMuted: false,
  isLoading: false,
  volume: 0.3,
  totalTime: 0,
  currentTime: 0,
  currentPrecent: 0,
  currentSong: null,
  currentSongIndex: 0,
  playQueue: [],
  /**
   * 0 持续播放
   * 1 单曲循环
   * 2 全部循环
   * 3 随机播放
   */
  playMode: 0,
  audioEle: audioObj,
  canPlay: false,
  showLyrics: false,
  // 右侧播放器是否展示
  rightStateShow: false,
};

import {
  PLAY,
  PAUSE,
  SWITCHPLAYSTATE,
  CHANGEVOLUME,
  SWITCHPLAYMODE,
  NEXTSONG,
  PREVSONG,
  REMOVEFROMQUEUE,
  CLEARQUEUE,
  CHANGEALLQUEUE,
  CHANGECURRENTTIME,
  SETCURRENTTIME,
  CHANGEBG,
  SUCCESSTOLOADSONG,
  FAILTOLOADSONG,
  SHOWLYRICS,
  MUTEPLAYER,
  SETLYRIC,
} from '@/redux/constant';

/**
 * 额外扩展
 */
import additionReducer from './additionReducer';

/**
 * 监听播放结束触发 PlayEnd 事件
 */
import store from '@/redux/index';
import { random, throttle } from 'lodash';
audioObj.addEventListener('ended', (e) => {
  switch (initAudio.playMode) {
    case 0:
      if (initAudio.currentSongIndex < initAudio.playQueue.length - 1)
        store.dispatch({ type: NEXTSONG });
      else {
        // initAudio.currentSongIndex = -1;
        store.dispatch({ type: SWITCHPLAYSTATE, data: false });
      }
      break;
    case 1:
      store.dispatch({ type: PLAY });
      break;
    case 2:
      store.dispatch({ type: NEXTSONG });
      break;
    case 3:
      let info = null;
      if (initAudio.playQueue.length == 1) info = { ...initAudio.playQueue[0] };
      else {
        while (!info || info.id == initAudio.currentSong.id)
          info = {
            ...initAudio.playQueue[random(0, initAudio.playQueue.length - 1)],
          };
      }
      store.dispatch({
        type: PLAY,
        data: info,
      });
      break;

    default:
      store.dispatch({ type: NEXTSONG });
      break;
  }
});

/**
 * 监听播放器 开始暂停 事件，修复通过耳机控制播放器播放时状态未改变的情况
 */
audioObj.addEventListener('play', (e) => {
  store.dispatch({ type: SWITCHPLAYSTATE, data: true });
});
audioObj.addEventListener('pause', (e) => {
  store.dispatch({ type: SWITCHPLAYSTATE, data: false });
});

/**
 * 纯播放器控制模块，直接发起请求
 * @param play 控制是否进行播放
 * @param songInfo 指定播放歌曲的信息
 * @param callback 回调函数
 * @returns
 */
const changePlayState = async (
  play: boolean = false,
  songInfo?: singleSongStructure | undefined,
  callback?: Function,
) => {
  try {
    if (songInfo) {
      audioObj.currentTime = 0;
      audioObj.pause();
      audioObj.src = songInfo.url;
    }

    if (play) {
      initAudio.canPlay = false;
      await audioObj.play();
      initAudio.canPlay = true;

      // 修改背景
      store.dispatch({
        type: CHANGEBG,
        data: songInfo ? songInfo.img : initAudio.currentSong.img,
      });
      store.dispatch({ type: SUCCESSTOLOADSONG });
      callback && callback();
      return Promise.resolve();
    } else audioObj.pause();
  } catch (error) {
    store.dispatch({ type: FAILTOLOADSONG });
    return Promise.reject(error).catch((err) => {
      message.error('工口发生，请检查网络是否存在问题');
    });
  }
  callback && callback();
};

// 开启时间轴变化监听
audioObj.addEventListener(
  'timeupdate',
  throttle((e) => {
    store.dispatch({
      type: CHANGECURRENTTIME,
      data: [audioObj.currentTime, audioObj.duration],
    });
  }, 500),
);

export default function AudioReducer(
  prevState = initAudio,
  action: { [propName: string]: any },
) {
  const { type, data } = action;

  let newState = { ...initAudio };

  /**
   * 修改当前播放歌曲信息，不包括修改播放器源
   * @param index 将 CurrentSong 修改为队列的第几首歌
   */
  const changeSong = (index: number | undefined) => {
    if (
      typeof index === 'number' &&
      index >= 0 &&
      index <= newState.playQueue.length - 1
    )
      newState.currentSongIndex = index;
    else {
      newState.currentSongIndex = -1;
      newState.currentSong = null;
      return;
    }

    newState.currentSong = newState.playQueue.length
      ? { ...newState.playQueue[newState.currentSongIndex] }
      : null;
  };

  switch (type) {
    case PLAY:
      newState.isLoading = true;
      /**
       * 第一次播放从头开始
       */
      if (newState.currentSong === null) {
        if (newState.playQueue.length) {
          newState.currentSong = { ...newState.playQueue[0] };
        }
      }

      /**
       * 如果有传入指定歌曲数据
       */
      if (data) {
        let songIndex = -1;
        newState.playQueue.forEach((val: singleSongStructure, i: number) => {
          if (val.id == data.id) songIndex = i;
        });
        if (songIndex == -1) newState.playQueue.push({ ...data });

        newState.currentSong = { ...data };
        songIndex != -1
          ? changeSong(songIndex)
          : changeSong(newState.playQueue.length - 1);
      }
      if (!newState.currentSong.invalid)
        changePlayState(true, newState.currentSong).catch((res) => {
          console.log(res);
        });
      // 找一首能播的进行播放
      else {
        for (let i = 0; i < newState.playQueue.length; i++) {
          const val = newState.playQueue[i];
          if (!val.invalid) {
            newState.currentSong = { ...val };
            changePlayState(true, newState.currentSong);
            break;
          }
        }
      }
      break;
    case SUCCESSTOLOADSONG:
      newState.isLoading = false;
      newState.isPlay = true;
      newState.canPlay = true;
      newState.currentSong['invalid'] = false;
      break;

    case FAILTOLOADSONG:
      newState.isLoading = false;
      newState.isPlay = false;
      newState.canPlay = false;
      newState.currentSong['invalid'] = true;
      newState.playQueue.map((val: singleSongStructure, i: number) => {
        if (newState.currentSong.id == val.id) val['invalid'] = true;
        return { ...val };
      });
      break;

    case PAUSE:
      audioObj.pause();
      newState.isPlay = false;
      break;

    case SWITCHPLAYSTATE:
      if (newState.currentSong !== null && newState.canPlay) {
        if (typeof data != 'undefined') {
          changePlayState(data);
          newState.isPlay = data;
        } else {
          if (newState.isPlay) changePlayState(false);
          else changePlayState(true);
          newState.isPlay = !newState.isPlay;
        }
      }
      break;

    case CHANGEVOLUME:
      audioObj.muted = false;
      newState.isMuted = false;
      newState.volume = data;
      audioObj.volume = data;
      break;

    case SWITCHPLAYMODE:
      newState.playMode = data;
      break;

    case NEXTSONG:
      if (newState.playQueue.length && newState.currentSong) {
        // 随机模式
        if (newState.playMode == 3 || data) {
          let info = null;
          if (newState.playQueue.length == 1)
            info = { ...newState.playQueue[0] };
          else {
            while (!info || info.id == newState.currentSong.id)
              info = {
                ...newState.playQueue[random(0, newState.playQueue.length - 1)],
              };
          }
          newState.currentSong = info;
          changePlayState(true, info);
          break;
        }

        let allInvalid = true;
        let changeSongIndex = -1;
        let nextTempSongIndex = -1;

        newState.playQueue.forEach((val: singleSongStructure, i: number) => {
          if (!val.invalid) {
            allInvalid = false;
            if (nextTempSongIndex == -1) nextTempSongIndex = i;

            if (changeSongIndex == -1 && newState.currentSongIndex < i) {
              changeSongIndex = i;
              changeSong(i);
            }
          }
        });
        // 没有一首歌能播的
        if (allInvalid) break;
        // 队尾
        if (changeSongIndex == -1) changeSong(nextTempSongIndex);
        changePlayState(true, newState.currentSong);
      }
      break;

    case PREVSONG:
      if (newState.playQueue.length && newState.currentSong) {
        let allInvalid = true;
        let changeSongIndex = -1;
        let prevTempSongIndex = -1;

        for (let i = newState.playQueue.length - 1; i >= 0; i--) {
          const val = newState.playQueue[i];

          if (!val.invalid) {
            allInvalid = false;
            if (prevTempSongIndex == -1) prevTempSongIndex = i;
            if (newState.currentSongIndex > i) {
              changeSongIndex = 0;
              changeSong(i);
              break;
            }
          }
        }
        // 没有一首歌能播的
        if (allInvalid) break;
        // 队头
        if (changeSongIndex == -1) changeSong(prevTempSongIndex);
        changePlayState(true, newState.currentSong);
      }
      break;

    /**
     * 播放结束
     */
    case 'PlayEnd':
      newState.isPlay = false;
      let couldPlay = true;
      switch (newState.playMode) {
        case 0:
          if (newState.currentSongIndex == newState.playQueue.length - 1)
            couldPlay = false;
          else changeSong(newState.currentSongIndex + 1);
          break;
        case 1:
          break;
        case 2:
          changeSong(
            newState.currentSongIndex < newState.playQueue.length - 1
              ? newState.currentSongIndex + 1
              : 0,
          );

        case 3:
          changeSong(random(0, newState.playQueue.length - 1, false));
          break;
        default:
          break;
      }

      if (couldPlay) {
        changePlayState(true);
        newState.isPlay = true;
      }
      break;

    /**
     * 删除指定歌曲
     */
    case REMOVEFROMQUEUE:
      if (!newState.playQueue.length) break;
      /**
       * 当前正在播放的歌曲
       */
      if (data === newState.currentSong.id) {
        // 长度不为1
        if (newState.playQueue.length != 1) {
          changeSong(
            newState.currentSongIndex == newState.playQueue.length - 1
              ? 0
              : newState.currentSongIndex + 1,
          );
          changePlayState(true, newState.currentSong);
        }
        // 清空队列
        else {
          newState.currentSong = null;
          newState.playQueue = [];
          changePlayState(false);
          audioObj.src = '';
          newState.canPlay = false;
          newState.isPlay = false;
          break;
        }
      }
      let temp = -1;
      newState.playQueue.forEach((val: singleSongStructure, i: number) => {
        if (val.id == data) temp = i;
      });
      if (temp != -1) newState.playQueue.splice(temp, 1);
      break;

    /**
     * 清空播放队列
     */
    case CLEARQUEUE:
      newState.playQueue = [];
      newState.currentSong = null;
      break;

    /**
     * 更新当前时间轴
     */
    case CHANGECURRENTTIME:
      const [cur, total] = data;
      newState.currentTime = cur;
      newState.totalTime = total;
      newState.currentPrecent = (cur / total).toFixed(2);
      break;

    /**
     * 设置当前播放位置
     */
    case SETCURRENTTIME:
      audioObj.currentTime = data;
      break;
    /**
     * 替换整个播放列表
     */
    case CHANGEALLQUEUE:
      /**
       * 全新播放列表
       */
      if (action.newList) {
        if (!data || data.length == 0) {
          newState.playQueue = [];
          newState.currentSong = null;
          changePlayState(false);
          break;
        }
        newState.playQueue = [...data];
        newState.currentSong = { ...newState.playQueue[0] };
        changePlayState(true, newState.currentSong);
        newState.isPlay = true;
      } else if (typeof action.newList != 'undefined') {
        /**
         * 调整了播放顺序，没更新列表
         */
        newState.playQueue = [...data];
      }
      break;
    case SHOWLYRICS:
      typeof data != 'undefined'
        ? (newState.showLyrics = data)
        : (newState.showLyrics = !newState.showLyrics);
      break;
    case MUTEPLAYER:
      typeof data != 'undefined'
        ? (newState.isMuted = data)
        : (newState.isMuted = !newState.isMuted);
      audioObj.muted = newState.isMuted;
      break;

    /**
     * -1 获取中
     * 0 无歌词信息
     * 1 纯音乐
     * 其他为正常歌词
     */
    case SETLYRIC:
      const { lyric, id } = data;
      let i = -1;
      newState.playQueue.forEach((val: singleSongStructure, index: number) => {
        if (val.id == id) i = index;
      });
      if (i == -1) break;

      if (lyric == 0) newState.playQueue[i].lyricContent = 0;
      else if (lyric == 1) newState.playQueue[i].lyricContent = 1;
      else {
        newState.playQueue[i].lyricContent = lyric;
        newState.playQueue[i].lyricContent = lyric;
      }

      break;
    default:
      let trigger = false;
      /**
       * 额外添加事件
       */
      for (const i in additionReducer) {
        if (type == i) {
          trigger = true;
          additionReducer[i](newState, changeSong, changePlayState);
        }
      }
      if (trigger) break;
      break;
  }
  newState.playQueue = [...newState.playQueue];
  initAudio = newState;

  return newState;
}
