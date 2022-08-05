/**
 * 处理网易云返回信息
 * @param SongFileInfo 包含歌曲 url 的结构
 * @param SongDetailsInfo 歌曲详情
 * @returns 自定义歌曲格式结构
 */
export function handleSongInfo(
  SongFileInfo?: { [propName: string]: any } | any,
  SongDetailsInfo?: { [propName: string]: any } | any,
  // SongLyricInfo: { [propName: string]: any }
) {
  if (!SongFileInfo || !SongDetailsInfo) return null;
  const song = SongDetailsInfo.songs[0];
  const file = SongFileInfo;
  return {
    id: file.id,
    name: song.name,
    author: song.ar.forEach(
      (val: { [propName: string]: any }) => `${val.name}`,
    ),
    avatar: song.al.picUrl,
    url: file.url,
    // lyric: SongLyricInfo.lrc.lyric
  };
}
