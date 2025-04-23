// panchangService.js
import axios from 'axios';

const BASE_URL = 'https://json.freeastrologyapi.com';
const API_KEY = 'gPWbwU4OVjZN2LPPFkoY2KxLqagXG1A9JYJLyM41'; // Replace with your actual key

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

const buildRequestBody = (params) => ({
  year: params.year,
  month: params.month,
  date: params.date,
  hours: params.hour,
  minutes: params.minute,
  seconds: 0,
  latitude: params.latitude,
  longitude: params.longitude,
  timezone: params.tzone,
  config: {
    observation_point: 'topocentric',
    ayanamsha: 'lahiri',
  },
});

/**
 * Fetch Panchang data from multiple endpoints
 */
// export const fetchPanchang = async (params) => {
//   const body = buildRequestBody(params);

//   // const endpoints = ['tithi', 'nakshatra', 'yoga', 'karana', 'sunrise', 'rashi'];
//   const endpoints = ['tithi-durations'];

//   try {
//     console.log(`Post Request is : ${BASE_URL}/${endpoints} \n Body: ${JSON.stringify(body)} \n  header as ${JSON.stringify(defaultHeaders)}`);
//     const results = await Promise.all(
//       endpoints.map((endpoint) =>
//         axios.post(`${BASE_URL}/${endpoint}`, body, { 
//           headers: defaultHeaders,
//           timeout: 2000,
//          }).catch( error => {
//           console.error('Detailed Error:', error.toJSON?.());
//          })
//       )
//     );

//     return {
//       tithi: results[0].data,
//       // nakshatra: results[1].data,
//       // yoga: results[2].data,
//       // karana: results[3].data,
//       // sunrise: results[4].data,
//       // rashi: results[5].data,
//     };
//   } catch (error) {
//     console.error('Panchang fetch error:', error.message);
//     throw error;
//   }
// };

/**
 * Fetch Panchang data using Fetch API
 */
export const fetchPanchang = async (params) => {
  const body = buildRequestBody(params);
  const endpoint = 'tithi-durations';
   console.log('panchang params are:', params);
  try {
    console.log(`Sending POST request to ${BASE_URL}/${endpoint}`);
    console.log('Request Body:', JSON.stringify(body));

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    } else {
      console.log('Response status:', response.status, response.statusText);
    }

    const data = await response.json();
    console.log('Fetched Panchang Data:', data);

    return {
       data,
    };
  } catch (error) {
    console.error('Panchang fetch error:', error.message);
    throw error;
  }
};
export default fetchPanchang;