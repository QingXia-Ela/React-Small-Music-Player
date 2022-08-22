export default function simplifySongListResult(
  val: { [propName: string]: any },
  filterList: string[],
) {
  let newVal: { [propName: string]: any } = {};
  for (let i = 0; i < filterList.length; i++) {
    const name = filterList[i];
    newVal[name] = val[name];
  }
  return newVal;
}
