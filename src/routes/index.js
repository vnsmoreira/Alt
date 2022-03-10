import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStack from './homeStack';
import PlaylistStack from './playlistStack';

const Tab = createBottomTabNavigator();

/* icons */
const HomeTabBarIcon = ({ focused }) => (
  <MaterialIcons name="home-filled" size={24} color={focused ? 'white' : 'gray'} />
);

const PlaylistTabBarIcon = ({ focused }) => (
  <MaterialCommunityIcons name="playlist-music" size={24} color={focused ? 'white' : 'gray'} />
);

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: HomeTabBarIcon,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="PlaylistStack"
        component={PlaylistStack}
        options={{
          title: 'Playlists',
          tabBarIcon: PlaylistTabBarIcon,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,

    borderTopWidth: 0,

    backgroundColor: 'rgba(14,14,14,0.99)',

    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  tabBarLabelStyle: {
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'Lato_700Bold',
  },
});
