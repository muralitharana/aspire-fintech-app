import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
  apiDebitCardDetailsUpdate: ApiState;
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
  apiDebitCardDetailsUpdate: initialApiState,
  ...initialApiState,
};

// specific action action for callback based approach
export const addDebitCardApi = createAction<{
  debitCard: DebitCardType;
  onSuccess?: (data?: any) => void;
  onFailure?: (error?: any) => void;
}>('debitCard/addDebitCard');

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
    },
    updateSelectedDebitCard: (state, action: PayloadAction<DebitCardType>) => {
      state.selectedDebitCard = action.payload;
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
      state.apiDebitCardDetailsUpdate.isFetching = true;
      state.apiDebitCardDetailsUpdate.errorMessage = '';
      state.apiDebitCardDetailsUpdate.isError = false;
      state.apiDebitCardDetailsUpdate.isSuccess = false;
    },
    updateDebitCardStatus: (
      state,
      action: PayloadAction<{
        cardId: number;
        isFreezed: boolean;
      }>,
    ) => {
      state.apiDebitCardDetailsUpdate.isFetching = true;
      state.apiDebitCardDetailsUpdate.errorMessage = '';
      state.apiDebitCardDetailsUpdate.isError = false;
      state.apiDebitCardDetailsUpdate.isSuccess = false;
    },
    onUpdateDebitCardDetailsSuccess: (
      state,
      action: PayloadAction<DebitCardType>,
    ) => {
      state.apiDebitCardDetailsUpdate.isFetching = false;
      state.apiDebitCardDetailsUpdate.isSuccess = true;

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
    onUpdateDebitCardDetailsFailure: (state, action: PayloadAction<string>) => {
      state.apiDebitCardDetailsUpdate.isFetching = false;
      state.apiDebitCardDetailsUpdate.isError = true;
      state.apiDebitCardDetailsUpdate.errorMessage = action.payload;
    },
  },
});

export const {
  fetchDebitCardsInformation,
  onFetchDebitCardInfoFailure,
  onFetchDebitCardInfoSuccess,
  updateDebitCardWeeklyLimit,
  onUpdateDebitCardDetailsSuccess,
  onUpdateDebitCardDetailsFailure,
  updateSelectedDebitCard,
  updateDebitCardStatus,
} = debitCardSlice.actions;
export default debitCardSlice.reducer;
