import { baseURL, downloadEndpoint } from '../../services/apis';

const durationToSeconds = duration => {
  let durationInSeconds = 0;
  const durationFields = duration.split(':').map(value => parseInt(value));

  if (durationFields.length == 2) {
    const [minutes, seconds] = durationFields;

    durationInSeconds += minutes * 60 + seconds;
  } else {
    const [hours, minutes, seconds] = durationFields;

    durationInSeconds += hours * (60 * 60) + minutes * 60 + seconds;
  }

  return durationInSeconds;
};

export const getTrack = audioInfo => {
  const { id, uri, title, author, duration, thumbnailUri } = audioInfo;

  return {
    url: uri,
    title,
    artist: author,
    id,
    duration: durationToSeconds(duration),
    thumbnailUri,
  };
};

export const sortPlaylist = (tracksArray = [], index) => {
  /* organize playlist to have the selected track(index) as first track */
  const endIndex = tracksArray.length - 1;

  const firstItems = tracksArray.splice(index, endIndex);
  const remainingItems = tracksArray;

  return [...firstItems, ...remainingItems];
};

export const convertToPlaylist = (musics, downloadedAudios) => {
  const downloadedAudiosIds = downloadedAudios.map(audio => audio.id);

  return musics.map(track => {
    let uri = '';
    const remoteUri = baseURL + downloadEndpoint + track.id;

    const isAudioDownloaded = downloadedAudiosIds.includes(track.id);

    if (isAudioDownloaded) {
      const { uri: localUri } = downloadedAudios.find(audio => audio.id == track.id);

      uri = localUri;
    } else {
      uri = remoteUri;
    }
    const audioItem = { ...track, uri };

    return audioItem;
  });
};
