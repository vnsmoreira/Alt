import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';

const onPlayerEvent = {
  'state-changed': ({ state }, stateSetters) => {
    const { setPlaying, setLoading, setStopped } = stateSetters;
    const actualState = State[state];

    const setTrackStates = {
      Playing: () => {
        setPlaying(true);
        setLoading(false);
        setStopped(false);
      },
      Stopped: () => {
        setPlaying(false);
        setStopped(true);
      },
      Paused: () => {
        setPlaying(false);
      },
    };

    setTrackStates[actualState] && setTrackStates[actualState]();
  },

  'track-changed': async (event, stateSetters) => {
    const { setCurrentAudioId, setCurrentAudioInfo } = stateSetters;
    const { nextTrack } = event;

    const playlist = await TrackPlayer.getQueue();
    const track = playlist[nextTrack];

    if (track) {
      setCurrentAudioId(track.id);
      setCurrentAudioInfo(track);
    }
  },
};

export function listenToPlayerEvents(stateSetters) {
  const { PlaybackState, PlaybackTrackChanged } = Event;

  useTrackPlayerEvents([PlaybackState, PlaybackTrackChanged], async event => {
    switch (event.type) {
      case PlaybackState:
        onPlayerEvent['state-changed'](event, stateSetters);
        break;
      case PlaybackTrackChanged:
        onPlayerEvent['track-changed'](event, stateSetters);
        break;
    }
  });
}
