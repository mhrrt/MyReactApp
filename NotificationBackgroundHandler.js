// NotificationBackgroundHandler.js
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerBackgroundHandler = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.pressAction?.id === 'HOROSCOPE_TAB') {
      console.log('#1 📲 Notification tapped in background');

      try {
        await AsyncStorage.setItem('navigateToTab', 'Horoscope');
      } catch (e) {
        console.error('Failed to save tab in AsyncStorage', e);
      }
    }
  });
};
