import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DebitCardType} from '../../types/debitCardTypes';
import {REDUCERS} from '../utils';

interface ApiState {
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  errorMessage: string;
}

interface DebitCardStateType {
  weeklyDebitLimit: string | number;
  selectedDebitCard: DebitCardType | null;
  data: DebitCardType[];
}

const initialState: DebitCardStateType & ApiState = {
  weeklyDebitLimit: '',
  selectedDebitCard: null,
  data: [],
  errorMessage: '',
  isError: false,
  isFetching: false,
  isSuccess: false,
};

export const debitCardSlice = createSlice({
  name: REDUCERS.debitCardSlice,
  initialState,
  reducers: {
    updateWeeklyDebitCardLimit: (state, action: PayloadAction<string>) => {
      state.weeklyDebitLimit = action.payload;
    },
    fetchDebitCardsInformation: state => {
      state.isFetching = true;
      state.errorMessage = '';
    },
    onFetchDebitCardInfoSuccess: (
      state,
      action: PayloadAction<DebitCardType[]>,
    ) => {
      state.isFetching = false;
      state.data = action.payload;
      state.selectedDebitCard = action.payload[0];
    },
    onFetchDebitCardInfoFailure: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  updateWeeklyDebitCardLimit,
  fetchDebitCardsInformation,
  onFetchDebitCardInfoFailure,
  onFetchDebitCardInfoSuccess,
} = debitCardSlice.actions;
export default debitCardSlice.reducer;
