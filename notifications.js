import notifee, {AuthorizationStatus, TimestampTrigger, TriggerType, RepeatFrequency, AndroidImportance, AndroidNotificationSetting} from '@notifee/react-native';
import { Alert } from 'react-native';

export async function requestUserPermissionNotify() {
  const settings = await notifee.requestPermission();

  console.log('settings.authorizationStatus get called', settings.authorizationStatus.toString);

  const localnotificationAuthDone = settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
    // Alert.alert('Result #2', `localnotificationAuthDone is: ${localnotificationAuthDone}`);
    console.log('#2 localnotificationAuthDone vaue is', localnotificationAuthDone.toString());
  return (
    localnotificationAuthDone
  );
}

export async function createNotificationChannelNotify() {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      lights: true,
      vibration: true,
      bypassDnd: true,
    });
    return channelId;
  } catch (error) {
    console.error('Failed to create notification channel:', error.log);
    console.log('❌ notification channel, Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.log('error.name:', error.name);
    console.log('error.message:', error.message);
    console.log('error.stack:', error.stack);
    Alert.alert('Channel Error', 'Failed to create notification channel');
    return null; // or handle error accordingly
  }
}

export async function scheduleDailyNotification() {
// Request permissions (required for iOS)
    await notifee.requestPermission()
  try {
  //create channelID first,  (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default-Channel',
      importance: AndroidImportance.HIGH,
      // lights: true,
      // vibration: true,
      // bypassDnd: true,
    });

  // Set the time to 4:00 AM today
  //const date = new Date();
  // const date = new Date(Date.now());
  // date.setHours(18);
  // date.setMinutes(26);
  // date.setSeconds(0);

  const date = new Date(Date.now() + 10000); 
    date.setHours(4);
    date.setMinutes(0);

 // If 4AM has already passed today, schedule for tomorrow
  if (date.getTime() < Date.now()) {
    date.setDate(date.getDate() + 1);
  }


  //Create timestamp trigger
   const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // first time it will trigger
    repeatFrequency: RepeatFrequency.DAILY,
   // alarmManager: true, // ensures wake-up on Android
  };

  const notificationId = await notifee.createTriggerNotification(
    {
      title: 'Good morning!, Get Todays Panchang',
      body: 'Check today’s Panchang details in the app!',
      android: {
         channelId, // ensure this exists
         smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          //id: channelId,
           id: 'default',
        },
        // onTrigger: {
        //   actionId: 'action_1',
        //   launchApp: true, // Optionally launch the app
        //   onBackgroundEvent: (event) => {
        //     console.log('Notification triggered in background:', event);
        //     return; // You can also return a value if needed
        //   },
        // },
      },
    },
    trigger

  );
  const timestamp = date.getTime(); // e.g., 1716355200000

  const readableDate = new Date(timestamp).toLocaleString();
  console.log('Scheduled notification with ID:', notificationId, TriggerType.TIMESTAMP.toString(), timestamp.toString());
  // Alert.alert('Notification Scheduled', `ID: ${notificationId} ${TriggerType.TIMESTAMP.toString()} ${readableDate}`);

  notifee.getTriggerNotifications

   } catch(error) {
    console.error('Failed to create notification channel:', error.log);
    console.log('❌ notification channel, Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.log('error.name:', error.name);
    console.log('error.message:', error.message);
    console.log('error.stack:', error.stack);
    Alert.alert('Channel Error', 'Failed to create notification channel');
  }
}