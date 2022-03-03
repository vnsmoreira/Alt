import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { PlayerProvider } from './contexts/player';
import { useState } from 'react';
import PlayerCompact from './components/PlayerUI/PlayerCompact';
import PlayerModal from './components/PlayerUI/PlayerModal';
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
          <PlayerModal isVisible={showModal} toggleModal={handleToggleModal} />
          <MusicActionSheet />
        </NavigationContainer>
      </PlayerProvider>
    );
  }
}
