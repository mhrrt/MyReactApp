// locationHelper.js
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);

      if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
        const reqStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        return reqStatus === RESULTS.GRANTED;
      } else if (status === RESULTS.BLOCKED) {
        openSettings().catch(() => console.warn('Cannot open settings'));
        return false;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};

// export const getCurrentLocation = async (onSuccess, onError) => {
//   const hasPermission = await requestLocationPermission();

//   if (!hasPermission) {
//     console.warn('Location permission not granted');
//     onError && onError({ message: 'Permission denied' });
//     return;
//   }

//   Geolocation.getCurrentPosition(
//     position => {
//       console.log('Location:', position.coords.latitude, position.coords.longitude);
//       onSuccess && onSuccess(position.coords.latitude, position.coords.longitude);
//     },
//     error => {
//       console.error('Location Error:', error);
//       onError && onError(error);
//     },
//     {
//       enableHighAccuracy: true,
//       timeout: 15000,
//       maximumAge: 10000,
//       distanceFilter: 0,
//     }
//   );
// };

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { coords } = position.coords;
        console.log('Location inside service:', coords);
        console.log('Location inside service:', coords, coords);
        resolve({ coords });
      },
      error => {
        console.error('Location Error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      }
    );
  });
};