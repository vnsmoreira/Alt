import { View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import styles from './styles';

const PlayButton = ({ playing, player }) => {
  return (
    <View>
      {playing ? (
        <TouchableOpacity style={styles.pauseIcon} onPress={player.pause}>
          <Ionicons name="pause" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.playIcon} onPress={player.play}>
          <FontAwesome name="play" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayButton;
