// App.js
// AdMob 5MAr
import React, {useState, useEffect, useRef} from 'react';

import {Text, SafeAreaView, StyleSheet, View, Alert, AppState} from 'react-native';
// Adding navigation
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import HelpScreen from './HelpScreen';

import InfoCard from './InfoCard';
// import Icon from "react-native-vector-icons/Ionicons"; // You can use MaterialIcons or FontAwesome too
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// AdMob 5MAR
// 11MAr Admob platform specific
import {Platform} from 'react-native';

import notifee, {EventType} from '@notifee/react-native';
import {requestUserPermission} from './utils/permissions';
import {createNotificationChannel} from './utils/notificationChannel';
import {
  requestUserPermissionNotify,
  createNotificationChannelNotify,
  scheduleDailyNotification,
} from './notifications';

import TabNavigator from './TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {NotificationHandler} from './NotificationHandler';
import { navigationRef } from './RootNavigation'; // adjust path as needed


import { registerBackgroundHandler, setupForegroundNotificationHandler } from './NotificationHandler';




// 11MAR
let GAMBannerAd, BannerAdSize, TestIds;

// 11MAR
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  const AdModule = require('react-native-google-mobile-ads'); // Import the entire module first
  GAMBannerAd = AdModule.GAMBannerAd;
  BannerAdSize = AdModule.BannerAdSize;
  TestIds = __DEV__
    ? AdModule.TestIds
    : 'ca-app-pub-5854957597162003/5424363862';
}

const loadAdModule = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const {GAMBannerAd, BannerAdSize, TestIds} = await import(
      'react-native-google-mobile-ads'
    );
    return {GAMBannerAd, BannerAdSize, TestIds};
  }
  return null;
};

const Stack = createStackNavigator();
const titleText = 'राम शलाका प्रश्नावली गोस्वामी तुलसीदास क्रुत TInfoCorp';

const getMessageForCell = index => {
  const messageIndex = index % randomMessages.length;
  return randomMessages[messageIndex];
};

// 10 MAR
// Custom Wrapper to include a static view inside Stack.Navigator
const CustomScreenWrapper = ({children}) => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const adUnitId = __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-5854957597162003/5424363862';
    return (
      <View style={styles.container}>
        {/* Fixed View Below Navigation Bar */}

        {/* Screen Content */}
        <View style={styles.container}>{children}</View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const BannerForiOS = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const adUnitId = __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-5854957597162003/5424363862';
    return (
      <GAMBannerAd
        unitId={adUnitId}
        sizes={[BannerAdSize.FULL_BANNER]}
        onAdFailedToLoad={error =>
          // console.log('Ad Failed to Load:', error.code, error.message, adUnitId);
          console.log('')
        }
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    );
  }
  return null;
};

// regiser here as useeffect witin handler not getting called
registerBackgroundHandler();

export default function App() {

  console.log('🚀 App.js rendered');  // Add this at top of App function
  const navigationRef = useNavigationContainerRef();

  // dynamically setting default Active Tab
  const [initialTab, setInitialTab] = useState('Panchang');

  //for getting permission for local notification
  useEffect(() => {
    // Alert.alert('useEffect called from App.js #1');
    // notify lib @notifee
    async function setup() {
      const permissionGranted = await requestUserPermissionNotify();

      if (permissionGranted) {
        // Alert.alert('Permission granted #3');
        // const channel = await createNotificationChannelNotify();
        // setChannelId(channel);

        try {
          //Alert.alert('Permission granted #4');
          await scheduleDailyNotification();
          //Alert.alert('Daily notification scheduled for 8:2AM #5');
        } catch (error) {
          console.error('Failed to schedule daily notification:', error);
          Alert.alert(
            'Notification Error #10',
            'Failed to schedule daily notification',
            error,
          );
        }
      } else {
        Alert.alert(
          'Notification Warning #11',
          'Permission denied for daily notification!!',
        );
        console.log('Permission denied for local notifications');
      }
    }

    setup();
  }, []);

  // // for setting initial tab when user tap on notification banner
  // useEffect(() => {
  //   console.log('#2 Withing app.js and about to execute checkNotificationNav');
  //   const checkNotificationNav = async () => {
  //     const targetTab = await AsyncStorage.getItem('navigateToTab');
  //     if (targetTab) {
  //       console.log('🔁 Launching with initial tab:', targetTab);
  //       setInitialTab(targetTab);
  //       await AsyncStorage.removeItem('navigateToTab');
  //     }
  //   };

  //   checkNotificationNav();
  // }, []);

    useEffect(() => {
    console.log('# Withing app.js and about to execute setupForegroundNotificationHandler');
    const unsubscribe = setupForegroundNotificationHandler();
    return () => unsubscribe();
  }, []);

  // as asked registing forground in app.js
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      console.log('#1 Got onForegroundEvent with:', type, detail);
      if (type === EventType.PRESS && detail.pressAction?.id === 'HOROSCOPE_TAB') 
        {
        console.log('#2 📲 Foreground press: navigating to Horoscope tab');
        // navigation.navigate('Horoscope');
        // navigate('Tabs', { screen: 'Horoscope' });
        navigate('Home', { 
          screen: 'Horoscope',
        });
      } 
      else {
        console.log('#3 No event type with notification');
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Cold Start (Killed State) Notification
  useEffect(() => {
  const handleInitialNotification = async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification?.pressAction?.id === 'HOROSCOPE_TAB') {
      console.log('📲 [Cold Start] Notification tapped');
      await AsyncStorage.setItem('navigateToTab', 'Horoscope');
    }
  };

  handleInitialNotification();
}, []);

useEffect(() => {
  const checkNotificationIntent = async () => {
    const tab = await AsyncStorage.getItem('navigateToTab');
    if (tab) {
      console.log(`📍Navigating to ${tab} tab after notification tap`);
      // navigationRef.current?.navigate('Tabs', { screen: tab });

      // navigationRef('Tabs', { screen: 'Horoscope' });
      console.log('# navigationRef descripton', navigationRef.current);
      const state = navigationRef.current?.getRootState();
      console.log('# navigationRef root stae list: ', state.routes);
      
         navigationRef.current?.navigate('Home', {
        screen: tab, // e.g., 'Horoscope'
      });
      await AsyncStorage.removeItem('navigateToTab');
    }
  };

  checkNotificationIntent(); // on mount

  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      checkNotificationIntent();
    }
  });

  return () => sub.remove();
}, []);


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={({navigation}) => ({
              title: 'Ram Shalaka T-InfoCorp®',
              headerTitleStyle: {
                color: '#FF9933',
              },
              headerTitleAlign: 'center',
              headerRight: () => (
                <Icon
                  name="help-circle-outline"
                  size={25}
                  color={'#FF9933'}
                  style={{marginRight: 15}}
                  onPress={() => navigation.navigate('Help')}
                />
              ),
            })}>
            {() => (
              <CustomScreenWrapper>
                {/* <NotificationHandler/> */}
                <TabNavigator initialTab={initialTab} />
              </CustomScreenWrapper>
            )}
          </Stack.Screen>
          {/* Help Screen */}
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{title: 'Help'}}
          />
        </Stack.Navigator>
        <BannerForiOS />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adBanner1: {
    alignSelf: 'center',
    marginTop: 0, // Adjust spacing if needed
  },
  adBanner2: {
    alignSelf: 'center',
    marginTop: 0, // Adjust spacing if needed
  },
  fixedView: {
    height: 60, // Fixed height
    backgroundColor: '#FFF5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // panchangView: {
  //   height: 200, // Fixed height
  //   padding: 12,
  //   backgroundColor: '#FFF5E1',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
