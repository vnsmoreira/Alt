import { createContext, useState } from 'react';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
  RepeatMode,
  Capability,
} from 'react-native-track-player';

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

  const resetState = () => {
    setPlaying(false);
    setStopped(false);
    setLoading(false);
  };

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    const { state } = event;
    const actualState = State[state];

    const stateSetters = {
      Playing: () => setPlaying(true),
      Stopped: () => setStopped(true),
      Connecting: () => setLoading(true),
      Buffering: () => setLoading(true),
    };

    resetState();
    stateSetters[actualState] && stateSetters[actualState]();
  });

  const getTrack = audioInfo => {
    const { id, uri, title, author } = audioInfo;

    return {
      url: uri,
      title,
      artist: author,
      id,
    };
  };

  const player = {};

  player.load = async audioInfo => {
    const track = getTrack(audioInfo);

    setCurrentAudioId(track.id);
    setCurrentAudioInfo(audioInfo);

    await TrackPlayer.add(track);
    TrackPlayer.play();
  };

  player.play = async () => {
    if (playing) return;

    stopped && player.jumpTo(0);
    TrackPlayer.play();
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
      value={{ player, playing, loading, loopingMode, currentAudioId, currentAudioInfo }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
