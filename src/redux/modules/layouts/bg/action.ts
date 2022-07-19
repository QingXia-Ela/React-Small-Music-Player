import { CHANGEBG, SWITCHMASK, SWITCHFILTER } from '@/redux/constant';

export const changeBG = (data: object) => ({ type: CHANGEBG, data });
export const switchMask = (data: object) => ({ type: SWITCHMASK, data });
export const switchFilter = (data: object) => ({ type: SWITCHFILTER, data });
