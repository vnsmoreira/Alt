import { createContext, useState } from 'react';
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player';
import { listenToPlayerEvents } from './events';
import { getTrack } from './utils';

TrackPlayer.setupPlayer({});

TrackPlayer.updateOptions({
  alwaysPauseOnInterruption: true,
  stopWithApp: false,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ],
});

export const PlayerContext = createContext({});

export const PlayerProvider = props => {
  const [playing, setPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loopingMode, setLoopingMode] = useState('queue');
  const [currentAudioId, setCurrentAudioId] = useState('');
  const [currentAudioInfo, setCurrentAudioInfo] = useState({});
  const [previousTrack, setPreviousTrack] = useState({});
  const [nextTrack, setNextTrack] = useState({});

  const trackplayerStateSetters = {
    setPlaying,
    setLoading,
    setStopped,
    setPreviousTrack,
    setNextTrack,
  };

  listenToPlayerEvents(trackplayerStateSetters);

  /* player */
  const player = {};

  player.load = async audioInfo => {
    setLoading(true);
    const track = getTrack(audioInfo);

    setCurrentAudioId(track.id);
    setCurrentAudioInfo(audioInfo);

    await TrackPlayer.add(track);
    setLoading(false);
    TrackPlayer.play();
  };

  player.play = async () => {
    if (playing) return;

    stopped ? player.jumpTo(0) : TrackPlayer.play();
  };

  player.pause = async () => {
    TrackPlayer.pause();
  };

  player.reset = async () => {
    TrackPlayer.reset();
  };

  player.changeLoopingMode = () => {
    const { Off, Queue, Track } = RepeatMode;

    const playerModes = [Off, Queue, Track];
    const modes = ['off', 'queue', 'track'];

    const previousModeIndex = modes.indexOf(loopingMode);
    const currentModeIndex = previousModeIndex + 1 > modes.length - 1 ? 0 : previousModeIndex + 1;

    TrackPlayer.setRepeatMode(playerModes[currentModeIndex]);
    setLoopingMode(modes[currentModeIndex]);
  };

  player.jumpTo = async time => {
    TrackPlayer.seekTo(time);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        playing,
        loading,
        loopingMode,
        currentAudioId,
        currentAudioInfo,
        previousTrack,
        nextTrack,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
