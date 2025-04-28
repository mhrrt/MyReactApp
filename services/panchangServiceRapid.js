import axios from 'axios';

const BASE_URL = 'https://panchang2.p.rapidapi.com/';
const API_KEY = '940ca60ce2mshdeb33a6310b3556p157325jsnfbebcd972c2d'; // Replace with your actual key

export const fetchPanchang = async (params) => {
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'panchang2.p.rapidapi.com',
    };
  
    // Manually construct form data string
    const formData = new URLSearchParams({
      panchangdate: params.date,           // '23-04-2025'
      panchangtime: params.time,           // '09:44'
      city: params.city,                   // 'Nagpur'
      panchanglongitude: params.longitude, // 79.0882
      panchanglatitude: params.latitude,   // 21.1458
      panchangtimezone: params.tzone || '',// Optional: 'Asia/Kolkata'
    }).toString(); // Required to match x-www-form-urlencoded
  
    try {
      const response = await axios.post(BASE_URL, formData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw error;
    }
  };