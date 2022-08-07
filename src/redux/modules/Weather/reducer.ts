import { GETWEATHER } from '@/redux/constant';

const initState = {};

export default function WeatherReducer(
  prevState = initState,
  action: { [propName: string]: any },
) {
  let newState = { ...prevState };
  const { type, data } = action;

  switch (type) {
    case GETWEATHER:
      newState = data;
      break;

    default:
      break;
  }

  return newState;
}
