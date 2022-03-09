import { createContext, useState } from 'react';
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player';
import { listenToPlayerEvents } from './events';
import { getTrack, sortPlaylist } from './utils';

TrackPlayer.setupPlayer({});

TrackPlayer.updateOptions({
  alwaysPauseOnInterruption: true,
  stopWithApp: false,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.Stop,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.Stop,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
});

TrackPlayer.setRepeatMode(RepeatMode.Queue);

export const PlayerContext = createContext({});

export const PlayerProvider = props => {
  const [playing, setPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loopingMode, setLoopingMode] = useState('queue');
  const [currentAudioId, setCurrentAudioId] = useState('');
  const [currentAudioInfo, setCurrentAudioInfo] = useState({});

  const trackplayerStateSetters = {
    setPlaying,
    setLoading,
    setStopped,
    setCurrentAudioId,
    setCurrentAudioInfo,
  };

  listenToPlayerEvents(trackplayerStateSetters);

  /* player */
  const player = {};

  player.load = async (queue, index) => {
    setLoading(true);

    const tracksArray = queue.map(getTrack);
    const playlist = sortPlaylist(tracksArray, index);

    const currentAudio = playlist[0];

    setCurrentAudioId(currentAudio.id);
    setCurrentAudioInfo(currentAudio);

    TrackPlayer.add(playlist);
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

  player.skipNext = async () => {
    TrackPlayer.skipToNext();
  };

  player.skipPrevious = async () => {
    TrackPlayer.skipToPrevious();
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
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
