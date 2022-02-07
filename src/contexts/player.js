import { createContext, useState } from 'react';
import { Audio } from 'expo-av';

export const PlayerContext = createContext({});

export const PlayerProvider = props => {
  const [musicPlaylist, setMusicPlaylist] = useState([]);
  const [playerState, setPlayerState] = useState({
    playlistReference: [],
    currentIndex: '',
    isActive: false,
    isPlaying: false,
    isLoading: false,
    positionMs: 0,
    durationMs: 0,
    song: {},
  });

  (async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: true });
  })();

  const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());

  playbackObject.setOnPlaybackStatusUpdate(status => {
    if (status.isLoaded) {
      const { isLoaded, isPlaying, isBuffering, positionMillis, durationMillis } = status;

      setPlayerState(playerState => {
        return {
          ...playerState,
          isActive: isLoaded,
          isPlaying: isPlaying,
          isLoading: isBuffering,
          positionMs: positionMillis,
          durationMs: durationMillis,
        };
      });
    }
  });

  /*  */
  const playback = {};

  playback.loadMusic = async () => {};

  /*  */
  const player = {};

  player.playMusic = async musicObj => {
    const { id, title, author, thumbnailUri } = musicObj;
    const uri = `http://192.168.15.127:3000/download/${id}`;

    await player.stopMusic();
    await playbackObject.loadAsync({ uri }, {}, false);
    await playbackObject.playAsync();
  };

  player.pauseMusic = async () => {
    playerState.isPlaying && playerState.isActive ? await playbackObject.pauseAsync() : '';
  };

  player.resumeMusic = async () => {
    !playerState.isPlaying && playerState.isActive ? await playbackObject.playAsync() : '';
  };

  player.stopMusic = async () => {
    await playbackObject.unloadAsync();
  };

  return (
    <PlayerContext.Provider value={{ player, playerState }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
