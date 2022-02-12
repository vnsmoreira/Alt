import 'expo-dev-client';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { PlayerProvider } from '../src/contexts/player';
import { StorageProvider } from './contexts/storage';
import PlayerUI from './components/AppPlayerUI';

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <StorageProvider>
        <PlayerProvider>
          <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
            <AppRoutes />
            <PlayerUI />
          </NavigationContainer>
        </PlayerProvider>
      </StorageProvider>
    );
  }
}
