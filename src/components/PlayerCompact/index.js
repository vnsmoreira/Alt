import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { PlayerContext } from '../../contexts/player';
import { useProgress } from 'react-native-track-player';
import LoopingButton from './components/LoopingButton';
import styles from './styles';

const PlayerCompact = ({ toggleModal }) => {
  const { player, playing, loopingMode, currentAudioInfo } = useContext(PlayerContext);
  const progress = useProgress();
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const currentProgress = (progress.position / progress.duration) * 100;
    setProgressPercentage(currentProgress);
  }, [progress]);

  return (
    <View style={styles.player}>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progress, width: `${progressPercentage}%` }}></View>
      </View>
      <View style={styles.playerWrapper}>
        <TouchableOpacity onPress={toggleModal} style={{ width: 240, flexDirection: 'row' }}>
          <View style={styles.thumbnailContainer}>
            <Image style={styles.thumbnail} source={{ uri: currentAudioInfo.thumbnailUri }} />
          </View>
          <View style={styles.aboutContainer}>
            <Text numberOfLines={1} style={styles.musicTitle}>
              {currentAudioInfo.title}
            </Text>
            <View style={styles.musicInfo}>
              <Text style={styles.musicAuthor}>{currentAudioInfo.author}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.actions}>
          {playing ? (
            <TouchableOpacity style={styles.pauseIcon} onPress={player.pause}>
              <Ionicons name="pause" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.playIcon} onPress={player.play}>
              <FontAwesome name="play" size={24} color="white" />
            </TouchableOpacity>
          )}

          <LoopingButton loopingMode={loopingMode} player={player} />
        </View>
      </View>
    </View>
  );
};

export default PlayerCompact;