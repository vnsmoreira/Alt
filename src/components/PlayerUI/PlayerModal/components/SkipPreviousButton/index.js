import styles from './styles';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SkipPreviousButton = ({ handlePress, disabled, size = 24, color = 'white' }) => {
  return (
    <TouchableOpacity onPress={() => handlePress && handlePress()} disabled={disabled}>
      <MaterialIcons name="skip-previous" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default SkipPreviousButton;
