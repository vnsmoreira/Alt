import { View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';

const LoopingButton = ({ loopingMode, player }) => {
  return (
    <View>
      {loopingMode == 'queue' ? (
        <TouchableOpacity style={styles.loopIcon} onPress={player.toggleLooping}>
          <MaterialCommunityIcons name="repeat" size={24} color="purple" />
        </TouchableOpacity>
      ) : loopingMode == 'track' ? (
        <TouchableOpacity style={styles.loopIcon} onPress={player.toggleLooping}>
          <MaterialCommunityIcons name="repeat-once" size={24} color="purple" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loopIcon} onPress={player.toggleLooping}>
          <MaterialCommunityIcons name="repeat-off" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoopingButton;
