import { Modal, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { Slider } from '@miblanchard/react-native-slider';
import { useEffect, useState } from 'react';
import { useProgress } from 'react-native-track-player';

const PlayerUI = ({ isVisible, toggleModal }) => {
  const progress = useProgress();
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const currentProgress = (progress.position / progress.duration) * 100;
    setProgressPercentage(currentProgress);
  }, [progress]);

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

        <Slider
          containerStyle={{ width: 200 }}
          value={progressPercentage}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#ec73ff"
          maximumTrackTintColor="#6a007a"
          thumbStyle={{ width: 10, height: 10 }}
          thumbTintColor="#ec73ff"
          onSlidingComplete={([v]) => {
            console.log('aaa', v);
          }}
        />
      </View>
    </Modal>
  );
};

export default PlayerUI;
