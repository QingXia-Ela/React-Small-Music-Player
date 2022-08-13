import { CHANGESONGLISTID, UPDATEUSERSONGSHEET } from '@/redux/constant';

let initState = {
  currentListId: 'current',
  selfCreateList: <any>[],
  subscribeList: <any>[],
  favoriteMusic: null,
};

function SongListReducer(prevState = initState, action: any) {
  const { type, data } = action;
  let newState = { ...prevState };

  switch (type) {
    case CHANGESONGLISTID:
      newState.currentListId = data;
      break;

    case UPDATEUSERSONGSHEET:
      newState.favoriteMusic = data.shift();
      let pos = 0;
      for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        if (!ele.subscribed) pos = i;
        else break;
      }
      newState.selfCreateList = [
        ...newState.selfCreateList,
        ...data.splice(0, pos + 1),
      ];
      newState.subscribeList = [...newState.subscribeList, ...data];
      break;

    default:
      break;
  }

  return newState;
}

export default SongListReducer;
