import { Alert } from 'react-native';
import axios from 'axios';

export const getMusics = async query => {
  query = query ? query : 'drake';

  try {
    const url = `http://192.168.15.127:3000/search/${query}`;
    const response = await axios.get(url, {
      timeout: 2000,
    });

    return response.data;
  } catch (err) {
    Alert.alert('Search error', 'Please verify your connection and try again', [{ text: 'okay' }]);
  }
};
