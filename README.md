# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

设置：

背景图片变化

redux 音乐播放器方法：

- `play` :  开始播放音频，播放的是 currentSong 中的歌曲，如果传入歌曲信息则播放指定的歌曲并将其插入到播放队列尾部

- `pause` : 暂停播放
- `switchPlayState` : 切换播放状态，可以传 bool 控制
- `changeVolume` : 调整音量大小 `0 ~ 1`
- `changeSong` : 改变播放的歌曲，传一个 id 并在播放队列里进行查找，如果播放队列没有则将这首歌插入队尾
- `switchPlayMode` : 调整播放模式，接受一个 num
- `nextSong` : 下一首
- `prevSong` : 上一首
- `removeFromQueue` : 删除队列中的某一首歌

插入播放列表使用：`changeSong` 操作

播放暂停使用：`switchPlayState` 操作

动画转场：

入场：

```
page-enter # 可以在这里写 transition 执行时间
page-enter-active
page-enter-done
```

离场：
```
page-exit # 可以在这里写 transition 执行时间
page-exit-active
```

通过同级选择器来区分不同的动画

```scss
// 主页动画
.index_page.page-enter-active {
  // ...
}

.index_page.page-enter-done {
  // ...
}

.index_page.page-exit-active {
  // ...
}
```