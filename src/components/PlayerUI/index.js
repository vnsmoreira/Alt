import { Modal, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const PlayerUI = ({ isVisible, toggleModal }) => {
  return (
    <Modal
      onRequestClose={() => toggleModal()}
      visible={isVisible}
      animationType="slide"
      style={styles.playerModal}
    >
      <View style={styles.playerContainer}>
        <View style={styles.playerHeader}>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons name="expand-more" size={45} color="gray" style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PlayerUI;
