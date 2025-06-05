// panchangServicePro.js

import { Alert } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import { encode as btoa } from 'base-64';

const CLIENT_ID = '5011ee0c-603e-4209-b2b7-1e1019fc9b13';
const CLIENT_SECRET = 'yG6bciiJpSqQQfgTCqDQL9AG7vR2V7wmyzCPsgHs';
const TOKEN_URL = 'https://api.prokerala.com/token';
const PANCHANG_URL = 'https://api.prokerala.com/v2/astrology/panchang';

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  const currentTime = new Date().getTime();
  if (accessToken && tokenExpiry && currentTime < tokenExpiry) {
    console.log('Access Token generated succefully', accessToken);
    // Alert.alert('Access Token generated succefully', accessToken);
    return accessToken; // Token is still valid
  }

  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
  //const base64Auth = btoa(authString);
  const base64Auth = btoa(authString);
  
  try {
    // Alert.alert('within access token function fetch request');
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  // Always read the response body
  const responseText = await response.text();
  console.log('responseText::', responseText);
  if (!response.ok) {
    // Log raw response content to console
    console.error('🛑 Token fetch failed:', {
      status: response.status,
      statusText: response.statusText,
      responseText,
    });
    console.log('Token fetch failed:::', response.status, response.statusText, responseText);

    // Show details in Alert
    Alert.alert(
      `Error ${response.status}: ${response.statusText}`,
      responseText
    );

    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  } else {
    // Alert.alert('done', 'response.ok received for token...'); 
    console.log('Done with token generation..')
  } 

  const data = JSON.parse(responseText);
  return data.access_token;
} catch (error) {
  console.log('❌ Token fetch failed, Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
  console.log('error.name:', error.name);
  console.log('error.message:', error.message);
  console.log('error.stack:', error.stack);
}
};

export const fetchPanchang = async (date, latitude, longitude, ayanamsa = 1) => {
  try {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected || !netState.isInternetReachable) {
      Alert.alert('No Internet', 'Please check your internet connection.');
      setLoading(false);
      return;
    }
    //Alert.alert('Awating for Access Token');
    const token = await getAccessToken();
    //Alert.alert('Access Token function get called');
    console.log('Access token function get called');
    const encodedDatetime = encodeURIComponent(date);  // Here date is the dateStringWithTimezone
    const coordinates = `${latitude},${longitude}`;

    console.log('date in iso format is', date);
    console.log('lat and long is', latitude, longitude);

    console.log(`date time and timzon pass in iso format is ${date}`);
    console.log(`lat and long is ${latitude}, ${longitude}`);

    const url = `${PANCHANG_URL}?ayanamsa=${ayanamsa}&coordinates=${latitude},${longitude}&datetime=${date}`;
    
    console.log('GET url is:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('error data after token is: ', errorData);
      //Alert.alert('Error in Resonse after token generation:', errorData.message);
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    } 

    const data = await response.json();
    return data;
  } catch (error) {
    //Alert.alert('Error fetching api data', error.message, error.response.message);
    console.error('Panchang API Error:', error.message, error.response.message);
    throw error;
  }
};

//export default fetchPanchang;
