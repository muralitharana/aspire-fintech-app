import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/',
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors
    return Promise.reject(error);
  },
);
