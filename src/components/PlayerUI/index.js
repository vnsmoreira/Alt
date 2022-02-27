import { Modal, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { Slider } from '@miblanchard/react-native-slider';
import { useContext, useEffect, useState } from 'react';
import { useProgress } from 'react-native-track-player';
import { PlayerContext } from '../../contexts/player';

const PlayerUI = ({ isVisible, toggleModal }) => {
  const { player } = useContext(PlayerContext);
  const { duration, position } = useProgress();
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const currentProgress = (position / duration) * 100;
    setProgressPercentage(currentProgress);
  }, [position]);

  const onSlidingComplete = percentage => {
    const seconds = duration * (percentage / 100);
    player.jumpTo(seconds);
  };

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
          onSlidingComplete={([v]) => onSlidingComplete(v)}
        />
      </View>
    </Modal>
  );
};

export default PlayerUI;
