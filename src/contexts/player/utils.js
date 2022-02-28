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
  const { id, uri, title, author, duration } = audioInfo;

  return {
    url: uri,
    title,
    artist: author,
    id,
    duration: durationToSeconds(duration),
  };
};
