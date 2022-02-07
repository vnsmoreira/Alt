import axios from 'axios';

const baseURL = 'http://192.168.15.127:3000/download/';

export const downloadMusic = async (id, setProgress) => {
  const audio = await axios.get(baseURL + id, {
    responseType: 'arraybuffer',
    onDownloadProgress: progressEvent => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader('x-decompressed-content-length');

      const progress = parseInt((progressEvent.loaded * 100) / totalLength);
      console.log(totalLength, progress);
      setProgress(progress);
    },
  });

  return audio.data;
};
