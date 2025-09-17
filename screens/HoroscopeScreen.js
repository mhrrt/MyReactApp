import React, {useState, useRef, useEffect} from 'react';
import { useColorScheme } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
//get local incons for sign
import {
  AriesIcon,
  TaurusIcon,
  GeminiIcon,
  CancerIcon,
  LeoIcon,
  VirogIcon,
  LibraIcon,
  ScorpioIcon,
  SagittariusIcon,
  CapricornIcon,
  PiscesIcon,
  AquIcon,
} from '../assets/icons';

import TranslationService from '../utils/TranslationService';
import HoroscopeTranslation from './HoroscopeTranslation';
import { theme } from '../theme';
// import { useNavigation } from '@react-navigation/native';
import ShareMe from '../utils/shareMe';
import {
  requestUserPermissionNotify,
  createNotificationChannelNotify,
  scheduleDailyNotification,
} from '../notifications';




const zodiacSigns = [
  {name: 'Aries', icon: AriesIcon},
  {name: 'Taurus', icon: TaurusIcon},
  {name: 'Gemini', icon: GeminiIcon},
  {name: 'Cancer', icon: CancerIcon},
  {name: 'Leo', icon: LeoIcon},
  {name: 'Virgo', icon: VirogIcon},
  {name: 'Libra', icon: LibraIcon},
  {name: 'Scorpio', icon: ScorpioIcon},
  {name: 'Sagittarius', icon: SagittariusIcon},
  {name: 'Capricorn', icon: CapricornIcon},
  {name: 'Aquarius', icon: AquIcon},
  {name: 'Pisces', icon: PiscesIcon},
];


const horoscopeDailyUrl =
  'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily';
const queryParam1 = 'sign';
const queryParam2 = 'day';

const DayTabs = {
  TODAY: 'TODAY',
  TOMORROW: 'TOMORROW',
  YESTERDAY: 'YESTERDAY',
};
Object.freeze(DayTabs); // optional: makes it immutable, like an enum

function buildUrlWithParams(baseUrl, param1Value, param2Value) {
  const url = new URL(baseUrl);
  console.log(
    '#4 Within build url function Sign and day are: ',
    param1Value,
    param2Value,
  );
  url.searchParams.set('sign', param1Value);
  url.searchParams.set('day', param2Value);

  return url.toString(); // Return the complete URL string
}

const HoroscopeScreen = () => {
  
  const viewRef = useRef();

  const translationRef = useRef(); // creating ref to access child method in TranslationService
  
  // State to store selected zodiac sign
  const [selectedSign, setSelectedSign] = useState(null);

  // to store active tab (TODAY, TOMORROW, or YYYY-MM-DD)
  const [activeTab, setActiveTab] = useState(DayTabs.TODAY);

  // State to store horoscope text
  const [horoscopeText, setHoroscope] = useState('');

  // State to handle loading indicator
  const [loading, setLoading] = useState(false);

  const [selectedLang, setSelectedLang] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const scheme = useColorScheme(); // returns 'light' or 'dark'
  const textStyles = getStyles(scheme); // generate themed styles

  const updateHoroscope = (text) => {
    setHoroscope(text);
    setTranslatedText(text);
    // const removeSignName = text.replaceAll(selectedSign, ""); 
    // console.log('#Updated text for translation API after removal of:', selectedSign, removeSignName);
    // setTranslatedText(removeSignName);
  }

  // UseEffect is the point where we will have updated value for our set<Property>
//   useEffect(() => {
//   if (selectedSign) {
//     // Do something with updated selectedSign
//     console.log("Updated sign:", selectedSign);

//     const updatedTextForTranslation = horoscopeText.replaceAll(selectedSign, ""); 
//     console.log('#Updated text for translation API after removal of:', selectedSign, updatedTextForTranslation);
//     setTranslatedText(updatedTextForTranslation);
    
//   }
// }, [selectedSign]);


  const fetchHoroscope = async (sign, day) => {
    try {
      setLoading(true);
      console.log('#3 horoscope param are:', sign, day);
      //'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign.toUpperCase()}&day=${day}'
      const horoscopeUrl = buildUrlWithParams(horoscopeDailyUrl, sign, day);
      console.log('horoscopeUrl is:', horoscopeUrl);
      const response = await fetch(horoscopeUrl);
      const data = await response.json();
      console.log(
        'Horoscope response for sign:',
        JSON.stringify(data, null, 2),
      );
      // setHoroscope(data.data.horoscope_data); // Save horoscope text
      updateHoroscope(data.data.horoscope_data); // Save horoscope text

      //if language is alrady selected then trigger translation service
      if(translationRef.current) {
        const selectedPickerLang =  translationRef.current.getSelectedLang();
        console.log('#====Horoscope view language already selected as: ', selectedPickerLang);
        if(selectedPickerLang) {
          translationRef.current.triggerTranslation(selectedPickerLang);
        }
      } else {
        console.log('tranlationRef is missing', translationRef.current);
      }

    } catch (error) {
      console.log(error);
      // setHoroscope('Failed to fetch horoscope.');
      updateHoroscope('Failed to fetch horoscope.');

    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Function called when a tab is pressed
  const handleTabPress = day => {
    setActiveTab(day);
    console.log('#2 selected day is:', activeTab);
    if (selectedSign) {
      fetchHoroscope(selectedSign, day);
    }
  };

  // fucntionality called when user tap on zodiac sign table
  const handleSignPress = sign => {
    setSelectedSign(sign);
    console.log('#1 selected sign is:', selectedSign);
    fetchHoroscope(sign, activeTab); // activeTab do have value of current active tab
  };

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
          Alert.alert(
            'Notification Error #10',
            'Failed to schedule daily notification',
            error,
          );
        }
      } else {
        Alert.alert(
          'Notification Warning #11',
          'Permission denied for daily notification!!',
        );
        console.log('Permission denied for local notifications');
      }
    }

    setup();
  }, []);

  return (
    <View style={styles.topContainer} ref={viewRef}> 
     <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Zodiac 3x4 grid */}
      <View style={styles.signGrid}>
        {zodiacSigns.map(sign => (
          <TouchableOpacity
            key={sign.name}
            style={[
              styles.signItem,
              selectedSign === sign.name && styles.activeSignItem,
            ]}
            onPress={() => {
              // Handle onPress, e.g., navigate or show details
              console.log(`Clicked ${sign.name}`);
              handleSignPress(sign.name);
            }}>
            <Image source={sign.icon} style={styles.icon} />

            <Text style={styles.label}>{sign.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs below grid */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === DayTabs.TODAY && styles.activeTab]}
          onPress={() => handleTabPress(DayTabs.TODAY)}>
          <Text style={styles.tabText}>Today</Text>
        </TouchableOpacity>
        {/* Tabs for tomarrow */}
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === DayTabs.TOMORROW && styles.activeTab,
          ]}
          onPress={() => handleTabPress(DayTabs.TOMORROW)}>
          <Text style={styles.tabText}>Tomorrow</Text>
        </TouchableOpacity>

        {/* Tabs for yesterday */}
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === DayTabs.YESTERDAY && styles.activeTab,
          ]}
          onPress={() => handleTabPress(DayTabs.YESTERDAY)}>
          <Text style={styles.tabText}>Yesterday</Text>
        </TouchableOpacity>
      </View>

      {/* Horoscope response will go here */}
      <View style={styles.horoscopeContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#f57c00" />
        ) : (
          <Text style={styles.horoscopeText}>{horoscopeText}</Text>
        )}
      </View>

      {/* Pickerview and translation from another class */}
      <View style={styles.container}>
        <Text style={styles.header}>View Horoscope In Your Language</Text>
        <HoroscopeTranslation ref={translationRef} originalText={translatedText.replaceAll(selectedSign, "")} />
        {/* <Text style={styles.footer}>Other non-reloading component</Text> */}
      </View>
    </View>
     </ScrollView>

      <TouchableOpacity
               style={styles.roundIconButton}
               onPress={() => ShareMe.shareViewAsImage(viewRef, 'Horoscope')}>
               <MaterialCommunityIcons
                 name="share-variant-outline"
                 size={20}
                 color="#fff"
                 style={styles.shareIcon}
               />
               {/* <Text style={styles.shareButtonText}></Text> */}
             </TouchableOpacity>
     </View>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    horoscopeTextByTheme: {
      fontSize: 14,
      color: scheme === 'dark' ? '#FFFFFF' : '#000000',
      // add other shared styles here
    textAlign: 'justify',
    },
  });

// Styles
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,// or your theme color
  },
  scrollContainer: {
    //flex: 1,
   // paddingBottom: ,
    backgroundColor: theme.colors.background,
  },
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  signGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginVertical: 8,
},
signItem: {
  flexBasis: '24%',  // 4 per row
  marginVertical: 2,
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#FF9800',
  borderRadius: 8,
  backgroundColor: theme.colors.background,
  paddingVertical: 8,

},
icon: {
  width: 40,
  height: 40,
  marginBottom: 4,
},
label: {
  fontSize: 12,
  color: '#333',
  textAlign: 'center',
},
  activeSignItem: {
    backgroundColor: '#ffdd00', // highlighted background (orange)
  },
  signText: {
    color: '#000',
    fontWeight: '500',
  },

  activeSignText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f57c00',
  },
  activeTab: {
    backgroundColor: '#f57c00',
  },
  tabText: {
    color: '#333',
  },
  horoscopeContainer: {
    margin: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxWidth: '97%',
  },
  horoscopeText: {
    fontSize: 14,
    textAlign: 'justify',
     color: '#4a0505a0',
     margin: 5,
  },
  translationWrapper: {
    marginTop: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    fontSize: 14,
  },
  shareButton: {
    flexDirection: 'row', // 👈 Horizontal layout
    alignItems: 'center', // 👈 Vertically center items
    justifyContent: 'center',
    backgroundColor: '#ff9900',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  shareButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareIcon: {
    // marginRight: 8, // 👈 Space between icon and text
    alignSelf: 'center',
    alignItems: 'center',
  },
  roundIconButton: {
    backgroundColor: '#FF9800',  // or any color you prefer
    borderRadius: 30,            // half of height/width to make it circular
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,                // adds shadow on Android
    shadowColor: '#000',         // adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 3,
    position: 'absolute',
    bottom:20,
    right:5,
  },
});

export default HoroscopeScreen;
