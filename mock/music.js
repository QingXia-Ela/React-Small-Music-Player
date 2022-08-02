import { random } from 'lodash';
import mockjs from 'mockjs';
import path from 'path';
// res.setHeader('Access-Control-Allow-Origin', '*');

const dataList = [
  {
    id: 0,
    name: 'STARSET - Infected',
    avatar: process.env.MOCK_URL + '/infected/avatar.png',
    img: process.env.MOCK_URL + '/infected/img.jpg',
    url: process.env.MOCK_URL + '/infected/song.mp3',
    lyric: process.env.MOCK_URL + '/infected/lyric.json',
  },
  {
    id: 1,
    name: '【Animenz】怪物 - 动物狂想曲 第二季 钢琴改编',
    avatar: process.env.MOCK_URL + '/monster/avatar.webp',
    img: process.env.MOCK_URL + '/monster/img.jpg',
    url: process.env.MOCK_URL + '/monster/song.mp3',
    lyric: 1,
  },
  {
    id: 2,
    name: 'STARSET - Unbecoming',
    author: 'XueRan Chen',
    avatar: process.env.MOCK_URL + '/unbecoming/avatar.jpg',
    img: process.env.MOCK_URL + '/unbecoming/img.jpg',
    url: process.env.MOCK_URL + '/unbecoming/song.mp3',
    lyric: process.env.MOCK_URL + '/unbecoming/lyric.json',
  },
  {
    id: 3,
    name: '【Animenz】人生的旋转木马 - 哈尔的移动城堡 钢琴改编 - Merry-go-round of life',
    author: 'Animenzzz',
    avatar: process.env.MOCK_URL + '/muma/avatar.webp',
    url: process.env.MOCK_URL + '/muma/song.mp3',
    lyric: process.env.MOCK_URL + '/muma/lyric.json',
  },
  {
    id: 4,
    name: '【冰兔】One Last Kiss 翻唱',
    author: '宇多田ヒカル',
    avatar: process.env.MOCK_URL + '/olk/avatar.jpg',
    url: process.env.MOCK_URL + '/olk/song.mp3',
    lyric: process.env.MOCK_URL + '/olk/lyric.json',
    img: process.env.MOCK_URL + '/olk/img.webp',
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
  'POST /api/addPlayList': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 200,
        data: req.body,
      });
    }, 3000);
  },
};
