// panchangServicePro.js

import { Alert } from "react-native";

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
    return accessToken; // Token is still valid
  }

  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const base64Auth = btoa(authString);

  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Auth}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to obtain access token');
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = currentTime + data.expires_in * 1000; // set expiry time

    return accessToken;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const fetchPanchang = async (date, latitude, longitude, ayanamsa = 1) => {
  try {
    const token = await getAccessToken();
    //const datetime = `${date}T00:00:00+05:30`;
    // const encodedDatetime = encodeURIComponent(datetime);
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
      Alert.alert('Error in Resonse after token generation:', errorData.message);
      throw new Error(`API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Panchang API Error:', error.message);
    throw error;
  }
};

//export default fetchPanchang;
