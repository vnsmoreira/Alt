import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Playlists from '../pages/Playlists/index.js';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="home-filled" size={24} color={focused ? 'white' : 'gray'} />
          ),
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              size={24}
              color={focused ? 'white' : 'gray'}
            />
          ),
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
  },
});
