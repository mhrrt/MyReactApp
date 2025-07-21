// NotificationHandler.js
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This will run even before React mounts
export const registerBackgroundHandler = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.pressAction?.id === 'HOROSCOPE_TAB') {
      console.log('#📲 Background: Notification tapped - storing target tab');
      try {
        await AsyncStorage.setItem('navigateToTab', 'Horoscope');
      } catch (e) {
        console.error('❌ Failed to save tab in AsyncStorage', e);
      }
    }
  });
};

// This runs once the app is in foreground
export const setupForegroundNotificationHandler = (navigateFn) => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    console.log('#📲 Foreground event:', type, detail);
    if (type === EventType.PRESS && detail.pressAction?.id === 'HOROSCOPE_TAB') {
      console.log('# Navigating to Horoscope tab');
      // navigateFn('Tabs', { screen: 'Horoscope' });

      navigateFn('Home', { 
          screen: 'Horoscope',
        });
    }
  });
};
