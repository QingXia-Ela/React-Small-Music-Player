interface songStructure {
  [propName: string]: any;
}

interface singleSongStructure {
  id: number;
  isNull: boolean;
  name: string;
  url: string;
}

let audioObj = new Audio();
let initAudio: songStructure = {
  isPlay: false,
  isMuted: false,
  volume: 0.5,
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
  store.dispatch({ type: 'PlayEnd' });
});
// 允许跨域音频
audioObj.crossOrigin = 'anonymous';

/**
 * 纯播放器控制模块
 * @param play 控制是否进行播放
 * @param url 设置播放器播放源
 * @param callback 回调函数
 * @returns
 */
const changePlayState = async (
  play: boolean = false,
  url?: string | undefined,
  callback?: Function,
) => {
  if (url) {
    audioObj.pause();
    audioObj.src = url;
  }

  if (play) {
    await audioObj.play();
    callback && callback();
    return;
  } else audioObj.pause();

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
  }, 1000),
);

export default function AudioReducer(
  prevState = initAudio,
  action: { [propName: string]: any },
) {
  const { type, data } = action;

  let newState = { ...initAudio };

  const changeSong = (index: number | undefined) => {
    if (
      typeof index === 'number' &&
      index >= 0 &&
      index <= newState.playQueue.length - 1
    )
      newState.currentSongIndex = index;

    newState.currentSong = newState.playQueue.length
      ? { ...newState.playQueue[newState.currentSongIndex] }
      : null;
    audioObj.src = newState.currentSong.url;
  };

  switch (type) {
    case PLAY:
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

      changePlayState(true, newState.currentSong.url);
      newState.totalTime = audioObj.duration;
      newState.isPlay = true;
      break;

    case PAUSE:
      audioObj.pause();
      newState.isPlay = false;
      break;

    case SWITCHPLAYSTATE:
      if (newState.currentSong !== null) {
        if (data) {
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
      newState.volume = data;
      audioObj.volume = data;
      break;

    case SWITCHPLAYMODE:
      newState.playMode = data;

    case NEXTSONG:
      if (newState.currentSongIndex < newState.playQueue.length - 1)
        changeSong(newState.currentSongIndex + 1);
      else changeSong(0);
      changePlayState(true);
      break;

    case PREVSONG:
      if (newState.currentSongIndex > 0)
        changeSong(newState.currentSongIndex - 1);
      else changeSong(newState.playQueue.length - 1);
      changePlayState(true);
      break;

    /**
     * 播放结束
     */
    case 'PlayEnd':
      newState.isPlay = false;
      let couldPlay = true;
      switch (newState.playMode) {
        case 0:
          couldPlay = false;
          changeSong(newState.currentSongIndex + 1);
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

      if (couldPlay) changePlayState(true);
      break;

    case REMOVEFROMQUEUE:
      if (data === newState.currentSong.id) {
        if (newState.playQueue.length != 1)
          changeSong(newState.currentSongIndex + 1);
        else {
          newState.currentSong = null;
          newState.playQueue = [];
          changePlayState(false);
          break;
        }
      }
      let temp = 0;
      newState.playQueue.forEach((val: singleSongStructure, i: number) => {
        if (val.id == data) temp = i;
      });
      newState.playQueue.splice(temp, 1);
      break;

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
     * 替换整个播放列表
     */
    case CHANGEALLQUEUE:
      if (!data || data.length == 0) {
        newState.playQueue = [];
        newState.currentSong = null;
        changePlayState(false);
        break;
      }
      newState.playQueue = [...data];
      newState.currentSong = { ...newState.playQueue[0] };
      changePlayState(true, newState.currentSong.url);
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

      // 初始化
      audioObj.volume = newState.volume;
      break;
  }
  initAudio = newState;

  return newState;
}
