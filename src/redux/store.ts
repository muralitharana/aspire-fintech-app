import {configureStore} from '@reduxjs/toolkit';
import createMiddlewareSaga from 'redux-saga';
import DebitCardReducer, {debitCardSlice} from './slices/DebitCardSlice';
const middlewareSaga = createMiddlewareSaga();

export const store = configureStore({
  reducer: {
    [debitCardSlice.reducerPath]: DebitCardReducer,
  },
  middleware: getMiddleware => getMiddleware().concat(middlewareSaga),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
