import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

/* contexts */
import { PlayerProvider } from './contexts/player';

/* components */
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes';
import AppLoading from 'expo-app-loading';

import PlayerCompact from './components/PlayerUI/PlayerCompact';
import PlayerModal from './components/PlayerUI/PlayerModal';
import AppActionSheet from './components/AppActionSheet';

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
      <PlayerProvider>
        <NavigationContainer>
          <StatusBar translucent backgroundColor="transparent" />
          <AppRoutes />
          <PlayerCompact />
          <PlayerModal />
          <AppActionSheet />
        </NavigationContainer>
      </PlayerProvider>
    );
  }
}
