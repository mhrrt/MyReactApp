// notificationChannel.js
import notifee, { AndroidImportance } from '@notifee/react-native';

export async function createNotificationChannel() {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    console.log('Notification channel created:', channelId);
    return channelId;
  } catch (error) {
    console.error('Failed to create notification channel', error);
    return null;
  }
}
