import { Modal, View, TouchableOpacity, Image, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import { useContext, useEffect, useState } from 'react';
import { useProgress } from 'react-native-track-player';
import { PlayerContext } from '../../../contexts/player';
import PlayButton from '../PlayerCompact/components/PlayButton';
import LoopingButton from '../PlayerCompact/components/LoopingButton';
import SkipPreviousButton from './components/SkipPreviousButton';
import SkipNextButton from './components/SkipNextButton';
import PlayerSeekbar from './components/PlayerSeekbar';
import ShareButton from './components/ShareButton';

const PlayerUI = ({ isVisible, toggleModal }) => {
  const { player, playing, loopingMode, currentAudioInfo } = useContext(PlayerContext);
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
      onRequestClose={() => toggleModal()}
      visible={isVisible}
      animationType="slide"
      style={styles.playerModal}
    >
      <View style={styles.playerContainer}>
        <View style={styles.playerWrapper}>
          <View style={styles.playerHeader}>
            <TouchableOpacity onPress={toggleModal}>
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
              <SkipPreviousButton handlePress={player.skipNext} />

              <TouchableOpacity onPress={handlePlay} style={styles.playButtonContainer}>
                <PlayButton disabled={true} playing={playing} />
              </TouchableOpacity>

              <SkipNextButton handlePress={player.skipPrevious} />
            </View>

            <LoopingButton loopingMode={loopingMode} player={player} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlayerUI;
