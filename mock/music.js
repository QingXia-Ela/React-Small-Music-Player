import { random } from 'lodash';
import mockjs from 'mockjs';
import path from 'path';
// res.setHeader('Access-Control-Allow-Origin', '*');

const dataList = [
  {
    id: 0,
    isNull: false,
    name: 'STARSET - Infected',
    avatar: process.env.MOCK_URL + '/infected/avatar.png',
    img: process.env.MOCK_URL + '/infected/img.jpg',
    url: process.env.MOCK_URL + '/infected/song.mp3',
    lyric: process.env.MOCK_URL + '/infected/lyric.json',
  },
  {
    id: 1,
    isNull: false,
    name: '【Animenz】怪物 - 动物狂想曲 第二季 钢琴改编',
    avatar: process.env.MOCK_URL + '/monster/avatar.webp',
    img: process.env.MOCK_URL + '/monster/img.jpg',
    url: process.env.MOCK_URL + '/monster/song.mp3',
    lyric: 1,
  },
  {
    id: 2,
    isNull: false,
    name: 'STARSET - Unbecoming',
    author: 'XueRan Chen',
    avatar: process.env.MOCK_URL + '/unbecoming/avatar.jpg',
    img: process.env.MOCK_URL + '/unbecoming/img.jpg',
    url: process.env.MOCK_URL + '/unbecoming/song.mp3',
    lyric: process.env.MOCK_URL + '/unbecoming/lyric.json',
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
