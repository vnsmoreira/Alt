import { createContext, useRef, useState } from 'react';
import { Audio } from 'expo-av';

export const PlayerContext = createContext({});

export const PlayerProvider = props => {
  const [currentAudioInfo, setCurrentAudioInfo] = useState({});
  const [currentAudioId, setCurrentAudioId] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const sound = useRef(new Audio.Sound());

  (async () => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });
  })();

  const player = {};

  player.seekUpdate = async data => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        const result = (data / 100) * duration;
        await sound.current.setPositionAsync(Math.round(result));
      }
    } catch (error) {
      console.log('Error');
    }
  };

  player.stopAudio = async () => {
    try {
      const { isLoaded } = await sound.current.getStatusAsync();

      if (isLoaded) {
        setProgressPercentage(0);
        setPlaying(false);
        await sound.current.stopAsync();
      }
    } catch (error) {
      console.log('Error');
    }
  };

  player.playAudio = async () => {
    try {
      const { isLoaded, isPlaying } = await sound.current.getStatusAsync();

      if (isLoaded) {
        if (!isPlaying) {
          sound.current.playAsync();
          setPlaying(true);
        }
      }
    } catch (error) {
      setPlaying(false);
    }
  };

  player.pauseAudio = async () => {
    try {
      const { isLoaded, isPlaying } = await sound.current.getStatusAsync();

      if (isLoaded) {
        if (isPlaying) {
          await sound.current.pauseAsync();
          setPlaying(false);
        }
      }
    } catch (error) {
      setPlaying(true);
    }
  };

  player.replayAudio = async () => {
    const { isLoaded } = await sound.current.getStatusAsync();

    isLoaded && (await sound.current.playFromPositionAsync(0));
  };

  player.toggleLooping = async () => {
    try {
      const { isLoaded } = await sound.current.getStatusAsync();

      if (!isLoaded) return;
      const toggledValue = !looping;

      setLooping(toggledValue);
      await sound.current.setStatusAsync({ isLooping: toggledValue });
    } catch (error) {
      setLooping(!looping);
      console.log('error on toggleLooping');
    }
  };

  player.unloadAudio = async () => {
    await sound.current.unloadAsync();
    setCurrentAudioInfo({});
    setCurrentAudioId('');
    setLoaded(false);
    setLoading(false);
    setPlaying(false);
    setDuration(0);
    setProgressPercentage(0);
  };

  player.loadAudio = async audioInfo => {
    const { id, uri } = audioInfo;

    setCurrentAudioInfo(audioInfo);
    setCurrentAudioId(id);
    setLoading(true);

    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({ uri }, {}, true);
        if (result.isLoaded === false) {
          setCurrentAudioInfo({});
          setCurrentAudioId('');
          setLoading(false);
          setLoaded(false);
          console.log('Error in loading audio');
        } else {
          sound.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
          setLoading(false);
          setLoaded(true);
          setDuration(result.durationMillis);
        }
      } catch (error) {
        setCurrentAudioInfo({});
        setCurrentAudioId('');
        setLoading(false);
        setLoaded(false);
      }
    } else {
      setLoading(false);
      setLoaded(true);
    }
  };

  const _onPlaybackStatusUpdate = status => {
    try {
      if (status.didJustFinish) {
        if (status.isLooping) {
          player.replayAudio();
        } else {
          player.stopAudio();
        }
      } else if (status.positionMillis) {
        if (status.durationMillis) {
          setProgressPercentage((status.positionMillis / status.durationMillis) * 100);
        }
      }
    } catch (error) {
      console.log('Error on playback status update');
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        loaded,
        loading,
        playing,
        looping,
        currentAudioId,
        currentAudioInfo,
        progressPercentage,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
