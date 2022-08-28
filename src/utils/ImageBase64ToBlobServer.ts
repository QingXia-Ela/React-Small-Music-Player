export default function ImageBase64ToBlob(dataurl: string | null) {
  if (!dataurl || !dataurl.length) return null;
  var arr = dataurl.split(',');
  //注意base64的最后面中括号和引号是不转译的
  var _arr = arr[1].substring(0, arr[1].length - 2);
  var mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(_arr),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blobObj = new Blob([u8arr], {
    type: mime,
  });
  if (blobObj) {
    let url = window.URL.createObjectURL(blobObj);
    return url;
  }
  return null;
}
