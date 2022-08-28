/** 普通歌单 */
export const NORMAL_SONGLIST = 'NormalSongList';
/** 我喜欢的音乐 */
export const MY_FAVORITE = 'MyFavorite';
/** 搜索 */
export const SEARCH_KEYWORD = 'SearchKeyWord';

export interface SongListId {
  type: string;
  id: number | string;
  [key: string]: any;
}
