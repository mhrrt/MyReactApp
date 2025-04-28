// PanchangCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { getCurrentLocation } from './locationHelper';

//import fetchPanchang from './services/panchangService';
// import { theme } from './theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use icons as needed

import { fetchPanchang } from './services/panchangServiceRapid';

const PanchangCard = () => {
    const [panchang, setPanchang] = useState(null);
    const [loading, setLoading] = useState(true);

  const today = new Date();
  let dateDDMMYYYY = today.getDate() + "-"+ String(today.getMonth() + 1).padStart(2, '0') +"-"+today.getFullYear();


  const Card = ({ title, value, icon }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={28} color="#712D0F" />
      </View>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  //useEffect(() => {
    const getPanchangData = async () => {
      try {
        const location = await getCurrentLocation();
        const { latitude, longitude } = location;
        console.log('lat, long from device are #1: ', latitude, longitude);
        console.log('getLocation:', getCurrentLocation);
        console.log('lat, long from device are:#2: ', latitude, longitude);
       
        const apiResponse = await fetchPanchang({
            // date: dateDDMMYYYY,
            // time: '13:20',
            // city: 'Nagpur',
            // latitude: latitude,
            // longitude:longitude,
            // tzone: -today.getTimezoneOffset() / 60,
            date: '23-04-2025',
            time: '09:44',
            city: 'Nagpur',
            longitude: 79.0882,
            latitude: 21.1458,
            tzone: 5.5
        });
        console.log('Full api response', JSON.stringify(apiResponse));


        // setPanchang(apiResponse);
        //parse output 
        try {
          // STEP 1: First parse the full response (if it's a string)
          const topLevel = typeof apiResponse === 'string' 
          ? JSON.parse(apiResponse) 
          : apiResponse;
          console.log('api response is:', apiResponse);
          // extract string from response.panchang object as respons string do have 'output' key
          const outputString = apiResponse?.panchang;
          console.log('toplevel output sting is:', outputString);
          
          if (outputString) {
            console.log('✅ Panchang parsed successfully:', outputString);
            setPanchang(outputString);
          } else {
            console.warn('⚠️ Output was empty or invalid');
            Alert.alert('Error Output was empty or invalid', 'Could not parse Panchang data');
          }
        } catch (e) {
          console.error('❌ Failed to parse output:', e);
        }
      } catch (err) {
        console.error('Failed to load Panchang', err);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Key Panchang Details</Text>

      <View style={styles.row}>
        <Card title="Tithi" value={panchang?.tithi || '—'} icon="om" />
        {/* <Card title="Nakshatra" value={panchang?.nakshtra || '—'} icon="om" /> */}
        <Card title="Rahukal" value={`${panchang.rahukalstarts} - ${panchang.rahukalends}`} icon="flash" />
        <Card title="Abhijit" value={`${panchang.abhijitstarts} - ${panchang.abhijitends}`} icon="flash-outline" />
      </View>

      <View style={styles.row}>
        {/* <Card title="Abhijit" value={`${panchang.abhijitstarts} - ${panchang.abhijitends}`} icon="flash-outline" /> */}
        <Card title="Dishashool" value={panchang?.dishashooldirection || '—'} icon="sun-compass" />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FCEECF',
    borderColor: '#D6A665',
    borderWidth: 1,
    margin: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#713F12',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FAE8C8',
    padding: 10,
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
  },
  cardValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#712D0F',
  },
});

// const styles = StyleSheet.create({
//   card: {
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: theme.colors.backgroundColor,
//     elevation: 9,
//     margin: 16,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
// });


export default PanchangCard;
