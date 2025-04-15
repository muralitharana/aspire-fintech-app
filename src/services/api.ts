import axios from 'axios';
import {
  CardStatusType,
  DebitCardType,
  WeeklyDebitLimitType,
} from '../types/debitCardTypes';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your machine IP for mobile
});

// Optional: Global error handler
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

// GET all debit cards
export const getDebitCards = async (): Promise<DebitCardType[]> => {
  const response = await api.get('debitCards');
  return response.data;
};

export const patchDebitCard = async (
  cardId: number,
  patchData: {weeklyLimit: WeeklyDebitLimitType},
): Promise<DebitCardType> => {
  const response = await api.patch(`debitCards/${cardId}`, patchData);
  return response.data;
};

export const patchDebitCardStatus = async (
  cardId: number,
  patchData: {cardStatus: CardStatusType},
): Promise<DebitCardType> => {
  const response = await api.patch(`debitCards/${cardId}`, patchData);
  return response.data;
};
