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
  currentSong: null,
  currentSongIndex: 0,
  playQueue: [
    // {
    //   id: 0,
    //   isNull: false,
    //   name: 'flame',
    //   url: 'https://res01.hycdn.cn/5cc35727539905c68f3ec7b7933e7368/62D9329D/siren/audio/20220314/bb3fa6f24efaf63aaad76d0f6bafc0c2.mp3'
    // },
    // {
    //   id: 1,
    //   isNull: false,
    //   name: 'alice',
    //   img: '',
    //   url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
    // },
    // {
    //   id: 2,
    //   isNull: false,
    //   name: 'light',
    //   url: 'https://res01.hycdn.cn/fda8440a1d44d0819bd3afc3c48d8133/62D93364/siren/audio/20220503/ae991b9f7fab14be9a7b1043512bb1d4.mp3'
    // }
  ],
  /**
   * 0 持续播放
   * 1 单曲循环
   * 2 全部循环
   * 3 随机播放
   */
  playMode: 0,
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
} from '@/redux/constant';

/**
 * 监听播放结束触发 PlayEnd 事件
 */
import store from '@/redux/index';
import { random } from 'lodash';
audioObj.addEventListener('ended', (e) => {
  store.dispatch({ type: 'PlayEnd' });
});

const changePlayState = async (
  play: boolean = false,
  url?: string | undefined,
  callback?: Function,
) => {
  if (url) audioObj.src = url;
  if (play) {
    await audioObj.play();
    callback && callback();
    return;
  } else audioObj.pause();
  callback && callback();
};

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
        } else break;
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
      console.log('end');
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
        else newState.currentSong = null;
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

    default:
      audioObj.volume = newState.volume;
      break;
  }
  initAudio = newState;

  return newState;
}
