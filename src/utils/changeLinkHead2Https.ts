/**
 * 将网址头 变成 https
 * @param url 带有 http 头的 url
 * @returns 加了 s 的 http 头，如果返回空证明字符串无效
 */
export default function changeLinkHead2Https(url: string) {
  if (!url || !url.length) return null;
  const i = url.indexOf('http'),
    s = url.indexOf('https');
  if (i == 0 && s != 0) {
    let res = url.split('');
    res.splice(4, 0, 's');
    return res.join('');
  } else if (s == 0) return url;
  return null;
}
