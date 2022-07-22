import { random } from 'lodash';
import mockjs from 'mockjs';

// res.setHeader('Access-Control-Allow-Origin', '*');

const dataList = [
  {
    id: 0,
    isNull: false,
    name: 'flame',
    url: 'https://res01.hycdn.cn/973aba2ec8833a93a6644108c4af5d86/62DA2BA9/siren/audio/20220314/bb3fa6f24efaf63aaad76d0f6bafc0c2.mp3',
  },
  {
    id: 1,
    isNull: false,
    name: 'alice',
    img: '',
    url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
  },
  {
    id: 2,
    // isNull: false,
    name: 'light',
    author: 'chen xue ran',
    album: '',
    img: '',
    url: 'https://res01.hycdn.cn/de95c99b58744f8bd0a66fa9aa2b19a0/62DA2B8C/siren/audio/20220503/ae991b9f7fab14be9a7b1043512bb1d4.mp3',
  },
];

export default {
  'GET /api/getMusic': (req, res) => {
    setTimeout(() => {
      if (dataList[parseInt(req.query.id)]) {
        res.send(dataList[parseInt(req.query.id)]);
      } else {
        res.statusCode = 404;
        res.send('Not Found');
      }
    }, 1000);
  },
};
