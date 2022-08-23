import {
  CHANGEDETAILSONGLIST,
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  UPDATEUSERSONGSHEET,
  CHANGESONGLISTLOADINGSTATE,
  SYNCSEARCHWORD,
} from '@/redux/constant';

let initState: { [propName: string]: any } = {
  loading: false,
  currentListId: 'search',
  selfCreateList: <any>[],
  subscribeList: <any>[],
  favoriteMusic: null,
  currentDetailListLoading: false,
  currentDetailListInfo: null,
  currentDetailList: <any>[],
  showSubscribeList: false,
  searchWord: {},
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
      if (newState.currentListId == data) break;
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
      } else if (typeof data === 'object') {
        if (data.type === 'myfavorite') {
          newState.currentDetailListInfo = newState.favoriteMusic;
        } else if (data.type === 'search') {
          newState.currentDetailListInfo = data.data
            ? data.data
            : {
                id: -2,
                name: '搜索关键词',
                cancelRenderOperation: true,
              };
        }
      } else if (typeof data === 'string') {
        if (data === 'search') {
          newState.currentDetailListInfo = {
            id: -2,
            name: '搜索关键词',
            cancelRenderOperation: true,
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

    case SYNCSEARCHWORD:
      newState.searchWord = { ...data };
      break;

    default:
      break;
  }

  return newState;
}

export default SongListReducer;
