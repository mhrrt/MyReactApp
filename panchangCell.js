// panchangCell.js

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {getCurrentLocation, requestLocationPermission} from './locationHelper';
import {Avatar, Card, Icon, IconButton} from 'react-native-paper';

import {fetchPanchang} from './services/panchangServicePro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use icons as needed
import {theme} from './theme';
import CustomAvatarIcon from './customAvatarIcon';
import {reverseGeocode} from './utils/reverseGeocode';

const getCurrentDateTimeISO8601 = () => {
  const today = new Date();

  // Get the ISO string (this will be in UTC)
  let isoString = today.toISOString();

  // Adjust the time zone for local offset if needed
  const timezoneOffset = today.getTimezoneOffset(); // in minutes
  const hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
  const minutesOffset = Math.abs(timezoneOffset) % 60;

  // Adjust the time to local time by adding the timezone offset
  const offsetSign = timezoneOffset > 0 ? '-' : '+';
  const timezoneString = `${offsetSign}${String(hoursOffset).padStart(
    2,
    '0',
  )}:${String(minutesOffset).padStart(2, '0')}`;
  // console.log('iso time before removal of Z is', isoString);

  // Replace the 'Z' with the local time offset
  isoString = isoString.replace('Z', timezoneString);

  // console.log('final datestring is', isoString);
  return isoString;
};

function extractTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  //return date and time both
  const time = date.toLocaleTimeString();
  //   const fullDate = date.toLocaleDateString();
  //   return fullDate + ' ' + time;
  return time;
}

function extractDate(isoString) {
  const date = new Date(isoString);
  const month = date.toLocaleString('default', {month: 'short'});
  let dateDDMMYYYY = date.getDate() + '-' + month + '-' + date.getFullYear();
  return dateDDMMYYYY;
}

function extractDateTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  //return date and time both
  const time = date.toLocaleTimeString();

  const month = date.toLocaleString('default', {month: 'short'});
  let dateDDMMYYYY = date.getDate() + '-' + month + '-' + date.getFullYear();

  return dateDDMMYYYY + '  ' + time;
}

const PanchangCell = () => {
  const [coords, setCoords] = useState(null); // will make use of this for reverse geoCoding
  const [panchang, setPanchang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null); //initially location address is null
  const hasFetchedAddress = useRef(false);

  const [todaysDate, setTodaysDate] = useState(extractDate());

  const today = new Date();
  //let dateDDMMYYYY = today.getDate() + "-"+ String(today.getMonth() + 1).padStart(2, '0') +"-"+today.getFullYear();
  // ISO 8601 (YYYY-MM-DDTHH:MM:SSZ) format.  Example: 2004-02-12T15:19:21+05:30.
  const now = new Date();
  const isoString = now.toISOString();
  // console.log(isoString);

  // Build the final ISO 8601 string with the time zone
  const dateStringWithTimezone = isoString; //getCurrentDateTimeISO8601();
  // console.log(dateStringWithTimezone);

  const getPanchangData = async () => {
    // Alert.alert('Awating Location Permission');
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      // Alert.alert('Location Permission Denied', 'Cannot fetch location data without permission.');
      console.log('#Location: Within panchangCell loation is denied');
      setLoading(false);
      return;
    }

    try {
      // Alert.alert('Location permission granted');
      const {latitude, longitude} = await getCurrentLocation();
      setCoords({latitude, longitude}); // saving cordinates to make use of it later on

      //  Alert.alert('Awating api response for panchang...');
      console.log(
        '#Panchnag: Awating api response for panchang with Lat, long:',
        {latitude, longitude},
      );
      const apiResponse = await fetchPanchang(
        dateStringWithTimezone,
        latitude,
        longitude,
      );
      //  Alert.alert('panchange api response successfull');
      console.log('Full API Response:', JSON.stringify(apiResponse));

      const parsedResponse =
        typeof apiResponse === 'string' ? JSON.parse(apiResponse) : apiResponse;

      if (parsedResponse) {
        console.log('✅ Panchang parsed successfully:', parsedResponse.data);
        setPanchang(parsedResponse.data);
      } else {
        console.warn('⚠️ Output was empty or invalid');
        // Alert.alert('Error', 'Output was empty or invalid');
      }
    } catch (err) {
      console.error('❌ Failed to load Panchang:', err.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Alert.alert('useEffect called from panchangCell');
    getPanchangData();
  }, []);

  useEffect(() => {
    console.log('#ReverseGeoCode: Withing useeffect with coords', coords);
    if (!coords || hasFetchedAddress.current) return; // avoid multipal calls

    const fetchAddress = async () => {
      const addr = await reverseGeocode(coords.latitude, coords.longitude);
      console.log('#ReverseGeoCode: response: \n', JSON.stringify(addr, null, 2));
      // setTimeout(() => {
      //   Alert.alert(
      //     'ReverseGeoCode Response',
      //     `Lat: ${coords.latitude}, Lon: ${coords.longitude}\n${JSON.stringify(addr, null, 2)}`,
      //   );
      // }, 500);

      setAddress(addr);
      setLoading(false);
      hasFetchedAddress.current = true;
    };

    fetchAddress();
  }, [coords]); // runs only when coords is set

  if (loading)
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;

  if (!panchang) {
    return <Button title="Try Again" onPress={getPanchangData} />;
    // return <Text>Error loading Panchang</Text>;
  }

  const todaysHeader = 'Today’s Panchang, ' + extractDate(panchang?.sunrise);
  const nxtdayHeader =
    'Next Day Panchang, ' + extractDate(panchang.tithi[1].start);

  const todaysTithi = panchang.tithi[0]?.name ? panchang.tithi[0]?.name : '-';
  const todayTithiStart = extractDateTime(panchang.tithi[0].start);
  const todayTithiEnd = extractDateTime(panchang.tithi[0].end);

  const todayNakshtraStart = extractDateTime(panchang.nakshatra[0].start);
  const todayNakshtraEnd = extractDateTime(panchang.nakshatra[0].end);

  const nxtdaysTithi = panchang.tithi[1]?.name ? panchang.tithi[1]?.name : '-';
  const nxtdayTithiStart = extractDateTime(panchang.tithi[1].start);
  const nxtdayTithiEnd = extractDateTime(panchang.tithi[1].end);

  const nxtdayNakshtraStart = extractDateTime(panchang.nakshatra[1].start);
  const nxtdayNakshtraEnd = extractDateTime(panchang.nakshatra[1].end);

  const localAddress =  (address?.address?.city && address?.address?.country) ?
  (address?.address?.city + ' ' + address?.address?.country) : 
  ((address?.address?.county && address?.address?.country) ? 
  (address?.address?.county + ' ' + address?.address?.country) : 
  (address?.address?.state_district + ' ' + address?.address?.country)); 
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{todaysHeader}</Text>
      <Text style={styles.heading}>
        {loading
          ? 'Fetching address...'
          : (localAddress ? localAddress : 'City: N/A')}
      </Text>

      <Card.Title
        style={styles.card}
        title={`Sunrise: ${extractTime(
          panchang?.sunrise,
        )}\nSunset: ${extractTime(panchang?.sunset)}`}
        titleNumberOfLines={2}
        // subtitle={`Sunset: ${extractTime(panchang?.sunrise)}`}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="white-balance-sunny" />
        )}
      />

      <Card.Title
        style={styles.card}
        title={'Tithi: ' + todaysTithi + ' - ' + panchang?.tithi[0].paksha}
        subtitle={'Start: ' + todayTithiStart + '\nEnds: ' + todayTithiEnd}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => <CustomAvatarIcon {...props} icon="calendar" />}
      />

      <Card.Title
        style={styles.card}
        title={`Nakshatra: ${panchang.nakshatra[0]?.name} - Lord: ${panchang.nakshatra[0]?.lord.vedic_name}`}
        titleNumberOfLines={1}
        subtitle={
          'Start: ' + todayNakshtraStart + '\nEnds: ' + todayNakshtraEnd
        }
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => <CustomAvatarIcon {...props} icon="star-outline" />}
      />

      <Card.Title
        style={styles.card}
        title={`Yoga: ${panchang.yoga[0]?.name}`}
        subtitle={`Start: ${extractDateTime(
          panchang.yoga[0]?.start,
        )}\nEnds: ${extractDateTime(panchang.yoga[0]?.end)}`}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="flower-tulip-outline" />
        )}
      />

      <Card.Title
        style={styles.card}
        title={`karana: ${panchang.karana[0]?.name}`}
        subtitle={`Start: ${extractDateTime(
          panchang.karana[0]?.start,
        )}\nEnds: ${extractDateTime(panchang.karana[0]?.end)}`}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="moon-waning-gibbous" />
        )}
      />

      <Card.Title
        style={styles.card}
        title={`Moonrise: ${extractTime(
          panchang?.moonrise,
        )}\nMoonset: ${extractTime(panchang?.moonset)}`}
        titleNumberOfLines={2}
        subtitle={`${extractDate(panchang?.moonset)}`}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="moon-waning-crescent" />
        )}
      />

      {/* Next day Panchang goes here */}
      <Text style={styles.headingNxtday}>{nxtdayHeader}</Text>

      <Card.Title
        style={styles.card}
        title={'Tithi: ' + nxtdaysTithi + ' - ' + panchang?.tithi[1].paksha}
        subtitle={'Start: ' + nxtdayTithiStart + '\nEnds: ' + nxtdayTithiEnd}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => <CustomAvatarIcon {...props} icon="calendar" />}
      />

      <Card.Title
        style={styles.card}
        title={`Nakshatra: ${panchang.nakshatra[1]?.name} - Lord: ${panchang.nakshatra[1]?.lord.vedic_name}`}
        titleNumberOfLines={1}
        subtitle={
          'Start: ' + nxtdayNakshtraStart + '\nEnds: ' + nxtdayNakshtraEnd
        }
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => <CustomAvatarIcon {...props} icon="star-outline" />}
      />

      <Card.Title
        style={styles.card}
        title={`Yoga: ${panchang.yoga[1]?.name}`}
        subtitle={`Start: ${extractDateTime(
          panchang.yoga[1]?.start,
        )}\nEnds: ${extractDateTime(panchang.yoga[1]?.end)}`}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="flower-tulip-outline" />
        )}
      />

      <Card.Title
        style={styles.card}
        title={`karana: ${panchang.karana[1]?.name}`}
        subtitle={`Start: ${extractDateTime(
          panchang.karana[1]?.start,
        )}\nEnds: ${extractDateTime(panchang.karana[1]?.end)}`}
        subtitleNumberOfLines={2}
        titleStyle={styles.titleText}
        subtitleStyle={styles.subtitleText}
        left={props => (
          <CustomAvatarIcon {...props} icon="moon-waning-gibbous" />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 20,
  },
  heading: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  headingNxtday: {
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    marginTop: 10,
    borderRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FF9800',
    backgroundColor: theme.colors.background,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  subtitleText: {
    fontSize: 12,
    // color: '#37474f',
    color: '#713F12',
  },
});
export default PanchangCell;
