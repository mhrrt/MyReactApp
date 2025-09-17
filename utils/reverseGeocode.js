// src/utils/reverseGeocode.js

export const reverseGeocode = async (latitude, longitude) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'RamSalaka', // Required by Nominatim
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Extract meaningful address
    // const address = data?.display_name || 'Address not found';
    const address = data || 'Address not found';
    return address;
  } catch (error) {
    console.error('❌ Reverse geocoding failed:', error.message);
    return 'Unable to fetch address';
  }
};
