import TrackPlayer, { State } from 'react-native-track-player';

export const onPlayerEvent = {
  'state-changed': ({ state }, stateSetters) => {
    const { setPlaying, setLoading, setStopped } = stateSetters;
    const actualState = State[state];

    const setTrackStates = {
      Playing: () => setPlaying(true) && setLoading(false) && setStopped(false),
      Stopped: () => setPlaying(false) && setStopped(true),
      Paused: () => setPlaying(false),
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
