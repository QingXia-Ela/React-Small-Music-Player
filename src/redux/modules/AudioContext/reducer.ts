import { CONNECT2ELE, SETAUDIOCONTEXT } from '@/redux/constant';

let initState: {
  AudioCtx: AudioContext | undefined;
  connect2Ele: boolean | undefined;
  analyser: any;
};

function AudioContextReducer(prevState = initState, action: any) {
  const { type, data } = action;
  let newState = { ...prevState };
  switch (type) {
    case SETAUDIOCONTEXT:
      newState.AudioCtx = data;
      break;

    case CONNECT2ELE:
      newState.connect2Ele = data;
      break;

    default:
      break;
  }
  return newState;
}

export default AudioContextReducer;
