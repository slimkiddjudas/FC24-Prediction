import axios from 'axios';

const API_URL = 'https://api.example.com/predict'; // Replace with your actual API endpoint

export const predictMarketValue = async (position, attributes) => {
  try {
    const response = await axios.post(API_URL, {
      position,
      attributes,
    });
    return response.data; // Assuming the API returns the predicted market value in the response
  } catch (error) {
    console.error('Error predicting market value:', error);
    throw error; // Rethrow the error for further handling
  }
};