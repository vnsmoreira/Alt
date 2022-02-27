import 'react-native-gesture-handler';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { PlayerProvider } from './contexts/player';
import PlayerCompact from './components/PlayerCompact';
import { useState } from 'react';
import PlayerUI from './components/PlayerUI';
import MusicActionSheet from './components/AppMusicItem/components/MusicActionsheet';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => setShowModal(!showModal);

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
          <PlayerCompact toggleModal={handleToggleModal} />
          <PlayerUI isVisible={showModal} toggleModal={handleToggleModal} />
          <MusicActionSheet />
        </NavigationContainer>
      </PlayerProvider>
    );
  }
}
