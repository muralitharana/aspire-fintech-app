import {configureStore} from '@reduxjs/toolkit';

import createMiddlewareSaga from 'redux-saga';

const middlewareSaga = createMiddlewareSaga();

export const store = configureStore({
  reducer: {},
  middleware: getMiddleware => getMiddleware().concat(middlewareSaga),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
