import { createStackNavigator } from '@react-navigation/stack';

import Playlists from '../pages/Playlists';
import Playlist from '../pages/Playlist';

const Stack = createStackNavigator();

export default function PlaylistStack() {
  return (
    <Stack.Navigator
      initialRouteName="Playlists"
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <Stack.Screen name="Playlists" component={Playlists} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
}
