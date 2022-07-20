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
  volume: 100,
  totalTime: 0,
  currentTime: 0,
  currentSong: {
    id: 0,
    isNull: false,
    isCurrentSong: true,
    name: 'bluish light',
    img: '',
    url: 'https://res01.hycdn.cn/62e6457b16747f1428145bdbb43e9fc0/62D7D5AA/siren/audio/20220503/ae991b9f7fab14be9a7b1043512bb1d4.mp3',
  },
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
} from '@/redux/constant';

export default async function AudioReducer(
  prevState = initAudio,
  action: { [propName: string]: any },
) {
  const { type, data } = action;

  let newState = { ...initAudio };

  switch (type) {
    case PLAY:
      newState.isLoading = true;
      let change = false;
      if (data) {
        change = true;
        newState.currentSong = { ...data };
        newState.playQueue.push({ ...data });
      }
      if (change) audioObj.src = newState.currentSong.url;
      await audioObj.play();
      newState.isLoading = false;
      newState.isPlay = true;
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

    default:
      audioObj.src = newState.currentSong.url;
      break;
  }
  initAudio = newState;
  return newState;
}
