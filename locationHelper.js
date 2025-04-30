// locationHelper.js
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  let status;
  try {
    if (Platform.OS === 'ios') {
      const isSimulator = Platform.OS === 'ios' && !Platform.isTVOS && !Platform.isPad;

      if (isSimulator) {
        // Simulator-specific logic
        console.log('Running on iOS Simulator - location permission check skipped or mocked');
        status = RESULTS.GRANTED; // or RESULTS.DENIED if you want to simulate denied
      } else {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (status === RESULTS.GRANTED) 
        return true;

      if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
        const reqStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return reqStatus === RESULTS.GRANTED;
      }

      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location permissions from settings.',
          [
            { text: 'Open Settings', onPress: () => openSettings() },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return false;
      }
    } else {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (hasPermission) return true;

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }

  return false;
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {

    const isSimulator = Platform.OS === 'ios' && !Platform.isTVOS && !Platform.isPad;
    if (isSimulator) {
      const { latitude, longitude } = { latitude: 20.078, longitude: 47.05 };
      return resolve({ latitude, longitude });
    }
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('📍 Location from Geolocation:', latitude, longitude);
        resolve({ latitude, longitude });
      },
      async error => {
        console.warn('⚠️ Geolocation failed:', error.message);

        // Fallback to navigator.geolocation
        if (navigator?.geolocation) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              const { latitude, longitude } = pos.coords;
              console.log('📍 Fallback navigator location:', latitude, longitude);
              resolve({ latitude, longitude });
            },
            fallbackErr => {
              console.error('❌ Navigator fallback failed:', fallbackErr.message);
              Alert.alert(
                'Location Error',
                'Unable to get your location. Please check location settings.'
              );
              reject(fallbackErr);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
          );
        } else {
          Alert.alert('Location Error', 'Geolocation is not available on this device.');
          reject(new Error('Geolocation not available'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });
};
