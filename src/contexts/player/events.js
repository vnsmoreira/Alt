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

  'track-changed': async stateSetters => {
    const { setPreviousTrack, setNextTrack } = stateSetters;

    const playlist = await TrackPlayer.getQueue();
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    const previousTrack = playlist[currentTrackIndex - 1];
    const nextTrack = playlist[currentTrackIndex + 1];

    previousTrack && setPreviousTrack(previousTrack);
    nextTrack && setNextTrack(nextTrack);
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
        onPlayerEvent['track-changed'](stateSetters);
        break;
    }
  });
}
