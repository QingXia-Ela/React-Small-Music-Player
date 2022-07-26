import { random } from 'lodash';
import mockjs from 'mockjs';
import path from 'path';
// res.setHeader('Access-Control-Allow-Origin', '*');

const dataList = [
  {
    id: 0,
    isNull: false,
    name: 'STARSET - Infected',
    avatar: '',
    img: `https://zhiccc.net/images/parallax.png`,
    url: process.env.MOCK_URL + '/public/infected.mp3',
  },
  {
    id: 1,
    isNull: false,
    name: '【Animenz】怪物 - 动物狂想曲 第二季 钢琴改编',
    avatar: '',
    img: `https://www.ussjackdaw.com/usr/uploads/2020/05/856658260.png`,
    url: process.env.MOCK_URL + '/public/monster.mp3',
  },
  {
    id: 2,
    isNull: false,
    name: 'STARSET - Unbecoming',
    author: 'XueRan Chen',
    avatar: '',
    img: `http://baiyun.work/img/background.jpg`,
    url: process.env.MOCK_URL + '/public/unbecoming.mp3',
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
