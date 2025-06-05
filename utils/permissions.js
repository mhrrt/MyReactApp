// 

// permission.js
//import notifee from '@notifee/react-native';
import { Platform, Alert } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

export async function requestUserPermission() {
  try {
    // Only request permission on iOS or Android 13+
    const settings = await notifee.requestPermission();
    console.log('within requestUserPermission');
    //Alert.alert('requestUserPermission called');
    if (
      settings.authorizationStatus >=
      notifee.AuthorizationStatus
    ) {
      console.log('Permission granted:', settings);
      //Alert.alert('Permission granted: true');
      return true;
    } else {
      Alert.alert('Warning', 'Notifications permission not granted');
      return false;
    }
  } catch (error) {
    console.error('Permission error within requestUserPermission:', error);
    //Alert.alert('requestUserPermission failed in catch block');
    return false;
    
  }
}
