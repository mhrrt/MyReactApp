// services/panchangService.js
import axios from 'axios';

const API_KEY = 'gPWbwU4OVjZN2LPPFkoY2KxLqagXG1A9JYJLyM41'; // Replace as required
const BASE_URL = 'https://json.freeastrologyapi.com/';

export const fetchPanchangData = async ({ date, latitude, longitude }) => {
    console.log("Date, lat and long are:", date, latitude, longitude);
  try {
    const response = await axios.post(
      `${BASE_URL}panchang`,
      {
        date, // Format: 'YYYY-MM-DD'
        latitude,
        longitude,
        timezone: new Date().getTimezoneOffset() / -60, // Convert minutes to hours
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      }
    );
    console.log("Response details", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Panchang data:', error);
    throw error;
  }
};
