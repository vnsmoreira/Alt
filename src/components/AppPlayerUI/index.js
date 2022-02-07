import { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { PlayerContext } from '../../contexts/player';

import styles from './styles';

const PlayerUI = () => {
  const { playerState, player } = useContext(PlayerContext);
  const { song, isPlaying } = playerState;

  return (
    <View style={styles.player}>
       {playerState.isPlaying ? (
        <TouchableOpacity onPress={player.pauseMusic} delayPressIn={0}>
          <Ionicons name="pause" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={player.resumeMusic}>
          <FontAwesome name="play" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayerUI;
