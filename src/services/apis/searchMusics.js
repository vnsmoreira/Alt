import { Alert } from 'react-native';
import api, { searchEndpoint } from './index';

export const getMusics = async query => {
  query = query ? query : 'russ';

  try {
    const response = await api.get(searchEndpoint + query);

    return response.data;
  } catch (err) {
    Alert.alert('Search error', 'Please verify your connection and try again', [{ text: 'okay' }]);
  }
};
