import {
  CHANGEDETAILSONGLIST,
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  UPDATEUSERSONGSHEET,
  CHANGESONGLISTLOADINGSTATE,
} from '@/redux/constant';

let initState: { [propName: string]: any } = {
  loading: false,
  currentListId: 'current',
  selfCreateList: <any>[],
  subscribeList: <any>[],
  favoriteMusic: null,
  currentDetailListLoading: false,
  currentDetailListInfo: null,
  currentDetailList: <any>[],
  showSubscribeList: false,
};

function SongListReducer(prevState = initState, action: any) {
  const { type, data } = action;
  let newState = { ...prevState };

  switch (type) {
    case CHANGESONGLISTLOADINGSTATE:
      if (typeof data != 'undefined') newState.loading = data;
      else newState.loading = !newState.loading;
      break;
    case CHANGESONGLISTID:
      newState.currentListId = data;
      // 在 List 中查找信息
      if (typeof data === 'number') {
        let res = null;

        if (newState.favoriteMusic && newState.favoriteMusic.id === data) {
          newState.currentDetailListInfo = newState.favoriteMusic;
          break;
        }

        let searchList = newState.showSubscribeList
          ? newState.subscribeList
          : newState.selfCreateList;
        searchList.forEach((val: any) => {
          if (data === val.id) res = val;
        });
        // 有结果了
        if (res) newState.currentDetailListInfo = res;
      } else if (data) {
        if (data.type === 'myfavorite') {
          newState.currentDetailListInfo = newState.favoriteMusic;
        } else if (data.type === 'current') {
          newState.currentDetailListInfo = {
            id: -1,
            name: '当前播放列表',
          };
        }
      }
      break;

    case UPDATEUSERSONGSHEET:
      newState.favoriteMusic = data.shift();
      let pos = 0;
      for (let i = 0; i < data.length; i++) {
        const ele = data[i];
        if (!ele.subscribed) pos = i;
        else break;
      }
      newState.selfCreateList = data.splice(0, pos + 1);
      newState.subscribeList = data;
      break;

    case CHANGESHOWSUBSCRIBELIST:
      if (typeof data === 'boolean') newState.showSubscribeList = data;
      else newState.showSubscribeList = !newState.showSubscribeList;
      break;

    case CHANGEDETAILSONGLIST:
      newState.currentDetailList = [...data];
      break;

    default:
      break;
  }

  return newState;
}

export default SongListReducer;
