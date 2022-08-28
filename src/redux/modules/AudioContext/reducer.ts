import { CONNECT2ELE, SETAUDIOCONTEXT } from '@/redux/constant';

interface AudioContextReducerInitState {
  AudioCtx: AudioContext;
  eleSource?: MediaElementAudioSourceNode;
  analyser?: AnalyserNode;
  finishInit: boolean;
}

let initState: AudioContextReducerInitState = {
  AudioCtx: new window.AudioContext(),
  eleSource: undefined,
  analyser: undefined,
  finishInit: false,
};

function AudioContextReducer(prevState = initState, action: any) {
  const { type, data } = action;
  let newState = { ...prevState };
  switch (type) {
    case SETAUDIOCONTEXT:
      break;

    case CONNECT2ELE:
      if (!newState.finishInit) {
        let eleSrc = newState.AudioCtx.createMediaElementSource(data);
        let analyser = newState.AudioCtx.createAnalyser();

        eleSrc.connect(analyser);
        analyser.connect(newState.AudioCtx.destination);
        newState.eleSource = eleSrc;
        newState.analyser = analyser;

        newState.analyser.fftSize = 256;
        newState.finishInit = true;
      }
      break;

    default:
      break;
  }
  return newState;
}

export default AudioContextReducer;
