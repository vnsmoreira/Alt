import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const AppLoadingSpinner = ({ color }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default AppLoadingSpinner;
