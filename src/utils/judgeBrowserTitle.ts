import { history } from "umi";
import setBrowserTitle from "./setBrowserTitle";


export default function judgeBrowserTitle(title?: string) {
  const pathArray = history.location.pathname.split('/')
  pathArray.shift()
  switch (pathArray[0]) {
    case 'SongList':
      setBrowserTitle('歌曲列表');
      break;
    case 'music':
      if (title) setBrowserTitle(title);
      else setBrowserTitle('歌曲详情')
      break;

    default:
      setBrowserTitle("Shiina's Music Website");
      break;
  }
}