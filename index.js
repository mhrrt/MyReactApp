/**
 * @format
 */


import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// ✅ Import background handler only after native modules ready
import { registerBackgroundHandler } from './NotificationHandler'; // ✅ Add this


import { backgroundEventHandler } from './App';
// import notifee, { EventType } from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

registerBackgroundHandler(); // ✅ Must be called before App is started

AppRegistry.registerComponent(appName, () => App);
