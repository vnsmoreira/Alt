import { Alert } from 'react-native';
import axios from 'axios';
import { baseURL, searchEndpoint } from './index';

export const getMusics = async query => {
  query = query ? query : 'russ';

  try {
    const url = baseURL + searchEndpoint + query;
    const response = await axios.get(url, {
      timeout: 2000,
    });

    return response.data;
  } catch (err) {
    Alert.alert('Search error', 'Please verify your connection and try again', [{ text: 'okay' }]);
  }
};
