import { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PlayerContext } from '../../contexts/player';

import styles from './styles';

const PlayerUI = () => {
  const { player, loading, playing, looping, progressPercentage, currentAudioInfo } =
    useContext(PlayerContext);

  return (
    <View style={styles.player}>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progress, width: `${progressPercentage}%` }}></View>
      </View>
      <View style={styles.playerWrapper}>
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
        <View style={styles.actions}>
          {playing ? (
            <TouchableOpacity style={styles.pauseIcon} onPress={player.pauseAudio}>
              <Ionicons name="pause" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.playIcon} onPress={player.playAudio}>
              <FontAwesome name="play" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.loopIcon} onPress={player.toggleLooping}>
            <MaterialIcons name="replay" size={24} color={looping ? 'purple' : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlayerUI;
