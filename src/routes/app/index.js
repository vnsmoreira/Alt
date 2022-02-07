import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../pages/Home';

const Tab = createBottomTabNavigator();

const styles = {
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
    color: 'white',
    marginBottom: 5,
  },
};

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
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-home" size={24} color="white" />,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  );
}
