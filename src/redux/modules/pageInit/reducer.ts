import { FINISHINIT } from '@/redux/constant';
import { AnyAction } from '@reduxjs/toolkit';

const initState = false;

export default function pageInit(prevState = initState, action: AnyAction) {
  const { type, data } = action;
  let newState = prevState;
  switch (type) {
    case FINISHINIT:
      newState = true;
      break;

    default:
      break;
  }
  return newState;
}
