// panchangCard.js

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { getCurrentLocation, requestLocationPermission } from './locationHelper';

import { fetchPanchang } from './services/panchangServicePro';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use icons as needed

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
  const timezoneString = `${offsetSign}${String(hoursOffset).padStart(2, '0')}:${String(minutesOffset).padStart(2, '0')}`;
  console.log('iso time before removal of Z is', isoString);

  // Replace the 'Z' with the local time offset
  isoString = isoString.replace('Z', timezoneString);

  console.log('final datestring is', isoString);
  return isoString;
};

function extractTime(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  //return `${hours}:${minutes}:${seconds}`;
  return date.toLocaleTimeString();
};

const panchangCard = () => {
    const [panchang, setPanchang] = useState(null);
    const [loading, setLoading] = useState(true);

  const today = new Date();
  //let dateDDMMYYYY = today.getDate() + "-"+ String(today.getMonth() + 1).padStart(2, '0') +"-"+today.getFullYear();
  // ISO 8601 (YYYY-MM-DDTHH:MM:SSZ) format.  Example: 2004-02-12T15:19:21+05:30. 
  const now = new Date();
  const isoString = now.toISOString();
  console.log(isoString);

  // Build the final ISO 8601 string with the time zone
  const dateStringWithTimezone = isoString; //getCurrentDateTimeISO8601();
  console.log(dateStringWithTimezone);

  const Card = ({ title, value, icon }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={28} color="#712D0F" />
      </View>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  const getPanchangData = async () => {

    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot fetch location data without permission.');
      setLoading(false);
      return;
    }
    // Alert.alert('Location permission granted');
    try {
      const { latitude, longitude } = await getCurrentLocation();
      console.log('Device Location:', latitude, longitude);
      console.log('Date format passed to API function:', dateStringWithTimezone);

      const apiResponse = await fetchPanchang(
       dateStringWithTimezone,
       latitude,
       longitude,
      );
      console.log('Full API Response:', JSON.stringify(apiResponse));

      const parsedResponse = typeof apiResponse === 'string'
        ? JSON.parse(apiResponse)
        : apiResponse;

      if (parsedResponse) {
        console.log('✅ Panchang parsed successfully:', parsedResponse.data);
        setPanchang(parsedResponse.data);
      } else {
        console.warn('⚠️ Output was empty or invalid');
        Alert.alert('Error', 'Output was empty or invalid');
      }
    } catch (err) {
      console.error('❌ Failed to load Panchang:', err);
      Alert.alert('Error', 'Something went wrong while fetching Panchang');
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
        getPanchangData();
    }, []); 


if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

if (!panchang) return <Text>Error loading Panchang</Text>;

const todaysTithi =  panchang.tithi[0]?.name ? `${panchang.tithi[0].name} \n ${extractTime(panchang.tithi[0].start)}  ${extractTime(panchang.tithi[0].end)}` : '-';
const nxtdaysTithi =  panchang.tithi[1]?.name ? `${panchang.tithi[1].name} \n ${extractTime(panchang.tithi[1].start)}  ${extractTime(panchang.tithi[1].end)}` : '-';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todays Panchang</Text>

      <View style={styles.row}>
        <Card title="Tithi" value={todaysTithi} icon="flare" />
        <Card title="Nakshatra" value={`${panchang.nakshatra[0]?.name}`} icon=" " />
        <Card title="Sunrise" value={`${extractTime(panchang?.sunrise)} ${extractTime(panchang?.sunset)}`} icon="white-balance-sunny" />
        {/* <Card title="Sunrise" value={`${extractTime(panchang?.moonrise)} - ${extractTime(panchang?.moonset)}`} icon="moon-waning-crescent" /> */}
      </View>

      <Text style={styles.title}>Next Day Panchang</Text>

      <View style={styles.row}>
        <Card title="Tithi" value={nxtdaysTithi} icon="flare" />
        <Card title="Nakshatra" value={`${panchang.nakshatra[1]?.name}`} icon="star-david" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: '#FCEECF',
      borderColor: '#D6A665',
      borderWidth: 1,
      margin: 5,
    },
    title: {
      textAlign: 'center',
      fontSize: 11,
      marginBottom: 5,
      fontWeight: 'bold',
      color: '#713F12',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
    },
    card: {
      backgroundColor: '#FAE8C8',
      padding: 5,
      borderRadius: 10,
      width: '32%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E3C190',
    },
    cardTitle: {
      fontWeight: '500',
      color: '#713F12',
    },
    iconContainer: {
      marginVertical: 2,
      height: 27,
    },
    cardValue: {
      fontSize: 10,
      fontWeight: '500',
      color: '#712D0F',
      textAlign: 'center',
    },
  });

export default panchangCard;
