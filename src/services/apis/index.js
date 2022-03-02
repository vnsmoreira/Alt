import axios from 'axios';

export const baseURL = 'https://alt-backend.herokuapp.com';

const api = axios.create({
  baseURL,
  timeout: 6000,
});

export default api;

export const downloadEndpoint = '/download/';
export const searchEndpoint = '/search/';
