import { View, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import styles from './styles';

const pauseButton = (player, disabled, size, color) => (
  <TouchableOpacity
    disabled={disabled}
    style={styles.pauseIcon}
    onPress={() => player && player.pause()}
  >
    <Ionicons name="pause" size={size} color={color} />
  </TouchableOpacity>
);

const playButton = (player, disabled, size, color) => (
  <TouchableOpacity
    disabled={disabled}
    style={styles.playIcon}
    onPress={() => player && player.play()}
  >
    <FontAwesome name="play" size={size} color={color} />
  </TouchableOpacity>
);

const PlayButton = ({ playing, player, disabled, size = 24, color = 'white' }) => {
  return (
    <View>
      {playing
        ? pauseButton(player, disabled, size, color)
        : playButton(player, disabled, size, color)}
    </View>
  );
};

export default PlayButton;
