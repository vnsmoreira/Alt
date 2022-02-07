import { Text, View } from 'react-native';
import styles from './styles';

export default function Playlists() {
  return (
    <View style={styles.playlists}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Suas Playlists</Text>
      </View>
    </View>
  );
}
