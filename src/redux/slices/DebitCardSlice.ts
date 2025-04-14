import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DebitCardState {
  weeklyDebitLimit: string | number;
}

const initialState: DebitCardState = {
  weeklyDebitLimit: '',
};

export const debitCardSlice = createSlice({
  name: 'debitSlice',
  initialState,
  reducers: {
    updateWeeklyDebitCardLimit: (state, action: PayloadAction<string>) => {
      state.weeklyDebitLimit = action.payload;
    },
  },
});

export const {updateWeeklyDebitCardLimit} = debitCardSlice.actions;
export default debitCardSlice.reducer;
