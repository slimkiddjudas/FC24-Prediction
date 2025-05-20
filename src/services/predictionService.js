import axios from 'axios';

const API_URL = process.env.REACT_APP_API;

export const predictMarketValue = async (attributes) => {
  try {
    const response = await axios.post(API_URL, attributes);
    return response.data;
  } catch (error) {
    console.error('Error predicting market value:', error);
    throw error;
  }
};