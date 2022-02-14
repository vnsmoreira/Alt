import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.127:3000',
  timeout: 6000,
});

export default api;

export const downloadEndpoint = '/download/';
export const searchEndpoint = '/search/';
