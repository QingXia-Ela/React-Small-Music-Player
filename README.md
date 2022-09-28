# React-Small-Music-Player

## 前言

这是一个轻量级的 react 音乐播放器，前端使用 [UmiJS](https://v3.umijs.org/zh-CN/docs/getting-started)，后端采用 [网易云音乐 NODEJS API](https://github.com/Binaryify/NeteaseCloudMusicApi) 制作

有 Bug 和建议和其他问题都可以在 issue 提出

本项目开源免费，仅用作学习和交流

本项目的 TS 声明写的比较乱，未来有机会而且有空的话会发布重写 TS 的版本或者直接重构该播放器

未来计划将右侧播放器抽离为一个单独的组件，可供页面直接使用

## 功能

### 已实现功能

| 已实现功能                                |
| ----------------------------------------- |
| 登陆 / 退出个人网易云账号                 |
| 获取私人雷达歌单                          |
| 播放歌曲                                  |
| 播放自己已有的网易云音乐歌单 / 订阅的歌单 |
| 单曲播放 / 全部循环 / 随机播放            |
| 搜索歌曲                                  |
| 背景图切换                                |

### 计划中功能

不知道有没有时间做，先把饼画着罢

- [ ] 音质选择
- [ ] 歌曲切换 -> 背景图变化
- [ ] 保存播放列表并同步到网易云
- [x] 双语歌词对照
- [ ] 歌词自定义字体大小
- [ ] 歌曲查看评论 / 点赞 / 留言
- [ ] 详情页相似歌曲推荐
- [ ] 无版权歌曲或加载出错歌曲增加标记
- [ ] 将右侧播放器抽离成独立组件
- [ ] 欢迎在 Issue 提出...

### 相对比较有特色的地方？

1. 右侧全局播放栏

   播放栏可以清空播放列表，查看当前歌曲歌词，对播放列表的歌曲可以使用拖拽进行顺序调整

2. 主页左上角频谱图的实现（虽然没啥用

3. 似乎没有了...

## 开始构建使用

### 克隆项目到本地

```
$ git clone https://github.com/QingXia-Ela/React-Small-Music-Player.git
cd React-Small-Music-Player
npm install
```

### 设置后台接口地址

第一个：网易云 NODEJS 服务器，到 `src/utils/request.ts` 将其设置为你的网易云后台 API 地址
```ts
switch (process.env.NODE_ENV) {
  case 'production':
    // 你的生产环境地址 / Your production mode api
    axios.defaults.baseURL = '';
    break;

  default:
    // development
    axios.defaults.baseURL = 'http://localhost:3000';
    break;
}
```
第二个：天气地址，到 `src/constant/api/weather.ts` 进行设置，然后到 `src/redux/modules/Weather/action.ts` 下根据你设置的天气接口改变传入数据结构，文件内均有注释

```
      const info = {
        // 空气质量
        airQuailty: dewPt,
        // 当前气温
        currentTemp: temp,
        // 体感气温
        feelTemp: feels,
        // 湿度
        humidity: rh,
        // 气压
        baro,
        // 天气描述，如晴或多云
        weatherDescription: cap,
      }
```

如果想高度自定义样式或内容的话可以到 `src/pages/IndexPage/topRightWeather` 进行调整

### 打包发布

```
$ npm run build
```

## License

[LGPL-3.0](https://www.gnu.org/licenses/lgpl-3.0.txt) License