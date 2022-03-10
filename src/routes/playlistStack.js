import { createStackNavigator } from '@react-navigation/stack';

import Playlists from '../pages/Playlists';

const Stack = createStackNavigator();

export default function PlaylistStack() {
  return (
    <Stack.Navigator initialRouteName="Playlists" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Playlists" component={Playlists} />
    </Stack.Navigator>
  );
}
