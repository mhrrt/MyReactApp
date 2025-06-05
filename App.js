// App.js
// AdMob 5MAr
import React, { useState, useEffect } from 'react';

import { Text, SafeAreaView, StyleSheet, View, Alert } from 'react-native';
// Adding navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import HelpScreen from  "./HelpScreen";

import InfoCard from  "./InfoCard"
// import Icon from "react-native-vector-icons/Ionicons"; // You can use MaterialIcons or FontAwesome too
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// AdMob 5MAR
// 11MAr Admob platform specific
import { Platform } from 'react-native';

import notifee from '@notifee/react-native';
import { requestUserPermission } from './utils/permissions';
import { createNotificationChannel } from './utils/notificationChannel';
import {requestUserPermissionNotify, 
        createNotificationChannelNotify, 
        scheduleDailyNotification } from './notifications';

// 11MAR
let GAMBannerAd, BannerAdSize, TestIds;

// 11MAR
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  const AdModule = require('react-native-google-mobile-ads'); // Import the entire module first
  GAMBannerAd = AdModule.GAMBannerAd;
  BannerAdSize = AdModule.BannerAdSize;
  TestIds = __DEV__ ? AdModule.TestIds : 'ca-app-pub-5854957597162003/5424363862';
}

const loadAdModule = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const { GAMBannerAd, BannerAdSize, TestIds } = await import('react-native-google-mobile-ads');
    return { GAMBannerAd, BannerAdSize, TestIds };
  }
  return null;
};

const Stack = createStackNavigator();
const titleText = 'राम शलाका प्रश्नावली गोस्वामी तुलसीदास क्रुत TInfoCorp';

const getMessageForCell = (index) => {
  const messageIndex = index % randomMessages.length;
  return randomMessages[messageIndex];
};

// 10 MAR
// Custom Wrapper to include a static view inside Stack.Navigator
const CustomScreenWrapper = ({ children }) => {
  
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5854957597162003/5424363862';
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
  );;
};

const BannerForiOS = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5854957597162003/5424363862';
    return (
      <GAMBannerAd
            unitId= {adUnitId}
            sizes={[BannerAdSize.FULL_BANNER]}
            onAdFailedToLoad={(error) => console.log('Ad Failed to Load:', error.code, error.message, adUnitId)}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
  }
  return null;
};

export default function App() {

  // const [channelId, setChannelId] = useState(null);

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
         Alert.alert('Notification Error #10', 'Failed to schedule daily notification',error);
        }
      } else {
       Alert.alert('Notification Warning #11','Permission denied for daily notification!!');
       console.log('Permission denied for local notifications');
      }
    }
    
    setup();
  },[]);


  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator> 

        <Stack.Screen 
          name="Home" 
          // component={HomeScreen} 
          options={({navigation}) => ({
            title: "Ram Shalaka T-InfoCorp®",
            headerTitleStyle: {
              color: '#FF9933'
            },
            headerRight: () => (
              <Icon 
                name="help-circle-outline" 
                size={25}
                color={'#FF9933'} 
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Help")} />
            )
          })}
        >
      {() => (
        <CustomScreenWrapper>
          <HomeScreen />
        </CustomScreenWrapper>
      )}
        </Stack.Screen>
        {/* Help Screen */}
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />
      </Stack.Navigator>
      <BannerForiOS />
        {/* <GAMBannerAd
            unitId={TestIds.BANNER}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
        /> */}
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
