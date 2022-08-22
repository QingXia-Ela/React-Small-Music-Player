import { CONNECT2ELE, SETAUDIOCONTEXT } from '@/redux/constant';

export const setAudioContext = (data: AudioContext) => ({
  type: SETAUDIOCONTEXT,
  data,
});

export const setConnect2Ele = (data: boolean) => ({ type: CONNECT2ELE, data });
