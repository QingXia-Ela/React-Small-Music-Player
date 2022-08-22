export default function simplifySongListResult(
  val: { [propName: string]: any },
  filterList: string[],
) {
  let newVal: { [propName: string]: any } = {};
  for (const i of filterList) newVal[i] = val[i];
  return newVal;
}
