import styles from './styles';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShareButton = ({ handlePress, disabled, size = 24, color = 'white' }) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress && handlePress()}
      disabled={disabled}
      style={styles.shareButton}
    >
      <Ionicons name="share-social" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default ShareButton;
