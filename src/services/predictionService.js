import axios from 'axios';

// Environment variable'ı bir değişkene atayın ve fallback değer verin
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000/predict';

export const predictMarketValue = async (attributes) => {
  try {
    console.log('API URL:', API_URL);
    console.log('Sending payload to API:', attributes);
    console.log('Player position code:', attributes.player_positions);
    
    const response = await axios.post(API_URL, attributes);
    console.log('API response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error predicting market value:', error);
    
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      throw new Error(error.response.data.detail || 'Server error occurred');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check if the API is running.');
    } else {
      console.error('Error setting up request:', error.message);
      throw error;
    }
  }
};