import { getSongByID } from '@/api/music';
import { getDetailList, searchSong } from '@/api/SongList';
import {
  CHANGECURRENTLISTPAGE,
  CHANGEDETAILSONGLIST,
  CHANGESHOWSUBSCRIBELIST,
  CHANGESONGLISTID,
  CHANGESONGLISTLOADINGSTATE,
  PLAYSONGLIST,
  SYNCSEARCHWORD,
  UPDATEUSERSONGSHEET,
} from '@/redux/constant';
import { message } from 'antd';
import { changeAllQueue } from '../musicPlayer/actions';

import store from '@/redux';
import simplifySongListResult from '@/utils/SongList/simplifySongList';
import {
  MY_FAVORITE,
  NORMAL_SONGLIST,
  SEARCH_KEYWORD,
  SongListId,
} from './constant';

/**
 * 设置详细歌单加载状态
 * @param data 要设置的状态，不传入则对当前状态取反
 */
export const changeSongListLoadingState = (data?: boolean) => ({
  type: CHANGESONGLISTLOADINGSTATE,
  data,
});

/**
 * 替换当前详情列表，仅改变 Song List 页面 右下模块的列表，不进行播放
 * @param data 某个歌单的歌曲信息
 */
export const changeSongDetailList = (data: any[]) => ({
  type: CHANGEDETAILSONGLIST,
  data,
});

/**
 * 搜索歌曲
 * @param data 搜索关键字
 * @param type 类型，默认1，搜索歌曲
 */
export const filteringSearchResult = (
  data: string,
  type:
    | 1
    | 10
    | 100
    | 1000
    | 1002
    | 1004
    | 1006
    | 1099
    | 1014
    | 1018
    | 2000 = 1,
  offset?: number,
  limit?: number,
) => {
  store.dispatch(changeSongListLoadingState(true));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch(changeSongListLoadingState(false));
    }, 800);
    if (data && data.length) {
      searchSong(data, type, offset, limit)
        .then((res: any) => {
          if (res && res.result) {
            let resobj = res.result;
            if (resobj.songCount == 0) resobj.songs = [];
            else if (resobj.songCount > 300) resobj.songCount = 300;
            resobj.songs = resobj.songs.map((val: any) => {
              const filterList = ['ar', 'id', 'name'];
              val.ar = val.artists;
              return simplifySongListResult(val, filterList);
            });
            return resolve(res);
          }
          return reject(res);
        })
        .catch((err) => {
          return reject(err);
        });
    } else {
      return reject({ message: '搜索关键词不能为空' });
    }
  });
};

/**
 * 播放当前选中的播放列表，也可以传入指定播放列表进行播放
 * @param data 指定播放的列表，不传入则播放状态中 current Detail List 内的歌曲
 */
export const playSongList = (data?: any[], id?: number) => {
  return () => {
    if (data) store.dispatch(changeAllQueue(data, true));
    else {
      let SongListData: any;
      if (id) {
        getDetailList(id, 0, 200).then((res: any) => {
          if (res.songs) store.dispatch(changeAllQueue(res.songs, true));
        });
      } else {
        SongListData = store.getState().SongList.currentDetailList;
        if (SongListData && SongListData.length) {
          store.dispatch(changeAllQueue(SongListData, true));
        }
      }
    }
  };
};

/**
 * 改变右侧播放列表简略信息
 * @param data 传入标识，如果为数字 id 代表网易云歌单，如果是字符串就是上方的俩列表
 *
 * 标识统一格式：`{ type: 类型, id: 数字 }`
 */
export const changeSongListId = (data: SongListId, offset?: number) => {
  const { id, type } = data;

  switch (type) {
    case NORMAL_SONGLIST:
      store.dispatch(changeSongListLoadingState(true));
      getDetailList(id, offset ? offset : 0)
        .then((res: any) => {
          const filterList = ['ar', 'name', 'id'];

          let data = res.songs.map((val: any) =>
            simplifySongListResult(val, filterList),
          );

          store.dispatch(changeSongDetailList(data));
        })
        .catch(() => {
          message.error('获取歌单详情失败');
        })
        .finally(() => {
          store.dispatch(changeSongListLoadingState(false));
        });
      break;

    case MY_FAVORITE:
      if (!id) {
        message.warning('歌单ID为空，请按下左下角模块尝试刷新获取歌单信息');
        break;
      }
      store.dispatch(changeSongListLoadingState(true));
      getDetailList(id, offset ? offset : 0)
        .then((res: any) => {
          const filterList = ['ar', 'name', 'id'];

          let data = res.songs.map((val: any) =>
            simplifySongListResult(val, filterList),
          );

          store.dispatch(changeSongDetailList(data));
        })
        .catch(() => {
          message.error('获取歌单详情失败');
        })
        .finally(() => {
          store.dispatch(changeSongListLoadingState(false));
        });
      break;

    case SEARCH_KEYWORD:
      const { searchWord } = store.getState().SongList;

      if (searchWord && searchWord.keywords) {
        filteringSearchResult(
          searchWord.keywords,
          searchWord.type,
          offset,
        ).then((res: any) => {
          if (res && res.result) {
            data.data = {
              name: '搜索结果',
              trackCount: res.result.songCount,
              id: -2,
              cancelRenderOperation: true,
            };
            store.dispatch(changeSongDetailList(res.result.songs));
          }
        });
      } else {
        data.data = {
          name: '左侧输入关键词进行搜索',
          id: -2,
          cancelRenderOperation: true,
        };
        store.dispatch(changeSongDetailList([]));
      }
      break;

    default:
      break;
  }

  return {
    type: CHANGESONGLISTID,
    data,
  };
};

/**
 * 更新用户歌单
 * @param data 一个符合网易云歌单格式的数组
 */
export const updateUserSongSheet = (data: object[]) => ({
  type: UPDATEUSERSONGSHEET,
  data,
});

/**
 * @param data `boolean` 改变订阅的歌单
 */
export const changeShowSubscribeList = (data: boolean) => ({
  type: CHANGESHOWSUBSCRIBELIST,
  data,
});

/**
 * 同步搜索关键字到全局，当搜索列表翻页时会根据同步的关键字进行偏移
 * @param data 搜索关键字和类型
 */
export const syncSearchWord = (data: {
  keywords: string;
  type: 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1099 | 1014 | 1018 | 2000;
}) => {
  filteringSearchResult(data.keywords, data.type).then((res: any) => {
    if (res && res.result) {
      store.dispatch(
        changeSongListId({
          id: -2,
          type: SEARCH_KEYWORD,
          data: {
            name: '搜索结果',
            trackCount: res.result.songCount,
            id: -2,
            cancelRenderOperation: true,
          },
        }),
      );
      store.dispatch(changeSongDetailList(res.result.songs));
    }
  });
  return { type: SYNCSEARCHWORD, data };
};

/**
 * 同步当前歌曲页数到 redux ， 避免路由切换后页数对不上的问题
 * @param data 要修改的页数
 * @returns
 */
export const changeCurrentListPage = (data: number) => ({
  type: CHANGECURRENTLISTPAGE,
  data,
});
