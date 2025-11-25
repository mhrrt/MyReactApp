import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';

import HomeScreen from './HomeScreen';
import HoroscopeScreen from './screens/HoroscopeScreen';
import PanchangScreen from './screens/PanchangScreen';
// import ChoghadiyaTable from './screens/ChaughadiyaTable';
import ChaoghadiyaSegment from './screens/ChaoghadiyaSegment';
import { theme } from './theme';
import NotificationHandler from './NotificationHandler';

// Creating a tab navigator object using createBottomTabNavigator
const Tab = createBottomTabNavigator();

// Defining a functional component called TabNavigator
// const TabNavigator = () => {
  export default function TabNavigator({ initialTab }) {
  const navigation = useNavigation();

  return (
    // Returning the Tab.Navigator component that wraps all tab screens
    // `screenOptions` here disables the default header on each screen
    <Tab.Navigator initialRouteName={initialTab} screenOptions={{ //initialRouteName="Panchang"
      headerShown: false,
      tabBarActiveTintColor: '#FF6F00', // active icon/text color
        tabBarInactiveTintColor: '#888',  // inactive icon/text color
        tabBarActiveBackgroundColor: theme.colors.background, //'#FAE8C8', // background of selected tab
        tabBarInactiveBackgroundColor: '#fff',  // background of unselected tabs
    }}>
      <Tab.Screen
        name="RamShalaka" // name on the tab bar
        component={HomeScreen} // component that will get rendered
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Panchang"
        component={PanchangScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="wb-twilight" color={color} size={size} />
          ),
        }}/>

      <Tab.Screen
        name="Horoscope"
        component={HoroscopeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="online-prediction" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Chaughadiya"
        component={ChaoghadiyaSegment}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="access-time" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

// Exporting the TabNavigator component as default so it can be used elsewhere (e.g., in your main app navigation)
// export default TabNavigator;
