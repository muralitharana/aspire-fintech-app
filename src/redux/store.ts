import {configureStore} from '@reduxjs/toolkit';
import createMiddlewareSaga from 'redux-saga';
import DebitCardReducer from './slices/DebitCardSlice';
import debitCardSaga from './sagas/debitCardSaga';
import {REDUCERS} from './utils';

const middlewareSaga = createMiddlewareSaga();

export const store = configureStore({
  reducer: {
    [REDUCERS.debitCardSlice]: DebitCardReducer,
  },
  middleware: getMiddleware => getMiddleware().concat(middlewareSaga),
});

middlewareSaga.run(debitCardSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
