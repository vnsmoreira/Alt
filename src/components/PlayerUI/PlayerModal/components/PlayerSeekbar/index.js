import styles from './styles';
import { Slider } from '@miblanchard/react-native-slider';

const PlayerSeekbar = ({ progressPercentage, onSlidingComplete }) => {
  return (
    <Slider
      animateTransitions={true}
      animationType="timing"
      containerStyle={styles.seekBar}
      value={progressPercentage}
      minimumValue={0}
      maximumValue={100}
      trackStyle={styles.track}
      minimumTrackTintColor="#ec73ff"
      maximumTrackTintColor="#6a007a"
      thumbStyle={styles.thumb}
      thumbTintColor="#ec73ff"
      onSlidingComplete={([v]) => onSlidingComplete(v)}
    />
  );
};

export default PlayerSeekbar;
