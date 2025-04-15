import {call, put, takeEvery} from 'redux-saga/effects';
import {getDebitCards} from '../../services/api';
import {
  fetchDebitCardsInformation,
  onFetchDebitCardInfoFailure,
  onFetchDebitCardInfoSuccess,
} from '../slices/DebitCardSlice';
import {DebitCardType} from '../../types/debitCardTypes';

function* workGetDebitcardsFetch() {
  try {
    console.log('Fetching debit cards...');
    const debitCards: DebitCardType[] = yield call(getDebitCards);
    yield put(onFetchDebitCardInfoSuccess(debitCards));
  } catch (error) {
    console.warn('Debit card fetch failed:', error);
    if (error instanceof Error) {
      yield put(onFetchDebitCardInfoFailure(error.message));
    } else {
      yield put(onFetchDebitCardInfoFailure('Unknown error occurred'));
    }
  }
}

function* debitCardSaga() {
  console.log('Debit card saga initialized');
  yield takeEvery(fetchDebitCardsInformation.type, workGetDebitcardsFetch);
}

export default debitCardSaga;
