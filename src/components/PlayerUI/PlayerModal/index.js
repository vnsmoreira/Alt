import { useContext, useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import { useProgress } from 'react-native-track-player';
import { PlayerContext } from '../../../contexts/player';
import PlayButton from '../components/PlayButton';
import LoopingButton from '../components/LoopingButton';
import SkipPreviousButton from '../components/SkipPreviousButton';
import SkipNextButton from '../components/SkipNextButton';
import PlayerSeekbar from '../components/PlayerSeekbar';
import ShareButton from '../components/ShareButton';

const PlayerUI = () => {
  const { player, playing, loopingMode, currentAudioInfo, showPlayerUI } =
    useContext(PlayerContext);

  const { duration, position } = useProgress();
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const thumbnailUri = currentAudioInfo.thumbnailUri;

  useEffect(() => {
    const currentProgress = (position / duration) * 100;
    setProgressPercentage(currentProgress);
  }, [position]);

  const onSlidingComplete = percentage => {
    const seconds = duration * (percentage / 100);
    player.jumpTo(seconds);
    setProgressPercentage(percentage);
  };

  const handlePlay = () => (playing ? player.pause() : player.play());

  return (
    <Modal
      statusBarTranslucent
      onRequestClose={player.hideUI}
      visible={showPlayerUI}
      animationType="slide"
      style={styles.playerModal}
    >
      <ImageBackground
        blurRadius={5}
        style={[styles.playerContainer]}
        source={{ uri: thumbnailUri }}
      >
        <View style={{ backgroundColor: thumbnailUri ? 'rgba(0,0,0,.3)' : '#141414' }}>
          <View style={styles.playerWrapper}>
            <View style={styles.playerHeader}>
              <TouchableOpacity onPress={player.hideUI}>
                <Entypo name="chevron-thin-down" size={30} color="#ccc" />
              </TouchableOpacity>
            </View>

            <View style={styles.playerThumbnails}>
              <Image
                borderRadius={10}
                blurRadius={3}
                style={styles.currentTrackThumbnail}
                source={{ uri: thumbnailUri }}
              />
            </View>

            <View style={styles.aboutContainer}>
              <Text numberOfLines={1} style={styles.musicTitle}>
                {currentAudioInfo.title}
              </Text>
              <View style={styles.musicInfo}>
                <Text style={styles.musicAuthor}>{currentAudioInfo.artist}</Text>
              </View>
            </View>

            <View style={[styles.seekBarContainer]}>
              <PlayerSeekbar
                progressPercentage={progressPercentage}
                onSlidingComplete={onSlidingComplete}
              />
            </View>

            <View style={styles.controls}>
              <ShareButton />

              <View style={styles.mainControls}>
                <SkipPreviousButton handlePress={player.skipPrevious} />

                <TouchableOpacity onPress={handlePlay} style={styles.playButtonContainer}>
                  <PlayButton disabled={true} playing={playing} />
                </TouchableOpacity>

                <SkipNextButton handlePress={player.skipNext} />
              </View>

              <LoopingButton loopingMode={loopingMode} player={player} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default PlayerUI;
