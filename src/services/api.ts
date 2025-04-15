import axios from 'axios';
import {AccountBalanceType, DebitCardType} from '../types/debitCardTypes';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors
    return Promise.reject(error);
  },
);

export const getDebitCards = async (): Promise<{
  data: DebitCardType[];
}> => {
  const response = await api.get(`debitCards`);
  return response.data;
};
