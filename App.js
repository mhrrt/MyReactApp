// App.js
// AdMob 5MAr
import React, { useState, useEffect } from 'react';

import { Text, SafeAreaView, StyleSheet } from 'react-native';
// import { initializeApp } from '@react-native-firebase/app';
// import { MobileAds } from 'react-native-google-mobile-ads';
// Adding navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import HelpScreen from  "./HelpScreen";
import InfoCard from  "./InfoCard"
import Icon from "react-native-vector-icons/Ionicons"; // You can use MaterialIcons or FontAwesome too

// AdMob 5MAR
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Initialize Firebase & AdMob
// initializeApp();
// MobileAds().initialize();
// AppRegistry.registerComponent(appName, () => App);

const Stack = createStackNavigator();
const titleText = 'राम शलाका प्रश्नावली गोस्वामी तुलसीदास क्रुत MTCorp®';

const getMessageForCell = (index) => {
  const messageIndex = index % randomMessages.length;
  return randomMessages[messageIndex];
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({navigation}) => ({
            title: "Ram Salaka MTCorp®",
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
        />
        {/* Help Screen */}
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />
      </Stack.Navigator>
       {/* Google AdMob Banner */}
        <GAMBannerAd
            unitId={TestIds.BANNER}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
        />
    </NavigationContainer>
    </SafeAreaView>
  );
}

// const descStyles = StyleSheet.create({
//   descriptionContainer: {
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//     alignItems: 'center',
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: '#333',
//     textAlign: 'center',
//   }
// });

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
});
