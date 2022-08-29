import {
  CHANGEDETAILSONGLIST,
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  UPDATEUSERSONGSHEET,
  CHANGESONGLISTLOADINGSTATE,
  SYNCSEARCHWORD,
  CHANGECURRENTLISTPAGE,
} from '@/redux/constant';
import { SEARCH_KEYWORD } from './constant';

let initState: { [propName: string]: any } = {
  loading: false,
  currentListId: 'search',
  selfCreateList: <any>[],
  subscribeList: <any>[],
  favoriteMusic: null,
  currentDetailListLoading: false,
  currentDetailListInfo: null,
  currentDetailListPage: 1,
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
    case CHANGECURRENTLISTPAGE:
      if (data) newState.currentDetailListPage = data;
      else newState.currentDetailListPage = 1;
      break;
    case CHANGESONGLISTID:
      if (newState.currentListId == data) break;
      newState.currentListId = data;
      // 在 List 中查找信息
      const { type, id } = data;
      // 如果 id 与上一次的不匹配则列表回滚到第一页
      if (newState.currentListId && newState.currentListId !== id)
        newState.currentDetailListPage = 1;

      if (typeof id === 'number' && id > 0) {
        let res = null;

        if (newState.favoriteMusic && newState.favoriteMusic.id === id) {
          newState.currentDetailListInfo = newState.favoriteMusic;
          break;
        }

        let searchList = newState.showSubscribeList
          ? newState.subscribeList
          : newState.selfCreateList;
        searchList.forEach((val: any) => {
          if (id === val.id) res = val;
        });
        // 有结果了
        if (res) newState.currentDetailListInfo = res;
      } else {
        switch (type) {
          case SEARCH_KEYWORD:
            newState.currentDetailListInfo = data.data;
            break;

          default:
            break;
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
