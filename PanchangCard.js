// PanchangCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { getCurrentLocation } from './locationHelper';
 //import { fetchPanchang } from './services/panchangService';
import fetchPanchang from './services/panchangService';
import { theme } from './theme';

const PanchangCard = () => {
    const [panchang, setPanchang] = useState(null);
    const [loading, setLoading] = useState(true);

  const today = new Date();

  //useEffect(() => {
    const getPanchangData = async () => {
      try {
       // Alert.alert('calling getCurrentLocation in Your code:');
        const location = await getCurrentLocation();
       // Alert.alert(' getCurrentLocation get called:');
        //Alert.alert('location returned:', location); // ADD THIS LINE
        const { latitude, longitude } = location;
        console.log('lat, long from device are #1: ', latitude, longitude);
        console.log('getLocation:', getCurrentLocation);
        console.log('lat, long from device are:#2: ', latitude, longitude);
        // const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        // const panchang = await fetchPanchangData({ date: today, latitude, longitude });
        const apiResponse = await fetchPanchang({
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            seconds:0,
            latitude: 20.1,
            longitude:-70.21,
            tzone: -today.getTimezoneOffset() / 60,
        });
        //console.log('post request is successfull', JSON.stringify(apiResponse, null, 2))
        //Alert.alert('Data value is', JSON.stringify(apiResponse));
        console.log('Full api response', JSON.stringify(apiResponse));

        // setPanchang(apiResponse);
        //parse output 
        try {
          // STEP 1: First parse the full response (if it's a string)
          const topLevel = typeof apiResponse === 'string' 
          ? JSON.parse(apiResponse) 
          : apiResponse;
          // extract string from response.output object as respons string do have 'output' key
          const outputString = topLevel?.data?.output;

          const parsedOutput = outputString ? JSON.parse(outputString) : null;
          
          if (parsedOutput) {
            console.log('✅ Panchang parsed successfully:', parsedOutput);
            setPanchang(parsedOutput);
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

//   if (loading) return <ActivityIndicator />;
if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!panchang) return <Text>Error loading Panchang</Text>;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📅 Panchang for Today</Text>
      <Text style={styles.item}>🌗 Tithi: {panchang?.name}</Text>
      <Text style={styles.item}>🌓 Paksha: {panchang?.paksha}</Text>
      <Text style={styles.item}>⏳ Ends at: {panchang?.completes_at}</Text>
      <Text style={styles.item}>🔄 Left: {panchang?.left_precentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundColor,
    elevation: 9,
    margin: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default PanchangCard;
