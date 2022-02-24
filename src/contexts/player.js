import { createContext, useState } from 'react';
import TrackPlayer, { Event, useTrackPlayerEvents, State } from 'react-native-track-player';

TrackPlayer.setupPlayer({});

export const PlayerContext = createContext({});

export const PlayerProvider = props => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [looping, setLooping] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState('');
  const [currentAudioInfo, setCurrentAudioInfo] = useState({});

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    const { state } = event;
    const { Buffering, Connecting, Paused, Playing, Ready, Stopped, None } = State;

    const status = [Buffering, Connecting, Paused, Playing, Ready, Stopped, None];
    const translate = ['loading', 'conectando', 'pausado', 'tocando', 'pronto', 'parado', 'vazio'];

    const index = status.findIndex(stt => stt === state);
    console.log(translate[index]);
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

    setPlaying(false);
    await TrackPlayer.add(track);
    TrackPlayer.play();
    setPlaying(true);
  };

  player.pause = async () => {
    TrackPlayer.pause();
    setPlaying(false);
  };

  player.play = async () => {
    if (playing) {
      player.pause();
    } else {
      TrackPlayer.play();
      setPlaying(true);
    }
  };

  player.reset = async () => {
    TrackPlayer.reset();
  };

  player.toggleLooping = () => {
    setLooping(!looping);
  };

  player.jumpTo = async time => {
    TrackPlayer.seekTo(time);
    console.log('jumped');
  };

  return (
    <PlayerContext.Provider
      value={{ player, playing, loading, looping, currentAudioId, currentAudioInfo }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
