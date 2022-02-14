import axios from 'axios';

export const baseURL = 'http://192.168.15.127:3000';

const api = axios.create({
  baseURL,
  timeout: 6000,
});

export default api;

export const downloadEndpoint = '/download/';
export const searchEndpoint = '/search/';
