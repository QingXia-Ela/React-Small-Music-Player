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
  isLoading: false,
  isPlay: false,
  isMuted: false,
  volume: 0.5,
  totalTime: 0,
  currentTime: 0,
  currentSong: {
    id: 0,
    isNull: false,
    name: 'light',
    img: '',
    url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
  },
  currentSongIndex: 0,
  playQueue: [],
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
} from '@/redux/constant';

audioObj.addEventListener('ended', (e) => {});

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
    newState.currentSong = newState.playQueue[newState.currentSongIndex];
    audioObj.src = newState.currentSong.url;
  };

  switch (type) {
    case PLAY:
      newState.isLoading = true;

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

      newState.isPlay = true;

      audioObj.play();
      newState.isLoading = false;
      break;

    case PAUSE:
      audioObj.pause();
      newState.isPlay = false;
      break;

    case SWITCHPLAYSTATE:
      if (newState.currentSong.isNull === false) {
        if (data) {
          data ? audioObj.play() : audioObj.pause();
          newState.isPlay = data;
        } else {
          if (newState.isPlay) audioObj.pause();
          else audioObj.play();
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
      break;
    case PREVSONG:
      if (newState.currentSongIndex > 0)
        changeSong(newState.currentSongIndex - 1);
      break;

    default:
      audioObj.src = newState.currentSong.url;
      audioObj.volume = newState.volume;
      break;
  }
  initAudio = newState;
  return newState;
}
