interface singleReducerStructure {
  [propName: string]: Function;
}
/**
 * 扩展模块
 * key 为 type 类型
 * value 为对应回调函数
 * 可接收到三个参数：
 * `newState` 新状态量 , `changePlayState changeSong` 两个操作方法
 */
export default <singleReducerStructure>{};
