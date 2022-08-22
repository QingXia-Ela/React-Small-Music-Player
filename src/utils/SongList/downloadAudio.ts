import { getSongFileUrl } from '@/api/music';
import request from '@/utils/request';

function DownloadAudio(audioInfo: any) {
  let audioId = audioInfo.id;
  if (typeof audioId === 'number') {
    getSongFileUrl(audioId).then(({ data }) => {
      let url = data[0].url;
      request({
        url,
        method: 'GET',
        responseType: 'blob',
        withCredentials: false,
      }).then((res) => {
        let blob = new Blob([res.data]);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${audioInfo.name} - ${audioInfo.ar.map(
          (val: string) => val + '',
        )}.mp3`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    });
  }
}

export default DownloadAudio;
