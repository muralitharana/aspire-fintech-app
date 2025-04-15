import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DebitCardType, WeeklyDebitLimitType} from '../../types/debitCardTypes';
import {REDUCERS} from '../utils';

interface ApiState {
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  errorMessage: string;
}

interface DebitCardStateType {
  selectedDebitCard: DebitCardType | null;
  data: DebitCardType[];
  apiWeeklyLimitUpdate: ApiState;
}

const initialApiState = {
  errorMessage: '',
  isError: false,
  isFetching: false,
  isSuccess: false,
};

const initialState: DebitCardStateType & ApiState = {
  selectedDebitCard: null,
  data: [],
  apiWeeklyLimitUpdate: initialApiState,
  ...initialApiState,
};

export const debitCardSlice = createSlice({
  name: REDUCERS.debitCardSlice,
  initialState,
  reducers: {
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
    updateDebitCardWeeklyLimit: (
      state,
      action: PayloadAction<{
        cardId: number;
        amountLimit: number;
        amountSpend: number;
      }>,
    ) => {
      state.apiWeeklyLimitUpdate.isFetching = true;
      state.apiWeeklyLimitUpdate.errorMessage = '';
      state.apiWeeklyLimitUpdate.isError = false;
      state.apiWeeklyLimitUpdate.isSuccess = false;
    },
    onUpdateWeeklyLimitSuccess: (
      state,
      action: PayloadAction<DebitCardType>,
    ) => {
      state.apiWeeklyLimitUpdate.isFetching = false;
      state.apiWeeklyLimitUpdate.isSuccess = true;

      // Update local state
      const updated = action.payload;
      const index = state.data.findIndex(card => card.id === updated.id);
      if (index !== -1) {
        state.data[index] = updated;
      }

      // Optionally update selected
      if (state.selectedDebitCard?.id === updated.id) {
        state.selectedDebitCard = updated;
      }
    },
    onUpdateWeeklyLimitFailure: (state, action: PayloadAction<string>) => {
      state.apiWeeklyLimitUpdate.isFetching = false;
      state.apiWeeklyLimitUpdate.isError = true;
      state.apiWeeklyLimitUpdate.errorMessage = action.payload;
    },
  },
});

export const {
  fetchDebitCardsInformation,
  onFetchDebitCardInfoFailure,
  onFetchDebitCardInfoSuccess,
  updateDebitCardWeeklyLimit,
  onUpdateWeeklyLimitSuccess,
  onUpdateWeeklyLimitFailure,
} = debitCardSlice.actions;
export default debitCardSlice.reducer;
